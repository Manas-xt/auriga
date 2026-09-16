import React, { useState, useEffect, useCallback } from 'react';
import { fetchTickets, fetchAgents, updateTicket, fetchStats, fetchEscalations } from './api';
import { Sidebar } from './components/Sidebar';
import { TicketQueue } from './components/TicketQueue';
import { FilterBar } from './components/FilterBar';
import { Pagination } from './components/Pagination';
import { TicketDetail } from './components/TicketDetail';
import { CreateTicketModal } from './components/CreateTicketModal';
import { Dashboard } from './components/Dashboard';
import { AgentsList } from './components/AgentsList';
import { EscalationStrip } from './components/EscalationStrip';
import { EscalationLog } from './components/EscalationLog';
import { RefreshCw, Plus, Ticket, LayoutDashboard, Users } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('queue');
  const [theme, setTheme] = useState(() => localStorage.getItem('auriga_theme') || 'dark');

  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [agents, setAgents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [overdueCount, setOverdueCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [escalationState, setEscalationState] = useState({ last_run_at: null, changes: [] });

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      page: Number(params.get('page')) || 1,
      limit: Number(params.get('limit')) || 20,
      status: params.get('status') || 'active',
      priority: params.get('priority') || 'all',
      assigned_to: params.get('assigned_to') || 'all',
      search: params.get('search') || '',
      overdue: params.get('overdue') || 'false'
    };
  });

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auriga_theme', theme);
  }, [theme]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== 'all' && !(key === 'status' && value === 'active') && !(key === 'overdue' && value === 'false')) {
        params.set(key, value);
      }
    });
    const nextUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
  }, [filters]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loadAgents = useCallback(async () => {
    try {
      const data = await fetchAgents();
      setAgents(data);
      if (data.length > 0 && !currentUser) {
        const priya = data.find(a => a.name.toLowerCase().includes('priya')) || data[0];
        setCurrentUser(priya);
      }
    } catch (err) {
      console.error('Error fetching agents:', err);
    }
  }, [currentUser]);

  const loadStats = useCallback(async () => {
    try {
      const stats = await fetchStats();
      setOverdueCount(stats.overdue || 0);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  const loadEscalations = useCallback(async () => {
    try {
      setEscalationState(await fetchEscalations());
    } catch (err) {
      console.error('Error fetching escalation log:', err);
    }
  }, []);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchTickets(filters);
      setTickets(res.tickets || []);
      setPagination(res.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadAgents();
    loadStats();
    loadEscalations();
  }, [loadAgents, loadStats, loadEscalations]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      loadTickets();
      loadStats();
      loadEscalations();
    }, 60 * 1000);

    return () => clearInterval(refreshTimer);
  }, [loadTickets, loadStats, loadEscalations]);

  const handleFilterChange = (newFilterPartial) => {
    setFilters(prev => ({
      ...prev,
      ...newFilterPartial
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
      status: 'active',
      priority: 'all',
      assigned_to: 'all',
      search: '',
      overdue: 'false'
    });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    setFilters(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleQuickAssign = async (ticketId, agentId) => {
    try {
      await updateTicket(ticketId, { assigned_to: agentId });
      loadTickets();
    } catch (err) {
      alert('Failed to assign ticket');
    }
  };

  const handleQuickStatusChange = async (ticketId, newStatus) => {
    try {
      await updateTicket(ticketId, { status: newStatus });
      loadTickets();
      loadStats();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleNavigateToQueueWithFilters = (extraFilters = {}) => {
    setFilters(prev => ({
      ...prev,
      ...extraFilters,
      page: 1
    }));
    setActiveNav('queue');
  };

  const handleEscalationRun = (result) => {
    setEscalationState(prev => ({
      last_run_at: result.ran_at,
      changes: [...result.changes, ...prev.changes]
    }));
    loadTickets();
    loadStats();
  };

  return (
    <div className="flex min-h-screen bg-canvas-light text-ink dark:bg-canvas-dark dark:text-ink-dark">
      {/* Sidebar navigation */}
      <Sidebar
        activeNav={activeNav}
        onNavigate={setActiveNav}
        currentUser={currentUser}
        agents={agents}
        onSwitchUser={setCurrentUser}
        overdueCount={overdueCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        onCreateTicketClick={() => setShowCreateModal(true)}
        onOpenMyTickets={() => handleNavigateToQueueWithFilters({ assigned_to: currentUser?.id || 'all' })}
        onOpenEscalationLog={() => setActiveNav('escalations')}
        escalationState={escalationState}
        onEscalationRun={handleEscalationRun}
      />

      {/* Main Content Area */}
      <div className="min-w-0 flex flex-1 flex-col">
        {/* Top bar */}
        <header className="topbar sticky top-0 z-10 flex h-[52px] items-center justify-between border-b border-border bg-surface-1 px-4 sm:px-8 dark:border-border-dark dark:bg-surface-dark1">
          <div className="flex items-center gap-4">
            <div className="text-[13px] text-ink-subtle dark:text-ink-darkSubtle">
              Helpdesk / <span>{activeNav === 'queue' ? 'Priority Queue' : activeNav === 'dashboard' ? 'Dashboard & SLA' : 'Team & Agents'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn btn-secondary btn-sm" onClick={loadTickets} title="Refresh Queue">
              <RefreshCw size={15} aria-hidden="true" /> Refresh
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
              <Plus size={16} aria-hidden="true" /> New Ticket
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-8">
          {/* Page header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-[22px] font-semibold tracking-[-0.4px] text-ink dark:text-ink-dark">
                {activeNav === 'queue' && <><Ticket size={20} aria-hidden="true" /> Priority Helpdesk Queue</>}
                {activeNav === 'dashboard' && <><LayoutDashboard size={20} aria-hidden="true" /> Dashboard & SLA</>}
                {activeNav === 'agents' && <><Users size={20} aria-hidden="true" /> Support Team & Workload</>}
                {activeNav === 'escalations' && '⌁ Escalation Log'}
              </h1>
              <p className="mt-0.5 text-[13px] text-ink-subtle dark:text-ink-darkSubtle">
                {activeNav === 'queue' && 'The most urgent and overdue tickets automatically jump to the top'}
                {activeNav === 'dashboard' && 'Queue health metrics, response SLA monitoring, and priority engine analytics'}
                {activeNav === 'agents' && 'Helpdesk team members, ticket distribution, and workload management'}
                {activeNav === 'escalations' && 'System-authored priority changes caused by breached SLAs'}
              </p>
            </div>
          </div>

          {activeNav === 'queue' && (
            <>
              <FilterBar
                filters={filters}
                agents={agents}
                currentUser={currentUser}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                overdueCount={overdueCount}
              />

              <TicketQueue
                tickets={tickets}
                agents={agents}
                loading={loading}
                selectedTicketId={selectedTicketId}
                currentUser={currentUser}
                onSelectTicket={setSelectedTicketId}
                onQuickAssign={handleQuickAssign}
                onQuickStatusChange={handleQuickStatusChange}
                onCreateTicketClick={() => setShowCreateModal(true)}
                isOverdueFilter={filters.overdue === 'true'}
              />

              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            </>
          )}

          {activeNav === 'dashboard' && (
            <Dashboard
              onNavigateToQueue={handleNavigateToQueueWithFilters}
              onCreateTicketClick={() => setShowCreateModal(true)}
            />
          )}

          {activeNav === 'agents' && (
            <AgentsList
              agents={agents}
              currentUser={currentUser}
              onSwitchUser={setCurrentUser}
              onAgentsUpdated={loadAgents}
              onNavigateToQueue={handleNavigateToQueueWithFilters}
            />
          )}

          {activeNav === 'escalations' && (
            <EscalationLog changes={escalationState.changes} onNavigateToQueue={handleNavigateToQueueWithFilters} />
          )}
        </main>
      </div>

      {/* Slide-out Ticket Detail Drawer */}
      {selectedTicketId && (
        <TicketDetail
          ticketId={selectedTicketId}
          agents={agents}
          currentUser={currentUser}
          onClose={() => setSelectedTicketId(null)}
          onTicketUpdated={() => {
            loadTickets();
            loadStats();
          }}
          onTicketDeleted={() => {
            loadTickets();
            loadStats();
            setSelectedTicketId(null);
          }}
        />
      )}

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <CreateTicketModal
          agents={agents}
          currentUser={currentUser}
          onClose={() => setShowCreateModal(false)}
          onTicketCreated={(newTicket) => {
            loadTickets();
            loadStats();
            setSelectedTicketId(newTicket.id);
          }}
        />
      )}
    </div>
  );
}
