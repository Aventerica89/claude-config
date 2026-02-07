---
name: playground
description: Creates interactive HTML playgrounds - self-contained single-file explorers with controls, live preview, and prompt output. Use when user asks for a playground, explorer, or interactive tool.
---

# Playground Builder

A playground is a self-contained HTML file with interactive controls on one side, a live preview on the other, and a prompt output at the bottom with a copy button.

## When to Use

When the user asks for an interactive playground, explorer, or visual tool - especially when the input space is large, visual, or structural.

## Template Types

| Template | Use Case |
|----------|----------|
| Design Playground | Visual design (components, layouts, spacing, color, typography) |
| Data Explorer | Data/query building (SQL, APIs, pipelines, regex) |
| Concept Map | Learning/exploration (knowledge gaps, scope mapping) |
| Document Critique | Document review (approve/reject/comment workflow) |
| Diff Review | Code review (git diffs with line-by-line commenting) |
| Code Map | Architecture (component relationships, data flow) |

## Core Requirements

- **Single HTML file.** Inline all CSS and JS. No external dependencies.
- **Live preview.** Updates instantly on every control change. No "Apply" button.
- **Prompt output.** Natural language, not value dump. Only non-default choices.
- **Copy button.** Clipboard copy with "Copied!" feedback.
- **Defaults + presets.** 3-5 named presets. Looks good on first load.
- **Dark theme.** System font for UI, monospace for code/values.

## State Pattern

```javascript
const state = { /* all configurable values */ };
const DEFAULTS = { ...state };

function updateAll() {
  renderPreview();
  updatePrompt();
}
```

## Prompt Output Pattern

```javascript
function updatePrompt() {
  const parts = [];
  // Only mention non-default values
  if (state.borderRadius !== DEFAULTS.borderRadius) {
    parts.push(`border-radius of ${state.borderRadius}px`);
  }
  // Use qualitative language alongside numbers
  if (state.shadowBlur > 16) parts.push('a pronounced shadow');
  else if (state.shadowBlur > 0) parts.push('a subtle shadow');
  prompt.textContent = `Update the card to use ${parts.join(', ')}.`;
}
```

## Common Mistakes

- Prompt is just a value dump - write it as a natural instruction
- Too many controls - group by concern, hide advanced in collapsible
- Preview doesn't update instantly - every change must trigger re-render
- No defaults or presets - broken on load
- External dependencies - CDN down = playground dead

## After Building

Run `open <filename>.html` to launch in user's default browser.
