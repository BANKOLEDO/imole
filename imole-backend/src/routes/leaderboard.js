const express = require('express')
const { pool } = require('../db')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const since = Date.now() - 30 * 86400000
    const { rows } = await pool.query(
      `SELECT r.profile_id, AVG(r.score)::float AS score, pm.streak_current AS streak
       FROM responses r
       JOIN profile_memory pm ON pm.profile_id = r.profile_id
       WHERE r.completed_at > $1
       GROUP BY r.profile_id, pm.streak_current
       ORDER BY score DESC
       LIMIT 50`,
      [since],
    )
    res.json(
      rows.map((row, index) => ({
        id: row.profile_id,
        rank: index + 1,
        score: Math.round(row.score * 10) / 10,
        streak: row.streak,
      })),
    )
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
