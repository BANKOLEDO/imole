const express = require('express')
const { pool } = require('../db')
const { requireParent } = require('../utils/auth')

const router = express.Router()
router.use(requireParent)

router.get('/children', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.id, p.name, p.age, p.language, p.child_code,
              COUNT(DISTINCT r.id)::int AS total_challenges,
              COALESCE(AVG(r.score), 0)::float AS average_score,
              pm.streak_current AS streak
       FROM parent_links pl
       JOIN profiles p ON p.id = pl.profile_id
       LEFT JOIN responses r ON r.profile_id = p.id
       LEFT JOIN profile_memory pm ON pm.profile_id = p.id
       WHERE pl.parent_id = $1
       GROUP BY p.id, pm.streak_current
       ORDER BY p.created_at ASC`,
      [req.userId],
    )
    res.json(
      rows.map((p) => ({
        id: p.id,
        name: p.name,
        age: p.age,
        language: p.language,
        childCode: p.child_code,
        totalChallenges: p.total_challenges,
        averageScore: Math.round(p.average_score * 10) / 10,
        streak: p.streak ?? 0,
      })),
    )
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/link', async (req, res) => {
  try {
    const { childCode } = req.body
    if (!childCode) return res.status(400).json({ error: 'childCode is required' })

    const { rows } = await pool.query('SELECT id FROM profiles WHERE child_code = $1', [
      childCode.toUpperCase(),
    ])
    if (!rows.length) return res.status(404).json({ error: 'Child not found' })

    await pool.query(
      'INSERT INTO parent_links (parent_id, profile_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.userId, rows[0].id],
    )
    res.status(201).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/children/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM parent_links WHERE parent_id = $1 AND profile_id = $2',
      [req.userId, req.params.id],
    )
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/dashboard/:childId', async (req, res) => {
  try {
    const link = await pool.query(
      'SELECT 1 FROM parent_links WHERE parent_id = $1 AND profile_id = $2',
      [req.userId, req.params.childId],
    )
    if (!link.rows.length) return res.status(403).json({ error: 'Child not linked to you' })

    const childId = req.params.childId

    const totals = await pool.query(
      `SELECT COUNT(*)::int AS total, COALESCE(AVG(score), 0)::float AS avg FROM responses WHERE profile_id = $1`,
      [childId],
    )

    const skills = await pool.query(
      `SELECT c.skill, AVG(r.score)::float AS avg
       FROM responses r JOIN challenges c ON c.id = r.challenge_id
       WHERE r.profile_id = $1 GROUP BY c.skill`,
      [childId],
    )

    const memory = await pool.query(
      `SELECT streak_current, streak_longest, freezes FROM profile_memory WHERE profile_id = $1`,
      [childId],
    )

    const weekly = await pool.query(
      `SELECT COUNT(DISTINCT r.challenge_id)::int AS active
       FROM responses r WHERE r.profile_id = $1 AND r.completed_at > $2`,
      [childId, Date.now() - 7 * 86400000],
    )

    const daily = await pool.query(
      `SELECT to_char(to_timestamp(completed_at / 1000.0), 'YYYY-MM-DD') AS date,
              AVG(score)::float AS average, COUNT(*)::int AS count
       FROM responses WHERE profile_id = $1 AND completed_at > $2
       GROUP BY date ORDER BY date ASC`,
      [childId, Date.now() - 30 * 86400000],
    )

    const progressMap = new Map(daily.rows.map((d) => [d.date, d]))
    const dailyProgress = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
      const found = progressMap.get(date)
      dailyProgress.push({
        date,
        average: found ? Math.round(found.average * 10) / 10 : 0,
        count: found?.count ?? 0,
      })
    }

    const mem = memory.rows[0]
    res.json({
      totalChallenges: totals.rows[0].total,
      averageScore: Math.round(totals.rows[0].avg * 10) / 10,
      skillBreakdown: Object.fromEntries(skills.rows.map((s) => [s.skill, Math.round(s.avg * 10) / 10])),
      streak: { current: mem?.streak_current ?? 0, longest: mem?.streak_longest ?? 0 },
      weeklyActive: weekly.rows[0].active,
      dailyProgress,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/settings', async (req, res) => {
  res.json({ ok: true })
})

module.exports = router
