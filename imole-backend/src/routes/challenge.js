const express = require('express')
const { pool } = require('../db')
const { generateId } = require('../utils/ids')
const aiService = require('../config/ai')
const mockAi = require('../utils/mockAi')
const { getMemory, applyResult } = require('../utils/memory')

const router = express.Router()

function dayOfYear() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  return Math.floor((Date.now() - start.getTime()) / 86400000)
}

function publicChallenge(row, lang) {
  const resource = row.resource || {}
  const answers = Array.isArray(resource.answers) ? resource.answers : null

  const base = {
    id: row.id,
    skill: row.skill,
    title: row.title,
    question: resource.question || row.description,
    answers: answers ? answers.map(({ id, text }) => ({ id, text })) : null,
    description: row.description,
    difficulty: row.difficulty,
    resource: { type: resource.type, title: resource.title, url: resource.url },
    completed: false,
  }

  if (lang && resource.language && resource.language !== lang) return base
  return base
}

router.get('/daily', async (req, res) => {
  try {
    const { profileId, lang = 'en' } = req.query
    if (!profileId) return res.status(400).json({ error: 'profileId is required' })

    const skill = mockAi.SKILLS[dayOfYear() % mockAi.SKILLS.length]

    const existing = await pool.query(
      `SELECT c.* FROM challenges c
       LEFT JOIN responses r ON r.challenge_id = c.id
       WHERE c.profile_id = $1 AND r.id IS NULL
       ORDER BY c.created_at DESC LIMIT 1`,
      [profileId],
    )

    let row
    if (existing.rows.length) {
      row = existing.rows[0]
    } else {
      const generated = await aiService.generateChallenge({
        skill,
        language: lang,
        childName: null,
      })
      const id = generateId('chal')
      const resource = {
        ...(generated.resource || {}),
        language: lang,
        question: generated.question,
        answers: generated.answers ?? null,
      }
      const { rows } = await pool.query(
        `INSERT INTO challenges (id, profile_id, skill, title, description, question, difficulty, resource, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          id,
          profileId,
          skill,
          generated.title,
          generated.description || generated.question,
          generated.question,
          generated.difficulty || 1,
          JSON.stringify(resource),
          Date.now(),
        ],
      )
      row = rows[0]
    }

    let challenge = publicChallenge(row, lang)

    const resource = row.resource || {}
    if (resource.language && resource.language !== lang) {
      const translated = await aiService.translateChallenge({
        title: row.title,
        description: row.description,
        question: resource.question || '',
        resourceTitle: resource.title || '',
        answers: Array.isArray(resource.answers) ? resource.answers.map(({ id, text }) => ({ id, text })) : [],
        targetLanguage: lang,
      })
      if (translated) {
        const updatedResource = {
          ...resource,
          language: lang,
          question: translated.question || resource.question,
          answers: translated.answers?.length
            ? resource.answers?.map((a) => ({
                ...a,
                text: translated.answers.find((t) => t.id === a.id)?.text ?? a.text,
              }))
            : resource.answers,
        }
        const { rows } = await pool.query(
          `UPDATE challenges SET title = $2, description = $3, resource = $4 WHERE id = $1 RETURNING *`,
          [row.id, translated.title || row.title, translated.description || row.description, JSON.stringify(updatedResource)],
        )
        row = rows[0]
        challenge = publicChallenge(row, lang)
      }
    }

    const completedToday = await pool.query(
      `SELECT r.* FROM responses r
       JOIN challenges c ON c.id = r.challenge_id
       WHERE r.profile_id = $1 AND c.id = $2
       ORDER BY r.completed_at DESC LIMIT 1`,
      [profileId, row.id],
    )

    if (completedToday.rows.length) {
      const r = completedToday.rows[0]
      const stored = row.resource || {}
      challenge = {
        ...challenge,
        completed: true,
        score: r.score,
        feedback: r.feedback,
        selectedAnswerId: r.selected_answer,
        correctAnswerId: stored.answers?.find((a) => a.correct)?.id,
        answer: r.selected_answer,
      }
    }

    res.json(challenge)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.post('/:id/submit', async (req, res) => {
  try {
    const { answer, selectedAnswerId, profileId } = req.body
    if (!profileId) return res.status(400).json({ error: 'profileId is required' })

    const { rows } = await pool.query(
      'SELECT * FROM challenges WHERE id = $1 AND profile_id = $2',
      [req.params.id, profileId],
    )
    if (!rows.length) return res.status(404).json({ error: 'Challenge not found' })
    const challenge = rows[0]

    const profile = await pool.query('SELECT language FROM profiles WHERE id = $1', [profileId])
    const language = profile.rows[0]?.language || 'en'

    const result = await aiService.scoreAnswer({
      challenge: { ...challenge, resource: challenge.resource },
      answer: selectedAnswerId ?? answer,
      language,
    })

    await pool.query(
      `INSERT INTO responses (id, challenge_id, profile_id, score, feedback, selected_answer, correct, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        generateId('resp'),
        challenge.id,
        profileId,
        result.score,
        result.feedback,
        String(selectedAnswerId ?? answer ?? ''),
        result.correct ?? result.score >= 7,
        Date.now(),
      ],
    )

    const streak = await applyResult(profileId, challenge.skill, result.correct ?? result.score >= 7)

    res.json({
      score: result.score,
      feedback: result.feedback,
      correctAnswerId: result.correctAnswerId,
      streak,
      freezes: streak.freezes,
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
