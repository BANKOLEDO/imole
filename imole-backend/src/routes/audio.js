const express = require('express')

const router = express.Router()

const YARNGPT_LANGS = ['en', 'yo', 'ig', 'ha']

async function yarnGpt(text, lang) {
  const res = await fetch('https://api.yarngpt.co/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.YARNGPT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      language: lang,
      voice: 'habiba',
    }),
    signal: AbortSignal.timeout(30000),
  })
  if (!res.ok) throw new Error(`YarnGPT ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function metaMms(text, lang) {
  const mmsLang = { en: 'eng', yo: 'yor', ha: 'hau', ig: 'ibo', fr: 'fra', pcm: 'eng' }[lang] || 'eng'
  const res = await fetch(
    `https://api-inference.huggingface.co/models/facebook/mms-tts-${mmsLang}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
      signal: AbortSignal.timeout(30000),
    },
  )
  if (!res.ok) throw new Error(`MMS ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

router.post('/tts', async (req, res) => {
  try {
    const { text, lang = 'en' } = req.body
    if (!text) return res.status(400).json({ error: 'text is required' })

    const provider = process.env.TTS_PROVIDER || 'auto'

    if ((provider === 'auto' || provider === 'yarngpt2') && YARNGPT_LANGS.includes(lang) && process.env.YARNGPT_API_KEY) {
      try {
        const audio = await yarnGpt(text, lang)
        res.set('Content-Type', 'audio/mpeg')
        return res.send(audio)
      } catch (err) {
        console.log(`[tts] yarngpt failed: ${err.message} — trying mms.`)
      }
    }

    if ((provider === 'auto' || provider === 'mms') && process.env.HUGGINGFACE_API_KEY) {
      try {
        const audio = await metaMms(text, lang)
        res.set('Content-Type', 'audio/mpeg')
        return res.send(audio)
      } catch (err) {
        console.log(`[tts] mms failed: ${err.message}.`)
      }
    }

    res.status(503).json({ error: 'No TTS provider available' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
