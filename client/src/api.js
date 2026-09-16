const API_BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || 'Request failed');
  }

  return res.json();
}

// Tickets
export function fetchTickets(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== '' && val !== null) query.set(key, val);
  });
  return request(`/tickets?${query.toString()}`);
}

export function fetchTicket(id) {
  return request(`/tickets/${id}`);
}

export function createTicket(data) {
  return request('/tickets', { method: 'POST', body: JSON.stringify(data) });
}

export function updateTicket(id, data) {
  return request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export function deleteTicket(id) {
  return request(`/tickets/${id}`, { method: 'DELETE' });
}

export function fetchStats() {
  return request('/tickets/stats/summary');
}

// Agents
export function fetchAgents() {
  return request('/agents');
}

export function createAgent(data) {
  return request('/agents', { method: 'POST', body: JSON.stringify(data) });
}

export function deleteAgent(id) {
  return request(`/agents/${id}`, { method: 'DELETE' });
}
