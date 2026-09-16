const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getStore, saveDb, computeSlaDeadline } = require('../db');
const { sortByUrgency } = require('../utils/urgencyScore');

const router = express.Router();

// GET /api/tickets/stats/summary — Dashboard stats
router.get('/stats/summary', (req, res) => {
  try {
    const store = getStore();
    const now = new Date();
    const tickets = store.tickets;

    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length;
    const overdue = tickets.filter(t =>
      new Date(t.sla_deadline) < now && (t.status === 'open' || t.status === 'in-progress')
    ).length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    const closed = tickets.filter(t => t.status === 'closed').length;

    const activeTickets = tickets.filter(t => t.status === 'open' || t.status === 'in-progress');

    const byPriority = {};
    for (const t of activeTickets) {
      byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
    }

    const byStatus = {};
    for (const t of tickets) {
      byStatus[t.status] = (byStatus[t.status] || 0) + 1;
    }

    res.json({ total, open, overdue, resolved, closed, byPriority, byStatus });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/tickets — List tickets with sorting, filtering, search, pagination
router.get('/', (req, res) => {
  try {
    const store = getStore();
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      assigned_to,
      search,
      overdue,
      sort_by
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const now = new Date();

    let filtered = [...store.tickets];

    // Join agent data
    filtered = filtered.map(t => {
      const agent = store.agents.find(a => a.id === t.assigned_to);
      return {
        ...t,
        agent_name: agent ? agent.name : null,
        agent_email: agent ? agent.email : null,
        agent_color: agent ? agent.avatar_color : null
      };
    });

    // Filter by status
    if (status && status !== 'all') {
      if (status === 'active') {
        filtered = filtered.filter(t => t.status === 'open' || t.status === 'in-progress');
      } else {
        filtered = filtered.filter(t => t.status === status);
      }
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      filtered = filtered.filter(t => t.priority === priority);
    }

    // Filter by assigned agent
    if (assigned_to && assigned_to !== 'all') {
      if (assigned_to === 'unassigned') {
        filtered = filtered.filter(t => !t.assigned_to);
      } else {
        filtered = filtered.filter(t => t.assigned_to === assigned_to);
      }
    }

    // Search by customer name or ticket title
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(t =>
        t.customer_name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    }

    // Filter overdue only
    if (overdue === 'true') {
      filtered = filtered.filter(t =>
        new Date(t.sla_deadline) < now && (t.status === 'open' || t.status === 'in-progress')
      );
    }

    const totalCount = filtered.length;

    // Sort
    let sorted;
    if (sort_by === 'created_newest') {
      sorted = filtered.map(t => ({
        ...t,
        urgency_score: 0,
        is_overdue: now > new Date(t.sla_deadline) && t.status !== 'resolved' && t.status !== 'closed'
      })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort_by === 'created_oldest') {
      sorted = filtered.map(t => ({
        ...t,
        urgency_score: 0,
        is_overdue: now > new Date(t.sla_deadline) && t.status !== 'resolved' && t.status !== 'closed'
      })).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else {
      // Default: sort by urgency score (the heart of the system)
      sorted = sortByUrgency(filtered, now);
    }

    // Paginate
    const offset = (pageNum - 1) * limitNum;
    const paginated = sorted.slice(offset, offset + limitNum);

    res.json({
      tickets: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    });
  } catch (err) {
    console.error('List tickets error:', err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET /api/tickets/:id — Get single ticket
router.get('/:id', (req, res) => {
  try {
    const store = getStore();
    const ticket = store.tickets.find(t => t.id === req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const agent = store.agents.find(a => a.id === ticket.assigned_to);
    const now = new Date();
    const is_overdue = now > new Date(ticket.sla_deadline) &&
      ticket.status !== 'resolved' && ticket.status !== 'closed';

    res.json({
      ...ticket,
      agent_name: agent ? agent.name : null,
      agent_email: agent ? agent.email : null,
      agent_color: agent ? agent.avatar_color : null,
      is_overdue
    });
  } catch (err) {
    console.error('Get ticket error:', err);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// POST /api/tickets — Create ticket
router.post('/', (req, res) => {
  try {
    const store = getStore();
    const { title, description, priority, customer_name, customer_email, assigned_to } = req.body;

    if (!title || !priority || !customer_name) {
      return res.status(400).json({ error: 'title, priority, and customer_name are required' });
    }

    const validPriorities = ['critical', 'urgent', 'high', 'normal', 'low'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: `priority must be one of: ${validPriorities.join(', ')}` });
    }

    const now = new Date().toISOString();
    const ticket = {
      id: `TK-${uuidv4().slice(0, 8).toUpperCase()}`,
      title,
      description: description || '',
      priority,
      status: 'open',
      customer_name,
      customer_email: customer_email || '',
      assigned_to: assigned_to || null,
      created_at: now,
      updated_at: now,
      resolved_at: null,
      sla_deadline: computeSlaDeadline(priority, now)
    };

    store.tickets.push(ticket);
    saveDb();

    res.status(201).json(ticket);
  } catch (err) {
    console.error('Create ticket error:', err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// PUT /api/tickets/:id — Update ticket
router.put('/:id', (req, res) => {
  try {
    const store = getStore();
    const idx = store.tickets.findIndex(t => t.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const existing = store.tickets[idx];
    const { title, description, priority, status, assigned_to, customer_name, customer_email } = req.body;
    const now = new Date().toISOString();

    // If priority changes, recompute SLA deadline
    let sla_deadline = existing.sla_deadline;
    if (priority && priority !== existing.priority) {
      sla_deadline = computeSlaDeadline(priority, existing.created_at);
    }

    // Track resolution time
    let resolved_at = existing.resolved_at;
    if (status === 'resolved' && existing.status !== 'resolved') {
      resolved_at = now;
    } else if (status && status !== 'resolved') {
      resolved_at = null;
    }

    const updated = {
      ...existing,
      title: title ?? existing.title,
      description: description ?? existing.description,
      priority: priority ?? existing.priority,
      status: status ?? existing.status,
      assigned_to: assigned_to === '' ? null : (assigned_to ?? existing.assigned_to),
      customer_name: customer_name ?? existing.customer_name,
      customer_email: customer_email ?? existing.customer_email,
      updated_at: now,
      resolved_at,
      sla_deadline
    };

    store.tickets[idx] = updated;
    saveDb();

    const agent = store.agents.find(a => a.id === updated.assigned_to);
    res.json({
      ...updated,
      agent_name: agent ? agent.name : null,
      agent_email: agent ? agent.email : null,
      agent_color: agent ? agent.avatar_color : null
    });
  } catch (err) {
    console.error('Update ticket error:', err);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// DELETE /api/tickets/:id — Delete ticket
router.delete('/:id', (req, res) => {
  try {
    const store = getStore();
    const idx = store.tickets.findIndex(t => t.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    store.tickets.splice(idx, 1);
    saveDb();

    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    console.error('Delete ticket error:', err);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

module.exports = router;
