const express = require('express')
const { pool } = require('../db')
const { generateId } = require('../utils/ids')
const { requireTeacher } = require('../utils/auth')

const router = express.Router()
router.use(requireTeacher)

router.get('/classes', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.id, c.name, c.code,
              (SELECT COUNT(*)::int FROM class_members m WHERE m.class_id = c.id) AS members
       FROM classes c WHERE c.teacher_id = $1 ORDER BY c.created_at ASC`,
      [req.userId],
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/classes', async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'name is required' })

    const id = generateId('cls')
    const code = `CLS-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    await pool.query(
      'INSERT INTO classes (id, teacher_id, name, code, created_at) VALUES ($1, $2, $3, $4, $5)',
      [id, req.userId, name, code, Date.now()],
    )
    res.status(201).json({ id, name, code })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/classes/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.id, p.name, p.age,
              COALESCE(AVG(r.score), 0)::float AS average_score,
              COUNT(r.id)::int AS challenges
       FROM class_members m
       JOIN profiles p ON p.id = m.profile_id
       LEFT JOIN responses r ON r.profile_id = p.id
       WHERE m.class_id = $1
       GROUP BY p.id`,
      [req.params.id],
    )
    res.json(rows.map((p) => ({ ...p, average_score: Math.round(p.average_score * 10) / 10 })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/classes/:id/enroll', async (req, res) => {
  try {
    const { codes = [] } = req.body
    let added = 0
    for (const code of codes) {
      const child = await pool.query('SELECT id FROM profiles WHERE child_code = $1', [
        String(code).toUpperCase(),
      ])
      if (child.rows.length) {
        await pool.query(
          'INSERT INTO class_members (class_id, profile_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [req.params.id, child.rows[0].id],
        )
        added += 1
      }
    }
    res.json({ ok: true, added })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/students/:id', async (req, res) => {
  try {
    const profile = await pool.query(
      'SELECT id, name, age, language, child_code FROM profiles WHERE id = $1',
      [req.params.id],
    )
    if (!profile.rows.length) return res.status(404).json({ error: 'Student not found' })

    const history = await pool.query(
      `SELECT r.score, r.feedback, r.completed_at, c.title, c.skill
       FROM responses r JOIN challenges c ON c.id = r.challenge_id
       WHERE r.profile_id = $1 ORDER BY r.completed_at DESC LIMIT 50`,
      [req.params.id],
    )

    res.json({
      ...profile.rows[0],
      history: history.rows.map((h) => ({ ...h, completedAt: Number(h.completed_at) })),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/settings', async (req, res) => {
  res.json({ ok: true })
})

module.exports = router
