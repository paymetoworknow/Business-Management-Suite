-- Business Management Suite Database Schema
-- Initial test application table

CREATE TABLE IF NOT EXISTS ping_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
