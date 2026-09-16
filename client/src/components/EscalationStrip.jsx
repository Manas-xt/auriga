import React, { useState } from 'react';
import { runEscalation } from '../api';

export function EscalationStrip({ lastRunAt, changeCount, onRunComplete, onOpenLog }) {
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    try {
      const result = await runEscalation();
      onRunComplete(result);
    } finally {
      setRunning(false);
    }
  };

  const runLabel = lastRunAt
    ? `${Math.max(0, Math.floor((Date.now() - new Date(lastRunAt).getTime()) / 60000))}m ago`
    : 'not run yet';

  return (
    <div className="escalation-strip">
      <div className="escalation-strip-title"><span className="escalation-pulse" /> Escalation check · {runLabel}</div>
      <div className="escalation-strip-row">
        <button className="escalation-log-link" onClick={onOpenLog}>
          {changeCount} ticket{changeCount === 1 ? '' : 's'} raised
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleRun} disabled={running}>
          {running ? 'Checking...' : 'Run now'}
        </button>
      </div>
    </div>
  );
}
