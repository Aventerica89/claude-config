# Claude Codex Backend Architecture

## Overview

Backend system to power the Claude Codex dashboard with real-time connection status, snippet builder, and weight/time calculator.

---

## Reference Plugin Patterns (from Anthropic)

### Directory Structure (Standard)
```
plugins/claude-codex/
├── .claude-plugin/
│   └── manifest.json        # Plugin metadata
├── agents/                   # Agent definitions (code-explorer, code-architect, etc.)
├── commands/                 # Slash commands (/snippet, /calc, etc.)
├── skills/                   # Skills (snippet-builder, weight-calculator)
├── rules/                    # Rule definitions
├── hooks/                    # Lifecycle hooks
└── README.md
```

### Key Patterns from Reference Plugins

| Plugin | Pattern | Apply To |
|--------|---------|----------|
| feature-dev | 7-phase workflow with parallel agents | Complex codex operations |
| claude-md-management | Session learning capture | Snippet builder history |
| frontend-design | Context-aware aesthetics | Dashboard UI generation |
| typescript-lsp | Language server integration | Code intelligence |
| ux-researcher | Research agents | User workflow analysis |

---

## Core Features

### 1. Dashboard with Connection Status

Visual indicators for connected apps/services:

```
┌─────────────────────────────────────────────────┐
│  Connected Services                             │
├─────────────────────────────────────────────────┤
│  ● Vercel        Connected    2ms latency       │
│  ● Cloudflare    Connected    5ms latency       │
│  ● 1Password     Connected    12ms latency      │
│  ● GitHub        Warning      150ms latency     │
│  ● Turso DB      Offline      --                │
└─────────────────────────────────────────────────┘
```

**Status Colors:**
- Green (●): Connected, < 100ms latency
- Yellow (●): Warning, 100-500ms latency or degraded
- Red (●): Offline or > 500ms latency

### 2. Snippet Builder

Quick snippet creation and management accessible from anywhere.

**Features:**
- Create snippets from selection
- Template variables (`{{name}}`, `{{date}}`, etc.)
- Categories/tags
- Search and filter
- Export to clipboard/file
- Sync across sessions

### 3. Weight & Time Calculator

Estimate task complexity and duration.

**Inputs:**
- Task type (feature, bugfix, refactor, docs)
- Scope (files affected, LOC estimate)
- Complexity factors (new patterns, integrations, tests)

**Outputs:**
- Weight score (1-10)
- Time estimate range
- Confidence level
- Recommended approach

---

## Floating Widget / Quick Menu

### Recommended shadcn Components

| Component | Best For | Pros | Cons |
|-----------|----------|------|------|
| **Command (cmdk)** | Keyboard-first quick actions | Fast, searchable, familiar (Cmd+K) | Overlay blocks content |
| **Popover** | Small contextual menus | Lightweight, positioned | Limited space |
| **Sheet** | Side panel with more content | Room for forms/lists | Takes screen real estate |
| **Drawer** | Mobile-friendly bottom panel | Touch-friendly | Desktop feels mobile |
| **DropdownMenu** | Simple action lists | Familiar UX | No search |

### Recommendation: **Command + Floating Action Button (FAB)**

```tsx
// Floating button (bottom-right corner)
<div className="fixed bottom-6 right-6 z-50">
  <Button
    size="lg"
    className="rounded-full w-14 h-14 shadow-lg"
    onClick={() => setOpen(true)}
  >
    <Sparkles className="w-6 h-6" />
  </Button>
</div>

// Command palette (Cmd+K or FAB click)
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandGroup heading="Quick Actions">
      <CommandItem>
        <Code className="mr-2 h-4 w-4" />
        <span>New Snippet</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Weight Calculator</span>
        <CommandShortcut>⌘W</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <Clock className="mr-2 h-4 w-4" />
        <span>Time Estimator</span>
        <CommandShortcut>⌘T</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Recent Snippets">
      {/* Dynamic list */}
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

### Alternative: **Sheet with Tabs**

For more complex interfaces with multiple tools:

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button className="fixed bottom-6 right-6 rounded-full">
      <Sparkles />
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="w-[400px]">
    <Tabs defaultValue="snippets">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="snippets">Snippets</TabsTrigger>
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
      </TabsList>
      <TabsContent value="snippets">
        {/* Snippet builder UI */}
      </TabsContent>
      <TabsContent value="calculator">
        {/* Weight/time calculator UI */}
      </TabsContent>
      <TabsContent value="status">
        {/* Connection status UI */}
      </TabsContent>
    </Tabs>
  </SheetContent>
</Sheet>
```

---

## Backend Tech Stack

### Option A: Serverless (Recommended for MVP)
```
├── Vercel Functions (API routes)
├── Turso (SQLite edge database)
├── Upstash Redis (caching, real-time)
└── 1Password (secrets via op inject)
```

### Option B: Full Backend
```
├── Hono / Elysia (TypeScript API)
├── Turso (database)
├── Drizzle ORM
└── Docker deployment
```

---

## Database Schema (Turso/SQLite)

```sql
-- Snippets
CREATE TABLE snippets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT,
  category TEXT,
  tags TEXT, -- JSON array
  variables TEXT, -- JSON array of template vars
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  usage_count INTEGER DEFAULT 0
);

-- Weight calculations history
CREATE TABLE calculations (
  id TEXT PRIMARY KEY,
  task_type TEXT NOT NULL,
  scope_files INTEGER,
  scope_loc INTEGER,
  complexity_factors TEXT, -- JSON
  weight_score REAL,
  time_estimate_min INTEGER,
  time_estimate_max INTEGER,
  confidence REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Connected services status
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'platform', 'database', 'api', 'tool'
  endpoint TEXT,
  status TEXT DEFAULT 'unknown', -- 'connected', 'warning', 'offline'
  latency_ms INTEGER,
  last_check DATETIME,
  config TEXT -- JSON
);

-- Agents/Commands mapping for GUI
CREATE TABLE codex_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'command', 'agent', 'skill', 'rule'
  name TEXT NOT NULL,
  description TEXT,
  usage TEXT,
  category TEXT,
  tags TEXT, -- JSON
  config TEXT, -- JSON for GUI settings
  enabled BOOLEAN DEFAULT true
);
```

---

## API Routes

```
POST   /api/snippets          Create snippet
GET    /api/snippets          List snippets (with search/filter)
GET    /api/snippets/:id      Get snippet
PUT    /api/snippets/:id      Update snippet
DELETE /api/snippets/:id      Delete snippet

POST   /api/calculate         Run weight/time calculation
GET    /api/calculations      Get calculation history

GET    /api/services          Get all service statuses
POST   /api/services/check    Trigger status check
PUT    /api/services/:id      Update service config

GET    /api/codex             Get all codex items (agents, commands, etc.)
PUT    /api/codex/:id         Update codex item config
```

---

## Agent/Command Visual GUI Mapping

Each codex item maps to a visual card with configurable options:

```tsx
interface CodexItemGUI {
  id: string;
  type: 'command' | 'agent' | 'skill' | 'rule';
  name: string;
  description: string;

  // Visual config
  icon: string;
  color: string;

  // GUI fields
  inputs: {
    name: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number';
    label: string;
    placeholder?: string;
    options?: string[];
    default?: any;
    required?: boolean;
  }[];

  // Actions
  primaryAction: string;
  secondaryActions?: string[];

  // State
  enabled: boolean;
  lastUsed?: Date;
  usageCount: number;
}
```

---

## Next Steps

1. **Immediate**: Create floating widget component with Command palette
2. **Phase 1**: Snippet builder with local storage (no backend)
3. **Phase 2**: Weight/time calculator with presets
4. **Phase 3**: Turso backend for persistence
5. **Phase 4**: Service status monitoring
6. **Phase 5**: Full codex item GUI mapping

---

## Components to Install

```bash
# Core floating widget
npx shadcn@latest add command dialog button

# Snippet builder
npx shadcn@latest add textarea input label select badge

# Calculator
npx shadcn@latest add slider radio-group progress

# Status dashboard
npx shadcn@latest add table badge separator

# Side panel alternative
npx shadcn@latest add sheet tabs
```
