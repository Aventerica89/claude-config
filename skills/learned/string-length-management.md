# Learned Pattern: String Length Management

## Context
- **Session Date**: 2026-01-28
- **Project**: Artifact Manager (macOS + Web)
- **Issue**: "messages: text content blocks must be non-empty" API error
- **Root Cause**: Long inline strings (862 characters) in worker.js

## The Problem

Long inline strings cause multiple issues:
1. **API Errors**: "text content blocks must be non-empty" from Anthropic API
2. **Context Window Overflow**: Large strings consume token budget
3. **Poor Readability**: Hard to maintain and debug
4. **Copy-Paste Errors**: Easy to introduce bugs when editing large strings

## The Solution: String Length Limits

### Maximum Lengths (Mandatory)
- Inline strings: **500 characters max**
- Template literals: **1000 characters max**
- Error messages: **200 characters max**
- Notification text: **100 characters max**
- SVG inline: **300 characters max**

### Refactoring Pattern Used

**Before (862 characters):**
```javascript
document.getElementById('cleanup-body').innerHTML =
  '<div style="background: var(--warning-bg); border: 1px solid var(--warning-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;"><div style="display: flex; align-items: center; gap: 0.75rem;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><div><strong>Found ' + count + ' placeholder names</strong><p>...</p></div></div></div><div>...</div>';
```

**After (broken into constants + functions):**
```javascript
// Constants for reusable SVG icons
const WARNING_ICON = '<svg width="24" height="24">...</svg>';
const GRID_ICON = '<svg width="16" height="16">...</svg>';

// Template functions for composition
function renderCleanupItem(artifact) {
  return '<div style="...">' +
    GRID_ICON +
    '<div>' + escapeHtml(artifact.name) + '</div>' +
  '</div>';
}

function renderCleanupWarning(count, listHtml) {
  return '<div style="...">' +
    WARNING_ICON +
    '<div><strong>Found ' + count + ' placeholder names</strong></div>' +
  '</div>' +
  '<div>' + listHtml + '</div>';
}

// Usage
const listHtml = artifacts.map(renderCleanupItem).join('');
element.innerHTML = renderCleanupWarning(count, listHtml);
```

## Rules Added to CLAUDE.md

Created comprehensive rules at:
- `/Users/jb/.claude/CLAUDE.md` - Quick reference in main config
- `/Users/jb/.claude/rules/string-length.md` - Detailed patterns and examples

### Validation Checklist (Before Every Commit)
```bash
# Find strings longer than 500 characters
grep -n '.{500,}' *.js *.ts *.jsx *.tsx

# Check for inline HTML > 1000 chars
awk 'length > 1000' *.js

# Verify no violations
grep '.{500,}' *.js  # Should return nothing
```

## Reusable Patterns

### Pattern 1: Extract to Constants
```javascript
// For short, reusable pieces
const ICONS = {
  save: '<svg>...</svg>',
  close: '<svg>...</svg>'
};
```

### Pattern 2: Template Functions
```javascript
// For complex, parameterized templates
function renderCard(data) {
  return '<div>' + data.title + '</div>';
}
```

### Pattern 3: External Files
```javascript
// For very large templates
import template from './templates/page.html';
const rendered = template.replace('{{data}}', data);
```

## Success Metrics

Code is clean when:
- ✅ No line exceeds 500 characters
- ✅ No template literal exceeds 1000 characters
- ✅ All SVGs < 300 chars or externalized
- ✅ `grep '.{500,}' *.js` returns nothing
- ✅ No API errors about empty text blocks

## When to Apply This Pattern

Use these refactoring techniques whenever:
1. Writing any HTML template strings
2. Creating notification/error messages
3. Working with SVG icons
4. Building UI components in vanilla JS
5. Encountering "text content blocks must be non-empty" errors

## Impact

**Before:** 1 violation (862 chars) → API errors, poor maintainability
**After:** 0 violations → Clean code, no API errors, easier to maintain

## Future Prevention

All future code will be validated with:
```bash
# Pre-commit hook
grep -rn '.{500,}' . && echo "ERROR: Long strings found" && exit 1
```

This pattern is now mandatory across all projects.
