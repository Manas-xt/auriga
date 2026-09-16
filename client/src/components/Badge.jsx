import React from 'react';

export function PriorityBadge({ priority }) {
  const p = (priority || 'normal').toLowerCase();
  const labels = {
    critical: '⚡ Critical',
    urgent: '🔥 Urgent',
    high: '🟠 High',
    normal: '🔵 Normal',
    low: '⚪ Low'
  };

  return (
    <span className={`badge badge-${p}`}>
      {labels[p] || priority}
    </span>
  );
}

export function StatusBadge({ status }) {
  const s = (status || 'open').toLowerCase();
  const labels = {
    open: 'Open',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed'
  };

  return (
    <span className={`badge badge-status badge-${s}`}>
      {labels[s] || status}
    </span>
  );
}

export function OverdueBadge({ minutesPast }) {
  let timeStr = '';
  if (minutesPast !== undefined && minutesPast !== null) {
    const mins = Math.floor(minutesPast);
    if (mins < 60) {
      timeStr = `${mins}m late`;
    } else {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      timeStr = `${hours}h ${remainingMins}m late`;
    }
  }

  return (
    <span className="badge badge-critical" style={{ fontWeight: 700 }}>
      ⚠️ OVERDUE {timeStr ? `(${timeStr})` : ''}
    </span>
  );
}
