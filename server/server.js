/**
 * Business Management Suite - Test Application Server
 * Minimal Express server with SQLite backend
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DEFAULT_PORT = 3000;

/**
 * Resolve and validate the port from the environment.
 * Falls back to the provided default port if the value is missing or invalid.
 *
 * @param {string|undefined} rawPort - The PORT environment variable value.
 * @param {number} defaultPort - The default port to use when validation fails.
 * @returns {number} - A valid port number.
 */
function resolvePort(rawPort, defaultPort) {
  if (!rawPort) {
    return defaultPort;
  }

  const parsedPort = Number.parseInt(rawPort, 10);

  if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
    console.warn(
      `Invalid PORT environment variable "${rawPort}". Falling back to default port ${defaultPort}.`
    );
    return defaultPort;
  }

  return parsedPort;
}

/**
 * Resolve database path for different runtimes.
 * Vercel serverless runtime requires writing to /tmp.
 *
 * @returns {string} SQLite database file path.
 */
function resolveDatabasePath() {
  if (process.env.VERCEL) {
    return path.join('/tmp', 'business.db');
  }

  return path.join(__dirname, 'db', 'business.db');
}

/**
 * Ensure the required database schema exists.
 * This creates the ping_log table if it does not already exist.
 *
 * @param {sqlite3.Database} db - SQLite database connection.
 */
function ensureDatabaseSchema(db) {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ping_log (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         created_at TEXT DEFAULT (datetime('now'))
       )`,
      (schemaErr) => {
        if (schemaErr) {
          console.error('Error ensuring database schema:', schemaErr.message);
          console.error(schemaErr.stack);
        }
      }
    );
  });
}

/**
 * Create and configure the Express app.
 *
 * @returns {{ app: import('express').Express, db: sqlite3.Database }}
 */
function createApp() {
  const app = express();
  const dbPath = resolveDatabasePath();

  // Ensure parent directory exists when running locally.
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
      return;
    }
    console.log(`Connected to SQLite database at ${dbPath}`);
    ensureDatabaseSchema(db);
  });

  // Middleware
  app.use(express.json());
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));

  // Serve static files from client directory
  app.use(express.static(path.join(__dirname, '..', 'client')));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // GET /ping - Get ping statistics
  app.get('/ping', (req, res) => {
    db.get('SELECT COUNT(*) as count FROM ping_log', (err, countRow) => {
      if (err) {
        console.error('Error getting ping count:', err.message);
        console.error(err.stack);
        return res.status(500).json({ error: 'Database error' });
      }

      db.get('SELECT id, created_at FROM ping_log ORDER BY id DESC LIMIT 1', (lastErr, lastRow) => {
        if (lastErr) {
          console.error('Error getting last ping:', lastErr.message);
          console.error(lastErr.stack);
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({
          count: countRow.count,
          lastPing: lastRow
            ? {
              id: lastRow.id,
              timestamp: lastRow.created_at
            }
            : null
        });
      });
    });
  });

  // POST /ping - Create a new ping entry
  app.post('/ping', (req, res) => {
    db.run('INSERT INTO ping_log (created_at) VALUES (CURRENT_TIMESTAMP)', function onInsert(err) {
      if (err) {
        console.error('Error inserting ping:', err.message);
        console.error(err.stack);
        return res.status(500).json({ error: 'Database error' });
      }

      db.get('SELECT id, created_at FROM ping_log WHERE id = ?', [this.lastID], (getErr, row) => {
        if (getErr) {
          console.error('Error retrieving inserted ping:', getErr.message);
          console.error(getErr.stack);
          return res.status(500).json({ error: 'Database error' });
        }

        return res.json({
          id: row.id,
          timestamp: row.created_at
        });
      });
    });
  });

  return { app, db };
}

const { app, db } = createApp();

if (require.main === module) {
  const PORT = resolvePort(process.env.PORT, DEFAULT_PORT);

  app.listen(PORT, () => {
    console.log(`Business Management Suite server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /health - Health check');
    console.log('  GET  /ping   - Get ping statistics');
    console.log('  POST /ping   - Create new ping entry');
  });

  // Graceful shutdown for local development.
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      }
      console.log('Database connection closed');
      process.exit(0);
    });
  });
}

module.exports = app;
