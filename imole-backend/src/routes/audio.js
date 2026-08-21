const express = require('express')
const crypto = require('crypto')

const router = express.Router()

const YARNGPT_LANGS = ['en', 'yo', 'ig', 'ha']

// In-memory cache: identical (text, lang) pairs are served instantly on repeat.
const ttsCache = new Map()
const CACHE_MAX = 200
function cacheGet(key) {
  const hit = ttsCache.get(key)
  if (!hit) return null
  ttsCache.delete(key)
  ttsCache.set(key, hit) // LRU refresh
  return hit
}
function cacheSet(key, buf) {
  if (ttsCache.size >= CACHE_MAX) {
    ttsCache.delete(ttsCache.keys().next().value)
  }
  ttsCache.set(key, buf)
}

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
    signal: AbortSignal.timeout(15000),
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
      signal: AbortSignal.timeout(20000),
    },
  )
  if (!res.ok) throw new Error(`MMS ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

router.post('/tts', async (req, res) => {
  try {
    const { text, lang = 'en' } = req.body
    if (!text || typeof text !== 'string' || text.length > 500) {
      return res.status(400).json({ error: 'text is required (max 500 chars)' })
    }

    const key = crypto.createHash('sha1').update(`${lang}:${text}`).digest('hex')
    const cached = cacheGet(key)
    if (cached) {
      res.set('Content-Type', 'audio/mpeg')
      res.set('X-Cache', 'hit')
      return res.send(cached)
    }

    const provider = process.env.TTS_PROVIDER || 'auto'

    if ((provider === 'auto' || provider === 'yarngpt2') && YARNGPT_LANGS.includes(lang) && process.env.YARNGPT_API_KEY) {
      try {
        const audio = await yarnGpt(text, lang)
        cacheSet(key, audio)
        res.set('Content-Type', 'audio/mpeg')
        res.set('X-Cache', 'miss')
        return res.send(audio)
      } catch (err) {
        console.log(`[tts] yarngpt failed — trying mms.`)
      }
    }

    if ((provider === 'auto' || provider === 'mms') && process.env.HUGGINGFACE_API_KEY) {
      try {
        const audio = await metaMms(text, lang)
        cacheSet(key, audio)
        res.set('Content-Type', 'audio/mpeg')
        res.set('X-Cache', 'miss')
        return res.send(audio)
      } catch (err) {
        console.log('[tts] mms failed.')
      }
    }

    // Graceful fallback so the demo never stalls: client falls back to Web Speech API.
    res.status(503).json({ error: 'No TTS provider available', fallback: 'web-speech' })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
