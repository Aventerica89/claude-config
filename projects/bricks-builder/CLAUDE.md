# Bricks Builder Project Guidelines

## Quick Start

**For any Bricks Builder session, run:** `/bricks`

This automatically loads:
- Validation checklist
- Global Classes pattern
- ACSS variable reference
- Quick commands
- Common error fixes
- Example components

## Project Structure

```
bricks-builder/
├── CLAUDE.md                    # This file
├── campaigns/
│   └── smith/
│       ├── acss-settings.json
│       ├── acss-active-settings.json
│       └── sections/
│           ├── footer-bernadette-smith.json
│           └── gallery-*.json
├── scripts/
│   └── validate-bricks-json.js
└── docs/
    └── (documentation files)
```

## Development Workflow

### 1. Start Session
```
/bricks
```

### 2. Create Component
- Analyze design/screenshot
- Choose approach:
  - **Inline styles** - Quick prototypes, learning
  - **Global Classes** - Production, reusable components
- Create JSON structure
- Use ACSS variables throughout

### 3. Validate
```bash
# Check for hardcoded values
grep -n '"fontSize"' file.json | grep -v "var("
grep -n '"hex"' file.json

# Validate structure
jq 'keys' file.json

# Run project validator
node ~/.claude/projects/bricks-builder/scripts/validate-bricks-json.js file.json
```

### 4. Test
- Paste into Bricks Builder
- Verify layout and styling
- Test responsive behavior

## Required Structure

Every Bricks Builder JSON must have:

```json
{
  "content": [ /* elements array */ ],
  "source": "bricksCopiedElements",
  "sourceUrl": "https://example.com",
  "version": "2.1.4"
}
```

Each element must have:
- `id` - Unique identifier
- `name` - Element type (section, div, text-basic, etc.)
- `parent` - Parent element ID or 0
- `children` - Array of child IDs
- `settings` - Styles and properties
- `label` - Descriptive label

## ACSS Variables (MANDATORY)

**Colors:**
```json
"_typography": {
  "color": {
    "raw": "var(--primary)"  // NOT "hex": "#c73e3e"
  }
}
```

**Common variables:**
- Colors: `var(--primary)`, `var(--accent)`, `var(--gray-600)`, `var(--white)`
- Spacing: `var(--spacing-xs/s/m/l/xl/xxl/xxxl)`
- Typography: `var(--text-xs/s/m/l/xl/xxl/xxxl/xxxxl)`
- Radius: `var(--radius-none/s/m/l/full)`

**Never use:**
- ❌ Hardcoded hex colors
- ❌ Hardcoded pixel values
- ❌ Hardcoded font sizes

## Two Approaches

### Inline Styles (Learning/Quick)
```json
{
  "id": "element",
  "settings": {
    "_display": "flex",
    "_padding": {"top": "var(--spacing-m)"},
    "_typography": {
      "color": {"raw": "var(--primary)"}
    }
  }
}
```

### Global Classes (Production)
```json
{
  "id": "element",
  "settings": {
    "_cssGlobalClasses": ["fr-footer-delta__nav"]
  }
}

// In globalClasses array:
{
  "globalClasses": [{
    "name": "fr-footer-delta__nav",
    "settings": {
      "_display": "flex",
      "_padding": {"top": "var(--spacing-m)"}
    }
  }]
}
```

## Layout Properties

**Horizontal layout:**
```json
"_display": "flex",
"_flexDirection": "row",
"_justifyContent": "center",
"_alignItems": "center",
"_gap": "var(--spacing-m)"
```

**Vertical layout:**
```json
"_display": "flex",
"_flexDirection": "column",
"_alignItems": "center"
```

## Common Errors

| Error | Fix |
|-------|-----|
| "paste unidentified" | Add wrapper: `content`, `source`, `sourceUrl`, `version` |
| Horizontal → Vertical | Change `_flexDirection: "column"` to `"row"` |
| Colors wrong | Use `"raw": "var(--primary)"` not hex |
| Spacing inconsistent | Use `var(--spacing-*)` not pixels |

## Reference Materials

**Skills:**
- `~/.claude/skills/bricks.md` - Main environment loader
- `~/.claude/skills/learned/bricks-builder-json-checklist.md` - Validation checklist
- `~/.claude/skills/learned/bricks-builder-global-classes-pattern.md` - Production pattern

**Examples:**
- `campaigns/smith/sections/footer-bernadette-smith.json` - Inline styles example
- `campaigns/smith/sections/gallery-heard-in-every-county.json` - Global Classes example

## Best Practices

1. **Always run `/bricks` first** - Loads all context
2. **Use ACSS variables** - No hardcoded values
3. **Label everything** - Descriptive labels for all elements
4. **Validate before pasting** - Catch errors early
5. **Document patterns** - Use `/learn` for reusable patterns
6. **Reference examples** - Study working components
7. **Test thoroughly** - Verify in Bricks Builder preview

## Saving New Components

When creating new components:

1. **Save to campaigns directory:**
   ```
   campaigns/[campaign-name]/sections/[component-name].json
   ```

2. **Create documentation:**
   ```
   campaigns/[campaign-name]/sections/[component-name].md
   ```

3. **Update campaign README:**
   Add entry to `campaigns/[campaign-name]/README.md`

4. **Extract patterns:**
   If reusable, run `/learn` to save as skill

## Success Criteria

Component is ready when:
- ✅ Runs `/bricks` was used to load context
- ✅ Has proper structure (content, source, sourceUrl, version)
- ✅ All elements have labels
- ✅ Uses ACSS variables consistently
- ✅ No hardcoded values
- ✅ Layout properties match design
- ✅ Passes validation checks
- ✅ Pastes into Bricks Builder without errors
- ✅ Renders correctly in preview

---

**Remember:** Start every Bricks Builder session with `/bricks` to automatically load all necessary context and patterns.
