# 🧠 Auriga Technical Reasoning & Priority Queue Algorithm

## Problem Statement Analysis

Priya runs a two-person IT helpdesk with a constant influx of tickets ranging from minor requests (*"can I get a bigger monitor"*) to high-stakes emergencies (*"my laptop won't boot before a client demo"*). 

Priya needed:
1. **The right ticket on top at all times**: Automatically ordering tickets by urgency.
2. **Overdue priority escalation**: Anything past its SLA response time must immediately jump to the front of the queue.
3. **Instant answers to frequent queries**: "What's overdue?", "What's assigned to me?", and searching for customer tickets by name.
4. **Pagination**: Handling large ticket volumes cleanly.

---

## 🧮 The Urgency Score and Queue Comparator

At the core of Auriga, every ticket gets a calculated score for display, while queue position is decided by an explicit comparator on every query:

$$\text{Urgency Score} = \text{Priority Weight} + \text{Overdue Boost} + \text{Time Decay}$$

### 1. Base Priority Weight ($\text{W}_{\text{priority}}$)
Different priorities start with different base weights:
- **Critical**: `400` points (1 Hour SLA)
- **Urgent**: `300` points (2 Hours SLA)
- **High**: `200` points (4 Hours SLA)
- **Normal**: `100` points (1 Day SLA)
- **Low**: `50` points (1 Day SLA in the current policy configuration)

### 2. Overdue Escalation Boost ($\text{B}_{\text{overdue}}$)
When $\text{currentTime} > \text{slaDeadline}$:
$$\text{B}_{\text{overdue}} = 1000 + \text{minutesPastDeadline}$$

The score is useful context for operators, but it is not used as the authoritative sort key. This avoids a lower-priority ticket becoming more important merely because it has been overdue longer.

### 3. Continuous Time Decay ($\text{D}_{\text{time}}$)
Before a ticket becomes overdue, its score steadily increases as time ticks closer to the SLA deadline:
$$\text{D}_{\text{time}} = \frac{\text{minutesElapsed}}{\text{totalSlaWindowMinutes}} \times 100$$

This produces a smooth $0 \to 100$ score progression. The comparator still preserves priority order, so the display score cannot violate the queue contract.

### 4. Resolved / Closed Rule
Resolved and Closed tickets receive an Urgency Score of `0`, removing them from the active queue while retaining historical reporting.

---

## 📐 Key Design Decisions

1. **Server-Side Dynamic Ranking**:
   - Scores are calculated dynamically during query execution on the backend rather than stored as static values in the database. Because time continuously passes, a ticket's urgency score changes naturally over time without needing background cron jobs or database mutations.

2. **SLA Deadline Persistence**:
   - When a ticket is created, its SLA deadline timestamp (`sla_deadline`) is computed based on its priority and stored in ISO format. This enables efficient server-side filtering (`WHERE sla_deadline < NOW()`).

3. **Automatic Overdue Escalation**:
   - The server checks overdue active tickets at startup and every 60 seconds.
   - Each run raises `low` to `normal`, `normal` to `high`, or `high` to `urgent`, at most one level per ticket per run.
   - `urgent` and `critical` tickets are not raised further. The original SLA deadline is preserved so escalation does not hide the breach that caused it.
   - Each change is persisted in the escalation audit log and exposed through the manual `Run now` endpoint.
   - The client refreshes queue, statistics, and audit data every 60 seconds so operators see the changed priority without a page refresh.

4. **User Experience & Micro-Interactions**:
   - Visual cues like red pulsing badges for overdue items, real-time SLA countdown timers ("28m remaining" / "1h 12m late"), and quick assignment dropdowns make managing the queue effortless for Priya.

5. **Operator Workflows**:
   - Customer search is debounced by 200ms to avoid a request per keystroke.
   - Queue filters are written to the URL so views such as assigned-to-me or overdue tickets can be bookmarked.
   - The sidebar exposes a persistent assigned-to-me view, while the queue supports direct assignment and status changes.

## Verification

The queue comparator and escalation worker are covered by Node's built-in test runner:

```bash
cd server
npm test
```

The production client is verified with:

```bash
cd client
npm run build
```
