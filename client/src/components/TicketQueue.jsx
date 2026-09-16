import React, { useState, useEffect } from 'react';
import { PriorityBadge, StatusBadge, OverdueBadge } from './Badge';
import { ArrowRight, Info, Zap } from 'lucide-react';

function formatSlaInfo(slaDeadlineStr, status, createdAtStr) {
  if (status === 'resolved' || status === 'closed') {
    return { text: 'Completed', className: 'done', isOverdue: false };
  }

  const deadline = new Date(slaDeadlineStr);
  const now = new Date();
  const diffMs = deadline.getTime() - now.getTime();

  if (diffMs <= 0) {
    const pastMins = Math.abs(Math.floor(diffMs / 60000));
    const hours = Math.floor(pastMins / 60);
    const mins = pastMins % 60;
    const timeStr = hours > 0 ? `${hours}h ${mins}m late` : `${mins}m late`;
    return { text: timeStr, className: 'overdue', isOverdue: true, minutesPast: pastMins };
  }

  const totalMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const totalWindowMs = new Date(slaDeadlineStr).getTime() - new Date(createdAtStr).getTime();
  const isDueSoon = diffMs <= totalWindowMs * 0.25;

  if (isDueSoon || hours < 1) {
    return { text: `${mins}m left`, className: 'warning', isOverdue: false };
  } else if (hours < 4) {
    return { text: `${hours}h ${mins}m left`, className: 'warning', isOverdue: false };
  } else {
    return { text: `${hours}h left`, className: 'ok', isOverdue: false };
  }
}

function isActiveStatus(status) {
  return status === 'open' || status === 'in-progress';
}

function isTicketOverdue(ticket) {
  return Boolean(ticket.is_overdue) ||
    (isActiveStatus(ticket.status) && new Date() > new Date(ticket.sla_deadline));
}

export function TicketQueue({
  tickets,
  agents,
  loading,
  selectedTicketId,
  currentUser,
  onSelectTicket,
  onQuickAssign,
  onQuickStatusChange,
  onCreateTicketClick,
  isOverdueFilter
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="queue-surface table-container">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton-row" key={index}>
            <span />
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="empty-state queue-empty">
        <Info size={28} aria-hidden="true" />
        <h3>{isOverdueFilter ? 'Nothing is overdue' : 'No tickets match these filters'}</h3>
        <p>{isOverdueFilter ? 'Queue is healthy. New tickets will appear here when they need attention.' : 'Try clearing a filter or create a new support ticket.'}</p>
        <button className="btn btn-primary btn-sm" style={{ marginTop: '16px' }} onClick={onCreateTicketClick}>
          + New Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="table-container queue-surface">
      <table className="ticket-table">
        <thead>
          <tr>
            <th style={{ width: '90px' }}>Rank / Score</th>
            <th style={{ width: '110px' }}>Priority</th>
            <th>Ticket & Issue</th>
            <th>Customer</th>
            <th>Assigned Agent</th>
            <th>SLA Response</th>
            <th>Status</th>
            <th style={{ textAlign: 'right', width: '130px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => {
            const sla = formatSlaInfo(ticket.sla_deadline, ticket.status, ticket.created_at);
            const isOverdue = isTicketOverdue(ticket) || sla.isOverdue;
            const isMyTicket = currentUser && ticket.assigned_to === currentUser.id;
            const previousTicket = tickets[index - 1];
            const previousWasOverdue = previousTicket && isTicketOverdue(previousTicket);
            const showBreachedHeader = isOverdue && (!previousTicket || !previousWasOverdue);
            const showSlaHeader = !isOverdue && previousTicket && previousWasOverdue;

            return (
              <React.Fragment key={ticket.id}>
                {(showBreachedHeader || showSlaHeader) && (
                  <tr className={`queue-group-header ${showBreachedHeader ? 'breached' : ''}`}>
                    <td colSpan="8">
                      {showBreachedHeader ? `BREACHED · ${tickets.filter(isTicketOverdue).length}` : `IN SLA · ${tickets.length - tickets.filter(isTicketOverdue).length}`}
                    </td>
                  </tr>
                )}
                <tr
                  className={isOverdue ? 'overdue queue-row' : 'queue-row'}
                  onClick={() => onSelectTicket(ticket.id)}
                >
                {/* Rank & Urgency Score */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--ink-subtle)' }}>
                      #{index + 1}
                    </span>
                    {ticket.urgency_score > 0 && (
                      <span className="urgency-score" title={`Urgency Score: ${ticket.urgency_score}`}>
                        <Zap size={12} aria-hidden="true" />{Math.round(ticket.urgency_score)}
                      </span>
                    )}
                    {ticket.escalated && <span className="escalation-badge" title="This ticket was auto-escalated">⌁</span>}
                  </div>
                </td>

                {/* Priority */}
                <td>
                  <PriorityBadge priority={ticket.priority} />
                </td>

                {/* Ticket Title & ID */}
                <td>
                  <div className="ticket-title-cell">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span className="ticket-id">{ticket.id}</span>
                      {isOverdue && <OverdueBadge minutesPast={sla.minutesPast} />}
                    </div>
                    <div className="ticket-title">{ticket.title}</div>
                  </div>
                </td>

                {/* Customer */}
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{ticket.customer_name}</div>
                  {ticket.customer_email && (
                    <div className="ticket-customer">{ticket.customer_email}</div>
                  )}
                </td>

                {/* Assigned Agent */}
                <td onClick={(e) => e.stopPropagation()}>
                  <select
                    value={ticket.assigned_to || ''}
                    onChange={(e) => onQuickAssign(ticket.id, e.target.value)}
                    className="filter-select"
                    style={{
                      height: '30px',
                      padding: '2px 24px 2px 8px',
                      fontSize: '12px',
                      fontWeight: isMyTicket ? 600 : 400,
                      borderColor: isMyTicket ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    <option value="">Unassigned</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name} {currentUser?.id === agent.id ? '(You)' : ''}
                      </option>
                    ))}
                  </select>
                </td>

                {/* SLA Indicator */}
                <td>
                  <div className={`sla-indicator ${sla.className} sla-mono`}>
                    <span className="sla-dot"></span>
                    <span>{sla.text}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-subtle)', marginTop: '2px' }}>
                    Due {new Date(ticket.sla_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>

                {/* Status */}
                <td onClick={(e) => e.stopPropagation()}>
                  <span className={`status-glyph status-${ticket.status}`} aria-label={`Status: ${ticket.status}`} />
                  <select
                    value={ticket.status}
                    onChange={(e) => onQuickStatusChange(ticket.id, e.target.value)}
                    className="filter-select"
                    style={{ height: '30px', padding: '2px 24px 2px 8px', fontSize: '12px' }}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>

                {/* Action Buttons */}
                <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {currentUser && ticket.assigned_to !== currentUser.id && (
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => onQuickAssign(ticket.id, currentUser.id)}
                        title="Assign to me"
                        style={{ padding: '0 6px', fontSize: '11px' }}
                      >
                        Take
                      </button>
                    )}
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectTicket(ticket.id)}
                    >
                        View <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
