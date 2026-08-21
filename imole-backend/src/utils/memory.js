const { pool } = require('../db')

async function ensureMemory(profileId) {
  await pool.query(
    `INSERT INTO profile_memory (profile_id) VALUES ($1) ON CONFLICT DO NOTHING`,
    [profileId],
  )
}

async function getMemory(profileId) {
  await ensureMemory(profileId)
  const { rows } = await pool.query(
    `SELECT profile_id, streak_current, streak_longest, streak_last_active, freezes, skill_scores
     FROM profile_memory WHERE profile_id = $1`,
    [profileId],
  )
  const row = rows[0]
  return {
    profileId: row.profile_id,
    streak: {
      current: row.streak_current,
      longest: row.streak_longest,
      lastActive: row.streak_last_active,
    },
    freezes: row.freezes,
    skillScores: row.skill_scores || {},
  }
}

function dayKey(ts) {
  return Math.floor(ts / 86400000)
}

async function applyResult(profileId, skill, correct) {
  const memory = await getMemory(profileId)
  const today = dayKey(Date.now())
  const last = memory.streak.lastActive ? dayKey(Number(memory.streak.lastActive)) : null

  let current = memory.streak.current
  let longest = memory.streak.longest
  let freezes = memory.freezes

  if (correct) {
    if (last === today - 1) current += 1
    else if (last !== today) current = 1
    if (current % 7 === 0 && freezes < 3) freezes += 1
    longest = Math.max(longest, current)
  } else if (current > 0) {
    if (freezes > 0) freezes -= 1
    else current = 0
  }

  const scores = memory.skillScores
  scores[skill] = [...(scores[skill] || []), correct ? 10 : 0].slice(-20)

  await pool.query(
    `UPDATE profile_memory
     SET streak_current = $2, streak_longest = $3, streak_last_active = $4, freezes = $5, skill_scores = $6
     WHERE profile_id = $1`,
    [profileId, current, longest, Date.now(), freezes, JSON.stringify(scores)],
  )

  return { current, longest, freezes }
}

module.exports = { getMemory, applyResult }
