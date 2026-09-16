const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getStore, saveDb } = require('../db');

const router = express.Router();

// GET /api/agents — List all agents
router.get('/', (req, res) => {
  try {
    const store = getStore();
    const agents = [...store.agents].sort((a, b) => a.name.localeCompare(b.name));
    res.json(agents);
  } catch (err) {
    console.error('List agents error:', err);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// POST /api/agents — Create agent
router.post('/', (req, res) => {
  try {
    const store = getStore();
    const { name, email, avatar_color } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }

    // Check unique email
    if (store.agents.find(a => a.email === email)) {
      return res.status(409).json({ error: 'Agent with this email already exists' });
    }

    const colors = ['#5E6AD2', '#E5484D', '#30A46C', '#E38A27', '#6E56CF', '#0090FF', '#F76B15', '#00A2C7'];
    const agent = {
      id: uuidv4(),
      name,
      email,
      avatar_color: avatar_color || colors[Math.floor(Math.random() * colors.length)],
      created_at: new Date().toISOString()
    };

    store.agents.push(agent);
    saveDb();

    res.status(201).json(agent);
  } catch (err) {
    console.error('Create agent error:', err);
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

// DELETE /api/agents/:id — Delete agent
router.delete('/:id', (req, res) => {
  try {
    const store = getStore();
    const idx = store.agents.findIndex(a => a.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Unassign tickets from this agent
    for (const t of store.tickets) {
      if (t.assigned_to === req.params.id) {
        t.assigned_to = null;
      }
    }

    store.agents.splice(idx, 1);
    saveDb();

    res.json({ message: 'Agent deleted' });
  } catch (err) {
    console.error('Delete agent error:', err);
    res.status(500).json({ error: 'Failed to delete agent' });
  }
});

module.exports = router;
