# Business Management Suite

All-in-one business management suite with CRM, contract generation, bookkeeping, and analytics.

## Overview

This is a test application skeleton that provides a minimal end-to-end slice demonstrating:
- Backend API (Node.js + Express + SQLite)
- Simple frontend interface for testing
- Foundation for future modules: CRM, Contracts, Bookkeeping, and Marketing Analytics

## Prerequisites

- **Node.js** version 14.x or higher
- **npm** (comes with Node.js)

## Project Structure

```
Business-Management-Suite/
├── package.json              # Project dependencies and scripts
├── server/                   # Backend API
│   ├── server.js            # Express application entry point
│   └── db/                  # Database files
│       ├── schema.sql       # Database schema definition
│       ├── init.js          # Database initialization script
│       └── business.db      # SQLite database (created after init)
├── client/                   # Frontend application
│   ├── index.html           # Test UI
│   ├── main.js              # Client-side JavaScript
│   └── styles.css           # Styling
└── README.md                # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Database

```bash
npm run db:init
```

This creates the SQLite database and sets up the initial schema with a `ping_log` table for testing.

### 3. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### 4. Open the Test Application

Open `client/index.html` in your web browser. You can do this by:
- Directly opening the file: `file:///path/to/Business-Management-Suite/client/index.html`
- Or use a local web server if you prefer

## Available Endpoints

### Health Check
- **GET** `/health`
  - Returns system health status and current timestamp
  - Response: `{ status: 'ok', timestamp: '2026-01-30T08:10:35.146Z' }`

### Ping Test
- **GET** `/ping`
  - Returns ping statistics (total count and last ping details)
  - Response: `{ count: 5, lastPing: { id: 5, timestamp: '2026-01-30 08:10:35' } }`

- **POST** `/ping`
  - Creates a new ping entry in the database
  - Response: `{ id: 6, timestamp: '2026-01-30 08:10:40' }`

## Features

### Current (v0.1.0)
- ✅ Express REST API server
- ✅ SQLite database integration
- ✅ Health check endpoint
- ✅ Test ping functionality with database persistence
- ✅ Simple web interface for testing

### Planned (Future Versions)
- 🔲 CRM - Client management
- 🔲 Contracts - PDF generation engine
- 🔲 Bookkeeping - Transaction tracking and financial summaries
- 🔲 Marketing & Investor Analytics - Dashboard and reports

## Development

The test application demonstrates a minimal but complete full-stack setup. All code is well-commented and designed to be extended with additional business logic modules.

### Scripts

- `npm run dev` - Start the development server
- `npm run db:init` - Initialize/reset the database

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: SQLite3
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **CORS**: Enabled for local development

## License

ISC
