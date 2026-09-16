import React, { useState } from 'react';
import { createAgent, deleteAgent } from '../api';
import { AlertTriangle, ArrowRight, Plus, X } from 'lucide-react';

export function AgentsList({ agents, currentUser, onSwitchUser, onAgentsUpdated, onNavigateToQueue }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarColor, setAvatarColor] = useState('#5E6AD2');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      await createAgent({ name, email, avatar_color: avatarColor });
      setName('');
      setEmail('');
      setShowAddModal(false);
      onAgentsUpdated();
    } catch (err) {
      setError(err.message || 'Failed to create agent');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAgent = async (agentId, agentName) => {
    if (!window.confirm(`Remove agent ${agentName}?`)) return;
    try {
      await deleteAgent(agentId);
      onAgentsUpdated();
    } catch (err) {
      alert('Failed to delete agent');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>Support Team Roster</h2>
          <p style={{ fontSize: '13px', color: 'var(--ink-subtle)', marginTop: '2px' }}>
            Switch user perspective or inspect assigned ticket queues.
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
          <Plus size={15} aria-hidden="true" /> Add Agent
        </button>
      </div>

      <div className="agents-grid">
        {agents.map(agent => {
          const isCurrent = currentUser?.id === agent.id;
          return (
            <div key={agent.id} className="agent-card" style={{ borderColor: isCurrent ? 'var(--primary)' : 'var(--border)' }}>
              <div
                className="agent-card-avatar"
                style={{ backgroundColor: agent.avatar_color || '#5E6AD2' }}
              >
                {agent.name.charAt(0).toUpperCase()}
              </div>

              <div className="agent-card-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="agent-card-name">{agent.name}</span>
                  {isCurrent && (
                    <span className="badge badge-normal" style={{ fontSize: '10px' }}>Active</span>
                  )}
                </div>
                <div className="agent-card-email">{agent.email}</div>
              </div>

              <div className="agent-card-actions">
                {!isCurrent ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSwitchUser(agent)}
                    title={`Switch view to ${agent.name}`}
                  >
                    Select
                  </button>
                ) : (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onNavigateToQueue({ assigned_to: agent.id })}
                  >
                    Queue <ArrowRight size={13} aria-hidden="true" />
                  </button>
                )}
                {agents.length > 1 && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDeleteAgent(agent.id, agent.name)}
                    title="Remove agent"
                    style={{ padding: '0 6px', color: 'var(--ink-subtle)' }}
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" style={{ width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Support Agent</h3>
              <button className="drawer-close" onClick={() => setShowAddModal(false)}><X size={17} aria-hidden="true" /></button>
            </div>
            <form onSubmit={handleCreateAgent}>
              <div className="modal-body">
                {error && (
                  <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '13px' }}>
                    <AlertTriangle size={14} aria-hidden="true" /> {error}
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                    placeholder="e.g. Alex Rivera"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                    placeholder="e.g. alex@helpdesk.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Avatar Color</label>
                  <input
                    type="color"
                    value={avatarColor}
                    onChange={(e) => setAvatarColor(e.target.value)}
                    style={{ height: '36px', width: '100%', cursor: 'pointer', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Adding...' : 'Add Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
