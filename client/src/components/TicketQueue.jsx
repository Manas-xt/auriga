import React, { useState, useEffect } from 'react';
import { PriorityBadge, StatusBadge, OverdueBadge } from './Badge';

function formatSlaInfo(slaDeadlineStr, status) {
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

  if (hours < 1) {
    return { text: `${mins}m left`, className: 'warning', isOverdue: false };
  } else if (hours < 4) {
    return { text: `${hours}h ${mins}m left`, className: 'warning', isOverdue: false };
  } else {
    return { text: `${hours}h left`, className: 'ok', isOverdue: false };
  }
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
  onCreateTicketClick
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3>No Tickets Found</h3>
        <p>No tickets match your filter criteria or search query.</p>
        <button className="btn btn-primary btn-sm" style={{ marginTop: '16px' }} onClick={onCreateTicketClick}>
          + Create New Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="table-container">
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
            const sla = formatSlaInfo(ticket.sla_deadline, ticket.status);
            const isOverdue = ticket.is_overdue || sla.isOverdue;
            const isMyTicket = currentUser && ticket.assigned_to === currentUser.id;

            return (
              <tr
                key={ticket.id}
                className={isOverdue ? 'overdue' : ''}
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
                        ⚡{Math.round(ticket.urgency_score)}
                      </span>
                    )}
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
                  <div className={`sla-indicator ${sla.className}`}>
                    <span className="sla-dot"></span>
                    <span>{sla.text}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-subtle)', marginTop: '2px' }}>
                    Due {new Date(ticket.sla_deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>

                {/* Status */}
                <td onClick={(e) => e.stopPropagation()}>
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
                      View →
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
