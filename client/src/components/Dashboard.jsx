import React, { useState, useEffect } from 'react';
import { fetchStats } from '../api';
import { PriorityBadge } from './Badge';

export function Dashboard({ onNavigateToQueue, onCreateTicketClick }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats()
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!stats) return null;

  const totalActive = stats.open || 0;
  const overdueCount = stats.overdue || 0;
  const resolvedCount = stats.resolved || 0;
  const totalCount = stats.total || 0;
  const activeByPriority = stats.byPriority || {};

  return (
    <div>
      {/* KPI Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigateToQueue({ status: 'active' })}>
          <div className="stat-label">Active Queue</div>
          <div className="stat-value">{totalActive}</div>
          <div className="stat-detail">Open & in-progress tickets</div>
        </div>

        <div
          className={`stat-card ${overdueCount > 0 ? 'danger' : ''}`}
          onClick={() => onNavigateToQueue({ overdue: 'true' })}
        >
          <div className="stat-label">Overdue Tickets</div>
          <div className="stat-value">{overdueCount}</div>
          <div className="stat-detail">Breached SLA deadline (Top of queue)</div>
        </div>

        <div className="stat-card" onClick={() => onNavigateToQueue({ status: 'resolved' })}>
          <div className="stat-label">Resolved</div>
          <div className="stat-value">{resolvedCount}</div>
          <div className="stat-detail">Completed support tickets</div>
        </div>

        <div className="stat-card" onClick={() => onNavigateToQueue({ status: 'all' })}>
          <div className="stat-label">Total Tickets</div>
          <div className="stat-value">{totalCount}</div>
          <div className="stat-detail">All historical records</div>
        </div>
      </div>

      {/* Two column layout for Breakdown & Queue Rules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--sp-6)', marginTop: 'var(--sp-6)' }}>
        {/* Priority Breakdown */}
        <div className="table-container" style={{ padding: 'var(--sp-5)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
            Active Tickets by Priority
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { key: 'critical', count: activeByPriority.critical || 0 },
              { key: 'urgent', count: activeByPriority.urgent || 0 },
              { key: 'high', count: activeByPriority.high || 0 },
              { key: 'normal', count: activeByPriority.normal || 0 },
              { key: 'low', count: activeByPriority.low || 0 }
            ].map(p => {
              const pct = totalActive > 0 ? Math.round((p.count / totalActive) * 100) : 0;
              return (
                <div
                  key={p.key}
                  onClick={() => onNavigateToQueue({ priority: p.key, status: 'active' })}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <PriorityBadge priority={p.key} />
                    <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                      <strong>{p.count}</strong> tickets ({pct}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: 'var(--primary)',
                        transition: 'width var(--transition-normal)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Engine Rules */}
        <div className="table-container" style={{ padding: 'var(--sp-5)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
            ⚡ Urgency Algorithm Mechanics
          </h3>

          <div style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '12px' }}>
              Every active ticket receives a dynamic <strong>Urgency Score</strong> computed at query time:
            </p>

            <div style={{ background: 'var(--surface-2)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '12px' }}>
              Score = Priority Weight + Overdue Boost + SLA Decay
            </div>

            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Critical (400) / Urgent (300):</strong> Base weight places emergencies above regular tickets.</li>
              <li><strong>Overdue Jump (+1000):</strong> As soon as SLA expires, ticket jumps to the front of the queue, ordered by how overdue it is.</li>
              <li><strong>Smooth Time Decay:</strong> Approaching deadline increases ticket score continuously ($0 \to 100$).</li>
            </ul>

            <button
              className="btn btn-primary btn-sm"
              style={{ marginTop: '20px' }}
              onClick={() => onNavigateToQueue({ status: 'active' })}
            >
              View Priority Queue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
