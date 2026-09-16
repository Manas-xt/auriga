import React, { useEffect, useState } from 'react';
import { AlertTriangle, Search, UserRound } from 'lucide-react';

export function FilterBar({
  filters,
  agents,
  currentUser,
  onFilterChange,
  onResetFilters,
  overdueCount
}) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const isAssignedToMe = filters.assigned_to === currentUser?.id;
  const isOverdueOnly = filters.overdue === 'true';

  const hasActiveFilters =
    filters.search ||
    filters.status !== 'active' ||
    filters.priority !== 'all' ||
    filters.assigned_to !== 'all' ||
    filters.overdue === 'true';

  useEffect(() => {
    setSearchTerm(filters.search || '');
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== (filters.search || '')) {
        onFilterChange({ search: searchTerm, page: 1 });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, filters.search, onFilterChange]);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Search Input */}
      <div className="relative min-w-[220px] max-w-[360px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" size={16} aria-hidden="true" />
        <input
          type="text"
          placeholder="Search by customer name, ticket ID, or issue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9 w-full rounded-sm border border-border bg-surface-1 py-2 pl-9 pr-3 text-[13px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-soft dark:border-border-dark dark:bg-surface-dark1 dark:text-ink-dark"
        />
      </div>

      {/* Status Filter */}
      <select
        value={filters.status || 'active'}
        onChange={(e) => onFilterChange({ status: e.target.value, page: 1 })}
        className="filter-select rounded-sm border-border bg-surface-1 text-ink dark:border-border-dark dark:bg-surface-dark1 dark:text-ink-dark"
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
        className="filter-select rounded-sm border-border bg-surface-1 text-ink dark:border-border-dark dark:bg-surface-dark1 dark:text-ink-dark"
        title="Filter by priority"
      >
        <option value="all">All Priorities</option>
        <option value="critical">Critical (1h SLA)</option>
        <option value="urgent">Urgent (2h SLA)</option>
        <option value="high">High (4h SLA)</option>
        <option value="normal">Normal (1 day SLA)</option>
        <option value="low">Low (3 days SLA)</option>
      </select>

      {/* Assigned Agent Filter */}
      <select
        value={filters.assigned_to || 'all'}
        onChange={(e) => onFilterChange({ assigned_to: e.target.value, page: 1 })}
        className="filter-select rounded-sm border-border bg-surface-1 text-ink dark:border-border-dark dark:bg-surface-dark1 dark:text-ink-dark"
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
        className={`flex h-9 items-center gap-2 rounded-sm border px-3 text-[13px] transition-colors ${isOverdueOnly ? 'border-brand bg-brand-soft text-brand dark:bg-brand-darkSoft' : 'border-border bg-surface-1 text-ink-muted hover:border-border-strong dark:border-border-dark dark:bg-surface-dark1 dark:text-ink-darkMuted'}`}
        onClick={() => onFilterChange({ overdue: isOverdueOnly ? 'false' : 'true', page: 1 })}
      >
        <AlertTriangle size={15} aria-hidden="true" /><span>Overdue</span>
        {overdueCount > 0 && <span className="sidebar-badge">{overdueCount}</span>}
      </button>

      {/* Assigned to Me Quick Toggle */}
      {currentUser && (
        <button
            className={`flex h-9 items-center gap-2 rounded-sm border px-3 text-[13px] transition-colors ${isAssignedToMe ? 'border-brand bg-brand-soft text-brand dark:bg-brand-darkSoft' : 'border-border bg-surface-1 text-ink-muted hover:border-border-strong dark:border-border-dark dark:bg-surface-dark1 dark:text-ink-darkMuted'}`}
          onClick={() => {
            if (isAssignedToMe) {
              onFilterChange({ assigned_to: 'all', page: 1 });
            } else {
              onFilterChange({ assigned_to: currentUser.id, page: 1 });
            }
          }}
        >
          <UserRound size={15} aria-hidden="true" /><span>Assigned to me</span>
        </button>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button className="px-2 text-[13px] text-ink-muted underline-offset-2 hover:text-ink hover:underline dark:text-ink-darkMuted dark:hover:text-ink-dark" onClick={onResetFilters}>
          Clear filters
        </button>
      )}
    </div>
  );
}
