# Bricks Builder: Global Classes Pattern (Advanced)

**Extracted:** 2026-01-28
**Context:** Professional-grade Bricks Builder components using Global Classes instead of inline styles

## Problem

Our initial approach used **inline styles** on each element:
```json
{
  "id": "footer-nav",
  "settings": {
    "_display": "flex",
    "_justifyContent": "center",
    "_gap": "var(--spacing-xl)",
    "_flexWrap": "wrap"
  }
}
```

**Issues:**
- Not reusable across elements
- Duplicate styling code
- Hard to maintain consistency
- Changes require editing multiple elements

## Solution: Global Classes System

Professional Bricks Builder components use **Global Classes** for ALL styling:

### Element Structure (NO inline styles)
```json
{
  "id": "footer-nav",
  "name": "div",
  "parent": "footer-wrapper",
  "children": ["nav-item-1", "nav-item-2"],
  "settings": {
    "_cssGlobalClasses": ["fr-footer-delta__nav", "fr-footer-delta__nav-list"]
  },
  "label": "Footer Navigation"
}
```

### Global Classes Array (ALL styles here)
```json
{
  "content": [ /* elements */ ],
  "source": "bricksCopiedElements",
  "sourceUrl": "https://example.com",
  "version": "2.1.4",
  "globalClasses": [
    {
      "id": "gc001",
      "name": "fr-footer-delta__nav",
      "settings": {
        "_display": "flex",
        "_justifyContent": "center",
        "_gap": "var(--spacing-xl)",
        "_flexWrap": "wrap"
      }
    },
    {
      "id": "gc002",
      "name": "fr-footer-delta__nav-list",
      "settings": {
        "_direction": "row",
        "_alignItems": "center",
        "_padding": {"left": "0"}
      }
    }
  ]
}
```

**Benefits:**
- ✅ Reusable across multiple elements
- ✅ Single source of truth
- ✅ Update once, affects all instances
- ✅ Follows BEM naming convention
- ✅ Cleaner element structure

## BEM Naming Convention

Follow **Block__Element--Modifier** pattern:

```
fr-footer-delta           → Block
fr-footer-delta__nav      → Element
fr-footer-delta__nav-list → Element
fr-footer-delta--dark     → Modifier
```

**Example:**
```json
"_cssGlobalClasses": [
  "fr-footer-delta",           // Block
  "fr-footer-delta__inner",    // Element
  "fr-footer-delta--column"    // Modifier
]
```

## Semantic HTML with Custom Tags

Use proper semantic HTML elements:

```json
{
  "name": "block",  // Generic block element
  "settings": {
    "tag": "custom",
    "customTag": "nav"  // or "ul", "li", "article", "aside", etc.
  }
}
```

**Navigation Example:**
```json
{
  "id": "footer-nav",
  "name": "div",
  "settings": {
    "tag": "custom",
    "customTag": "nav",
    "_cssGlobalClasses": ["fr-footer-delta__nav"],
    "_attributes": [
      {"name": "aria-label", "value": "Footer"}
    ]
  },
  "children": ["nav-list"]
},
{
  "id": "nav-list",
  "name": "block",
  "parent": "footer-nav",
  "settings": {
    "tag": "custom",
    "customTag": "ul",
    "_cssGlobalClasses": ["fr-footer-delta__nav-list"]
  },
  "children": ["nav-item-1", "nav-item-2"]
},
{
  "id": "nav-item-1",
  "name": "block",
  "parent": "nav-list",
  "settings": {
    "tag": "custom",
    "customTag": "li",
    "_cssGlobalClasses": ["fr-footer-delta__nav-item"]
  }
}
```

**Result HTML:**
```html
<nav class="fr-footer-delta__nav" aria-label="Footer">
  <ul class="fr-footer-delta__nav-list">
    <li class="fr-footer-delta__nav-item">...</li>
    <li class="fr-footer-delta__nav-item">...</li>
  </ul>
</nav>
```

## Accessibility Pattern

### Icon with Hidden Accessible Label

```json
{
  "id": "social-facebook",
  "name": "div",
  "children": ["icon-facebook", "label-facebook"],
  "settings": {
    "tag": "a",
    "link": {"type": "external", "url": "https://facebook.com"},
    "_cssGlobalClasses": ["fr-social-alpha__icon-wrapper"]
  }
},
{
  "id": "icon-facebook",
  "name": "icon",
  "parent": "social-facebook",
  "settings": {
    "icon": {"library": "fontawesome", "icon": "fab fa-facebook"},
    "_cssGlobalClasses": ["fr-social-alpha__icon"],
    "_attributes": [{"name": "data-icon"}]
  }
},
{
  "id": "label-facebook",
  "name": "text-basic",
  "parent": "social-facebook",
  "settings": {
    "text": "Follow us on Facebook",
    "tag": "span",
    "_cssGlobalClasses": ["acss_import_hidden-accessible"]
  }
}
```

**Result:** Icon visible, label hidden but accessible to screen readers.

### Custom Attributes

Use `_attributes` array for HTML attributes:

```json
"_attributes": [
  {"name": "aria-label", "value": "Footer"},
  {"name": "data-color", "value": "dark"},
  {"name": "role", "value": "navigation"}
]
```

## Advanced CSS in Global Classes

Use `_cssCustom` for complex styles:

```json
{
  "id": "gc001",
  "name": "fr-social-alpha",
  "settings": {
    "_display": "flex",
    "_gap": "1em",
    "_cssCustom": "/* Remove list styling */\n.fr-social-alpha {\n  list-style: none;\n  padding-inline-start: 0;\n  margin-block: 0;\n}"
  }
}
```

**Data Attribute Modifiers:**
```json
"_cssCustom": ".fr-legal-meta-alpha[data-color=\"dark\"] {\n  color: var(--text-dark-muted);\n}\n.fr-legal-meta-alpha[data-color=\"light\"] {\n  color: var(--text-light-muted);\n}"
```

## Dynamic Data Integration

Use WordPress placeholders:

```json
"text": "Copyright {current_date:Y} © {site_title}"
```

**Common Placeholders:**
- `{current_date:Y}` - Current year
- `{site_title}` - Site name
- `{site_url}` - Site URL
- `{post_title}` - Post title
- `{author_name}` - Author name

## Complete Example

```json
{
  "content": [
    {
      "id": "footer",
      "name": "section",
      "parent": 0,
      "children": ["footer-inner"],
      "settings": {
        "_cssGlobalClasses": ["fr-footer-delta"]
      },
      "label": "Footer"
    },
    {
      "id": "footer-inner",
      "name": "container",
      "parent": "footer",
      "children": ["logo", "nav", "social", "legal"],
      "settings": {
        "_cssGlobalClasses": ["fr-footer-delta__inner"]
      },
      "label": "Footer Inner"
    },
    {
      "id": "nav",
      "name": "div",
      "parent": "footer-inner",
      "children": ["nav-list"],
      "settings": {
        "tag": "custom",
        "customTag": "nav",
        "_cssGlobalClasses": ["fr-footer-delta__nav"],
        "_attributes": [{"name": "aria-label", "value": "Footer"}]
      },
      "label": "Navigation"
    }
  ],
  "source": "bricksCopiedElements",
  "sourceUrl": "https://example.com",
  "version": "2.1.4",
  "globalClasses": [
    {
      "id": "gc001",
      "name": "fr-footer-delta",
      "settings": {
        "_padding": {
          "top": "var(--section-space-m)",
          "bottom": "var(--section-space-m)"
        }
      }
    },
    {
      "id": "gc002",
      "name": "fr-footer-delta__inner",
      "settings": {
        "_display": "flex",
        "_direction": "column",
        "_alignItems": "center",
        "_rowGap": "var(--container-gap)"
      }
    },
    {
      "id": "gc003",
      "name": "fr-footer-delta__nav",
      "settings": {
        "_width": "var(--width-l)"
      }
    }
  ]
}
```

## When to Use Global Classes

**Always use Global Classes for:**
- ✅ Footer components
- ✅ Header/navigation
- ✅ Reusable card patterns
- ✅ Button styles
- ✅ Typography styles
- ✅ Layout patterns (grids, flexbox)

**Can use inline styles for:**
- ⚠️ One-off custom elements
- ⚠️ Page-specific overrides
- ⚠️ Quick prototyping

## Migration Strategy

Convert existing inline-style JSON to Global Classes:

### Before (Inline Styles):
```json
{
  "id": "footer-nav",
  "settings": {
    "_display": "flex",
    "_gap": "var(--spacing-xl)"
  }
}
```

### After (Global Classes):
```json
{
  "id": "footer-nav",
  "settings": {
    "_cssGlobalClasses": ["fr-footer__nav"]
  }
}

// Add to globalClasses array:
{
  "globalClasses": [
    {
      "id": "gc001",
      "name": "fr-footer__nav",
      "settings": {
        "_display": "flex",
        "_gap": "var(--spacing-xl)"
      }
    }
  ]
}
```

## Best Practices

1. **Prefix classes** with component name (e.g., `fr-footer-`, `fr-hero-`)
2. **Use BEM naming** (Block__Element--Modifier)
3. **Group related classes** together in globalClasses array
4. **Add comments** in `_cssCustom` to explain complex styles
5. **Use semantic HTML** (nav, ul, li, article, aside)
6. **Include accessibility** attributes (aria-label, role)
7. **Add hidden labels** for icons (screen reader friendly)
8. **Use dynamic data** placeholders for dates, site info

## Success Metrics

✅ **Global Classes pattern implemented when:**
- All styling in globalClasses array
- Elements only have _cssGlobalClasses references
- BEM naming convention followed
- Semantic HTML used
- Accessibility attributes added
- Reusable across multiple instances

---

**Pro Tip:** Study professional Bricks Builder templates (like Frames) to see Global Classes patterns in action. They follow strict BEM naming and accessibility standards.
