/**
 * Database Initialization Script
 * Runs schema.sql to set up the SQLite database
 */

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'business.db');
const schemaPath = path.join(__dirname, 'schema.sql');

console.log('Initializing database...');

// Read the schema file
const schema = fs.readFileSync(schemaPath, 'utf8');

// Open database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database:', dbPath);
});

// Execute the schema
db.exec(schema, (err) => {
  if (err) {
    console.error('Error executing schema:', err.message);
    db.close();
    process.exit(1);
  }
  
  console.log('Database schema created successfully!');
  
  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
      process.exit(1);
    }
    console.log('Database initialization complete.');
    process.exit(0);
  });
});
