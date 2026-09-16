import React, { useState } from 'react';
import { createTicket } from '../api';
import { AlertTriangle, X } from 'lucide-react';

export function CreateTicketModal({ agents, currentUser, onClose, onTicketCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'normal',
    customer_name: '',
    customer_email: '',
    assigned_to: currentUser?.id || ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.customer_name.trim()) {
      setError('Title and Customer Name are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const created = await createTicket(formData);
      onTicketCreated(created);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Log New Support Ticket</h2>
          <button className="drawer-close" onClick={onClose} title="Close">
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '13px' }}>
                <AlertTriangle size={14} aria-hidden="true" /> {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="ticket-title">Issue Summary *</label>
              <input
                id="ticket-title"
                type="text"
                placeholder="e.g. Laptop won't boot before client demo"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                required
                autoFocus
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="ticket-priority">Priority & SLA *</label>
                <select
                  id="ticket-priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="form-select"
                >
                  <option value="critical">Critical (1h SLA)</option>
                  <option value="urgent">Urgent (2h SLA)</option>
                  <option value="high">High (4h SLA)</option>
                  <option value="normal">Normal (1 day SLA)</option>
                  <option value="low">Low (3 days SLA)</option>
                </select>
                <div className="form-hint">
                  {formData.priority === 'critical' && '1 hour response deadline'}
                  {formData.priority === 'urgent' && '2 hours response deadline'}
                  {formData.priority === 'high' && '4 hours response deadline'}
                  {formData.priority === 'normal' && '1 business day response deadline'}
                  {formData.priority === 'low' && '3 business days response deadline'}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ticket-assignee">Assign Agent</label>
                <select
                  id="ticket-assignee"
                  value={formData.assigned_to}
                  onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                  className="form-select"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="ticket-customer">Customer Name *</label>
                <input
                  id="ticket-customer"
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ticket-email">Customer Email</label>
                <input
                  id="ticket-email"
                  type="email"
                  placeholder="e.g. s.jenkins@company.com"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="ticket-desc">Detailed Description</label>
              <textarea
                id="ticket-desc"
                rows={3}
                placeholder="Details of the issue, system specifications, error codes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : '+ Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
