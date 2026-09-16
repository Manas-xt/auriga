import React from 'react';

export function FilterBar({
  filters,
  agents,
  currentUser,
  onFilterChange,
  onResetFilters,
  overdueCount
}) {
  const isAssignedToMe = filters.assigned_to === currentUser?.id;
  const isOverdueOnly = filters.overdue === 'true';

  const hasActiveFilters =
    filters.search ||
    filters.status !== 'active' ||
    filters.priority !== 'all' ||
    filters.assigned_to !== 'all' ||
    filters.overdue === 'true';

  return (
    <div className="filter-bar">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search by customer name, ticket ID, or issue..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
          className="search-input"
        />
      </div>

      {/* Status Filter */}
      <select
        value={filters.status || 'active'}
        onChange={(e) => onFilterChange({ status: e.target.value, page: 1 })}
        className="filter-select"
        title="Filter by status"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active (Open & In Progress)</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority || 'all'}
        onChange={(e) => onFilterChange({ priority: e.target.value, page: 1 })}
        className="filter-select"
        title="Filter by priority"
      >
        <option value="all">All Priorities</option>
        <option value="critical">⚡ Critical (1h SLA)</option>
        <option value="urgent">🔥 Urgent (2h SLA)</option>
        <option value="high">🟠 High (4h SLA)</option>
        <option value="normal">🔵 Normal (1 day SLA)</option>
        <option value="low">⚪ Low (3 days SLA)</option>
      </select>

      {/* Assigned Agent Filter */}
      <select
        value={filters.assigned_to || 'all'}
        onChange={(e) => onFilterChange({ assigned_to: e.target.value, page: 1 })}
        className="filter-select"
        title="Filter by assigned agent"
      >
        <option value="all">All Agents</option>
        <option value="unassigned">Unassigned</option>
        {agents.map(agent => (
          <option key={agent.id} value={agent.id}>
            {agent.name} {currentUser?.id === agent.id ? '(You)' : ''}
          </option>
        ))}
      </select>

      {/* Overdue Quick Toggle */}
      <button
        className={`filter-toggle ${isOverdueOnly ? 'active' : ''}`}
        onClick={() => onFilterChange({ overdue: isOverdueOnly ? 'false' : 'true', page: 1 })}
      >
        <span>⚠️ Overdue Queue</span>
        {overdueCount > 0 && <span className="sidebar-badge">{overdueCount}</span>}
      </button>

      {/* Assigned to Me Quick Toggle */}
      {currentUser && (
        <button
          className={`filter-toggle ${isAssignedToMe ? 'active' : ''}`}
          onClick={() => {
            if (isAssignedToMe) {
              onFilterChange({ assigned_to: 'all', page: 1 });
            } else {
              onFilterChange({ assigned_to: currentUser.id, page: 1 });
            }
          }}
        >
          <span>👤 Assigned to Me</span>
        </button>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button className="filter-clear" onClick={onResetFilters}>
          Clear filters
        </button>
      )}
    </div>
  );
}
