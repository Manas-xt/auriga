import React from 'react';
import { ArrowRight } from 'lucide-react';

export function EscalationLog({ changes, onNavigateToQueue }) {
  return (
    <section className="escalation-log-view">
      <div className="log-heading">
        <div>
          <div className="eyebrow">SYSTEM ACTIVITY</div>
          <h2>Escalation log</h2>
          <p>Automatic priority changes caused by breached response times.</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigateToQueue({ status: 'active' })}>Back to queue</button>
      </div>
      <div className="audit-list">
        {changes.length === 0 ? (
          <div className="empty-state queue-empty">
            <div className="empty-glyph">✓</div>
            <h3>No escalations yet</h3>
            <p>The automatic check has not raised any active tickets.</p>
          </div>
        ) : changes.map(change => (
          <button className="audit-row" key={`${change.ticket_id}-${change.at}`} onClick={() => onNavigateToQueue({ search: change.ticket_id })}>
            <span className="audit-ticket">{change.ticket_id}</span>
            <span className={`audit-priority priority-${change.from}`}>{change.from}</span>
            <ArrowRight className="audit-arrow" size={14} aria-hidden="true" />
            <span className={`audit-priority priority-${change.to}`}>{change.to}</span>
            <span className="audit-time">{new Date(change.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="audit-reason">{change.reason}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
