const express = require('express')
const { pool } = require('../db')
const { getMemory } = require('../utils/memory')

const router = express.Router()

router.get('/:profileId', async (req, res) => {
  try {
    const memory = await getMemory(req.params.profileId)

    const { rows } = await pool.query(
      `SELECT c.id, c.skill, c.title, c.description, c.difficulty,
              r.score, r.feedback, r.completed_at
       FROM challenges c
       JOIN responses r ON r.challenge_id = c.id
       WHERE c.profile_id = $1
       ORDER BY r.completed_at DESC`,
      [req.params.profileId],
    )

    res.json({
      challenges: rows.map((c) => ({ ...c, completedAt: Number(c.completed_at) })),
      skillScores: memory.skillScores,
      streak: memory.streak,
      freezes: memory.freezes,
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
