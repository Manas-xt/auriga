import React from 'react';

export function Sidebar({
  activeNav,
  onNavigate,
  currentUser,
  agents,
  onSwitchUser,
  overdueCount,
  theme,
  onToggleTheme,
  onCreateTicketClick
}) {
  return (
    <aside className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">⚡</div>
        <div className="sidebar-brand">Auriga Helpdesk</div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-label">Queue Management</div>

          <button
            className={`sidebar-item ${activeNav === 'queue' ? 'active' : ''}`}
            onClick={() => onNavigate('queue')}
          >
            <span className="sidebar-icon">🎫</span>
            <span>Priority Queue</span>
            {overdueCount > 0 && (
              <span className="sidebar-badge" title={`${overdueCount} overdue`}>
                {overdueCount}
              </span>
            )}
          </button>

          <button
            className={`sidebar-item ${activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <span className="sidebar-icon">📊</span>
            <span>Dashboard & SLA</span>
          </button>

          <button
            className={`sidebar-item ${activeNav === 'agents' ? 'active' : ''}`}
            onClick={() => onNavigate('agents')}
          >
            <span className="sidebar-icon">👥</span>
            <span>Team & Agents</span>
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-label">Quick Action</div>
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={onCreateTicketClick}
          >
            + New Ticket
          </button>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {currentUser && (
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className="agent-avatar-circle"
              style={{ backgroundColor: currentUser.avatar_color || '#5E6AD2', width: '28px', height: '28px', fontSize: '12px' }}
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ink-subtle)' }}>Logged in agent</div>
            </div>
            {agents.length > 1 && (
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const found = agents.find(a => a.id === e.target.value);
                  if (found) onSwitchUser(found);
                }}
                className="filter-select"
                style={{ padding: '2px 18px 2px 6px', height: '26px', fontSize: '11px', maxWidth: '85px' }}
                title="Switch agent view"
              >
                {agents.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name.split(' ')[0]}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <button className="theme-toggle" onClick={onToggleTheme}>
          <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
          <span>{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
        </button>
      </div>
    </aside>
  );
}
