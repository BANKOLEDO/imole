const express = require('express')
const mockAi = require('../utils/mockAi')

const router = express.Router()

router.post('/recommend', (req, res) => {
  const { skill, language = 'en' } = req.body
  if (!skill || !mockAi.SKILLS.includes(skill)) {
    return res.status(400).json({ error: 'a valid skill is required' })
  }

  const resources = []
  for (let i = 0; i < 2; i += 1) {
    const resource = mockAi.resourceFor(skill, language)
    if (resource && !resources.some((item) => item.url === resource.url)) resources.push(resource)
  }
  res.json(resources)
})

module.exports = router