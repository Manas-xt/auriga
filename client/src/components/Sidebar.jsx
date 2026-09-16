import React from 'react';
import { EscalationStrip } from './EscalationStrip';
import { Activity, BarChart3, Moon, Plus, Sun, Ticket, Users } from 'lucide-react';

export function Sidebar({
  activeNav,
  onNavigate,
  currentUser,
  agents,
  onSwitchUser,
  overdueCount,
  theme,
  onToggleTheme,
  onCreateTicketClick,
  onOpenMyTickets,
  onOpenEscalationLog,
  escalationState,
  onEscalationRun
}) {
  return (
    <aside className="sidebar sticky top-0 z-20 flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-surface-1 transition-[width] duration-200 dark:border-border-dark dark:bg-surface-dark1">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-5 dark:border-border-dark">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand font-bold text-white"><Activity size={17} aria-hidden="true" /></div>
        <div className="sidebar-brand text-base font-semibold tracking-[-0.3px] text-ink dark:text-ink-dark">Auriga Helpdesk</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-5">
          <div className="sidebar-section-label mb-1 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.8px] text-ink-subtle dark:text-ink-darkSubtle">Queue Management</div>

          <button
            className={`flex w-full cursor-pointer items-center gap-3 rounded-sm border-0 px-3 py-2 text-left text-[13.5px] font-medium transition-colors ${activeNav === 'queue' ? 'bg-brand-soft text-brand dark:bg-brand-darkSoft dark:text-brand' : 'text-ink-muted hover:bg-surface-3 hover:text-ink dark:text-ink-darkMuted dark:hover:bg-surface-dark3 dark:hover:text-ink-dark'}`}
            onClick={() => onNavigate('queue')}
          >
            <span className="sidebar-icon h-[18px] w-[18px] shrink-0 opacity-70"><Ticket size={17} aria-hidden="true" /></span>
            <span>Priority Queue</span>
            {overdueCount > 0 && (
              <span className="sidebar-badge ml-auto min-w-5 rounded-full bg-helpdesk-danger px-1.5 py-px text-center text-[11px] font-semibold text-white" title={`${overdueCount} overdue`}>
                {overdueCount}
              </span>
            )}
          </button>

          <button
            className="flex w-full cursor-pointer items-center gap-3 rounded-sm border-0 px-3 py-2 text-left text-[13.5px] font-medium text-ink-muted transition-colors hover:bg-surface-3 hover:text-ink dark:text-ink-darkMuted dark:hover:bg-surface-dark3 dark:hover:text-ink-dark"
            onClick={onOpenMyTickets}
            disabled={!currentUser}
          >
            <span className="sidebar-icon h-[18px] w-[18px] shrink-0 opacity-70"><Users size={17} aria-hidden="true" /></span>
            <span>Assigned to me</span>
          </button>

          <button
            className={`flex w-full cursor-pointer items-center gap-3 rounded-sm border-0 px-3 py-2 text-left text-[13.5px] font-medium transition-colors ${activeNav === 'escalations' ? 'bg-brand-soft text-brand dark:bg-brand-darkSoft dark:text-brand' : 'text-ink-muted hover:bg-surface-3 hover:text-ink dark:text-ink-darkMuted dark:hover:bg-surface-dark3 dark:hover:text-ink-dark'}`}
            onClick={() => onNavigate('escalations')}
          >
            <span className="sidebar-icon h-[18px] w-[18px] shrink-0 opacity-70"><Activity size={17} aria-hidden="true" /></span>
            <span>Escalation Log</span>
          </button>

          <button
            className={`flex w-full cursor-pointer items-center gap-3 rounded-sm border-0 px-3 py-2 text-left text-[13.5px] font-medium transition-colors ${activeNav === 'dashboard' ? 'bg-brand-soft text-brand dark:bg-brand-darkSoft dark:text-brand' : 'text-ink-muted hover:bg-surface-3 hover:text-ink dark:text-ink-darkMuted dark:hover:bg-surface-dark3 dark:hover:text-ink-dark'}`}
            onClick={() => onNavigate('dashboard')}
          >
            <span className="sidebar-icon h-[18px] w-[18px] shrink-0 opacity-70"><BarChart3 size={17} aria-hidden="true" /></span>
            <span>Dashboard & SLA</span>
          </button>

          <button
            className={`flex w-full cursor-pointer items-center gap-3 rounded-sm border-0 px-3 py-2 text-left text-[13.5px] font-medium transition-colors ${activeNav === 'agents' ? 'bg-brand-soft text-brand dark:bg-brand-darkSoft dark:text-brand' : 'text-ink-muted hover:bg-surface-3 hover:text-ink dark:text-ink-darkMuted dark:hover:bg-surface-dark3 dark:hover:text-ink-dark'}`}
            onClick={() => onNavigate('agents')}
          >
            <span className="sidebar-icon h-[18px] w-[18px] shrink-0 opacity-70"><Users size={17} aria-hidden="true" /></span>
            <span>Team & Agents</span>
          </button>
        </div>

        <div className="mb-5">
          <div className="sidebar-section-label mb-1 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.8px] text-ink-subtle dark:text-ink-darkSubtle">Quick Action</div>
          <button
            className="btn btn-primary w-full"
            onClick={onCreateTicketClick}
          >
            <Plus size={16} aria-hidden="true" /> New Ticket
          </button>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-border p-3 dark:border-border-dark">
        <EscalationStrip
          lastRunAt={escalationState?.last_run_at}
          changeCount={escalationState?.changes?.length || 0}
          onRunComplete={onEscalationRun}
          onOpenLog={onOpenEscalationLog}
        />
        {currentUser && (
          <div className="mb-3 flex items-center gap-2">
            <div
              className="agent-avatar-circle"
              style={{ backgroundColor: currentUser.avatar_color || '#5E6AD2' }}
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-ink dark:text-ink-dark">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-ink-subtle dark:text-ink-darkSubtle">Logged in agent</div>
            </div>
            {agents.length > 1 && (
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const found = agents.find(a => a.id === e.target.value);
                  if (found) onSwitchUser(found);
                }}
                className="h-[26px] max-w-[85px] px-1.5 py-0 text-[11px]"
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

        <button className="flex w-full cursor-pointer items-center gap-3 rounded-sm border-0 bg-transparent px-3 py-2 text-left text-[13px] font-medium text-ink-muted transition-colors hover:bg-surface-3 hover:text-ink dark:text-ink-darkMuted dark:hover:bg-surface-dark3 dark:hover:text-ink-dark" onClick={onToggleTheme}>
          <span>{theme === 'dark' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}</span>
          <span>{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
        </button>
      </div>
    </aside>
  );
}
