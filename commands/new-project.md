---
description: Initialize a new project with full setup - platform selection, style guide, architecture, and implementation plan. Step-by-step with review between phases.
---

# New Project Command

A comprehensive project initialization workflow that guides you from idea to ready-to-build.

## Workflow Overview

```
Phase 1: BASICS → Phase 2: PLATFORM → Phase 3: STYLE GUIDE →
Phase 4: ARCHITECTURE → Phase 5: PLAN → Phase 6: SCAFFOLD → Phase 7: READY
```

Each phase requires user approval before proceeding to the next.

---

## Phase 1: BASICS

Ask using AskUserQuestion:

1. **Project name** (kebab-case for directory)
2. **One-line description** - What does it do?
3. **Problem it solves** - Why build this?
4. **Target users** - Who is it for? (even "me learning" is valid)
5. **Project type** - App, marketing site, API, tool, experiment?
6. **Document to docs.jbcloud.app?** - Yes/No
   - If yes, project documentation will be synced to the user's documentation site
   - Architecture, plan, and progress will be published as the project develops
   - Use `/end` command to sync final state when ending a session

Store answers for use in later phases. If documenting to docs.jbcloud.app, track this for Phase 6 and session end.

**Output**: Summary of project basics. Ask "Continue to Platform Selection?"

---

## Phase 2: PLATFORM SELECTION

For each decision, provide a recommendation based on the project type and basics gathered. Explain WHY you recommend it. User can accept or choose differently.

### Framework
Recommend based on project type:
- **Next.js** - Full-stack apps, SEO matters, hybrid rendering
- **Remix** - Form-heavy apps, progressive enhancement
- **Astro** - Content sites, marketing, blogs (minimal JS)
- **SvelteKit** - Lightweight apps, learning Svelte
- **Nuxt** - Vue ecosystem preference
- **Express/Fastify** - API-only backends
- **FastAPI** - Python APIs
- **Hono** - Edge-first, lightweight APIs

For experiments with no traffic: recommend Next.js (most resources) or Astro (simplest)

### Database
- **Supabase (Postgres)** - Default choice, auth included, real-time, generous free tier
- **Turso (SQLite)** - Edge-first, simple, great for experiments
- **PlanetScale (MySQL)** - Branching, scale later
- **MongoDB Atlas** - Document-based needs
- **SQLite (local)** - Truly simple experiments
- **None** - Static sites, client-only apps

### CMS (if content-heavy)
- **TheBCMS** - Headless CMS, good for structured content
- **Sanity** - Real-time, customizable studio
- **Contentful** - Enterprise-grade
- **Keystatic** - Git-based, markdown
- **None** - Most apps don't need a CMS

### Auth
Recommend based on database choice:
- **Supabase Auth** - If using Supabase DB (zero extra setup)
- **Clerk** - Fastest integration, polished UI, generous free tier
- **Better Auth** - Self-hosted, flexible, newer
- **NextAuth/Auth.js** - Custom providers, established
- **None** - Public apps, experiments without users

For experiments: Supabase Auth if using Supabase, otherwise Clerk

### Hosting
- **Vercel** - Default for Next.js, best DX
- **Cloudflare Pages** - Edge-first, generous free tier, good for Astro
- **xCloud** - User's preferred option
- **Railway** - Full-stack with databases
- **Fly.io** - Container-based, global distribution
- **Netlify** - Good for static/Jamstack

For experiments: Vercel (easy) or Cloudflare Pages (free)

### UI Library
- **Tailwind + shadcn/ui** - Default recommendation, you own the code
- **Tailwind + v0 components** - Rapid prototyping
- **Tailwind only** - Full control, minimal
- **Tailwind + daisyUI** - Pre-styled, quick

Default: Tailwind + shadcn/ui

### Icon Library
- **Lucide** - Default with shadcn, clean, MIT license
- **Heroicons** - Tailwind team, solid choice
- **Phosphor** - Flexible weights
- **Tabler** - Large set

Default: Lucide

**Output**: Complete platform summary table. Ask "Continue to Style Guide?"

---

## Phase 3: BRAND & STYLE GUIDE

Generate sensible defaults. User tweaks later.

### Default Color Palette

```js
// Neutral, professional defaults - user customizes in tailwind.config
colors: {
  // Primary - Blue (universally safe default)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  // Neutral - Slate (works with everything)
  // Use Tailwind's built-in slate scale

  // Semantic
  success: '#22c55e',  // green-500
  warning: '#f59e0b',  // amber-500
  error: '#ef4444',    // red-500
  info: '#3b82f6',     // blue-500
}
```

### Default Typography

```js
// Modern, readable defaults
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}

// Type scale (Tailwind defaults are good)
// text-xs: 12px
// text-sm: 14px
// text-base: 16px
// text-lg: 18px
// text-xl: 20px
// text-2xl: 24px
// text-3xl: 30px
// text-4xl: 36px
```

### Default Spacing
Use Tailwind's default 4px base scale.

### Default Border Radius
```js
borderRadius: {
  DEFAULT: '0.5rem',  // 8px - modern, friendly
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
}
```

### Default Shadows
Use Tailwind defaults, prefer `shadow-sm` and `shadow-md`.

### Dark Mode
Default: Support both, system preference default.

**Output**: Summary of style defaults. Create mental note for Phase 6 scaffolding. Ask "Continue to Architecture?"

---

## Phase 4: ARCHITECTURE

Use the **architect** agent (Task tool with subagent_type: "architect").

Prompt the architect agent with all gathered context:
- Project basics (name, description, problem, users)
- Platform choices (framework, DB, auth, etc.)
- Style guide approach

The architect should produce:

### System Design Overview
- High-level architecture diagram (mermaid)
- Key components and their responsibilities
- Data flow

### Data Models
- Core entities and relationships
- Database schema design
- TypeScript types/interfaces

### API Structure (if applicable)
- Endpoints or server actions
- Request/response shapes
- Error handling approach

### File/Folder Structure
```
src/
├── app/              # Next.js app router
│   ├── (auth)/       # Auth-required routes
│   ├── (public)/     # Public routes
│   ├── api/          # API routes
│   └── style-guide/  # Style guide page
├── components/
│   ├── ui/           # shadcn components
│   └── [feature]/    # Feature components
├── lib/
│   ├── db/           # Database client, queries
│   ├── auth/         # Auth utilities
│   └── utils/        # Shared utilities
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
└── styles/           # Global styles
```

**Output**: Create `docs/ARCHITECTURE.md` with full architecture document including mermaid diagrams. Ask "Continue to Implementation Plan?"

---

## Phase 5: IMPLEMENTATION PLAN

Use the **planner** agent (Task tool with subagent_type: "planner").

Prompt the planner with all context from previous phases.

The planner should produce:

### MVP Scope
- What's in v1 vs later
- Core features only

### Phased Breakdown
```
Phase 1: Foundation
- Project setup, dependencies
- Database schema, migrations
- Auth integration
- Style guide page

Phase 2: Core Features
- [Feature 1]
- [Feature 2]

Phase 3: Polish
- Error handling
- Loading states
- Edge cases

Phase 4: Launch Prep
- Testing
- Documentation
- Deployment
```

### Dependencies
- What blocks what
- Parallel work opportunities

### Risks
- Technical risks
- Mitigation strategies

**Output**: Create `docs/PLAN.md` with full implementation plan. Ask "Continue to Scaffolding?"

---

## Phase 6: SCAFFOLDING

Execute the actual project creation:

### 6.1 Create Directory & Git
```bash
mkdir {project-name}
cd {project-name}
git init
```

### 6.2 Create CLAUDE.md
Include all context gathered:
- Project basics
- Platform choices
- Architecture summary
- Link to docs/ARCHITECTURE.md and docs/PLAN.md

### 6.3 Create docs/
- Copy ARCHITECTURE.md content
- Copy PLAN.md content

### 6.4 Create .gitignore
Based on platform selection.

### 6.5 Create Style Guide Page

Create a style guide page that showcases all UI components. Location depends on framework:

**For Next.js (App Router)**: `src/app/style-guide/page.tsx`

The style guide page should include sections for:

1. **Colors** - All palette colors with swatches and CSS variable names
2. **Typography** - H1-H6, paragraph, small, code, links
3. **Spacing** - Visual representation of spacing scale
4. **Buttons** - All variants (primary, secondary, outline, ghost, destructive) × sizes × states
5. **Form Controls** - Input, textarea, select, checkbox, radio, toggle, slider
6. **Cards** - Basic, with header, interactive, with image
7. **Navigation** - Tabs, breadcrumbs, pagination
8. **Feedback** - Alert variants, badges, progress bars
9. **Overlays** - Modal preview, tooltip, popover
10. **Data Display** - Table, accordion, list
11. **Icons** - Sample of Lucide icons

Include component code snippets for easy copying.

### 6.6 Create Dev Button Component

```tsx
// src/components/dev-button.tsx
'use client'

import Link from 'next/link'

export function DevButton() {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <Link
      href="/style-guide"
      className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors"
      title="Style Guide"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </Link>
  )
}
```

Add to root layout (development only).

### 6.7 Initial Commit
```bash
git add -A
git commit -m "chore: initialize project with architecture and style guide"
```

**Output**: Report all created files. Ask "Run framework CLI to complete setup?"

---

## Phase 7: READY

### Optional: Run Framework CLI
If user confirms, run the appropriate setup:
```bash
# Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir

# Then install shadcn
npx shadcn@latest init
```

### Handoff
Tell the user:
- Project is ready at `{path}`
- Review `docs/ARCHITECTURE.md` for system design
- Review `docs/PLAN.md` for implementation phases
- Visit `/style-guide` to see/tweak components
- Start with `/tdd` to begin implementation
- Use `/end` when finishing a session to sync docs and save progress

---

## Example Session

```
User: /new-project

Claude: Let's set up your new project. First, some basics:

What's the project name?
> habit-tracker

One-line description?
> A simple app to track daily habits with streaks

What problem does it solve?
> I want to build better habits but forget to track them

Who is it for?
> Personal use, maybe share with friends later

Project type?
> App

---
Phase 1 Complete: habit-tracker
A personal habit tracking app with streaks.
Continue to Platform Selection? [Yes]
---

Based on your project, here are my recommendations:

FRAMEWORK: Next.js
→ Full-stack capability, great for apps with auth and data

DATABASE: Supabase
→ Postgres + Auth + Real-time, perfect for habit tracking

AUTH: Supabase Auth
→ Already using Supabase, zero extra setup

HOSTING: Vercel
→ Best Next.js experience, free tier is plenty

UI: Tailwind + shadcn/ui
→ Professional components you own

[Continue through remaining phases...]
```

---

## Notes

- Each phase waits for explicit user approval
- Recommendations are based on project context
- User can override any recommendation
- Style guide uses sensible defaults - tweak after creation
- Architecture and Plan docs become living documentation
- Dev button only shows in development mode
