import React from 'react';

export function Pagination({ pagination, onPageChange, onLimitChange }) {
  const { page, limit, total, totalPages } = pagination;

  if (total === 0) return null;

  const startIdx = (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  return (
    <div className="pagination-bar">
      <div className="pagination-info">
        Showing <strong>{startIdx}</strong>–<strong>{endIdx}</strong> of <strong>{total}</strong> tickets
      </div>

      <div className="pagination-controls">
        <label htmlFor="limit-select" style={{ fontSize: '12px', color: 'var(--ink-subtle)', marginRight: '4px' }}>
          Per page:
        </label>
        <select
          id="limit-select"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="page-size-select"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <button
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          title="Previous Page"
          style={{ marginLeft: '8px' }}
        >
          ‹
        </button>

        <span style={{ fontSize: '12px', color: 'var(--ink-muted)', padding: '0 8px' }}>
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="pagination-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          title="Next Page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
