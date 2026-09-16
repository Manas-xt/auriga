const ESCALATION_ORDER = ['low', 'normal', 'high', 'urgent'];
const ACTIVE_STATUSES = new Set(['open', 'in-progress']);

function findOverdueTickets(tickets, now) {
  return tickets.filter(ticket => ACTIVE_STATUSES.has(ticket.status) &&
    now > new Date(ticket.sla_deadline));
}

function runOverdueEscalation(tickets, now = new Date()) {
  const changes = [];

  for (const ticket of tickets) {
    const isOverdue = ACTIVE_STATUSES.has(ticket.status) &&
      now > new Date(ticket.sla_deadline);
    const currentIndex = ESCALATION_ORDER.indexOf(ticket.priority);

    if (!isOverdue || currentIndex === -1 || currentIndex === ESCALATION_ORDER.length - 1) {
      continue;
    }

    const from = ticket.priority;
    const to = ESCALATION_ORDER[currentIndex + 1];
    ticket.priority = to;
    ticket.updated_at = now.toISOString();
    ticket.escalated = true;
    ticket.escalations = ticket.escalations || [];
    const change = {
      ticket_id: ticket.id,
      from,
      to,
      at: now.toISOString(),
      reason: `SLA breached by ${Math.floor((now - new Date(ticket.sla_deadline)) / 60000)}m`
    };
    ticket.escalations.push(change);
    changes.push(change);
  }

  return changes;
}

function escalateOverdueTickets(tickets, now = new Date()) {
  return runOverdueEscalation(tickets, now).length;
}

module.exports = { escalateOverdueTickets, runOverdueEscalation, findOverdueTickets, ESCALATION_ORDER };