# ⚡ Auriga — IT Helpdesk Priority Queue System

> *"Some tickets are 'my laptop won't boot before a client demo' emergencies; others are 'can I get a bigger monitor'. Priya wants to always pick the most pressing ticket next, with anything past its promised time jumping to the front."*

Auriga is an IT Helpdesk priority queue application built with **React 18**, **Tailwind CSS**, **Lucide React**, and **Node.js / Express**. Its server-side queue comparator and SLA escalation worker keep the right ticket on top for helpdesk operators.

---

## 🌟 Key Features

1. **Dynamic Priority Queue (The Heart)**
   - Computes a display-only **Urgency Score** from priority, overdue time, and SLA progress.
   - **Deterministic queue order**: active tickets first, then overdue active tickets, then priority, nearest SLA deadline, creation time, and ticket ID.
   - Any overdue active ticket therefore appears before every active ticket still within SLA. Sorting happens before pagination.
   - An automatic one-minute check escalates overdue tickets one level per run: `low` → `normal` → `high` → `urgent`.

2. **SLA Response Windows**
   - ⚡ **Critical**: 1 Hour Response (Demo-blockers, outage)
   - 🔥 **Urgent**: 2 Hours Response (Client presentation prep)
   - 🟠 **High**: 4 Hours Response
   - 🔵 **Normal**: 1 Day Response
   - ⚪ **Low**: 1 Day Response

3. **Helpdesk Operator Views & Quick Filters**
   - **"What's Overdue?"**: One-click quick preset filter highlighting late tickets with countdown timers.
   - **"Assigned to Me"**: Sidebar view and quick toggle for Priya or team members to see their assigned queue.
   - **Customer Search**: Debounced search by customer name, ticket ID, or issue summary, with URL-synced filters.
   - **Paginated Queue**: Configurable page sizes (10 / 20 / 50 / 100) with server-side sorting and pagination.

4. **Helpdesk Management & Workload**
   - **Slide-out Ticket Drawer**: Detailed ticket view with status transition workflow (`Open` → `In Progress` → `Resolved` → `Closed`), quick reassignment, and inline editing.
   - **Helpdesk Dashboard**: High-level KPI metrics, active priority distribution bars, and SLA compliance gauges.
   - **Multi-Agent Team Switching**: Instant perspective switching between Priya and team members.

---

## 🏗️ Architecture & Project Structure

```
auriga/
├── server/
│   ├── index.js              # Express API server entry point
│   ├── db.js                 # JSON file-backed database engine with SLA deadline math
│   ├── seed.js               # Seed script with 30 realistic helpdesk scenarios
│   ├── utils/
│   │   ├── urgencyScore.js        # Pure queue comparator and display score
│   │   ├── urgencyScore.test.js   # Queue ordering tests
│   │   ├── escalateOverdue.js     # Pure SLA escalation worker
│   │   └── escalateOverdue.test.js
│   └── routes/
│       ├── tickets.js        # Ticket CRUD & sorting/filter API endpoints
│       └── agents.js         # Agent CRUD API endpoints
├── client/
│   ├── src/
│   │   ├── App.jsx           # Main application layout & state coordinator
│   │   ├── api.js            # Centralized API fetch helpers
│   │   ├── index.css         # Modern design system (Dark/Light themes)
│   │   └── components/
│   │       ├── TicketQueue.jsx        # Ranked grouped queue view
│   │       ├── FilterBar.jsx          # Search, filters & preset pills
│   │       ├── TicketDetail.jsx       # Slide-out detail & edit drawer
│   │       ├── CreateTicketModal.jsx  # New ticket creation modal
│   │       ├── Dashboard.jsx          # KPI metrics & queue analytics
│   │       ├── AgentsList.jsx         # Team management & active user switch
│   │       ├── EscalationStrip.jsx    # Last run status and manual escalation action
│   │       ├── EscalationLog.jsx      # Escalation audit history
│   │       ├── Pagination.jsx         # Page navigation control
│   │       └── Badge.jsx              # Status, priority & overdue badges
│   ├── vite.config.js        # Vite config with API proxy
│   └── package.json
├── REASONING.md              # Technical rationale & priority algorithm breakdown
└── README.md                 # System overview & setup instructions
```

The frontend uses the server as the source of truth. It refreshes tickets, statistics, and escalation history every 60 seconds so automatic priority changes become visible without a manual refresh.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Start the Backend Server
```bash
cd server
npm install
npm start
```
*The API server will run at `http://localhost:3001` and populate seed data automatically.*

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 🧪 Running Verifications & Tests

To test the backend DB seeding and urgency sorting algorithm independently:
```bash
cd server
node -e "const { loadDb } = require('./db'); const { seed } = require('./seed'); loadDb(); seed();"
```

To build the client bundle:
```bash
cd client
npm run build
```

To run the queue ordering tests:
```bash
cd server
npm test
```

The server runs the overdue escalation check once at startup and every 60 seconds thereafter. The client also refreshes the queue, statistics, and escalation log every 60 seconds. Each run changes an active overdue ticket by at most one level through `low` → `normal` → `high` → `urgent`, persists an audit record, and never escalates beyond `urgent`.

## 📦 Push Checklist

Before pushing to GitHub:

1. Run `npm --prefix server test`.
2. Run `npm --prefix client run build`.
3. Confirm `.env` files and `node_modules` are ignored.
4. Review generated `server/data.json` changes before committing seed/runtime data.
5. Keep `AI_LOGS.md` as the unmodified conversation export required by the assignment.
