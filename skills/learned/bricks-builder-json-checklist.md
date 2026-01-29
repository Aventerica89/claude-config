# Bricks Builder JSON Structure Checklist

**Extracted:** 2026-01-28
**Context:** Creating Bricks Builder components that paste correctly without "paste unidentified" errors

## Problem
When creating Bricks Builder JSON manually, it's easy to:
- Forget required wrapper structure
- Use hardcoded values instead of ACSS variables
- Misconfigure layout properties (flexDirection, justifyContent, etc.)
- Get "paste unidentified" errors when importing

## Solution: Pre-Paste Validation Checklist

### 1. Top-Level Structure ✓
```json
{
  "content": [ /* elements array */ ],
  "source": "bricksCopiedElements",
  "sourceUrl": "https://example.com",
  "version": "2.1.4"
}
```

**Check:**
- [ ] Has `content` array
- [ ] Has `source`, `sourceUrl`, `version` fields
- [ ] NOT a plain array

### 2. Each Element Structure ✓
```json
{
  "id": "unique-id",
  "name": "section|div|text-basic|button|icon|etc",
  "parent": 0,  // or parent element id
  "children": ["child-id-1", "child-id-2"],
  "settings": { /* styles and properties */ },
  "label": "Human-Readable Description"
}
```

**Check:**
- [ ] Every element has `id`, `name`, `parent`, `children`, `settings`, `label`
- [ ] IDs are unique
- [ ] Parent-child relationships are correct
- [ ] Labels are descriptive

### 3. ACSS Variables (CRITICAL) ✓

**Colors:**
```json
"_typography": {
  "color": {
    "raw": "var(--primary)"  // NOT "hex": "#c73e3e"
  }
}
```

**Spacing:**
```json
"_padding": {
  "top": "var(--spacing-m)",    // NOT "20px"
  "right": "var(--spacing-l)"
}
```

**Typography:**
```json
"fontSize": "var(--text-xl)"    // NOT "24px"
```

**Check:**
- [ ] No hardcoded hex colors (use `var(--primary)`, `var(--gray-600)`, etc.)
- [ ] No hardcoded pixel spacing (use `var(--spacing-*)`)
- [ ] No hardcoded font sizes (use `var(--text-*)`)
- [ ] All ACSS variables use `"raw": "var(--name)"` format

### 4. Layout Properties ✓

**Horizontal Layout:**
```json
"_display": "flex",
"_flexDirection": "row",         // Horizontal
"_justifyContent": "center",     // or space-between, flex-start, etc.
"_alignItems": "center",
"_gap": "var(--spacing-m)",
"_flexWrap": "wrap"
```

**Vertical Layout:**
```json
"_display": "flex",
"_flexDirection": "column",      // Vertical
"_alignItems": "center"
```

**Check:**
- [ ] `_flexDirection` matches intended layout (row = horizontal, column = vertical)
- [ ] `_justifyContent` and `_alignItems` are appropriate
- [ ] Gap uses ACSS variable

### 5. Container Max-Width ✓
```json
"_maxWidth": "1400px",
"_margin": {
  "left": "auto",
  "right": "auto"
}
```

**Check:**
- [ ] Main containers have max-width
- [ ] Containers are centered with auto margins

### 6. Validation Commands

**Find hardcoded font sizes:**
```bash
grep -n '"fontSize"' file.json | grep -v "var("
```

**Find hardcoded colors:**
```bash
grep -n '"hex"' file.json
```

**Verify layout direction:**
```bash
jq '.content[] | select(.id == "element-id") | .settings._flexDirection' file.json
```

## When to Use

**Trigger this checklist when:**
- Creating new Bricks Builder JSON from scratch
- Getting "paste unidentified" error when pasting into Bricks Builder
- Converting existing code/HTML to Bricks format
- Reviewing Bricks Builder JSON before sharing/committing

## Common Errors and Fixes

**Error: "paste unidentified"**
- **Cause:** Missing top-level wrapper or wrong structure
- **Fix:** Ensure JSON has `content`, `source`, `sourceUrl`, `version`

**Error: Horizontal links appearing vertical**
- **Cause:** `_flexDirection: "column"` instead of `"row"`
- **Fix:** Change to `_flexDirection: "row"`

**Error: Colors not matching design system**
- **Cause:** Hardcoded hex values
- **Fix:** Replace with ACSS variables: `"raw": "var(--gray-600)"`

## Example: Correct Structure

```json
{
  "content": [
    {
      "id": "footer-links",
      "name": "div",
      "parent": 0,
      "children": ["link-1", "divider", "link-2"],
      "settings": {
        "_display": "flex",
        "_flexDirection": "row",
        "_justifyContent": "center",
        "_gap": "var(--spacing-s)",
        "_flexWrap": "wrap"
      },
      "label": "Footer Links Container"
    },
    {
      "id": "link-1",
      "name": "text-link",
      "parent": "footer-links",
      "settings": {
        "text": "Privacy Policy",
        "link": { "type": "internal", "url": "#privacy" },
        "_typography": {
          "color": { "raw": "var(--gray-600)" },
          "fontSize": "var(--text-s)"
        }
      },
      "label": "Privacy Policy Link"
    }
  ],
  "source": "bricksCopiedElements",
  "sourceUrl": "https://example.com",
  "version": "2.1.4"
}
```

## Success Metrics

✅ **Ready to paste when:**
- All checklist items pass
- No hardcoded values found
- Layout properties verified
- Pastes into Bricks Builder without errors
- Renders correctly in preview

---

**Pro Tip:** Run validation checks BEFORE attempting to paste into Bricks Builder. Catching structure issues early saves multiple paste-fix-repaste cycles.
