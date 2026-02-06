import { createClient, type Client } from '@libsql/client'

let client: Client | null = null

export function getDb(): Client {
  if (client) return client

  const url = import.meta.env.TURSO_DATABASE_URL
  const authToken = import.meta.env.TURSO_AUTH_TOKEN

  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set')
  }

  client = createClient({
    url,
    authToken,
  })

  return client
}

export async function initDb(): Promise<void> {
  const db = getDb()

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS codex_items (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      content_override TEXT,
      enabled INTEGER DEFAULT 1,
      usage_count INTEGER DEFAULT 0,
      last_used TEXT,
      last_edited TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS deployments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT NOT NULL,
      repo TEXT NOT NULL,
      deployed_at TEXT DEFAULT (datetime('now')),
      deployed_by TEXT DEFAULT 'admin',
      status TEXT DEFAULT 'success'
    );

    CREATE TABLE IF NOT EXISTS workflows (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      nodes TEXT NOT NULL,
      edges TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS app_connections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      app_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      connected_at TEXT DEFAULT (datetime('now'))
    );
  `)
}
