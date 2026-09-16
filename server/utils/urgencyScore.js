/**
 * Urgency Score Algorithm
 * =======================
 * This is the HEART of the helpdesk queue system.
 *
 * Every ticket gets a computed urgency score that determines its position
 * in the queue. Higher score = more urgent = appears first.
 *
 * Score = priorityWeight + overdueBoost + timeDecay
 *
 * 1. Priority Weight: Base score from ticket priority level
 * 2. Overdue Boost:   If past SLA deadline, add 1000 + minutes overdue
 *                     This ensures ALL overdue tickets jump above non-overdue,
 *                     and the MOST overdue ticket sorts first among them.
 * 3. Time Decay:      As a ticket approaches its deadline, its score climbs
 *                     smoothly from 0 to 100, creating urgency before it's late.
 */

const PRIORITY_WEIGHTS = {
  critical: 400,
  urgent: 300,
  high: 200,
  normal: 100,
  low: 50
};

/**
 * Compute the urgency score for a single ticket.
 * @param {Object} ticket - Must have { priority, sla_deadline, status }
 * @param {Date} [now] - Current time (injectable for testing)
 * @returns {number} The urgency score (higher = more urgent)
 */
function computeUrgencyScore(ticket, now = new Date()) {
  // Closed/resolved tickets get score 0 — they're done
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    return 0;
  }

  const priorityWeight = PRIORITY_WEIGHTS[ticket.priority] || PRIORITY_WEIGHTS.normal;

  const deadline = new Date(ticket.sla_deadline);
  const createdAt = new Date(ticket.created_at);
  const nowMs = now.getTime();
  const deadlineMs = deadline.getTime();
  const createdMs = createdAt.getTime();

  // Total SLA window in minutes
  const slaWindowMinutes = (deadlineMs - createdMs) / (1000 * 60);

  let overdueBoost = 0;
  let timeDecay = 0;

  if (nowMs > deadlineMs) {
    // OVERDUE: minutes past deadline
    const minutesPastDeadline = (nowMs - deadlineMs) / (1000 * 60);
    overdueBoost = 1000 + minutesPastDeadline;
  } else if (slaWindowMinutes > 0) {
    // Not yet overdue: compute how far through the SLA window we are (0→100)
    const minutesElapsed = (nowMs - createdMs) / (1000 * 60);
    timeDecay = Math.max(0, (minutesElapsed / slaWindowMinutes) * 100);
  }

  return priorityWeight + overdueBoost + timeDecay;
}

/**
 * Sort an array of tickets by urgency score (descending).
 * Attaches `urgency_score` and `is_overdue` to each ticket.
 */
function sortByUrgency(tickets, now = new Date()) {
  return tickets
    .map(ticket => {
      const urgency_score = computeUrgencyScore(ticket, now);
      const is_overdue = now > new Date(ticket.sla_deadline) &&
        ticket.status !== 'resolved' && ticket.status !== 'closed';
      return { ...ticket, urgency_score: Math.round(urgency_score * 100) / 100, is_overdue };
    })
    .sort((a, b) => b.urgency_score - a.urgency_score);
}

module.exports = { computeUrgencyScore, sortByUrgency, PRIORITY_WEIGHTS };
