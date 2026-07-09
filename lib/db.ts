import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

/**
 * SQLite order database at data/keri.db (gitignored — customer PII).
 * WAL mode + synchronous better-sqlite3 keeps concurrent order writes
 * safe without a server. Swap for Postgres later by reimplementing
 * insertOrder/nextOrderNumber — the rest of the app never touches SQL.
 */
const DATA_DIR = path.join(process.cwd(), "data");

// Survive dev HMR: keep one connection on globalThis.
const globalForDb = globalThis as unknown as { __kiwDb?: Database.Database };

function open(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(path.join(DATA_DIR, "keri.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id                       TEXT PRIMARY KEY,
      order_number             TEXT NOT NULL UNIQUE,
      type                     TEXT NOT NULL,
      status                   TEXT NOT NULL,
      created_at               TEXT NOT NULL,
      name                     TEXT NOT NULL,
      phone                    TEXT NOT NULL,
      email                    TEXT NOT NULL DEFAULT '',
      address                  TEXT NOT NULL DEFAULT '',
      city                     TEXT NOT NULL DEFAULT '',
      postal_code              TEXT NOT NULL DEFAULT '',
      notes                    TEXT NOT NULL DEFAULT '',
      items_json               TEXT NOT NULL,
      subtotal_cad             REAL NOT NULL,
      delivery_cad             REAL NOT NULL DEFAULT 0,
      total_cad                REAL NOT NULL,
      terms_accepted_at        TEXT NOT NULL,
      marketing_opt_in         INTEGER NOT NULL DEFAULT 0,
      marketing_opt_in_at      TEXT,
      payment_method           TEXT NOT NULL DEFAULT 'pay_on_confirmation',
      payment_status           TEXT NOT NULL DEFAULT 'pending',
      stripe_payment_intent_id TEXT,
      source                   TEXT NOT NULL DEFAULT 'website'
    );
    CREATE INDEX IF NOT EXISTS idx_orders_type ON orders(type);
    CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
  `);
  return db;
}

export const db = globalForDb.__kiwDb ?? (globalForDb.__kiwDb = open());
