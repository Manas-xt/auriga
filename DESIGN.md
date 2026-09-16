---
version: alpha
name: Universal-ERP-Design-System
description: >
  A production-oriented design system for a multi-domain ERP platform serving
  hospitals, schools, offices, finance teams, operations teams, and other
  organizations. It combines the strongest practical characteristics of
  Linear (focus and information hierarchy), Stripe (forms, finance and
  transactional UX), Supabase (dense admin/data interfaces), Vercel
  (minimal visual language), Notion (flexible information structures),
  Slack (workspace navigation and communication), Figma (complex
  interaction patterns), Intercom (record-centric workflows), and
  Apple-inspired restraint and polish. The result is intentionally
  information-dense, calm, fast, accessible, and scalable rather than
  marketing-oriented.
---

# Universal ERP Design System

## 1. Product Philosophy

The ERP is an **operating system for an organization**, not a marketing website.

Primary principles:

- Information first.
- Actions should be obvious.
- Keep users in context.
- Optimize for repeated daily workflows.
- Prefer tables, lists, forms, filters, and detail views over decorative cards.
- Use progressive disclosure for complexity.
- Make dense information readable rather than hiding it behind excessive whitespace.
- Keep visual decoration subordinate to operational information.
- Every important action should have a keyboard and accessible interaction path.
- Consistency is more important than novelty.
- The UI must work for both a hospital receptionist and a finance administrator without changing its fundamental interaction model.

### Design DNA

| Source inspiration | ERP interpretation |
|---|---|
| Linear | Focus, hierarchy, keyboard-first navigation, compact UI |
| Stripe | Transactional forms, financial data, clean tables, trust |
| Supabase | Dense admin panels, developer-grade data management |
| Vercel | Minimal surfaces, restrained decoration, strong typography |
| Notion | Flexible records, nested information, editable content |
| Slack | Workspace navigation, notifications, contextual activity |
| Figma | Complex interactions, panels, multi-step editing |
| Intercom | Record detail pages, timelines, conversations, workflows |
| Apple | Restraint, clarity, accessibility, polished states |
| Airbnb | Clear empty states, approachable onboarding, human-readable content |
| Microsoft/Office-style ERP patterns | Familiar productivity conventions and enterprise workflows |

---

# 2. Core UX Model

Every ERP module should follow this general model:

```text
Workspace
    ↓
Module
    ↓
List / Search / Filter
    ↓
Record
    ↓
Detail
    ↓
Action
    ↓
Workflow / Approval
    ↓
Activity / Audit Trail
```

Example:

```text
Hospital
  → Patients
  → Patient List
  → Patient Record
  → Patient Detail
  → Appointment / Billing / Prescription
  → Approval where required
  → Audit history
```

The same structure should work for:

```text
School
  → Students
  → Student List
  → Student Record
  → Student Detail
  → Attendance / Fees / Exams

Office
  → Employees
  → Employee List
  → Employee Record
  → Employee Detail
  → Attendance / Payroll / Leave
```

---

# 3. Application Shell

## 3.1 Desktop Layout

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Workspace ▾        Search ⌘K                 Help   Notifications   Avatar │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │                                                              │
│ Dashboard    │ Breadcrumbs                                                  │
│              │                                                              │
│ Operations   │ Page title                              Primary action       │
│  Patients    │                                                              │
│  Students    │ Filters / tabs / views                                      │
│  Employees   │                                                              │
│  Inventory   │                                                              │
│              │ ┌──────────────────────────────────────────────────────────┐ │
│ Finance      │ │ Data table / record list                                │ │
│  Invoices    │ │                                                          │ │
│  Payments    │ │                                                          │ │
│  Expenses    │ └──────────────────────────────────────────────────────────┘ │
│              │                                                              │
│ People       │                                                              │
│  Employees   │                                                              │
│  Attendance  │                                                              │
│              │                                                              │
│ Reports      │                                                              │
│              │                                                              │
│ Settings     │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

## 3.2 Sidebar

Characteristics:

- Persistent on desktop.
- Collapsible to icon rail.
- Width: 240–280px expanded.
- Width: 64–72px collapsed.
- Group navigation by business domain.
- Show active module clearly.
- Support nested navigation.
- Show notification/count badges only when meaningful.
- Organization switcher at the top.
- Settings and profile actions near the bottom.
- Permission-aware: users only see modules they can access.

### Sidebar hierarchy

```text
Workspace
────────────────────
Dashboard

Operations
  ├─ Patients
  ├─ Appointments
  ├─ Admissions
  └─ Inventory

People
  ├─ Employees
  ├─ Attendance
  └─ Leave

Finance
  ├─ Invoices
  ├─ Payments
  └─ Expenses

Reports

────────────────────
Settings
```

---

# 4. Visual Direction

The ERP supports both **light and dark themes**.

Default recommendation:

- Light mode for general enterprise usage.
- Dark mode for users who prefer it and for long-duration desktop work.
- Never rely on color alone to communicate state.

The visual language should be:

- Neutral.
- Precise.
- Dense but breathable.
- Minimal.
- Professional.
- Slightly technical.
- Low decoration.
- High contrast.
- Clear hierarchy.

Avoid:

- Excessive gradients.
- Huge marketing headlines inside operational screens.
- Giant rounded cards.
- Excessive shadows.
- Multiple competing accent colors.
- Glassmorphism everywhere.
- Decorative illustrations in data-heavy screens.
- Dashboard layouts where every piece of information becomes a card.

---

# 5. Color System

The color system uses a neutral foundation and semantic accents.

## 5.1 Light Theme

```yaml
colors:
  canvas: "#F7F8FA"
  surface-1: "#FFFFFF"
  surface-2: "#F9FAFB"
  surface-3: "#F1F3F5"
  surface-hover: "#F4F5F7"

  ink: "#17181A"
  ink-muted: "#5F6368"
  ink-subtle: "#7B8088"
  ink-disabled: "#A5A9B0"

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

## 5.2 Dark Theme

```yaml
colors:
  canvas: "#0B0C0E"
  surface-1: "#111315"
  surface-2: "#17191C"
  surface-3: "#1D2024"
  surface-hover: "#202329"

  ink: "#F5F7F8"
  ink-muted: "#B1B6BE"
  ink-subtle: "#858B94"
  ink-disabled: "#5D626A"

  border: "#282C31"
  border-strong: "#383D44"

  primary: "#7B85E8"
  primary-hover: "#9098F0"
  primary-active: "#6973D8"
  primary-soft: "#202541"

  success: "#35B86B"
  success-soft: "#14291D"

  warning: "#D99032"
  warning-soft: "#302313"

  danger: "#EF6666"
  danger-soft: "#321A1A"

  info: "#62A9DF"
  info-soft: "#162735"
```

## 5.3 Color Rules

- Primary color is reserved for important actions and focus.
- Success, warning, danger, and info are semantic.
- Status colors must include text/icons, not color alone.
- Do not make every badge colorful.
- Charts should use a restrained palette.
- Use neutral surfaces for most components.
- Critical destructive actions use danger semantics.
- Financial values should not automatically be green/red unless the meaning is explicitly positive/negative.

---

# 6. Typography

Use a modern system sans.

Recommended:

```text
Inter
Geist
SF Pro
system-ui
```

Fallback:

```text
-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## Type scale

```yaml
typography:
  display:
    size: 40px
    weight: 600
    lineHeight: 1.15
    letterSpacing: -1.0px

  page-title:
    size: 28px
    weight: 600
    lineHeight: 1.2
    letterSpacing: -0.5px

  section-title:
    size: 20px
    weight: 600
    lineHeight: 1.3

  card-title:
    size: 16px
    weight: 600
    lineHeight: 1.4

  body:
    size: 14px
    weight: 400
    lineHeight: 1.5

  body-large:
    size: 16px
    weight: 400
    lineHeight: 1.5

  caption:
    size: 12px
    weight: 400
    lineHeight: 1.4

  label:
    size: 13px
    weight: 500
    lineHeight: 1.3

  button:
    size: 14px
    weight: 500
    lineHeight: 1.2

  mono:
    size: 12px
    weight: 400
    lineHeight: 1.5
```

### Typography rules

- Use negative tracking for large headings.
- Keep body text neutral and highly readable.
- Use semibold instead of bold wherever possible.
- Use monospace for IDs, invoice numbers, API values, codes, and technical data.
- Never use typography alone to compensate for bad information architecture.

---

# 7. Spacing

Use a 4px base grid.

```yaml
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
```

Common rules:

- Input horizontal padding: 12px.
- Input vertical padding: 8–10px.
- Card padding: 20–24px.
- Table cell padding: 10–14px.
- Section gap: 24–32px.
- Major page sections: 32–48px.
- Never create huge empty spaces in operational screens.

---

# 8. Border Radius

```yaml
radius:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 14px
  pill: 9999px
```

Usage:

- Buttons: 6–8px.
- Inputs: 6–8px.
- Cards: 8–12px.
- Dialogs: 12–14px.
- Status pills: pill.
- Avatars: circle.

ERP interfaces should not look like a collection of floating bubbles.

---

# 9. Elevation

Use borders and surface changes before shadows.

```text
Level 0
Canvas

Level 1
Surface + subtle border

Level 2
Elevated surface + stronger border

Level 3
Popover / dropdown / modal + shadow

Level 4
Critical overlay
```

Shadows should be:

- subtle
- short
- soft
- reserved for floating elements

Avoid heavy shadows on every card.

---

# 10. Buttons

## Primary

Use for:

- Create
- Save
- Submit
- Approve
- Confirm

```text
[ + New Patient ]
[ Save Changes ]
```

## Secondary

Use for:

- Cancel
- Export
- View
- Secondary workflows

```text
[ Export ]
```

## Tertiary

Use for low-emphasis actions:

```text
More
View all
Learn more
```

## Destructive

```text
[ Delete Employee ]
```

Rules:

- One primary action per major context.
- Do not make every button primary.
- Destructive actions require confirmation when consequences are meaningful.
- Buttons must have visible disabled, hover, focus, loading, and pressed states.

---

# 11. Inputs

Standard field:

```text
Email
[ rahul@example.com                         ]

Helper text explaining the expected value.
```

Error:

```text
Email
[ invalid@email                         ]
This email address is not valid.
```

Rules:

- Labels remain visible.
- Placeholder text is not a replacement for labels.
- Validation should be close to the field.
- Preserve entered values after validation failures.
- Support keyboard navigation.
- Support autocomplete where appropriate.

---

# 12. Tables

Tables are a primary ERP component.

Example:

```text
Patients                                      + New Patient

[ Search patients... ] [ Filter ] [ Columns ] [ Export ]

┌────┬────────────────┬────────┬───────────┬──────────────┬─────┐
│ □  │ Patient        │ Status │ Department│ Last visit   │ ... │
├────┼────────────────┼────────┼───────────┼──────────────┼─────┤
│ □  │ Rahul Sharma   │ Active │ Cardiology│ 16 Sep 2026  │ ... │
│ □  │ Priya Singh    │ Active │ Pediatrics│ 15 Sep 2026  │ ... │
│ □  │ Amit Verma     │ Pending│ General   │ 15 Sep 2026  │ ... │
└────┴────────────────┴────────┴───────────┴──────────────┴─────┘

Showing 1–50 of 1,248                          < 1 2 3 ... >
```

Table requirements:

- Search.
- Sorting.
- Filtering.
- Column visibility.
- Column resizing where useful.
- Pagination or virtualization for large datasets.
- Bulk selection.
- Bulk actions.
- Row actions.
- Empty state.
- Loading state.
- Error state.
- Keyboard navigation.
- Sticky header for long tables.
- Responsive transformation for mobile.

### Density

Default density:

```text
Compact:   40px row
Default:   48px row
Comfortable: 56px row
```

Allow users to choose density when the dataset is large.

---

# 13. Filters

Filters should be composable.

```text
Search...

Status       [ Active ▾ ]
Department   [ Cardiology ▾ ]
Date         [ Last 30 days ▾ ]
Doctor       [ Any ▾ ]

[ Clear filters ]
```

Advanced filtering:

```text
Status = Active
AND
Department = Cardiology
AND
Last visit >= 01 Sep 2026
```

Support:

- saved views
- recent filters
- clear all
- filter count
- URL/shareable filter state where appropriate

---

# 14. Record Detail Pattern

Use a consistent record page.

```text
← Patients

Rahul Sharma                                      Edit
Patient ID: PT-10241

[ Overview ] [ Appointments ] [ Billing ] [ Documents ] [ Activity ]

┌─────────────────────────────────────────────────────┐
│ Personal information                                │
│                                                     │
│ Date of birth       12 Jan 2002                     │
│ Phone               +91 XXXXX XXXXX                 │
│ Email               rahul@example.com               │
│ Department          Cardiology                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Recent activity                                     │
│                                                     │
│ Appointment created                       Today     │
│ Invoice paid                             Yesterday  │
│ Record updated                           12 Sep     │
└─────────────────────────────────────────────────────┘
```

The detail screen should answer:

1. Who/what is this?
2. What is its current state?
3. What can I do?
4. What information matters?
5. What happened previously?

---

# 15. Activity Timeline

Inspired by record-centric products.

```text
Activity

● Invoice paid
  ₹25,000
  Today, 10:42 AM

● Appointment completed
  Dr. Sharma
  Yesterday, 4:20 PM

● Patient information updated
  By Admin
  12 Sep 2026
```

Use timelines for:

- audit history
- patient history
- employee history
- approval history
- document changes
- communication history

---

# 16. Drawers

Use drawers for quick contextual work.

```text
                         ┌─────────────────────────────┐
                         │ Edit Employee           ×   │
                         ├─────────────────────────────┤
                         │                             │
                         │ Name                        │
                         │ [________________________]  │
                         │                             │
                         │ Department                  │
                         │ [ Engineering ▾ ]           │
                         │                             │
                         │ Role                        │
                         │ [ Engineer ]                 │
                         │                             │
                         │ Cancel       Save Changes   │
                         └─────────────────────────────┘
```

Use drawers when:

- the user needs to preserve the underlying context
- the operation is relatively short
- the form is not a multi-step workflow

Use a full page for:

- complex forms
- long workflows
- reports
- major configuration
- multi-step processes

---

# 17. Command Palette

Global command/search:

```text
⌘ K

┌────────────────────────────────────────────┐
│ Search patients, invoices, employees...    │
├────────────────────────────────────────────┤
│ Recent                                     │
│   Rahul Sharma                             │
│   Invoice INV-20491                        │
│                                            │
│ Actions                                    │
│   Create patient                           │
│   Create invoice                           │
│   Run payroll                              │
│   Export report                            │
└────────────────────────────────────────────┘
```

Must support:

- global search
- navigation
- actions
- recent records
- keyboard shortcuts

Keyboard:

```text
Cmd/Ctrl + K   Global command palette
Cmd/Ctrl + /   Search
Esc            Close
↑ ↓            Navigate
Enter          Select
```

---

# 18. Dashboard

Dashboard should be operational, not decorative.

Recommended structure:

```text
Dashboard

Good morning, Admin

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Patients │ │ Revenue  │ │ Pending  │ │ Tasks    │
│ 1,248     │ │ ₹24.5M   │ │ 128      │ │ 42       │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Recent activity                    Tasks requiring attention

┌─────────────────────────┐       ┌───────────────────────┐
│ Patient admitted        │       │ 8 invoices pending    │
│ Invoice generated       │       │ 3 approvals waiting   │
│ Employee added          │       │ 2 stock alerts        │
└─────────────────────────┘       └───────────────────────┘

Operational report

┌─────────────────────────────────────────────────────────┐
│ Chart / table / trend                                  │
└─────────────────────────────────────────────────────────┘
```

### Dashboard rules

- Maximum 4–6 KPI cards above the fold.
- Every KPI must answer a business question.
- Include "needs attention" items.
- Prefer actionable data over vanity metrics.
- Allow role-based dashboards.

---

# 19. Role-Based Home

Different users should see different priorities.

### Hospital receptionist

```text
Appointments
Patients
Admissions
Payments
Tasks
```

### Doctor

```text
Today's appointments
Patient queue
Patient records
Prescriptions
Clinical tasks
```

### School administrator

```text
Students
Teachers
Attendance
Fees
Exams
Reports
```

### Finance manager

```text
Invoices
Payments
Expenses
Payroll
Approvals
Reports
```

Same design system. Different information priority.

---

# 20. Status System

Statuses should be standardized.

```yaml
status:
  neutral:
    - Draft
    - Archived
    - Inactive

  info:
    - Scheduled
    - Processing
    - Under Review

  success:
    - Active
    - Completed
    - Paid
    - Approved

  warning:
    - Pending
    - Expiring
    - Needs Attention

  danger:
    - Failed
    - Rejected
    - Overdue
    - Cancelled
```

Status badge:

```text
● Active
● Pending
● Overdue
```

Avoid unnecessary status colors.

---

# 21. Notifications

Notification center:

```text
Notifications

Today

● Invoice #INV-20491 was paid
  5 min ago

● Approval required: Purchase Order #PO-104
  22 min ago

Earlier

● Employee document expires in 30 days
  Yesterday
```

Notifications must be:

- actionable
- grouped
- dismissible
- timestamped
- linked to the relevant record

Avoid notification spam.

---

# 22. Search

Search should operate across the organization.

Search:

```text
Rahul Sharma
```

Results:

```text
People
  Rahul Sharma
  Employee · Engineering

Patients
  Rahul Sharma
  Patient · Cardiology

Invoices
  INV-20491
  Rahul Sharma
```

Search should support:

- exact matches
- partial matches
- IDs
- names
- email
- phone where permitted
- module filtering
- recent searches

---

# 23. Empty States

Bad:

```text
Nothing here.
```

Good:

```text
No patients found

Try changing your filters or create a new patient.

[ + New Patient ]
```

Empty states should explain:

1. What is empty?
2. Why might it be empty?
3. What should the user do next?

---

# 24. Loading States

Use skeletons for predictable content.

```text
┌───────────────────────────────────────┐
│ ███████████                           │
│                                       │
│ █████████████████████████             │
│ ███████████████████                   │
└───────────────────────────────────────┘
```

For actions:

```text
[ Saving... ]
```

Never leave the user guessing whether an operation is happening.

---

# 25. Error States

Errors should be specific.

Bad:

```text
Something went wrong.
```

Better:

```text
Unable to save employee

The email address is already associated with another employee.

[ Review employee ]
```

System error:

```text
Unable to load patients

Check your connection and try again.

[ Retry ]
```

---

# 26. Confirmation Dialogs

Only use confirmation dialogs when the action is consequential.

```text
Delete employee?

This will remove the employee from active records.
Historical payroll information will be preserved.

[ Cancel ] [ Delete Employee ]
```

Avoid confirmation for harmless actions such as:

- opening
- filtering
- selecting
- ordinary navigation

---

# 27. Forms

Forms should be organized into logical sections.

```text
Create Employee

Basic information
────────────────────────────
First name       Last name
[___________]    [___________]

Email
[____________________________]

Employment
────────────────────────────
Department       Role
[___________]    [___________]

Start date
[___________]

Documents
────────────────────────────
[ Upload document ]

                    [Cancel] [Create Employee]
```

Rules:

- Group related fields.
- Use two columns on desktop when appropriate.
- One column on mobile.
- Mark required fields clearly.
- Keep labels persistent.
- Avoid excessively long single-page forms.
- Use multi-step forms for genuinely complex workflows.

---

# 28. Multi-Step Workflows

Use a stepper for complex processes.

```text
Create Purchase Order

1. Supplier  →  2. Items  →  3. Review  →  4. Submit

Current: Items
────────────────────────────

Product       Qty       Price
Laptop        10        ₹80,000
Monitor       10        ₹15,000

[Back]                         [Continue]
```

Always show:

- current step
- completed steps
- remaining steps
- ability to go back when safe

---

# 29. Approval Workflow

Enterprise systems need explicit workflow states.

```text
Draft
  ↓
Submitted
  ↓
Under Review
  ↓
Approved
  ↓
Completed
```

Rejected:

```text
Submitted
    ↓
Under Review
    ↓
Rejected
    ↓
Draft / Resubmission
```

Show:

- who submitted
- who approved
- timestamp
- comments
- current state
- next required action

---

# 30. Audit Log

Every important enterprise action should be traceable.

```text
Audit log

User             Action                    Time
Admin            Updated salary           10:42
Finance          Approved invoice         09:30
HR               Added employee            09:12
```

For sensitive modules, preserve:

- actor
- action
- timestamp
- record
- previous value
- new value
- source/context where appropriate

---

# 31. Reports

Reports should prioritize readability and exportability.

```text
Revenue Report

Date range       [ Sep 1 – Sep 16 ]
Department       [ All ▾ ]

[ Apply ]

Revenue                    ₹24,580,000
Outstanding                 ₹2,420,000
Collected                   ₹22,160,000

────────────────────────────────────────

Date       Revenue       Expenses       Net
Sep 01     ₹...          ₹...           ₹...
Sep 02     ₹...          ₹...           ₹...

[ Export CSV ] [ Export PDF ]
```

Rules:

- Table first when exact values matter.
- Chart second when trends matter.
- Provide date ranges.
- Provide filters.
- Make exports obvious.
- Don't force users to interpret a chart to obtain a number.

---

# 32. Data Visualization

Use charts only when they answer a useful question.

Good:

- revenue over time
- attendance trend
- patient volume
- inventory movement
- expense distribution

Bad:

- decorative pie chart with no action
- chart that duplicates a simple number
- excessive chart colors

Chart principles:

- neutral grid
- restrained palette
- clear labels
- accessible contrast
- tooltips
- table alternative for exact data

---

# 33. Responsive Design

Breakpoints:

```yaml
breakpoints:
  mobile: 480px
  mobile-large: 640px
  tablet: 768px
  desktop: 1024px
  desktop-large: 1280px
  wide: 1440px
```

### Desktop

- Persistent sidebar.
- Multi-column layouts.
- Dense tables.
- Keyboard-first interaction.

### Tablet

- Collapsible sidebar.
- Reduced table columns.
- Two-column forms where space allows.

### Mobile

- Bottom sheet/drawer where appropriate.
- Single-column forms.
- Card/list transformation for tables.
- Horizontal scrolling only when genuinely necessary.
- Large touch targets.
- Simplified navigation.

Minimum touch target:

```text
44 × 44px
```

---

# 34. Table Mobile Transformation

Do not shrink a desktop table until it becomes unusable.

Desktop:

```text
Name | Department | Status | Manager | Joined | Salary
```

Mobile:

```text
Rahul Sharma
Engineering · Software Engineer

Active
Joined 12 Aug 2026

Salary: ₹...
Manager: ...
```

Secondary information can move into a detail view.

---

# 35. Icons

Recommended icon style:

- Lucide-style
- 16–20px standard
- 1.5–2px stroke
- consistent optical size

Use icons for:

- navigation
- actions
- status reinforcement
- search
- filtering
- sorting

Do not replace text labels with icons when the meaning is ambiguous.

---

# 36. Motion

Motion should communicate state, not decorate the interface.

Use:

- 120–180ms micro-interactions
- 180–250ms drawers
- subtle hover transitions
- skeleton transitions
- menu transitions

Avoid:

- large entrance animations
- bouncing buttons
- unnecessary parallax
- slow transitions in frequently used workflows

Respect:

```text
prefers-reduced-motion
```

---

# 37. Accessibility

Target WCAG 2.2 AA.

Requirements:

- Keyboard navigation.
- Visible focus.
- Screen-reader labels.
- Semantic HTML.
- Sufficient contrast.
- No color-only state.
- 44px touch targets.
- Accessible dialogs.
- Accessible dropdowns.
- Accessible tables.
- Form error association.
- Focus management after modal/drawer actions.

Focus style:

```text
2px primary outline
+ subtle offset
```

---

# 38. Permissions

The design must visually communicate permissions.

Example:

```text
Invoice

Amount      ₹250,000
Status      Approved

[ View ]

Edit        Disabled
Delete      Disabled
```

Do not hide important information about why an action is unavailable when a clear explanation is safe.

Permission model:

```text
Organization
  ↓
Role
  ↓
Module
  ↓
Resource
  ↓
Action
```

Actions:

```text
view
create
edit
delete
approve
export
manage
```

---

# 39. Organization / Workspace Switching

For multi-tenant ERP:

```text
┌──────────────────────────────┐
│ ACME Hospital                │
│ Hospital Group               │
├──────────────────────────────┤
│ ✓ Main Hospital              │
│   City Clinic                │
│   Research Center            │
├──────────────────────────────┤
│ + Add organization           │
└──────────────────────────────┘
```

Never make users wonder which organization they are modifying.

The active organization should always be visible.

---

# 40. Universal Components

Build these components first:

```text
AppShell
Sidebar
TopBar
Breadcrumbs
CommandPalette
Search
Button
IconButton
Input
Textarea
Select
Combobox
DatePicker
DateRangePicker
Checkbox
Radio
Switch
Tabs
Badge
StatusBadge
Tooltip
Popover
Dropdown
Menu
Modal
Drawer
Toast
Alert
Table
DataTable
Pagination
FilterBar
FilterBuilder
EmptyState
Skeleton
ErrorState
Timeline
Avatar
AvatarGroup
Card
StatCard
Chart
FileUploader
Stepper
AuditLog
ActivityFeed
```

---

# 41. Page Templates

Standardize these templates.

## List page

```text
Breadcrumb
Page title
Description
Primary action

Search + filters + views

Data table

Pagination
```

## Detail page

```text
Breadcrumb
Record header
Actions

Tabs

Summary
Sections
Activity
Related records
```

## Form page

```text
Breadcrumb
Title

Form sections

Footer actions
```

## Dashboard

```text
Greeting / context

KPIs

Needs attention

Activity

Reports
```

## Report

```text
Title
Date range
Filters
Summary metrics
Chart
Table
Export
```

---

# 42. Information Density

ERP users frequently process hundreds or thousands of records.

Default density should therefore be higher than a consumer application.

Recommended:

```text
Consumer app:
Large spacing
Large cards
Few data points

ERP:
Moderate spacing
Compact controls
Many data points
Strong alignment
Fast scanning
```

The goal is not maximum density.

The goal is:

> **Maximum useful information per unit of attention.**

---

# 43. Keyboard-First UX

Support common shortcuts:

```text
Cmd/Ctrl + K       Command palette
Cmd/Ctrl + /       Search
C                  Create
E                  Edit
Esc                Close
Enter              Confirm/select
↑ ↓                Navigate
J / K              Move through lists where appropriate
```

Don't force keyboard shortcuts onto every action. They should accelerate expert users without confusing beginners.

---

# 44. Notifications and To-Dos

Create an explicit "Needs attention" model.

```text
Needs attention

8 invoices overdue                 →
3 approvals pending                →
2 inventory items below threshold  →
1 employee document expiring       →
```

This is more useful than filling the dashboard with decorative metrics.

---

# 45. Contextual Actions

Actions should live close to the record they affect.

Good:

```text
Employee
Rahul Sharma                         [Edit]
```

Good:

```text
Invoice #INV-20491

[ Download ] [ Send ] [ Mark as Paid ] [ ... ]
```

Avoid:

```text
Top navigation
    ↓
Actions
    ↓
Find the record
```

---

# 46. Design Tokens

The application should be implemented with tokens rather than hard-coded styles.

Example:

```css
--color-bg-canvas
--color-bg-surface
--color-bg-elevated

--color-text-primary
--color-text-secondary
--color-text-tertiary

--color-border
--color-border-strong

--color-brand
--color-brand-hover

--color-success
--color-warning
--color-danger
--color-info

--radius-sm
--radius-md
--radius-lg

--space-1
--space-2
--space-3
--space-4
--space-6
--space-8
```

Every component should consume tokens.

---

# 47. Domain Neutrality

The core UI should not contain hospital-specific assumptions.

Use generic concepts:

```text
Person
Organization
Department
Location
Record
Appointment
Task
Document
Transaction
Payment
Approval
Asset
Inventory
Workflow
Activity
```

Domain modules can map these concepts:

```text
Hospital:
Person → Patient
Appointment → Medical Appointment

School:
Person → Student
Appointment → Parent Meeting

Office:
Person → Employee
Appointment → Meeting
```

This keeps the design system reusable.

---

# 48. Design Rules by Reference

## Linear influence

Use for:

- compact navigation
- keyboard interaction
- issue/list patterns
- hierarchy
- restrained accent usage
- fast workflows

Do not copy:

- marketing-site proportions
- huge hero typography
- dark-only product assumptions

## Stripe influence

Use for:

- financial records
- checkout-like workflows
- forms
- billing
- invoices
- transactional confidence
- clean data presentation

## Supabase influence

Use for:

- admin panels
- technical tables
- settings
- data management
- dense layouts

## Vercel influence

Use for:

- minimal surfaces
- typography
- spacing discipline
- restrained visual hierarchy

## Notion influence

Use for:

- documents
- flexible records
- nested content
- editable metadata
- contextual information

## Slack influence

Use for:

- workspace switching
- notification center
- activity
- contextual navigation
- communication surfaces

## Figma influence

Use for:

- complex editors
- side panels
- property panels
- multi-selection
- advanced interaction states

## Intercom influence

Use for:

- customer/person records
- timelines
- tasks
- conversations
- contextual actions

## Apple influence

Use for:

- simplicity
- typography
- accessibility
- polished transitions
- restraint

---

# 49. What NOT to Do

Do not:

- Make every page a dashboard.
- Put every metric in a card.
- Use a different design language for every module.
- Use five primary colors.
- Hide important actions behind three menus.
- Build giant forms without sections.
- Make tables unreadably dense.
- Make tables excessively spacious.
- Use placeholder text as labels.
- Use color alone for status.
- Overuse gradients.
- Overuse glassmorphism.
- Use huge rounded rectangles everywhere.
- Animate routine actions excessively.
- Make mobile a scaled-down desktop.
- Create custom UI for every CRUD screen.
- Sacrifice accessibility for visual style.
- Copy a consumer app's interface directly into an enterprise workflow.

---

# 50. Recommended Component Priority

Build in this order:

```text
Phase 1 — Foundation
├── Tokens
├── Typography
├── Colors
├── Icons
├── Buttons
├── Inputs
└── Layout

Phase 2 — Navigation
├── App shell
├── Sidebar
├── Top bar
├── Breadcrumbs
├── Workspace switcher
└── Command palette

Phase 3 — Data
├── Data table
├── Search
├── Filters
├── Pagination
├── Sorting
└── Saved views

Phase 4 — Records
├── Detail page
├── Tabs
├── Activity timeline
├── Related records
└── Audit log

Phase 5 — Workflow
├── Forms
├── Drawers
├── Modals
├── Stepper
├── Approval flow
└── Notifications

Phase 6 — Analytics
├── KPI
├── Charts
├── Reports
└── Export

Phase 7 — Enterprise
├── Permissions
├── Organizations
├── Roles
├── Audit
└── Settings
```

---

# 51. Golden Rule

When deciding between two designs, ask:

```text
Can the user find the information?
        ↓
Can the user understand the state?
        ↓
Can the user perform the action?
        ↓
Can the user verify what happened?
```

If yes, the design is doing its job.

The ERP should feel like:

```text
Linear's focus
        +
Stripe's trust
        +
Supabase's data density
        +
Vercel's restraint
        +
Notion's flexibility
        +
Slack's workspace model
        +
Figma's interaction depth
        +
Intercom's record workflows
        +
Apple's polish
```

The final product should **not visually imitate any one of these applications**. It should use their strongest interaction principles to create a consistent ERP-specific system.
