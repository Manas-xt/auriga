---
version: alpha
name: Frontline-helpdesk-queue-design
description: "A product design system for an SLA-driven helpdesk queue, derived from the Linear marketing system (#010102 canvas, #5e6ad2 lavender accent, four-step surface ladder, hairline borders) and extended into dense product UI. Where the Linear marketing spec deliberately forbids a second chromatic accent, this system introduces a sanctioned in-product semantic palette — because the queue's entire job is to encode urgency as color. Priority runs gray → blue → orange → red; SLA state runs subtle → amber → red. Lavender is reserved exclusively for system authorship: the automated escalation pass, focus rings, and the primary CTA. Typography re-anchors from marketing display sizes to a compact 12–14px product scale with tabular numerals on every countdown. The page rhythm is a single dense scannable list — the queue row is the protagonist, and every other surface exists to filter, sort, or explain it."

colors:
  primary: "#5e6ad2"
  on-primary: "#ffffff"
  primary-hover: "#828fff"
  primary-focus: "#5e69d1"
  primary-wash: "#1c1e35"

  ink: "#f7f8f8"
  ink-muted: "#d0d6e0"
  ink-subtle: "#8a8f98"
  ink-tertiary: "#62666d"

  canvas: "#010102"
  surface-1: "#0f1011"
  surface-2: "#141516"
  surface-3: "#18191a"
  surface-4: "#191a1b"

  hairline: "#23252a"
  hairline-strong: "#34343a"
  hairline-tertiary: "#3e3e44"

  priority-urgent: "#eb5757"
  priority-high: "#f2994a"
  priority-normal: "#4ea7fc"
  priority-low: "#62666d"

  priority-urgent-wash: "#2a1618"
  priority-high-wash: "#2a1f14"
  priority-normal-wash: "#0f1c2b"

  sla-breached: "#eb5757"
  sla-due-soon: "#f2c94c"
  sla-on-track: "#8a8f98"
  sla-met: "#4cb782"

  status-open: "#8a8f98"
  status-progress: "#f2c94c"
  status-waiting: "#7a7fad"
  status-resolved: "#4cb782"

  semantic-success: "#27a644"
  semantic-danger: "#eb5757"
  semantic-overlay: "#000000"

typography:
  page-title:
    fontFamily: Display
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.4px
  section-title:
    fontFamily: Display
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: -0.2px
  row-title:
    fontFamily: Text
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.05px
  body:
    fontFamily: Text
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  body-sm:
    fontFamily: Text
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  meta:
    fontFamily: Text
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  label:
    fontFamily: Text
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0.4px
  button:
    fontFamily: Text
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0
  mono:
    fontFamily: Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  countdown:
    fontFamily: Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  app-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.body-sm}"
    padding: 12px
    width: 240px
  sidebar-item:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 6px 8px
  sidebar-item-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 6px 8px
  toolbar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    height: 48px
    padding: 0 16px
  queue-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.row-title}"
    rounded: "{rounded.xs}"
    padding: 10px 16px
    height: 44px
  queue-row-hover:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.row-title}"
    rounded: "{rounded.xs}"
    padding: 10px 16px
  queue-row-selected:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.row-title}"
    rounded: "{rounded.xs}"
    padding: 10px 16px
  queue-row-breached:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.row-title}"
    rounded: "{rounded.xs}"
    padding: 10px 16px
  queue-group-header:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: 6px 16px
    height: 30px
  priority-badge:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.meta}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  status-badge:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  sla-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.sla-on-track}"
    typography: "{typography.countdown}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  sla-chip-breached:
    backgroundColor: "{colors.priority-urgent-wash}"
    textColor: "{colors.sla-breached}"
    typography: "{typography.countdown}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  escalation-badge:
    backgroundColor: "{colors.primary-wash}"
    textColor: "{colors.primary-hover}"
    typography: "{typography.meta}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  filter-chip:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 4px 10px
  filter-chip-active:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 4px 10px
  search-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 6px 10px
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  select-menu:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 4px
  assignee-avatar:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: 0
    size: 20px
  detail-panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 24px
    width: 420px
  escalation-strip:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.meta}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  audit-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    padding: 10px 0
  stat-tile:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 6px 12px
  button-ghost:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 6px 10px
  pagination-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.meta}"
    height: 44px
    padding: 0 16px
  empty-state:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.body-sm}"
    padding: 64px
  skeleton-row:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-tertiary}"
    rounded: "{rounded.xs}"
    height: 44px
---

## Overview

This is a **product** system, not a marketing system. The parent Linear spec documents a marketing canvas and explicitly notes in its Known Gaps that "Linear's actual product UI uses a richer color-tag palette (red, orange, yellow, green, blue, purple) for issue priorities" — colors that live only inside the screenshots. This app *is* that screenshot. So this spec inherits Linear's surfaces, hairlines, radii, and lavender discipline, then fills the documented gap with a semantic palette.

The core inherited decisions are unchanged:

- `{colors.canvas}` #010102 as the anchor surface — near-black with a faint blue tint, never `#000000`.
- A four-step surface ladder carrying hierarchy without drop shadows.
- 1px hairline borders at `{colors.hairline}` #23252a.
- `{rounded.md}` 8px on buttons and inputs, `{rounded.lg}` 12px on panels. Never pill-round a CTA.
- Lavender `{colors.primary}` #5e6ad2 used scarcely.

The core adaptations:

- **Typography re-anchors down.** Marketing display sizes (80px, 56px, 40px) have no place here. The largest type in the app is `{typography.page-title}` at 22px. The queue row runs 14px/500 with 12px meta. Density is the point — Priya should see 15–20 tickets without scrolling.
- **A semantic color layer is introduced.** Four priority colors and three SLA states. This is the one sanctioned departure from the parent spec's "no second chromatic accent" rule, and it is load-bearing: the ordering rule is the heart of the product, and color is how the ordering rule becomes legible at a glance.
- **Lavender is narrowed further.** In this app lavender means *the system did this, not a human*. It marks auto-escalated tickets, the escalation run strip, and focus rings — plus the single primary CTA. Nothing else.

**Key characteristics:**

- One dense list is the protagonist. Every other surface filters, explains, or acts on it.
- Urgency reads as color temperature: gray → blue → orange → red.
- Breached tickets are marked by a left rail, not a filled row background. Fills destroy scannability.
- Every duration is set in tabular mono so countdowns don't jitter as they tick.
- The automated escalation pass is *visible*, not silent.

## The Ordering Rule

The sort is the product. It must be expressed identically in code, in the UI, and in this document.

**Sort key, in order:**

1. **SLA breached** — descending (breached first). Anything past its promised response time jumps the queue regardless of priority.
2. **Priority** — urgent → high → normal → low.
3. **Due at** — soonest first. Among equals, whatever is closest to breaching.
4. **Created at** — oldest first. Deterministic tiebreak; no ticket can be starved.

**Visual expression of the rule.** The list renders as two bands separated by a `{spacing.xs}` gap and a `queue-group-header`:

| Band | Header label | Header accent | Contents |
|---|---|---|---|
| 1 | `BREACHED · {n}` | `{colors.sla-breached}` text | All tickets past `due_at`, sorted by priority then most-overdue |
| 2 | `IN SLA · {n}` | `{colors.ink-subtle}` text | Everything else, sorted by priority then soonest-due |

If band 1 is empty it is omitted entirely and band 2 loses its header — a clean queue should look clean, not like a section with a zero in it.

**Never offer a sort dropdown that can defeat this rule.** Filters narrow the set; they never reorder it. This is the single strongest opinion in the system: the right ticket is always on top because there is no way for the user to make it otherwise.

## Colors

### Priority

The four priority levels, from the parent spec's in-product tag palette. Each renders as a 3px-tall bar glyph in the row's leftmost slot plus an optional text label in the detail panel.

| Level | Token | Hex | Glyph |
|---|---|---|---|
| Urgent | `{colors.priority-urgent}` | #eb5757 | Four filled bars |
| High | `{colors.priority-high}` | #f2994a | Three filled bars |
| Normal | `{colors.priority-normal}` | #4ea7fc | Two filled bars |
| Low | `{colors.priority-low}` | #62666d | One filled bar |

The bar-glyph pattern is deliberate: it encodes rank redundantly (color *and* fill count) so the queue stays readable for colorblind users and in grayscale screenshots.

Wash variants (`{colors.priority-urgent-wash}` etc.) are ~8% tints over canvas, used only as badge backgrounds in the detail panel — never as row fills.

### SLA state

Computed from `due_at` against now. Three states, applied to the `sla-chip` and the row's left rail.

| State | Token | Hex | Condition | Chip content |
|---|---|---|---|---|
| Breached | `{colors.sla-breached}` | #eb5757 | `now > due_at` | `2h 14m over` |
| Due soon | `{colors.sla-due-soon}` | #f2c94c | < 25% of window remains | `18m left` |
| On track | `{colors.sla-on-track}` | #8a8f98 | ≥ 25% remains | `4h left` |
| Met | `{colors.sla-met}` | #4cb782 | responded before `due_at` | `met in 22m` |

Amber "due soon" is the most valuable state in the system and the one most implementations skip. It is what lets Priya act *before* a breach instead of reacting after one.

### Status

| Status | Token | Hex |
|---|---|---|
| Open | `{colors.status-open}` | #8a8f98 |
| In progress | `{colors.status-progress}` | #f2c94c |
| Waiting on customer | `{colors.status-waiting}` | #7a7fad |
| Resolved | `{colors.status-resolved}` | #4cb782 |

Status renders as a small ring/dot glyph, not a filled pill, in the row. Filled `status-badge` pills appear only in the detail panel.

### Lavender discipline

`{colors.primary}` and its family are permitted in exactly four places:

1. The primary CTA (`New ticket`).
2. Focus rings — 2px `{colors.primary-focus}` outline at 50% opacity.
3. The `escalation-badge` on any ticket raised by the automated pass.
4. The `escalation-strip` showing when the pass last ran.

Lavender is never a row background, never a priority color, never a link color in the ticket body. Its scarcity is what makes "the system touched this" instantly readable.

## Typography

### Font family

- **Display** — `Inter, SF Pro Display, -apple-system, system-ui, sans-serif`, weights 500/600. Carries page and section titles.
- **Text** — same stack, weights 400/500. Carries everything in the list.
- **Mono** — `JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace`, weight 400/500. Carries ticket IDs and all durations.

Enable `font-variant-numeric: tabular-nums` globally on `{typography.countdown}` and `{typography.mono}`. Without it, a live countdown shifts horizontally every second and the whole column shimmers.

### Hierarchy

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `{typography.page-title}` | 22px | 600 | -0.4px | View name in the toolbar ("All tickets", "Overdue") |
| `{typography.section-title}` | 16px | 600 | -0.2px | Detail panel ticket subject, modal titles |
| `{typography.row-title}` | 14px | 500 | -0.05px | Ticket subject in the queue row |
| `{typography.body}` | 14px | 400 | 0 | Ticket description, comments |
| `{typography.body-sm}` | 13px | 400 | 0 | Detail panel fields, sidebar items, buttons |
| `{typography.meta}` | 12px | 400 | 0 | Customer name, assignee name, timestamps |
| `{typography.label}` | 11px | 500 | +0.4px | Group headers, field labels — uppercase |
| `{typography.mono}` | 12px | 400 | 0 | Ticket IDs (`HD-2481`) |
| `{typography.countdown}` | 12px | 500 | 0 | SLA remaining/overdue durations |

Inherited principle: **positive tracking on labels, negative on titles.** The uppercase `{typography.label}` at +0.4px reads as taxonomy against the negatively-tracked titles.

## Layout

### App shell

```
┌────────────┬───────────────────────────────────────────┐
│            │  toolbar (48px)                           │
│  sidebar   ├───────────────────────────────────────────┤
│  240px     │  filter bar (40px)                        │
│            ├───────────────────────────────────────────┤
│  · Queue   │  BREACHED · 3                             │
│  · Overdue │  ▌ ▮▮▮▮  HD-2481  Laptop won't boot  …    │
│  · Mine    │  ▌ ▮▮▮▮  HD-2455  VPN drops every …  …    │
│  · All     │                                           │
│            │  IN SLA · 128                             │
│  ────────  │    ▮▮▮   HD-2490  Outlook sync err   …    │
│  Agents    │    ▮▮    HD-2491  Monitor request    …    │
│            ├───────────────────────────────────────────┤
│  esc strip │  pagination (44px)                        │
└────────────┴───────────────────────────────────────────┘
```

- **Sidebar** 240px fixed, `{colors.canvas}`, 1px `{colors.hairline}` right border. Saved views up top, agent roster below a divider, `escalation-strip` pinned to the bottom.
- **Main column** fills remaining width, max 1280px, left-aligned (not centered — a queue centered in a wide viewport looks unmoored).
- **Detail panel** slides in from the right at 420px, pushing rather than overlaying at ≥1280px; overlays with a `{colors.semantic-overlay}` scrim at 60% below that.

### Queue row anatomy

A 44px row. Fixed-width slots so columns align vertically down the whole list — misaligned columns are what make dense lists unreadable.

| Slot | Width | Content |
|---|---|---|
| Rail | 2px | Breach indicator. `{colors.sla-breached}` if breached, otherwise transparent |
| Priority | 20px | Bar glyph |
| Status | 20px | Ring glyph |
| ID | 64px | `{typography.mono}` at `{colors.ink-tertiary}` |
| Subject | flex | `{typography.row-title}`, single line, ellipsis |
| Customer | 140px | `{typography.meta}` at `{colors.ink-subtle}` |
| Escalation | 24px | `escalation-badge` if auto-raised, else empty |
| SLA | 96px | `sla-chip`, right-aligned |
| Assignee | 28px | `assignee-avatar`, or a dashed 20px circle if unassigned |

The 2px left rail is the entire breach treatment. Resist the urge to fill the row in red — with several breached tickets the list becomes a wall of red and the priority ordering *inside* the breached band stops being visible.

### Spacing

Base unit 4px. Row padding `10px 16px`. Gap between bands `{spacing.xs}` 8px. Detail panel interior `{spacing.lg}` 24px. Toolbar and filter bar sit on `{colors.canvas}` divided by 1px `{colors.hairline}` rules — not by gaps.

### Whitespace

The dark canvas is the whitespace, as in the parent spec. But product density means the section rhythm is *rules and surface lifts*, never 96px gaps. If you find yourself reaching for `{spacing.xxl}`, you are designing a marketing page.

## Elevation & depth

| Level | Treatment | Use |
|---|---|---|
| 0 | No background, no border | Queue rows at rest, toolbar, pagination |
| 1 | `{colors.surface-1}` | Row hover, group headers, stat tiles, detail panel |
| 2 | `{colors.surface-2}` | Selected row, badges |
| 3 | `{colors.surface-3}` | Dropdown menus, assignee picker, command palette |
| 4 | 2px `{colors.primary-focus}` outline @ 50% | Focused input, focused row |

No drop shadows anywhere except level-3 floating menus, which take a single soft `0 8px 24px rgba(0,0,0,0.5)` to lift off the list beneath them.

**Rows at rest have no background.** Hover lifts to surface-1. This is what makes a 200-row list feel calm instead of striped.

## Components

### Filter bar

A horizontal strip of `filter-chip` controls directly under the toolbar. Left to right: **Overdue** (toggle), **Assigned** (menu), **Priority** (multi-select menu), **Status** (multi-select menu), then a right-aligned `search-input`.

- Active chips lift to `filter-chip-active` (`{colors.surface-3}`) and append a count: `Priority · 2`.
- A **Clear** `button-ghost` appears at the right end of the chip group only when ≥1 filter is active.
- `Overdue` and `Assigned: me` are the two Priya asks about constantly — give them dedicated sidebar views *as well as* chips, so they're one click from anywhere.
- The active filter set belongs in the URL query string. Priya should be able to bookmark "my overdue urgents."

### Search

`search-input` in the toolbar, 240px, expanding to 360px on focus. Placeholder: `Search tickets or customers…`. Matches on customer name, ticket subject, and ID. Debounce 200ms. Matched substrings highlight with `{colors.primary-wash}` background and `{colors.ink}` text.

Bind `/` to focus it and `⌘K` to open a full command palette if you build one. Searching by customer name is the third thing Priya does all day; it should never cost her a mouse trip.

### Assignment

The `assignee-avatar` slot is click-to-open — no need to enter the ticket. Opens a `select-menu` at level 3 listing agents with a **Unassign** option and **Assign to me** pinned at top. Unassigned renders as a 20px dashed circle at `{colors.hairline-strong}`, which reads as an open slot rather than a missing value.

### Escalation surfaces (the twist)

The automated pass raises any breached ticket by one level — low → normal → high → urgent — at most one level per run. Three surfaces make it legible:

**`escalation-badge`** — a small lavender chevron chip in the row for any ticket whose priority was raised by the system. Tooltip: `Auto-escalated normal → high · 2h ago`. It persists until the ticket is resolved.

**`escalation-strip`** — pinned to the sidebar bottom. Two lines at `{typography.meta}`:
```
Escalation check · 4m ago
3 tickets raised        [Run now]
```
`Run now` is a `button-ghost`. On click it shows a 600ms spinner, then the row count updates and affected rows flash their `escalation-badge` in with a 300ms fade.

**Escalation log** — a sidebar view rendering `audit-row` entries, one per change, newest first:
```
HD-2455   low → normal      14:02   SLA breached by 1h 12m
HD-2481   high → urgent     14:02   SLA breached by 3h 40m
```
Priority transitions render with both levels in their own semantic colors and a `{colors.ink-tertiary}` arrow between.

Most submissions will fire this job silently. Making it visible costs three small components and is the clearest way to show the check actually works.

### Pagination

A 44px bar below the list, `{typography.meta}` at `{colors.ink-subtle}`. Left: `Showing 1–50 of 312`. Right: page-size `select-menu` (25/50/100), then `button-ghost` prev/next with a page indicator.

**Sort order is global, not per-page.** Page 1 holds the most pressing 50 tickets in the whole queue. Never paginate before sorting.

### Empty states

- **No tickets at all** — `empty-state`, 64px padding, muted glyph, `No tickets yet`, `button-primary` to create one.
- **Filters match nothing** — `No tickets match these filters` plus a `button-secondary` **Clear filters**.
- **Nothing overdue** — this one gets warmth. `Nothing is overdue. Queue is healthy.` with a `{colors.sla-met}` check glyph. It's the one moment in the app worth celebrating.

### Loading

`skeleton-row` at 44px, 8 rows, shimmer at 1.4s. Never spin a full-page loader over a list — the row skeleton preserves layout and makes the load feel half as long.

## Motion

| Interaction | Duration | Easing |
|---|---|---|
| Row hover | 80ms | linear |
| Filter chip toggle | 120ms | ease-out |
| Detail panel slide | 200ms | cubic-bezier(0.2, 0, 0, 1) |
| Menu open | 140ms | ease-out |
| Escalation badge appear | 300ms | ease-out, fade + 4px rise |
| Row reorder after escalation | 400ms | cubic-bezier(0.2, 0, 0, 1), FLIP transform |

The reorder animation matters more than the rest combined. When a ticket escalates and jumps to the top, **animate the movement**. A row that teleports looks like a bug; a row that slides looks like the system working. Respect `prefers-reduced-motion` by cutting all of these to 0ms except a 100ms opacity fade.

## Do's and don'ts

### Do

- Keep `{colors.canvas}` #010102 as the anchor. The faint blue tint is intentional.
- Encode priority redundantly — color *and* bar count.
- Set every duration in tabular mono.
- Mark breach with a 2px rail, not a row fill.
- Reserve lavender for system authorship and focus.
- Animate reordering when escalation changes the queue.
- Put the active filter set in the URL.
- Sort the whole queue before paginating.

### Don't

- Don't ship a sort dropdown that can override the SLA-first rule.
- Don't fill breached rows with red.
- Don't use lavender as a priority or status color.
- Don't run the escalation pass silently.
- Don't escalate more than one level per run, however overdue the ticket.
- Don't use `#000000` as the canvas.
- Don't pill-round buttons — `{rounded.md}` 8px.
- Don't add atmospheric gradients or spotlight cards.
- Don't center the main column in a wide viewport.
- Don't exceed 44px row height. Density is the feature.

## Responsive behavior

| Breakpoint | Width | Changes |
|---|---|---|
| Desktop-XL | ≥1440px | Full shell; detail panel pushes |
| Desktop | 1280px | Detail panel pushes; all row slots visible |
| Tablet | 1024px | Sidebar collapses to 56px icon rail; detail panel overlays |
| Mobile-Lg | 768px | Customer slot drops to line 2 of the row; row grows to 64px |
| Mobile | ≤480px | Rows become stacked cards; filters move into a bottom sheet |

**Row slot drop order under pressure:** ID → customer → status glyph. Priority glyph and SLA chip never drop. They *are* the product.

Touch targets: rows ≥44px, chips ≥36px (≥44px on touch), avatar tap area padded to 44px even at 20px visual size.

## Data model notes for implementers

Fields the UI assumes on every ticket:

```
id            HD-2481
subject       string
customer      { name, email }
priority      low | normal | high | urgent
status        open | in_progress | waiting | resolved
assignee_id   nullable
created_at    timestamp
due_at        timestamp          // created_at + SLA window
responded_at  nullable timestamp
escalated     bool
escalations   [{ from, to, at, reason }]
```

SLA windows are policy, not hardcoded: the current configuration is `critical 1h`, `urgent 2h`, `high 4h`, `normal 24h`, and `low 24h`. Keep them in one config object so any helpdesk can change them without touching queue code.

`due_at` is recomputed on escalation — a ticket raised to urgent gets an urgent window from the moment of escalation. Document whichever choice you make; the reviewer will ask.

## Iteration guide

1. Build the queue row before anything else. It's 70% of the product.
2. Write the sort as one pure function, test it directly, and never duplicate the logic in a component.
3. Add the two bands before adding any filter.
4. Filters narrow; they never reorder.
5. Build the escalation pass as a pure function over the ticket list that returns a changelog, so it's testable and the audit log is free.
6. Reference components by their `components:` token name when iterating.

## Known gaps

- Light mode is not specified. The parent system doesn't ship one and neither should this.
- Ticket threading, attachments, and customer-facing views are out of scope.
- The escalation cadence (cron interval vs. on-read evaluation) is an implementation choice; the UI assumes a discrete run with a timestamp either way.
- Multi-tenant branding hooks are not defined; if the app must serve any helpdesk, extract `{colors.primary}` and the SLA policy object as the two theming seams.