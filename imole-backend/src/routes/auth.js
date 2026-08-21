const express = require('express')
const crypto = require('crypto')
const { pool } = require('../db')
const { generateId } = require('../utils/ids')
const { sign, verify, bearer } = require('../utils/auth')

const router = express.Router()

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

function checkPassword(password, stored) {
  const [salt, hash] = stored.split(':')
  return crypto.scryptSync(password, salt, 64).toString('hex') === hash
}

async function register(req, res, table, extra = {}) {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' })
  }
  try {
    const id = generateId(table === 'parents' ? 'par' : 'tea')
    await pool.query(
      `INSERT INTO ${table} (id, name, email, password_hash${extra.columns ? ', ' + extra.columns : ''}, created_at)
       VALUES ($1, $2, $3, $4${extra.placeholders || ''}, $5)`,
      [id, name, email.toLowerCase(), hashPassword(password), ...(extra.values || []), Date.now()],
    )
    res.status(201).json({ token: sign({ id, role: extra.role }) })
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already registered' })
    res.status(500).json({ error: err.message })
  }
}

async function login(req, res, table, role) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' })
  try {
    const { rows } = await pool.query(
      `SELECT id, password_hash FROM ${table} WHERE email = $1`,
      [email.toLowerCase()],
    )
    if (!rows.length || !checkPassword(password, rows[0].password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    res.json({ token: sign({ id: rows[0].id, role }) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

router.post('/parent/register', (req, res) => register(req, res, 'parents', { role: 'parent' }))
router.post('/parent/login', (req, res) => login(req, res, 'parents', 'parent'))

router.post('/teacher/register', (req, res) =>
  register(req, res, 'teachers', {
    role: 'teacher',
    columns: 'school, invite_code',
    placeholders: ', $6, $7',
    values: [req.body.school ?? null, `TIT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`],
  }),
)
router.post('/teacher/login', (req, res) => login(req, res, 'teachers', 'teacher'))

router.get('/teacher/verify', (req, res) => {
  const payload = verify(bearer(req))
  if (!payload || payload.role !== 'teacher') return res.status(401).json({ error: 'Unauthorized' })
  res.json({ ok: true, id: payload.id })
})

module.exports = router
