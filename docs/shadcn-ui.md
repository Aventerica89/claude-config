# shadcn/ui

> shadcn/ui is a collection of beautifully-designed, accessible components and a code distribution platform. It is built with TypeScript, Tailwind CSS, and Radix UI primitives. It supports multiple frameworks including Next.js, Vite, Remix, Astro, and more. Open Source. Open Code. AI-Ready. It also comes with a command-line tool to install and manage components and a registry system to publish and distribute code.

## Overview

- [Introduction](https://ui.shadcn.com/docs): Core principles—Open Code, Composition, Distribution, Beautiful Defaults, and AI-Ready design.
- [CLI](https://ui.shadcn.com/docs/cli): Command-line tool for installing and managing components.
- [components.json](https://ui.shadcn.com/docs/components-json): Configuration file for customizing the CLI and component installation.
- [Theming](https://ui.shadcn.com/docs/theming): Guide to customizing colors, typography, and design tokens.
- [Changelog](https://ui.shadcn.com/docs/changelog): Release notes and version history.
- [About](https://ui.shadcn.com/docs/about): Credits and project information.

## Installation

- [Next.js](https://ui.shadcn.com/docs/installation/next): Install shadcn/ui in a Next.js project.
- [Vite](https://ui.shadcn.com/docs/installation/vite): Install shadcn/ui in a Vite project.
- [Remix](https://ui.shadcn.com/docs/installation/remix): Install shadcn/ui in a Remix project.
- [Astro](https://ui.shadcn.com/docs/installation/astro): Install shadcn/ui in an Astro project.
- [Laravel](https://ui.shadcn.com/docs/installation/laravel): Install shadcn/ui in a Laravel project.
- [Gatsby](https://ui.shadcn.com/docs/installation/gatsby): Install shadcn/ui in a Gatsby project.
- [React Router](https://ui.shadcn.com/docs/installation/react-router): Install shadcn/ui in a React Router project.
- [TanStack Router](https://ui.shadcn.com/docs/installation/tanstack-router): Install shadcn/ui in a TanStack Router project.
- [TanStack Start](https://ui.shadcn.com/docs/installation/tanstack): Install shadcn/ui in a TanStack Start project.
- [Manual Installation](https://ui.shadcn.com/docs/installation/manual): Manually install shadcn/ui without the CLI.

## CLI Commands

```bash
# Initialize shadcn/ui in a project
npx shadcn@latest init

# Add a component
npx shadcn@latest add <component-name>

# Add multiple components
npx shadcn@latest add button card dialog

# Add all components
npx shadcn@latest add --all

# List available components
npx shadcn@latest add

# Update components
npx shadcn@latest diff
```

## Components

### Form & Input

| Component | Command | Description |
|-----------|---------|-------------|
| Form | `npx shadcn@latest add form` | Building forms with React Hook Form and Zod validation |
| Field | `npx shadcn@latest add field` | Field component for form inputs with labels and error messages |
| Button | `npx shadcn@latest add button` | Button component with multiple variants |
| Button Group | `npx shadcn@latest add button-group` | Group multiple buttons together |
| Input | `npx shadcn@latest add input` | Text input component |
| Input Group | `npx shadcn@latest add input-group` | Input component with prefix and suffix addons |
| Input OTP | `npx shadcn@latest add input-otp` | One-time password input component |
| Textarea | `npx shadcn@latest add textarea` | Multi-line text input component |
| Checkbox | `npx shadcn@latest add checkbox` | Checkbox input component |
| Radio Group | `npx shadcn@latest add radio-group` | Radio button group component |
| Select | `npx shadcn@latest add select` | Select dropdown component |
| Switch | `npx shadcn@latest add switch` | Toggle switch component |
| Slider | `npx shadcn@latest add slider` | Slider input component |
| Calendar | `npx shadcn@latest add calendar` | Calendar component for date selection |
| Date Picker | `npx shadcn@latest add date-picker` | Date picker component combining input and calendar |
| Combobox | `npx shadcn@latest add combobox` | Searchable select component with autocomplete |
| Label | `npx shadcn@latest add label` | Form label component |

### Layout & Navigation

| Component | Command | Description |
|-----------|---------|-------------|
| Accordion | `npx shadcn@latest add accordion` | Collapsible accordion component |
| Breadcrumb | `npx shadcn@latest add breadcrumb` | Breadcrumb navigation component |
| Navigation Menu | `npx shadcn@latest add navigation-menu` | Accessible navigation menu with dropdowns |
| Sidebar | `npx shadcn@latest add sidebar` | Collapsible sidebar component for app layouts |
| Tabs | `npx shadcn@latest add tabs` | Tabbed interface component |
| Separator | `npx shadcn@latest add separator` | Visual divider between content sections |
| Scroll Area | `npx shadcn@latest add scroll-area` | Custom scrollable area with styled scrollbars |
| Resizable | `npx shadcn@latest add resizable` | Resizable panel layout component |

### Overlays & Dialogs

| Component | Command | Description |
|-----------|---------|-------------|
| Dialog | `npx shadcn@latest add dialog` | Modal dialog component |
| Alert Dialog | `npx shadcn@latest add alert-dialog` | Alert dialog for confirmation prompts |
| Sheet | `npx shadcn@latest add sheet` | Slide-out panel component (drawer) |
| Drawer | `npx shadcn@latest add drawer` | Mobile-friendly drawer component using Vaul |
| Popover | `npx shadcn@latest add popover` | Floating popover component |
| Tooltip | `npx shadcn@latest add tooltip` | Tooltip component for additional context |
| Hover Card | `npx shadcn@latest add hover-card` | Card that appears on hover |
| Context Menu | `npx shadcn@latest add context-menu` | Right-click context menu |
| Dropdown Menu | `npx shadcn@latest add dropdown-menu` | Dropdown menu component |
| Menubar | `npx shadcn@latest add menubar` | Horizontal menubar component |
| Command | `npx shadcn@latest add command` | Command palette component (cmdk) |

### Feedback & Status

| Component | Command | Description |
|-----------|---------|-------------|
| Alert | `npx shadcn@latest add alert` | Alert component for messages and notifications |
| Toast/Sonner | `npx shadcn@latest add sonner` | Toast notification component using Sonner |
| Progress | `npx shadcn@latest add progress` | Progress bar component |
| Spinner | `npx shadcn@latest add spinner` | Loading spinner component |
| Skeleton | `npx shadcn@latest add skeleton` | Skeleton loading placeholder |
| Badge | `npx shadcn@latest add badge` | Badge component for labels and status indicators |
| Empty | `npx shadcn@latest add empty` | Empty state component for no data scenarios |

### Display & Media

| Component | Command | Description |
|-----------|---------|-------------|
| Avatar | `npx shadcn@latest add avatar` | Avatar component for user profiles |
| Card | `npx shadcn@latest add card` | Card container component |
| Table | `npx shadcn@latest add table` | Table component for displaying data |
| Data Table | `npx shadcn@latest add data-table` | Advanced data table with sorting, filtering, pagination |
| Chart | `npx shadcn@latest add chart` | Chart components using Recharts |
| Carousel | `npx shadcn@latest add carousel` | Carousel component using Embla Carousel |
| Aspect Ratio | `npx shadcn@latest add aspect-ratio` | Container that maintains aspect ratio |
| Typography | `npx shadcn@latest add typography` | Typography styles and components |
| Item | `npx shadcn@latest add item` | Generic item component for lists and menus |
| Kbd | `npx shadcn@latest add kbd` | Keyboard shortcut display component |

### Misc

| Component | Command | Description |
|-----------|---------|-------------|
| Collapsible | `npx shadcn@latest add collapsible` | Collapsible container component |
| Toggle | `npx shadcn@latest add toggle` | Toggle button component |
| Toggle Group | `npx shadcn@latest add toggle-group` | Group of toggle buttons |
| Pagination | `npx shadcn@latest add pagination` | Pagination component for lists and tables |

## Blocks (Pre-built UI)

```bash
# Add a block (pre-built UI pattern)
npx shadcn@latest add <block-name>

# Examples:
npx shadcn@latest add dashboard-01
npx shadcn@latest add login-01
npx shadcn@latest add sidebar-01
```

## Dark Mode

- [Dark Mode](https://ui.shadcn.com/docs/dark-mode): Overview of dark mode implementation.
- [Dark Mode - Next.js](https://ui.shadcn.com/docs/dark-mode/next): Dark mode setup for Next.js.
- [Dark Mode - Vite](https://ui.shadcn.com/docs/dark-mode/vite): Dark mode setup for Vite.
- [Dark Mode - Astro](https://ui.shadcn.com/docs/dark-mode/astro): Dark mode setup for Astro.
- [Dark Mode - Remix](https://ui.shadcn.com/docs/dark-mode/remix): Dark mode setup for Remix.

## Forms

- [Forms Overview](https://ui.shadcn.com/docs/forms): Guide to building forms with shadcn/ui.
- [React Hook Form](https://ui.shadcn.com/docs/forms/react-hook-form): Using shadcn/ui with React Hook Form.
- [TanStack Form](https://ui.shadcn.com/docs/forms/tanstack-form): Using shadcn/ui with TanStack Form.
- [Forms - Next.js](https://ui.shadcn.com/docs/forms/next): Building forms in Next.js with Server Actions.

## Advanced

- [Monorepo](https://ui.shadcn.com/docs/monorepo): Using shadcn/ui in a monorepo setup.
- [React 19](https://ui.shadcn.com/docs/react-19): React 19 support and migration guide.
- [Tailwind CSS v4](https://ui.shadcn.com/docs/tailwind-v4): Tailwind CSS v4 support and setup.
- [JavaScript](https://ui.shadcn.com/docs/javascript): Using shadcn/ui with JavaScript (no TypeScript).
- [Figma](https://ui.shadcn.com/docs/figma): Figma design resources.
- [v0](https://ui.shadcn.com/docs/v0): Generating UI with v0 by Vercel.

## MCP Server

- [MCP Server](https://ui.shadcn.com/docs/mcp): Model Context Protocol server for AI integrations. Allows AI assistants to browse, search, and install components from registries using natural language. Works with Claude Code, Cursor, VS Code (GitHub Copilot), Codex and more.

## Registry

- [Registry Overview](https://ui.shadcn.com/docs/registry): Creating and publishing your own component registry.
- [Getting Started](https://ui.shadcn.com/docs/registry/getting-started): Set up your own registry.
- [Examples](https://ui.shadcn.com/docs/registry/examples): Example registries.
- [FAQ](https://ui.shadcn.com/docs/registry/faq): Common questions about registries.
- [Authentication](https://ui.shadcn.com/docs/registry/authentication): Adding authentication to your registry.
- [Registry MCP](https://ui.shadcn.com/docs/registry/mcp): MCP integration for registries.

### Registry Schemas

- [Registry Schema](https://ui.shadcn.com/schema/registry.json): JSON Schema for registry index files.
- [Registry Item Schema](https://ui.shadcn.com/schema/registry-item.json): JSON Schema for individual registry items.
