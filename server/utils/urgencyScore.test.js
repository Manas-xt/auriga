const test = require('node:test');
const assert = require('node:assert/strict');
const { sortByUrgency } = require('./urgencyScore');

const now = new Date('2026-09-16T12:00:00.000Z');

function ticket(id, priority, status, deadline, createdAt = '2026-09-16T08:00:00.000Z') {
  return {
    id,
    priority,
    status,
    created_at: createdAt,
    sla_deadline: deadline
  };
}

test('orders active overdue tickets before active tickets within SLA', () => {
  const tickets = [
    ticket('within', 'critical', 'open', '2026-09-16T13:00:00.000Z'),
    ticket('overdue', 'normal', 'open', '2026-09-16T11:00:00.000Z')
  ];

  assert.deepEqual(sortByUrgency(tickets, now).map(item => item.id), ['overdue', 'within']);
});

test('uses priority before overdue duration', () => {
  const tickets = [
    ticket('normal-late', 'normal', 'open', '2026-09-15T08:00:00.000Z'),
    ticket('urgent-late', 'urgent', 'open', '2026-09-16T11:59:00.000Z')
  ];

  assert.deepEqual(sortByUrgency(tickets, now).map(item => item.id), ['urgent-late', 'normal-late']);
});

test('keeps active tickets ahead of resolved tickets', () => {
  const tickets = [
    ticket('resolved', 'critical', 'resolved', '2026-09-16T09:00:00.000Z'),
    ticket('active', 'low', 'open', '2026-09-16T11:00:00.000Z')
  ];

  assert.deepEqual(sortByUrgency(tickets, now).map(item => item.id), ['active', 'resolved']);
});