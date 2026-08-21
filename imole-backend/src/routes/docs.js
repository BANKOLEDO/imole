const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.type('text/markdown').send(`# Imole API

## Core endpoints

- GET /health
- POST /profile
- POST /profile/verify
- GET /challenge/daily?profileId&lang
- POST /challenge/:id/submit
- POST /ask
- POST /audio/tts
- GET /memory/:profileId
- GET /leaderboard

## Parent endpoints

- POST /auth/parent/register
- POST /auth/parent/login
- GET /parent/children
- POST /parent/link
- GET /parent/dashboard/:childId

AI keys are server-side only. Child chat has prompt-injection filtering and a local mock fallback.
`)
})

module.exports = router