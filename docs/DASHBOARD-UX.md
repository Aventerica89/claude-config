# Claude Codex Dashboard - UX Design

## Design Direction

**Aesthetic**: Refined Utility
- Clean, purposeful design with subtle character
- Dark mode primary with violet/purple accents (consistent with landing)
- Geist font family for modern, technical feel
- Micro-interactions that feel responsive, not flashy

**Key Principle**: Every element has purpose. No decoration for decoration's sake.

---

## Layout Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                  │
│  ┌──────┐  Claude Codex Dashboard         🔍 Search    🔔    👤 User    │
│  │ Logo │                                                                │
│  └──────┘                                                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐  ┌─────────────────────────────────────────────────┐   │
│  │             │  │                                                  │   │
│  │  SIDEBAR    │  │  MAIN CONTENT AREA                              │   │
│  │             │  │                                                  │   │
│  │  Overview   │  │  ┌─────────────────────────────────────────┐    │   │
│  │  ─────────  │  │  │  CONNECTION STATUS STRIP                │    │   │
│  │  Agents     │  │  │  ● Vercel  ● GitHub  ● 1Pass  ● Turso  │    │   │
│  │  Commands   │  │  └─────────────────────────────────────────┘    │   │
│  │  Skills     │  │                                                  │   │
│  │  Rules      │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │   │
│  │  ─────────  │  │  │ STAT     │ │ STAT     │ │ STAT     │        │   │
│  │  Services   │  │  │ Card     │ │ Card     │ │ Card     │        │   │
│  │  Settings   │  │  │ 12 Agents│ │23 Cmds   │ │ 11 Skills│        │   │
│  │             │  │  └──────────┘ └──────────┘ └──────────┘        │   │
│  │             │  │                                                  │   │
│  │             │  │  ┌─────────────────────────────────────────┐    │   │
│  │             │  │  │  CODEX ITEMS GRID                       │    │   │
│  │             │  │  │  (Agents/Commands/Skills/Rules cards)   │    │   │
│  │             │  │  │                                         │    │   │
│  │             │  │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │    │   │
│  │             │  │  │  │     │ │     │ │     │ │     │       │    │   │
│  │             │  │  │  │Card │ │Card │ │Card │ │Card │       │    │   │
│  │             │  │  │  │     │ │     │ │     │ │     │       │    │   │
│  │             │  │  │  └─────┘ └─────┘ └─────┘ └─────┘       │    │   │
│  │             │  │  │                                         │    │   │
│  └─────────────┘  │  └─────────────────────────────────────────┘    │   │
│                   └─────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Connection Status Strip

Horizontal bar showing all connected services with real-time status.

```
┌─────────────────────────────────────────────────────────────────────┐
│ ● Vercel       ● GitHub       ● 1Password    ○ Turso DB    ◐ Notion │
│   Connected      Connected      Connected      Offline       Slow    │
│   2ms            15ms           8ms            --           450ms    │
└─────────────────────────────────────────────────────────────────────┘

● = Green (connected, <100ms)
◐ = Yellow (warning, 100-500ms or degraded)
○ = Red (offline or >500ms)
```

**Interaction**: Click service → expands to show details/config

### 2. Stat Cards

Quick overview metrics with trend indicators.

```
┌────────────────────┐
│  ↗ +2 this week    │
│                    │
│     12             │
│   Agents           │
│                    │
│  [View All →]      │
└────────────────────┘
```

### 3. Codex Item Cards

Visual cards for agents, commands, skills, rules.

```
┌────────────────────────────────┐
│ ┌──┐  code-explorer           │
│ │🔍│  Agent                   │
│ └──┘                          │
│ ─────────────────────────────  │
│ Deeply analyzes existing       │
│ codebase features by tracing   │
│ execution paths.               │
│                                │
│ Tags: [analysis] [codebase]    │
│                                │
│ ┌────────────┐  ┌──────────┐  │
│ │ Configure  │  │  Run ▶   │  │
│ └────────────┘  └──────────┘  │
└────────────────────────────────┘
```

**Interaction**:
- Click "Configure" → opens side panel with input fields
- Click "Run" → executes the item (for commands/agents)

### 4. Configuration Side Panel

Slides in from right when configuring a codex item.

```
┌─────────────────────────────────┐
│  ← Back       code-explorer     │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Focus Area              │   │
│  │ ┌─────────────────────┐ │   │
│  │ │ Entry points...     │ │   │
│  │ └─────────────────────┘ │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Max Depth               │   │
│  │ ○ 1  ○ 2  ● 3  ○ 4     │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Output Format           │   │
│  │ [Markdown         ▼]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌────────────────────────────┐│
│  │       Save & Run ▶        ││
│  └────────────────────────────┘│
└─────────────────────────────────┘
```

---

## Navigation Flow

```
Dashboard (Overview)
├── Agents → Grid of agent cards → Click → Config panel
├── Commands → Grid of command cards → Click → Config panel
├── Skills → Grid of skill cards → Click → Config panel
├── Rules → Grid of rule cards → Click → Config panel
├── Services → Connection status detail view
└── Settings → User preferences, API keys, integrations
```

---

## Color System (extending landing page)

```css
/* Status colors */
--status-connected: #22c55e;    /* green-500 */
--status-warning: #eab308;      /* yellow-500 */
--status-offline: #ef4444;      /* red-500 */

/* Type colors (from BrainDatabase) */
--type-command: #3b82f6;        /* blue-500 */
--type-agent: #a855f7;          /* purple-500 */
--type-skill: #22c55e;          /* green-500 */
--type-rule: #f97316;           /* orange-500 */
```

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (≥1024px) | Sidebar + main content |
| Tablet (768-1023px) | Collapsible sidebar |
| Mobile (<768px) | Bottom nav, full-width content |

---

## Key Interactions

1. **Service status click** → Expand inline with details
2. **Codex card hover** → Subtle lift + glow
3. **Configure click** → Sheet slides from right
4. **Run click** → Loading state → Success/error toast
5. **Search** → Command palette style (Cmd+K)

---

## Files to Create

```
landing/src/
├── pages/
│   └── dashboard/
│       ├── index.astro         # Dashboard overview
│       ├── agents.astro        # Agents grid
│       ├── commands.astro      # Commands grid
│       ├── skills.astro        # Skills grid
│       ├── rules.astro         # Rules grid
│       └── services.astro      # Services status
├── components/
│   └── dashboard/
│       ├── DashboardLayout.tsx # Sidebar + main wrapper
│       ├── Sidebar.tsx         # Navigation sidebar
│       ├── ConnectionStrip.tsx # Status indicators
│       ├── StatCard.tsx        # Metric cards
│       ├── CodexCard.tsx       # Item cards (extends existing)
│       └── ConfigPanel.tsx     # Side panel for editing
└── lib/
    └── services.ts             # Service status types/mock data
```

---

## Integration with jb-cloud-app-tracker

Future: Pull real service status from app-tracker API
- GET /api/services → returns connection status
- WebSocket for real-time updates
- Sync codex items with tracker database
