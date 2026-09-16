---
version: alpha
name: Auriga Helpdesk Queue
description: >
  Focused helpdesk design system for a large support queue. The primary goal
  is to make the most pressing ticket obvious, with overdue active tickets
  jumping to the front, while keeping search, filters, assignment, ticket
  detail, and pagination fast and consistent.
---

# Auriga Helpdesk — Design Specification

## 1. Product purpose

Auriga is a helpdesk application for teams handling many tickets.

The central problem is:

> Given a large queue, always make the next ticket to work on obvious.

Priority order of product concerns:

1. Correct queue ordering.
2. SLA visibility.
3. Overdue visibility.
4. Assignment.
5. Filtering.
6. Customer/ticket search.
7. Ticket detail and actions.
8. Pagination.

The queue is the product. Do not turn the application into a decorative
analytics dashboard.

## 2. Design DNA

Use the strongest practical traits of the supplied application references:

| Reference | Use in Auriga |
|---|---|
| Linear | Focus, compactness, keyboard-first interaction |
| Stripe | Forms, transactional clarity, data presentation |
| Supabase | Dense admin/data interfaces |
| Vercel | Minimal surfaces and restrained decoration |
| Notion | Clean information hierarchy |
| Slack | Workspace/navigation patterns |
| Figma | Complex interaction and panel patterns |
| Intercom | Record details and activity timelines |
| Apple-style UI | Restraint, accessibility, polished states |

Do not copy any application's branding. Build one consistent helpdesk system.

Avoid:
- marketing hero sections
- giant cards
- excessive gradients
- excessive shadows
- excessive rounded containers
- dashboard-first architecture
- multiple competing accent colors

## 3. Primary user questions

The UI must answer these immediately:

```text
What should I work on next?
What is overdue?
What is assigned to me?
What is unassigned?
Where is this customer's ticket?
What is the response deadline?
Who owns the ticket?
What can I do with it?
```

## 4. Information architecture

```text
Auriga
├── Queue
│   ├── All tickets
│   ├── My tickets
│   ├── Overdue
│   └── Unassigned
├── Tickets
│   └── Ticket detail
├── Customers
│   └── Customer ticket history
└── Settings
```

All tickets, My tickets, Overdue, and Unassigned are views over the same
ticket dataset, not separate products.

## 5. Application shell

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Auriga   Search tickets/customers...       Help  Notifications  Avatar   │
├──────────────┬───────────────────────────────────────────────────────────┤
│ Queue        │ Queue                                                     │
│  All tickets │                                                           │
│  My tickets  │ [Search] [Priority] [Status] [Assignee] [SLA]             │
│  Overdue     │                                                           │
│  Unassigned  │ ┌───────────────────────────────────────────────────────┐ │
│              │ │ Ticket queue                                          │ │
│ Tickets      │ │                                                       │ │
│ Customers    │ │ URGENT  Laptop won't boot   OVERDUE       Priya      │ │
│ Settings     │ │ URGENT  Demo issue          18m left      Amit       │ │
│              │ │ NORMAL  Bigger monitor      4h left       Unassigned │ │
│              │ └───────────────────────────────────────────────────────┘ │
└──────────────┴───────────────────────────────────────────────────────────┘
```

Desktop:
- persistent sidebar
- compact top bar
- wide data area
- clear current queue

Sidebar:
- 232–256px expanded
- 64–72px collapsed
- active item uses subtle surface and text emphasis
- counts only when useful
- permission-aware

## 6. Visual language

Default theme: light.

The interface should feel:
- operational
- calm
- precise
- moderately dense
- readable
- fast
- professional

Use borders and surface changes before shadows.

Do not make every ticket or metric a large floating card.

## 7. Color tokens

```yaml
colors:
  canvas: "#F7F8FA"
  surface: "#FFFFFF"
  surface-subtle: "#F9FAFB"
  surface-elevated: "#F1F3F5"
  surface-hover: "#F4F5F7"

  text-primary: "#17181A"
  text-secondary: "#5F6368"
  text-tertiary: "#7B8088"
  text-disabled: "#A5A9B0"

  border: "#E3E5E8"
  border-strong: "#D0D4D9"

  primary: "#5E6AD2"
  primary-hover: "#4F5BC4"
  primary-active: "#454FAE"
  primary-soft: "#EEF0FF"

  success: "#16803C"
  success-soft: "#EAF7EE"

  warning: "#A15C00"
  warning-soft: "#FFF4E5"

  danger: "#C62828"
  danger-soft: "#FDECEC"

  info: "#1769AA"
  info-soft: "#EAF4FC"
```

Rules:
- primary is for primary actions and focus
- danger represents overdue/error/destructive states
- warning represents approaching SLA/attention
- success represents resolved/completed
- never communicate state with color alone
- avoid full-row semantic backgrounds

## 8. Typography

Recommended:

```text
Inter
Geist
system-ui
```

```yaml
typography:
  page-title:   24px / 600 / 1.2
  section-title: 18px / 600 / 1.3
  ticket-title: 14px / 500 / 1.4
  body:         14px / 400 / 1.5
  small:        13px / 400 / 1.4
  caption:      12px / 400 / 1.4
  button:       14px / 500 / 1.2
  mono:         12px / 400 / 1.5
```

Use monospace for ticket IDs and technical identifiers.

## 9. Spacing and radius

Use a 4px base grid.

```yaml
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 40px

radius:
  small: 4px
  input: 6px
  button: 6px
  card: 8px
  dialog: 10px
  pill: 9999px
```

Recommended controls:
- input: 40px
- button: 36–40px
- table row: 48px
- compact row: 40px
- touch target: minimum 44px

## 10. Queue ordering — the core rule

Every ticket has:

```text
priority
agreed response time
SLA deadline
status
assignee
created time
```

Required SLA targets:

```text
Urgent: 2 hours
Normal: 1 day
```

### Deterministic queue order

```text
1. Active tickets before non-active tickets.
2. Overdue active tickets before active tickets still within SLA.
3. Within overdue tickets:
   higher priority first,
   then earliest SLA deadline / most overdue first.
4. Within non-overdue tickets:
   higher priority first,
   then nearest SLA deadline first.
5. Creation time is the next tie-breaker.
6. Ticket ID is the final stable tie-breaker if required.
```

Priority:

```text
Urgent > Normal
```

Example:

```text
A  Urgent  overdue 90m
B  Normal  overdue 20m
C  Urgent  45m remaining
D  Normal  3h remaining
```

Expected queue:

```text
A
B
C
D
```

Critical invariant:

> Any overdue active ticket must appear before any active ticket that is
> still within its SLA.

## 11. Queue architecture

Do not duplicate queue business logic in React components.

Preferred flow:

```text
Database
  ↓
Ticket query
  ↓
Authoritative queue ordering
  ↓
Search/filter
  ↓
Pagination
  ↓
API response
  ↓
React queue
```

The backend is the source of truth.

Do not use unexplained magic urgency weights if a deterministic comparator
can express the requirement.

## 12. SLA model

Store the actual deadline.

Minimum fields:

```text
createdAt
priority
slaDeadline
status
```

Initial calculation:

```text
Urgent  = createdAt + 2 hours
Normal  = createdAt + 1 day
```

Queue display:

```text
18m remaining
```

or:

```text
OVERDUE BY 42m
```

Detail display:

```text
SLA deadline
16 Sep 2026, 10:12 AM

Current state
Overdue by 42 minutes
```

Priority and SLA state are separate:

```text
Urgent + within SLA
Urgent + overdue
Normal + within SLA
Normal + overdue
```

## 13. Queue screen

```text
Queue

128 tickets                         7 overdue

[ Search tickets... ]

[ All ] [ My tickets ] [ Overdue ] [ Unassigned ]

Priority ▾   Status ▾   Assignee ▾   SLA ▾

┌────┬────────────────────┬──────────────┬─────────┬──────────┬───────────┐
│    │ Ticket             │ Customer     │ Priority│ Assignee │ SLA       │
├────┼────────────────────┼──────────────┼─────────┼──────────┼───────────┤
│ !  │ Laptop won't boot  │ Acme Corp    │ URGENT  │ Priya    │ OVERDUE   │
│ !  │ Client demo issue  │ Globex       │ URGENT  │ Amit     │ 18m left  │
│    │ Bigger monitor     │ Acme Corp    │ NORMAL  │ —        │ 4h left   │
└────┴────────────────────┴──────────────┴─────────┴──────────┴───────────┘

Showing 1–50 of 1,284
```

## 14. Ticket row

Default columns:

```text
Priority
Title
Customer
Status
Assignee
SLA
Updated
```

Optional:

```text
Ticket ID
Created
Category
```

Visual priority:

```text
1. Title
2. SLA
3. Priority
4. Customer
5. Assignee
6. Metadata
```

Do not overload the default table.

## 15. Overdue treatment

Use:

```text
OVERDUE BY 42m
```

with:
- danger text
- small danger indicator
- subtle danger background where useful

Do not make an entire overdue row bright red.

## 16. Pagination

Pagination is required for large queues.

```text
Showing 1–50 of 1,284

[ Previous ] 1 2 3 4 5 ... 26 [ Next ]
```

Rules:
- order before pagination
- filter/search before pagination
- never sort only the current page
- preserve filters between pages
- preserve queue semantics on every page
- default around 50 items per page

## 17. My tickets

Conceptually:

```text
assignee = currentUser
```

Use the same queue ordering.

```text
My tickets

12 assigned to you
2 overdue

[ Search ] [ Priority ] [ Status ] [ SLA ]
```

The view changes the dataset, not the sorting rules.

## 18. Overdue view

Conceptually:

```text
slaDeadline < now
AND
ticket is active
```

Example:

```text
Overdue

7 tickets

URGENT   Laptop won't boot       1h 12m overdue
URGENT   Client demo issue       24m overdue
NORMAL   Monitor request          5m overdue
```

## 19. Unassigned view

Conceptually:

```text
assignee = null
```

Example:

```text
Unassigned

4 tickets

Laptop request
Monitor request
VPN access
Printer issue

[ Assign selected ]
```

Bulk assignment is useful for a small helpdesk.

## 20. Filters

Primary filters:

```text
Priority
Status
Assignee
SLA
```

Optional:

```text
Customer
Created date
Updated date
```

UI:

```text
[ Search ] [ Priority ▾ ] [ Status ▾ ] [ Assignee ▾ ] [ SLA ▾ ]
```

Selected filters become removable chips:

```text
Priority: Urgent ×
Assignee: Priya ×
```

Filtering narrows the dataset without changing ordering semantics.

## 21. Search

Search is a first-class workflow.

Support:

```text
Ticket title
Customer name
Ticket ID
Customer email where appropriate
```

Example:

```text
Search: Acme

Customers
  Acme Corporation

Tickets
  Laptop won't boot
  Client demo issue
  VPN access
```

For large datasets:
- server-side search
- debounce input
- case-insensitive
- partial matches
- optional match highlighting

The user should not need a ticket ID to find a customer's ticket.

## 22. Search + queue

Search is a filtered view of the same queue.

If:

```text
A Urgent overdue
B Normal overdue
C Urgent 30m remaining
```

the result remains:

```text
A
B
C
```

Do not create an independent search sort.

## 23. Ticket detail

Existing component:

```text
client/src/components/TicketDetail.jsx
```

Recommended:

```text
← Queue

[URGENT] Laptop won't boot before client demo

Ticket #TCK-10241

                         [Assign] [Status ▾] [...]

Customer
Acme Corporation

Assignee
Priya

Status
Open

SLA
OVERDUE BY 42m

────────────────────────────────────────

Description

The laptop does not boot and the client demo
starts this afternoon.

────────────────────────────────────────

Activity

Priya assigned ticket
Today 10:12

Ticket created
Today 08:12
```

The detail view must answer:
1. What is this?
2. Who is it for?
3. What is its state?
4. What is its SLA?
5. Who owns it?
6. What can I do?
7. What happened?

## 24. Ticket actions

Primary:

```text
[ Assign ]
[ Status ▾ ]
```

Useful secondary actions:

```text
[ Change priority ]
[ ... ]
```

Keep important actions visible.

## 25. Assignment

```text
Assignee

[ Priya ▾ ]

Search agents...

○ Priya
○ Amit
○ Unassigned
```

Useful shortcut:

```text
[ Assign to me ]
```

Bulk:

```text
3 tickets selected

[ Assign ]
[ Change priority ]
[ Change status ]
```

## 26. Priority change

```text
Priority

● Urgent
○ Normal
```

Changing priority must immediately cause the ticket to be reconciled with
the authoritative queue ordering.

## 27. Ticket creation

Existing component:

```text
client/src/components/CreateTicketModal.jsx
```

Use a modal.

```text
Create ticket

Customer
[ Search customer... ]

Title
[____________________________]

Description
[____________________________]
[____________________________]

Priority
[ Normal ▾ ]

Assignee
[ Unassigned ▾ ]

[ Cancel ] [ Create ticket ]
```

Creation:

```text
Create
 ↓
Calculate SLA deadline
 ↓
Persist
 ↓
Place ticket in correct queue position
```

## 28. Ticket status

Initial status model:

```text
Open
In Progress
Waiting
Resolved
Closed
```

Typical flow:

```text
Open
 ↓
In Progress
 ↓
Resolved
 ↓
Closed
```

Waiting:

```text
In Progress
 ↓
Waiting
 ↓
In Progress
```

Keep the model simple unless requirements expand.

## 29. Activity timeline

```text
Activity

● Priority changed to Urgent
  By Priya · 10:42 AM

● Ticket assigned to Priya
  10:12 AM

● Ticket created
  08:12 AM
```

Useful events:

```text
created
assigned
unassigned
priority changed
status changed
description changed
resolved
closed
```

## 30. Existing component responsibilities

Project structure:

```text
client/
├── dist/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── AgentsList.jsx
│   │   ├── Badge.jsx
│   │   ├── CreateTicketModal.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TicketDetail.jsx
│   │   └── TicketQueue.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── package-lock.json

server/
├── node_modules/
├── routes/
│   ├── agents.js
│   └── tickets.js
├── utils/
│   └── UrgencyScore.js
├── data.json
├── db.js
├── index.js
├── seed.js
├── package.json
└── package-lock.json
```

Responsibilities:

```text
App.jsx
  application composition / routing

Sidebar.jsx
  navigation, active state, queue shortcuts

Dashboard.jsx
  lightweight operational overview

TicketQueue.jsx
  ordered queue rendering and selection

FilterBar.jsx
  search and filters

Pagination.jsx
  pagination controls

TicketDetail.jsx
  ticket record and actions

CreateTicketModal.jsx
  ticket creation

AgentsList.jsx
  agents / assignment

Badge.jsx
  priority, status and SLA presentation

api.js
  API communication

index.css
  design tokens and global styles

main.jsx
  application bootstrap
```

Do not put queue business rules into visual components.

## 31. UrgencyScore.js

Existing:

```text
server/utils/UrgencyScore.js
```

The product requirement is a deterministic ordering rule, not a magic score.

Prefer logic equivalent to:

```text
isOverdue
priorityRank
slaDeadline
createdAt
id
```

If the utility is retained, its result must produce exactly the documented
ordering.

Do not hide business-critical queue semantics behind unexplained numeric
weights.

## 32. API layer

Existing:

```text
client/src/api.js
```

Recommended abstraction:

```text
getTickets(params)
getTicket(id)
createTicket(data)
updateTicket(id, data)
getAgents()
getCustomers()
```

Example:

```text
GET /tickets
  ?page=1
  &limit=50
  &priority=urgent
  &assignee=agent-priya
  &status=open
  &search=acme
```

The API should return correctly ordered results.

## 33. Server routes

Existing:

```text
server/routes/agents.js
server/routes/tickets.js
```

Initial ticket endpoints:

```text
GET    /tickets
GET    /tickets/:id
POST   /tickets
PATCH  /tickets/:id
```

Possible later endpoints:

```text
POST /tickets/:id/assign
POST /tickets/:id/status
POST /tickets/:id/priority
```

Keep the API simple until separate operations are actually needed.

## 34. Ticket data model

Minimum:

```yaml
Ticket:
  id:
  title:
  description:
  customer:
  priority:
  status:
  assignee:
  createdAt:
  updatedAt:
  slaDeadline:
```

Optional later:

```text
resolvedAt
closedAt
category
```

Example:

```json
{
  "id": "TCK-10241",
  "title": "Laptop won't boot before client demo",
  "description": "The laptop does not boot.",
  "customer": {
    "id": "CUS-1001",
    "name": "Acme Corporation"
  },
  "priority": "urgent",
  "status": "open",
  "assignee": "agent-priya",
  "createdAt": "2026-09-16T08:12:00",
  "updatedAt": "2026-09-16T09:31:00",
  "slaDeadline": "2026-09-16T10:12:00"
}
```

## 35. Queue reactivity

Queue position can change when:

```text
priority changes
status changes
SLA state changes
SLA deadline changes
time crosses the SLA deadline
```

Example:

```text
Normal
3h remaining
    ↓
Priority changed to Urgent
    ↓
Reconcile with queue comparator
    ↓
Ticket moves to correct position
```

When a ticket crosses its SLA deadline:

```text
SLA deadline reached
    ↓
Ticket becomes overdue
    ↓
Ticket moves into overdue group
```

Do not require a full page reload for normal updates.

## 36. Real-time behavior

If real-time updates are added:

```text
TICKET_UPDATED
    ↓
Update local ticket
    ↓
Reconcile queue position
    ↓
Move minimally
```

Avoid repeatedly jumping the user's screen while they are reading.

A non-disruptive option:

```text
Queue updated · 2 tickets moved
[ Refresh position ]
```

## 37. Empty states

All tickets:

```text
No tickets

There are no tickets matching your current filters.

[ Clear filters ]
```

My tickets:

```text
No tickets assigned to you

You're currently not assigned any tickets.
```

Overdue:

```text
No overdue tickets

Everything is currently within its response target.
```

Unassigned:

```text
No unassigned tickets

All active tickets have an owner.
```

## 38. Loading states

Use skeleton rows.

```text
Queue

┌──────────────────────────────────────────────────────┐
│ ███████████████   █████████   ████████               │
│ ███████████████   █████████   ████████               │
│ ███████████████   █████████   ████████               │
│ ███████████████   █████████   ████████               │
└──────────────────────────────────────────────────────┘
```

For actions:

```text
[ Saving... ]
```

## 39. Error states

Queue:

```text
Unable to load tickets

The ticket queue could not be loaded.

[ Retry ]
```

Ticket:

```text
Unable to load ticket

The ticket may have been removed or the server is
temporarily unavailable.

[ Back to queue ] [ Retry ]
```

Errors should explain the problem and next action.

## 40. Confirmation

Use confirmation only for consequential actions.

```text
Delete ticket?

This will permanently remove the ticket.

[ Cancel ] [ Delete ticket ]
```

Do not confirm harmless navigation, filtering, searching, or selection.

## 41. Dashboard

Dashboard is supporting context, not the main product.

Useful:

```text
Open tickets
Overdue
My tickets
Unassigned
Next ticket
```

Example:

```text
Open          128
Overdue         7
My tickets     12
Unassigned      4

Next ticket
Laptop won't boot
URGENT
OVERDUE BY 42m

[ Open ticket ]
```

Do not add unrelated business analytics.

## 42. Responsive behavior

Breakpoints:

```yaml
breakpoints:
  mobile: 480px
  mobile-large: 640px
  tablet: 768px
  desktop: 1024px
  large: 1280px
  wide: 1440px
```

Desktop:
- persistent sidebar
- full queue table
- keyboard-first interaction

Tablet:
- collapsible sidebar
- reduced columns

Mobile:
- ticket cards
- single-column layout
- drawer/detail view
- preserve the exact queue ordering

Do not simply shrink the desktop table.

## 43. Mobile ticket card

```text
┌───────────────────────────────┐
│ URGENT · OVERDUE              │
│                               │
│ Laptop won't boot             │
│ Acme Corporation              │
│                               │
│ Priya                         │
│ Overdue by 42m                │
└───────────────────────────────┘
```

Primary mobile information:

```text
Priority
Title
Customer
SLA
Assignee
```

## 44. Accessibility

Target WCAG 2.2 AA.

Requirements:
- keyboard navigation
- visible focus
- semantic HTML
- accessible dialogs
- accessible table headers
- screen-reader labels
- no color-only state
- minimum 44px touch target
- clear form errors
- logical tab order
- focus restoration after modal close

Never represent urgency only with a red dot.

Use:

```text
URGENT
```

plus visual reinforcement.

## 45. Keyboard UX

Recommended:

```text
Ctrl/Cmd + K    Global search / command palette
/               Focus search
C               Create ticket
Esc             Close
Enter           Open/select
↑ / ↓           Navigate queue
```

Shortcuts accelerate expert users but must never be required.

## 46. Performance

Large queues require:

- server-side pagination
- server-side search where appropriate
- server-side filtering where appropriate
- server-side authoritative ordering
- no loading of every ticket into the browser
- no thousands of unnecessary DOM nodes
- debounced search
- cached stable agent/customer lists where useful

## 47. Queue invariants

These should be tested independently of the UI.

```text
1. Overdue active tickets appear before non-overdue active tickets.
2. Urgent precedes Normal within the same SLA state.
3. Deadline determines order within equivalent priority/SLA groups.
4. Filtering never changes ordering semantics.
5. Pagination never changes ordering semantics.
6. My tickets uses the same ordering.
7. Overdue contains only active overdue tickets.
```

## 48. Minimum queue test cases

Test:

```text
1. Urgent overdue vs normal overdue
2. Normal overdue vs urgent within SLA
3. Urgent within SLA vs normal within SLA
4. Identical SLA deadlines
5. Newly created urgent ticket
6. Ticket crossing SLA deadline
7. Overdue ticket becoming resolved
8. Assignment to current user
9. Assignee filtering
10. Priority filtering
11. Search by customer name
12. Pagination across ordered results
```

Expected example:

```text
A  Urgent  overdue 60m
B  Normal  overdue 10m
C  Urgent  30m remaining
D  Normal  2h remaining

Expected:
A
B
C
D
```

## 49. CSS architecture

Use CSS variables.

```css
:root {
  --color-bg-canvas: #f7f8fa;
  --color-bg-surface: #ffffff;
  --color-bg-subtle: #f9fafb;

  --color-text-primary: #17181a;
  --color-text-secondary: #5f6368;
  --color-text-tertiary: #7b8088;

  --color-border: #e3e5e8;
  --color-border-strong: #d0d4d9;

  --color-brand: #5e6ad2;
  --color-brand-hover: #4f5bc4;

  --color-success: #16803c;
  --color-warning: #a15c00;
  --color-danger: #c62828;
  --color-info: #1769aa;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
}
```

All components should consume tokens.

## 50. Implementation order

Build in this order:

```text
Phase 1 — Correctness
  Ticket model
  SLA calculation
  Queue comparator
  Pagination
  GET /tickets

Phase 2 — Queue UI
  TicketQueue
  FilterBar
  Pagination
  Badge
  Sidebar

Phase 3 — Ticket workflows
  TicketDetail
  CreateTicketModal
  Assignment
  Priority change
  Status change

Phase 4 — Search
  Ticket search
  Customer search

Phase 5 — Operational dashboard
  Open
  Overdue
  My tickets
  Unassigned
  Next ticket

Phase 6 — Polish
  Loading
  Empty states
  Error states
  Keyboard shortcuts
  Accessibility
  Responsive behavior
```

Do not spend significant effort polishing the dashboard before queue ordering
is correct.

## 51. Do

- Make the queue the primary screen.
- Make ordering deterministic.
- Put overdue active tickets first.
- Make SLA state obvious.
- Keep My tickets one click away.
- Keep Overdue one click away.
- Keep Unassigned one click away.
- Search by customer name.
- Apply ordering before pagination.
- Keep filters from changing ordering semantics.
- Make assignment fast.
- Reconcile the queue after mutations.
- Test the comparator independently.
- Keep business logic outside visual components.

## 52. Don't

- Do not sort only the current frontend page.
- Do not duplicate the queue algorithm in multiple components.
- Do not use unexplained urgency weights.
- Do not allow non-overdue active tickets above overdue active tickets.
- Do not hide SLA information only in ticket detail.
- Do not make the dashboard more important than the queue.
- Do not make every metric a card.
- Do not use color as the only urgency indicator.
- Do not overload the default table.
- Do not require full page reloads after ordinary updates.
- Do not turn this project into an ERP.
- Do not add unrelated modules without a product requirement.

## 53. Final UX loop

```text
Open Auriga
    ↓
See ordered queue
    ↓
Top ticket is clearly the most pressing
    ↓
Open ticket
    ↓
Understand customer + issue + priority + SLA
    ↓
Assign / update / resolve
    ↓
Return to queue
    ↓
Next pressing ticket is on top
```

## 54. Final rule

> **The queue is the product. Everything else exists to help the agent
> understand, filter, act on, and return to that queue.**
