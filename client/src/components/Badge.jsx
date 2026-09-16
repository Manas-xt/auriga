import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function PriorityBadge({ priority }) {
  const p = (priority || 'normal').toLowerCase();
  const labels = {
    critical: 'Critical',
    urgent: 'Urgent',
    high: 'High',
    normal: 'Normal',
    low: 'Low'
  };

  const level = { critical: 4, urgent: 4, high: 3, normal: 2, low: 1 }[p] || 2;

  return (
    <span className={`priority-mark priority-${p}`} title={labels[p] || priority}>
      <span className="priority-bars" aria-hidden="true">
        {[1, 2, 3, 4].map(bar => (
          <span key={bar} className={bar <= level ? 'filled' : ''} />
        ))}
      </span>
      <span>{labels[p] || priority}</span>
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
      <AlertTriangle size={12} aria-hidden="true" /> OVERDUE {timeStr ? `(${timeStr})` : ''}
    </span>
  );
}
