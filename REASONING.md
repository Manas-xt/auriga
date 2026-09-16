# 🧠 Auriga Technical Reasoning & Priority Queue Algorithm

## Problem Statement Analysis

Priya runs a two-person IT helpdesk with a constant influx of tickets ranging from minor requests (*"can I get a bigger monitor"*) to high-stakes emergencies (*"my laptop won't boot before a client demo"*). 

Priya needed:
1. **The right ticket on top at all times**: Automatically ordering tickets by urgency.
2. **Overdue priority escalation**: Anything past its SLA response time must immediately jump to the front of the queue.
3. **Instant answers to frequent queries**: "What's overdue?", "What's assigned to me?", and searching for customer tickets by name.
4. **Pagination**: Handling large ticket volumes cleanly.

---

## 🧮 The Urgency Score Algorithm

At the core of Auriga is a mathematical model that evaluates every active ticket on every query:

$$\text{Urgency Score} = \text{Priority Weight} + \text{Overdue Boost} + \text{Time Decay}$$

### 1. Base Priority Weight ($\text{W}_{\text{priority}}$)
Different priorities start with different base weights:
- **Critical**: `400` points (1 Hour SLA)
- **Urgent**: `300` points (2 Hours SLA)
- **High**: `200` points (4 Hours SLA)
- **Normal**: `100` points (8 Hours / 1 Business Day SLA)
- **Low**: `50` points (24 Hours / 3 Business Days SLA)

### 2. Overdue Escalation Boost ($\text{B}_{\text{overdue}}$)
When $\text{currentTime} > \text{slaDeadline}$:
$$\text{B}_{\text{overdue}} = 1000 + \text{minutesPastDeadline}$$

**Why 1000?**
The maximum score achievable by a non-overdue ticket is $400 + 100 = 500$. Giving overdue tickets a minimum boost of $1000$ guarantees that **ALL overdue tickets jump ahead of ALL non-overdue tickets**, regardless of base priority. Furthermore, adding $\text{minutesPastDeadline}$ ensures that among multiple overdue tickets, the one that is **most overdue** appears at the absolute top.

### 3. Continuous Time Decay ($\text{D}_{\text{time}}$)
Before a ticket becomes overdue, its score steadily increases as time ticks closer to the SLA deadline:
$$\text{D}_{\text{time}} = \frac{\text{minutesElapsed}}{\text{totalSlaWindowMinutes}} \times 100$$

This produces a smooth $0 \to 100$ score progression, ensuring a normal ticket nearing its deadline will gradually climb above fresh low-priority tickets before it breaches SLA.

### 4. Resolved / Closed Rule
Resolved and Closed tickets receive an Urgency Score of `0`, removing them from the active queue while retaining historical reporting.

---

## 📐 Key Design Decisions

1. **Server-Side Dynamic Ranking**:
   - Scores are calculated dynamically during query execution on the backend rather than stored as static values in the database. Because time continuously passes, a ticket's urgency score changes naturally over time without needing background cron jobs or database mutations.

2. **SLA Deadline Persistence**:
   - When a ticket is created, its SLA deadline timestamp (`sla_deadline`) is computed based on its priority and stored in ISO format. This enables efficient server-side filtering (`WHERE sla_deadline < NOW()`).

3. **User Experience & Micro-Interactions**:
   - Visual cues like red pulsing badges for overdue items, real-time SLA countdown timers ("28m remaining" / "1h 12m late"), and quick assignment dropdowns make managing the queue effortless for Priya.
