const express = require('express')
const crypto = require('crypto')
const { pool } = require('../db')
const { generateId } = require('../utils/ids')

const router = express.Router()

const PEPPER = process.env.JWT_SECRET || 'imole-dev-secret'

function hashPin(pin) {
  return crypto.createHash('sha256').update(`${pin}:${PEPPER}`).digest('hex')
}

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

async function generateChildCode() {
  for (;;) {
    let code = 'IMOL-'
    for (let i = 0; i < 4; i++) {
      code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
    }
    const { rows } = await pool.query('SELECT 1 FROM profiles WHERE child_code = $1', [code])
    if (!rows.length) return code
  }
}

router.post('/', async (req, res) => {
  try {
    const { name, age, language = 'en' } = req.body
    if (!name || !age) return res.status(400).json({ error: 'name and age are required' })

    const id = generateId('prof')
    const childCode = await generateChildCode()
    const pin = String(Math.floor(1000 + Math.random() * 9000))
    const createdAt = Date.now()

    await pool.query(
      `INSERT INTO profiles (id, name, age, language, child_code, pin, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, name, Number(age), language, childCode, hashPin(pin), createdAt],
    )

    res.status(201).json({ id, name, age: Number(age), language, childCode, pin, createdAt })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { childCode, pin } = req.body
    if (!childCode || !pin) return res.status(400).json({ error: 'childCode and pin are required' })

    const { rows } = await pool.query(
      'SELECT id, name, age, language, child_code, created_at FROM profiles WHERE child_code = $1 AND pin = $2',
      [childCode.toUpperCase(), hashPin(String(pin))],
    )
    if (!rows.length) return res.status(404).json({ error: 'Profile not found' })

    const p = rows[0]
    res.json({ id: p.id, name: p.name, age: p.age, language: p.language, childCode: p.child_code, createdAt: Number(p.created_at) })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, age, language, child_code, created_at FROM profiles WHERE id = $1',
      [req.params.id],
    )
    if (!rows.length) return res.status(404).json({ error: 'Profile not found' })

    const p = rows[0]
    res.json({ id: p.id, name: p.name, age: p.age, language: p.language, childCode: p.child_code, createdAt: Number(p.created_at) })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, age, language } = req.body
    const { rows } = await pool.query(
      `UPDATE profiles SET
         name = COALESCE($2, name),
         age = COALESCE($3, age),
         language = COALESCE($4, language)
       WHERE id = $1
       RETURNING id, name, age, language, child_code, created_at`,
      [req.params.id, name ?? null, age ? Number(age) : null, language ?? null],
    )
    if (!rows.length) return res.status(404).json({ error: 'Profile not found' })

    const p = rows[0]
    res.json({ id: p.id, name: p.name, age: p.age, language: p.language, childCode: p.child_code, createdAt: Number(p.created_at) })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
