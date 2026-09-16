const test = require('node:test');
const assert = require('node:assert/strict');
const { escalateOverdueTickets } = require('./escalateOverdue');

const now = new Date('2026-09-16T12:00:00.000Z');

function ticket(id, priority, status, deadline) {
  return { id, priority, status, sla_deadline: deadline, updated_at: null };
}

test('escalates each breached active ticket by one level per run', () => {
  const tickets = [
    ticket('normal-ticket', 'normal', 'open', '2026-09-16T11:00:00.000Z'),
    ticket('high-ticket', 'high', 'in-progress', '2026-09-16T10:00:00.000Z')
  ];

  assert.equal(escalateOverdueTickets(tickets, now), 2);
  assert.deepEqual(tickets.map(item => item.priority), ['high', 'urgent']);

  escalateOverdueTickets(tickets, now);
  assert.deepEqual(tickets.map(item => item.priority), ['urgent', 'urgent']);
});

test('does not escalate within-SLA, resolved, or already urgent tickets', () => {
  const tickets = [
    ticket('within-sla', 'normal', 'open', '2026-09-16T13:00:00.000Z'),
    ticket('resolved', 'normal', 'resolved', '2026-09-16T10:00:00.000Z'),
    ticket('urgent', 'urgent', 'open', '2026-09-16T10:00:00.000Z'),
    ticket('critical', 'critical', 'open', '2026-09-16T10:00:00.000Z')
  ];

  assert.equal(escalateOverdueTickets(tickets, now), 0);
  assert.deepEqual(tickets.map(item => item.priority), ['normal', 'normal', 'urgent', 'critical']);
});

test('raises an overdue low ticket to normal before further runs', () => {
  const tickets = [ticket('low-ticket', 'low', 'open', '2026-09-16T11:00:00.000Z')];

  assert.equal(escalateOverdueTickets(tickets, now), 1);
  assert.equal(tickets[0].priority, 'normal');
});