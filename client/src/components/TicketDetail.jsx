import React, { useState, useEffect } from 'react';
import { PriorityBadge, StatusBadge, OverdueBadge } from './Badge';
import { updateTicket, deleteTicket } from '../api';
import { AlertTriangle, X } from 'lucide-react';

export function TicketDetail({ ticketId, agents, currentUser, onClose, onTicketUpdated, onTicketDeleted }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticketId) return;
    setLoading(true);
    fetch(`/api/tickets/${ticketId}`)
      .then(res => res.json())
      .then(data => {
        setTicket(data);
        setEditForm({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          assigned_to: data.assigned_to || '',
          customer_name: data.customer_name,
          customer_email: data.customer_email || ''
        });
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load ticket details');
        setLoading(false);
      });
  }, [ticketId]);

  if (!ticketId) return null;

  const handleStatusChange = async (newStatus) => {
    try {
      setSaving(true);
      const updated = await updateTicket(ticket.id, { status: newStatus });
      setTicket(updated);
      setEditForm(prev => ({ ...prev, status: newStatus }));
      onTicketUpdated(updated);
    } catch (err) {
      setError('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleAssigneeChange = async (agentId) => {
    try {
      setSaving(true);
      const updated = await updateTicket(ticket.id, { assigned_to: agentId });
      setTicket(updated);
      setEditForm(prev => ({ ...prev, assigned_to: agentId }));
      onTicketUpdated(updated);
    } catch (err) {
      setError('Failed to reassign ticket');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await updateTicket(ticket.id, editForm);
      setTicket(updated);
      setIsEditing(false);
      onTicketUpdated(updated);
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ticket ${ticket.id}?`)) return;
    try {
      setSaving(true);
      await deleteTicket(ticket.id);
      onTicketDeleted(ticket.id);
      onClose();
    } catch (err) {
      setError('Failed to delete ticket');
      setSaving(false);
    }
  };

  const slaDeadline = ticket ? new Date(ticket.sla_deadline) : null;
  const createdAt = ticket ? new Date(ticket.created_at) : null;
  const isOverdue = ticket && new Date() > slaDeadline && ticket.status !== 'resolved' && ticket.status !== 'closed';

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div>
            <span className="ticket-id" style={{ display: 'block', marginBottom: '2px' }}>{ticket?.id}</span>
            <h2 className="drawer-title">{ticket?.title || 'Loading Ticket...'}</h2>
          </div>
          <button className="drawer-close" onClick={onClose} title="Close drawer">
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        {loading ? (
          <div className="drawer-body">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          </div>
        ) : error ? (
          <div className="drawer-body">
            <div style={{ color: 'var(--danger)', marginBottom: '16px' }}><AlertTriangle size={14} aria-hidden="true" /> {error}</div>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className="drawer-body">
            {/* Quick Status / Priority Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <PriorityBadge priority={ticket.priority} />
                <StatusBadge status={ticket.status} />
                {isOverdue && <OverdueBadge />}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {ticket.status !== 'in-progress' && ticket.status !== 'resolved' && (
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={saving}
                    onClick={() => handleStatusChange('in-progress')}
                  >
                    ▶ In Progress
                  </button>
                )}
                {ticket.status !== 'resolved' && (
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ borderColor: 'var(--success)', color: 'var(--success)' }}
                    disabled={saving}
                    onClick={() => handleStatusChange('resolved')}
                  >
                    ✓ Resolve
                  </button>
                )}
              </div>
            </div>

            {!isEditing ? (
              <>
                {/* Description */}
                <div className="detail-section">
                  <div className="detail-section-title">Issue Description</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ink)' }}>
                    {ticket.description || <em style={{ color: 'var(--ink-disabled)' }}>No description provided.</em>}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="detail-section">
                  <div className="detail-section-title">Customer Information</div>
                  <div className="detail-row">
                    <span className="detail-label">Name</span>
                    <span className="detail-value" style={{ fontWeight: 600 }}>{ticket.customer_name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{ticket.customer_email || '—'}</span>
                  </div>
                </div>

                {/* Assignment */}
                <div className="detail-section">
                  <div className="detail-section-title">Assignment</div>
                  <div className="detail-row">
                    <span className="detail-label">Assigned Agent</span>
                    <div className="detail-value">
                      <select
                        value={ticket.assigned_to || ''}
                        onChange={(e) => handleAssigneeChange(e.target.value)}
                        className="form-select"
                        disabled={saving}
                        style={{ maxWidth: '240px' }}
                      >
                        <option value="">Unassigned</option>
                        {agents.map(a => (
                          <option key={a.id} value={a.id}>
                            {a.name} {currentUser?.id === a.id ? '(You)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* SLA & Timing */}
                <div className="detail-section">
                  <div className="detail-section-title">SLA & Timing Info</div>
                  <div className="detail-row">
                    <span className="detail-label">Created At</span>
                    <span className="detail-value">{createdAt?.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">SLA Deadline</span>
                    <span className="detail-value" style={{ color: isOverdue ? 'var(--danger)' : 'inherit', fontWeight: isOverdue ? 600 : 400 }}>
                      {slaDeadline?.toLocaleString()} {isOverdue && '(Breached)'}
                    </span>
                  </div>
                  {ticket.resolved_at && (
                    <div className="detail-row">
                      <span className="detail-label">Resolved At</span>
                      <span className="detail-value" style={{ color: 'var(--success)' }}>
                        {new Date(ticket.resolved_at).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Edit Form */
              <form onSubmit={handleSaveEdit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-title">Title</label>
                  <input
                    id="edit-title"
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="edit-desc">Description</label>
                  <textarea
                    id="edit-desc"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-priority">Priority</label>
                    <select
                      id="edit-priority"
                      value={editForm.priority}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                      className="form-select"
                    >
                      <option value="critical">Critical (1h SLA)</option>
                      <option value="urgent">Urgent (2h SLA)</option>
                      <option value="high">High (4h SLA)</option>
                      <option value="normal">Normal (1 day SLA)</option>
                      <option value="low">Low (3 days SLA)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-status">Status</label>
                    <select
                      id="edit-status"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="form-select"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-customer-name">Customer Name</label>
                    <input
                      id="edit-customer-name"
                      type="text"
                      value={editForm.customer_name}
                      onChange={(e) => setEditForm({ ...editForm, customer_name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-customer-email">Customer Email</label>
                    <input
                      id="edit-customer-email"
                      type="email"
                      value={editForm.customer_email}
                      onChange={(e) => setEditForm({ ...editForm, customer_email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Drawer Footer */}
        <div className="drawer-footer">
          {!isEditing ? (
            <>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                ✏️ Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={saving}>
                🗑️ Delete
              </button>
            </>
          ) : null}
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
