const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'imole-dev-secret'

function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

function verify(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}

function bearer(req) {
  const header = req.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : null
}

function requireParent(req, res, next) {
  const payload = verify(bearer(req))
  if (!payload || payload.role !== 'parent') {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  req.userId = payload.id
  next()
}

function requireTeacher(req, res, next) {
  const payload = verify(bearer(req))
  if (!payload || payload.role !== 'teacher') {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  req.userId = payload.id
  next()
}

module.exports = { sign, verify, bearer, requireParent, requireTeacher }
