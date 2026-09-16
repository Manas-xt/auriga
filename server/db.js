const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.json');

// In-memory store, persisted to JSON file
let store = {
  agents: [],
  tickets: [],
  escalation_log: [],
  escalation_last_run_at: null
};

// SLA response times in minutes
const SLA_MINUTES = {
  critical: 60,       // 1 hour
  urgent: 120,        // 2 hours
  high: 240,          // 4 hours
  normal: 1440,       // 1 day
  low: 1440           // 24 hours (3 business days)
};

function computeSlaDeadline(priority, createdAt) {
  const slaMinutes = SLA_MINUTES[priority] || SLA_MINUTES.normal;
  const created = new Date(createdAt);
  const deadline = new Date(created.getTime() + slaMinutes * 60 * 1000);
  return deadline.toISOString();
}

function loadDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      store = JSON.parse(raw);
      console.log(`Loaded ${store.tickets.length} tickets, ${store.agents.length} agents from disk.`);
    }
  } catch (err) {
    console.error('Failed to load DB, starting fresh:', err.message);
    store = { agents: [], tickets: [], escalation_log: [], escalation_last_run_at: null };
  }
}

function saveDb() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save DB:', err.message);
  }
}

function getStore() {
  return store;
}

// Initialize on module load
loadDb();

module.exports = { getStore, saveDb, loadDb, SLA_MINUTES, computeSlaDeadline };
