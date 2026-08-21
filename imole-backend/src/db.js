const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function initSchema() {
  await pool.query(`CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    language TEXT DEFAULT 'en',
    child_code TEXT UNIQUE,
    pin TEXT,
    created_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS challenges (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL,
    skill TEXT NOT NULL,
    title TEXT,
    description TEXT,
    question TEXT,
    difficulty INT DEFAULT 1,
    resource JSONB,
    created_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS responses (
    id TEXT PRIMARY KEY,
    challenge_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    score INT,
    feedback TEXT,
    selected_answer TEXT,
    correct BOOLEAN,
    completed_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS chat_sessions (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL,
    title TEXT,
    created_at BIGINT,
    updated_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS parents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS parent_links (
    parent_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    PRIMARY KEY (parent_id, profile_id)
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    school TEXT,
    invite_code TEXT,
    created_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS classes (
    id TEXT PRIMARY KEY,
    teacher_id TEXT NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    created_at BIGINT
  )`)
  await pool.query(`CREATE TABLE IF NOT EXISTS class_members (
    class_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    PRIMARY KEY (class_id, profile_id)
  )`)
}

module.exports = { pool, initSchema }
