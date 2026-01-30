/**
 * Business Management Suite - Test Application Server
 * Minimal Express server with SQLite backend
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const dbPath = path.join(__dirname, 'db', 'business.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins for development (including file:// protocol)
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
  // Get total count
  db.get('SELECT COUNT(*) as count FROM ping_log', (err, countRow) => {
    if (err) {
      console.error('Error getting ping count:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    // Get last ping time
    db.get('SELECT id, created_at FROM ping_log ORDER BY id DESC LIMIT 1', (err, lastRow) => {
      if (err) {
        console.error('Error getting last ping:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({
        count: countRow.count,
        lastPing: lastRow ? {
          id: lastRow.id,
          timestamp: lastRow.created_at
        } : null
      });
    });
  });
});

// POST /ping - Create a new ping entry
app.post('/ping', (req, res) => {
  db.run('INSERT INTO ping_log (created_at) VALUES (CURRENT_TIMESTAMP)', function(err) {
    if (err) {
      console.error('Error inserting ping:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    // Get the inserted row
    db.get('SELECT id, created_at FROM ping_log WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        console.error('Error retrieving inserted ping:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({
        id: row.id,
        timestamp: row.created_at
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Business Management Suite server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /health - Health check');
  console.log('  GET  /ping   - Get ping statistics');
  console.log('  POST /ping   - Create new ping entry');
});

// Graceful shutdown
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
