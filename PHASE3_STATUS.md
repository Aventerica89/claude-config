# Phase 3: Plugin Detail Pages - Status

## Current Status: 80% Complete ✅

**Branch**: `claude/plugin-detail-pages-jXdW2`
**Started**: 2026-02-06
**Last Updated**: 2026-02-06 (Build fix)
**Target**: Full plugin detail view with component selection and installation

---

## ✅ Completed Components

### 1. Dynamic Route
- **File**: `/landing/src/pages/dashboard/plugins/[id].astro`
- **Pattern**: SSR dynamic route using Astro params
- **Renders**: PluginDetailPage React component

### 2. PluginDetailPage Component
- **File**: `/landing/src/components/dashboard/PluginDetailPage.tsx`
- **Features**:
  - Fetches plugin details from API
  - 5 tabs: Overview, Components, Relationships, README, Installations
  - Component selection with Set<string>
  - Install button with count display
  - Source badges and metadata display
  - Component stats cards (agents, skills, commands, rules)
  - Error and loading states

### 3. PluginComponentList Component
- **File**: `/landing/src/components/dashboard/PluginComponentList.tsx`
- **Features**:
  - Grouped by component type
  - Individual checkboxes for selection
  - Select All / Clear Selection controls
  - Visual selection feedback (violet highlight)
  - Shows metadata: file path, model, tools, tags
  - Type-based color coding

### 4. RelationshipGraph Component
- **File**: `/landing/src/components/dashboard/RelationshipGraph.tsx`
- **Features**:
  - Summary stats (total relationships, components with deps, high confidence)
  - Relationship type legend with counts
  - Grouped by component type
  - Visual relationship arrows with type labels
  - Strength indicators (1-3 stars)
  - Bi-directional relationship detection
  - Color-coded by component type

---

## ⏳ TODO: Remaining Work

### 5. InstallModal Component ✅ COMPLETE
- **File**: `/landing/src/components/dashboard/InstallModal.tsx`
- **Needed**:
  - Modal overlay with backdrop
  - Repository selection dropdown (scan ~/.claude/repos or config)
  - Display selected components count
  - Conflict detection preview
  - Progress indicator during installation
  - Success/error messaging via toast

**Pseudocode**:
```tsx
interface InstallModalProps {
  plugin: Plugin
  selectedComponents: string[]
  onClose: () => void
  onSuccess: () => void
}

// Features:
// - Fetch available repositories
// - Show target repository dropdown
// - Display selected components (N agents, M skills, etc.)
// - Check for filename conflicts
// - POST to /api/plugins/install
// - Show progress spinner
// - Call onSuccess when done
```

### 6. Installation API Endpoint ✅ COMPLETE
- **File**: `/landing/src/pages/api/plugins/install.ts`
- **File**: `/landing/src/pages/api/repositories.ts` (bonus)
- **Method**: POST
- **Body**:
  ```json
  {
    "plugin_id": "anthropic:feature-dev",
    "component_ids": ["anthropic:feature-dev:agent:planner", "..."],
    "repository_path": "/home/user/.claude/repos/my-project"
  }
  ```
- **Logic**:
  1. Validate plugin and components exist
  2. Check target repository exists
  3. Detect filename conflicts with existing codex_items
  4. Copy component files to target repository
  5. Insert into plugin_installations table
  6. Update codex_items with plugin metadata
  7. Return installation record

### 7. README Markdown Rendering
- **Current**: Using dangerouslySetInnerHTML (unsafe)
- **Needed**: Proper markdown parser
- **Options**:
  - marked + DOMPurify (sanitization)
  - react-markdown (safe by default)
  - remark + rehype pipeline
- **File to update**: PluginDetailPage.tsx (README tab)

### 8. PluginCard Click Navigation
- **File**: `/landing/src/components/dashboard/PluginCard.tsx`
- **Change**: Add href or onClick to navigate to `/dashboard/plugins/${plugin.id}`
- **Simple fix**: Wrap card content in `<a>` tag or add onClick handler

---

## Implementation Order (Recommended)

1. **PluginCard Navigation** (5 min)
   - Easiest, enables testing detail pages immediately

2. **InstallModal Component** (30 min)
   - Core UI needed for installation flow
   - Can stub out API call initially

3. **Installation API** (45 min)
   - Most complex, handles file operations
   - Needs careful error handling

4. **README Rendering** (15 min)
   - Install markdown library
   - Replace dangerouslySetInnerHTML

5. **Testing & Polish** (30 min)
   - Test full flow: browse → detail → select → install
   - Error cases, loading states
   - Edge cases (no components, all selected, etc.)

**Total Estimated Time**: 2 hours

---

## Testing Checklist

When resuming work, test:

- [ ] Navigate from /dashboard/plugins to detail page
- [ ] All 5 tabs render correctly
- [ ] Component selection works (individual + select all)
- [ ] Relationship visualization displays
- [ ] Install button enables/disables based on selection
- [ ] InstallModal opens and closes
- [ ] API installs components to repository
- [ ] README renders markdown safely
- [ ] Back button returns to plugin list
- [ ] Error states display properly

---

## Files Changed in This Phase

```
landing/src/
├── pages/dashboard/plugins/
│   └── [id].astro                        (NEW)
└── components/dashboard/
    ├── PluginDetailPage.tsx              (NEW)
    ├── PluginComponentList.tsx           (NEW)
    ├── RelationshipGraph.tsx             (NEW)
    ├── InstallModal.tsx                  (TODO)
    └── PluginCard.tsx                    (UPDATE NEEDED)
```

---

## Next Claude: Start Here

```bash
# 1. Checkout Phase 3 branch
git checkout claude/plugin-detail-pages-jXdW2

# 2. Read status files
cat PHASE3_STATUS.md
cat SESSION_PROGRESS.md

# 3. Start with easiest task - PluginCard navigation
# Read the file first:
cat landing/src/components/dashboard/PluginCard.tsx

# 4. Then continue with InstallModal and API
```

**Good luck! You're halfway done with Phase 3! 🚀**
