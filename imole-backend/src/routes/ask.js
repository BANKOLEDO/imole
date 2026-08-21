const express = require('express')
const { pool } = require('../db')
const { generateId } = require('../utils/ids')
const aiService = require('../config/ai')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { profileId, message, sessionId, language = 'en' } = req.body
    if (!profileId || !message || typeof message !== 'string' || message.length > 1000) {
      return res.status(400).json({ error: 'profileId and message are required' })
    }

    let id = sessionId
    if (id) {
      const exists = await pool.query(
        'SELECT id FROM chat_sessions WHERE id = $1 AND profile_id = $2',
        [id, profileId],
      )
      if (!exists.rows.length) id = null
    }
    if (!id) {
      id = generateId('chat')
      await pool.query(
        'INSERT INTO chat_sessions (id, profile_id, title, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
        [id, profileId, message.slice(0, 60), Date.now(), Date.now()],
      )
    }

    await pool.query(
      'INSERT INTO chat_messages (id, session_id, role, content, created_at) VALUES ($1, $2, $3, $4, $5)',
      [generateId('msg'), id, 'user', message, Date.now()],
    )

    const history = await pool.query(
      'SELECT role, content FROM chat_messages WHERE session_id = $1 ORDER BY created_at DESC LIMIT 8',
      [id],
    )

    const reply = await aiService.askQuestion({
      message,
      history: history.rows.reverse(),
      language,
    })

    await pool.query(
      'INSERT INTO chat_messages (id, session_id, role, content, created_at) VALUES ($1, $2, $3, $4, $5)',
      [generateId('msg'), id, 'assistant', reply, Date.now()],
    )
    await pool.query('UPDATE chat_sessions SET updated_at = $2 WHERE id = $1', [id, Date.now()])

    res.json({ reply, sessionId: id })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.get('/sessions', async (req, res) => {
  try {
    const { profileId } = req.query
    if (!profileId) return res.status(400).json({ error: 'profileId is required' })

    const { rows } = await pool.query(
      'SELECT id, title, created_at, updated_at FROM chat_sessions WHERE profile_id = $1 ORDER BY updated_at DESC',
      [profileId],
    )
    res.json(rows.map((s) => ({ ...s, createdAt: Number(s.created_at), updatedAt: Number(s.updated_at) })))
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.get('/sessions/:id/messages', async (req, res) => {
  try {
    const { profileId } = req.query
    const session = await pool.query(
      'SELECT id FROM chat_sessions WHERE id = $1 AND profile_id = $2',
      [req.params.id, profileId],
    )
    if (!session.rows.length) return res.status(404).json({ error: 'Session not found' })

    const { rows } = await pool.query(
      'SELECT id, role, content, created_at FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC',
      [req.params.id],
    )
    res.json(rows.map((m) => ({ ...m, createdAt: Number(m.created_at) })))
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.delete('/sessions/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM chat_messages WHERE session_id = $1', [req.params.id])
    await pool.query('DELETE FROM chat_sessions WHERE id = $1', [req.params.id])
    res.json({ ok: true })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
