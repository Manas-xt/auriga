const express = require('express');
const cors = require('cors');
const path = require('path');
const { loadDb } = require('./db');
const { seed } = require('./seed');
const ticketRoutes = require('./routes/tickets');
const agentRoutes = require('./routes/agents');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
  });
  next();
});

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/agents', agentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize DB and seed
loadDb();
seed();

app.listen(PORT, () => {
  console.log(`\n🎫 Helpdesk API running at http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   GET    /api/tickets          — List tickets (sorted by urgency)`);
  console.log(`   GET    /api/tickets/:id       — Get ticket`);
  console.log(`   POST   /api/tickets           — Create ticket`);
  console.log(`   PUT    /api/tickets/:id        — Update ticket`);
  console.log(`   DELETE /api/tickets/:id        — Delete ticket`);
  console.log(`   GET    /api/tickets/stats/summary — Dashboard stats`);
  console.log(`   GET    /api/agents             — List agents`);
  console.log(`   POST   /api/agents             — Create agent\n`);
});
