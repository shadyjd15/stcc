import crypto from 'crypto'
import type { Payload } from 'payload'
import type { Pool } from 'pg'

/**
 * Analytics events live in their own lean table (not a Payload collection) so a page view
 * costs one INSERT, and reports are plain SQL aggregates over an indexed table.
 * They sit in a separate `analytics` Postgres schema so Payload's schema sync and migrations
 * (which manage `public`) never touch them.
 */
let ready: Promise<void> | null = null

export const getPool = (payload: Payload): Pool => (payload.db as unknown as { pool: Pool }).pool

export function ensureAnalyticsSchema(payload: Payload): Promise<void> {
  if (ready) return ready
  ready = (async () => {
    const pool = getPool(payload)
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS analytics;
      CREATE TABLE IF NOT EXISTS analytics.events (
        id            BIGSERIAL PRIMARY KEY,
        ts            TIMESTAMPTZ NOT NULL DEFAULT now(),
        type          TEXT NOT NULL,
        name          TEXT,
        path          TEXT NOT NULL,
        title         TEXT,
        locale        TEXT,
        referrer      TEXT,
        referrer_host TEXT,
        utm_source    TEXT,
        utm_medium    TEXT,
        utm_campaign  TEXT,
        country       TEXT,
        city          TEXT,
        device        TEXT,
        browser       TEXT,
        os            TEXT,
        screen_w      INT,
        lang          TEXT,
        visitor_id    TEXT NOT NULL,
        session_id    TEXT NOT NULL,
        is_entry      BOOLEAN NOT NULL DEFAULT false,
        duration_ms   INT,
        scroll_pct    INT,
        status        INT,
        props         JSONB
      );
      CREATE INDEX IF NOT EXISTS events_ts_idx ON analytics.events (ts);
      CREATE INDEX IF NOT EXISTS events_type_ts_idx ON analytics.events (type, ts);
      CREATE INDEX IF NOT EXISTS events_visitor_ts_idx ON analytics.events (visitor_id, ts DESC);
      CREATE INDEX IF NOT EXISTS events_session_idx ON analytics.events (session_id);
      CREATE INDEX IF NOT EXISTS events_path_idx ON analytics.events (path);
      CREATE TABLE IF NOT EXISTS analytics.salts (
        day  DATE PRIMARY KEY,
        salt TEXT NOT NULL
      );
    `)
  })().catch((err) => {
    ready = null
    throw err
  })
  return ready
}

let saltCache: { day: string; salt: string } | null = null

/** A random salt per UTC day: visitor ids cannot be linked across days (Plausible-style). */
export async function dailySalt(payload: Payload): Promise<string> {
  const day = new Date().toISOString().slice(0, 10)
  if (saltCache?.day === day) return saltCache.salt
  const pool = getPool(payload)
  const fresh = crypto.randomBytes(16).toString('hex')
  const { rows } = await pool.query(
    `INSERT INTO analytics.salts (day, salt) VALUES ($1, $2)
     ON CONFLICT (day) DO UPDATE SET day = EXCLUDED.day RETURNING salt`,
    [day, fresh],
  )
  await pool.query(`DELETE FROM analytics.salts WHERE day < (now() - interval '3 days')`)
  saltCache = { day, salt: rows[0].salt }
  return saltCache.salt
}

export const visitorHash = (salt: string, ip: string, ua: string, host: string) =>
  crypto.createHash('sha256').update(`${salt}|${ip}|${ua}|${host}`).digest('base64url').slice(0, 22)
