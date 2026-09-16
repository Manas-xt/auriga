import React, { useState, useEffect, useCallback } from 'react';
import { fetchTickets, fetchAgents, updateTicket, fetchStats } from './api';
import { Sidebar } from './components/Sidebar';
import { TicketQueue } from './components/TicketQueue';
import { FilterBar } from './components/FilterBar';
import { Pagination } from './components/Pagination';
import { TicketDetail } from './components/TicketDetail';
import { CreateTicketModal } from './components/CreateTicketModal';
import { Dashboard } from './components/Dashboard';
import { AgentsList } from './components/AgentsList';

export default function App() {
  const [activeNav, setActiveNav] = useState('queue');
  const [theme, setTheme] = useState(() => localStorage.getItem('auriga_theme') || 'dark');

  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [agents, setAgents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [overdueCount, setOverdueCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: 'active',
    priority: 'all',
    assigned_to: 'all',
    search: '',
    overdue: 'false'
  });

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auriga_theme', theme);
  }, [theme]);

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
  }, [loadAgents, loadStats]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

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

  return (
    <div className="app-layout">
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
      />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top bar */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-breadcrumb">
              Helpdesk / <span>{activeNav === 'queue' ? 'Priority Queue' : activeNav === 'dashboard' ? 'Dashboard & SLA' : 'Team & Agents'}</span>
            </div>
          </div>

          <div className="topbar-right">
            <button className="btn btn-secondary btn-sm" onClick={loadTickets} title="Refresh Queue">
              🔄 Refresh
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
              + New Ticket
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="app-content">
          {/* Page header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">
                {activeNav === 'queue' && '🎫 Priority Helpdesk Queue'}
                {activeNav === 'dashboard' && '📊 Helpdesk Dashboard & SLA'}
                {activeNav === 'agents' && '👥 Support Team & Workload'}
              </h1>
              <p className="page-subtitle">
                {activeNav === 'queue' && 'The most urgent and overdue tickets automatically jump to the top'}
                {activeNav === 'dashboard' && 'Queue health metrics, response SLA monitoring, and priority engine analytics'}
                {activeNav === 'agents' && 'Helpdesk team members, ticket distribution, and workload management'}
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
