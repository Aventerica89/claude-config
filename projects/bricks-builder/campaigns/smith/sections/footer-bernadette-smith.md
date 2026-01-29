# Footer - Bernadette Smith Campaign

**Component:** footer-bernadette-smith.json
**Created:** 2026-01-28
**Campaign:** Bernadette Smith for U.S. Senate
**Type:** Footer component with disclaimer, navigation, social icons, and legal links

## Overview

A comprehensive footer component designed for the Bernadette Smith campaign website. Includes disclaimer bar, secondary header, main footer content, and legal links.

## Structure

### 1. Top Disclaimer Bar
- Gray background (`var(--gray-100)`)
- Left: "Paid for by Bernadette Smith for U.S. Senate" in bordered box
- Right: Red "DONATE NOW!" button
- Responsive flexbox layout with max-width 1400px

### 2. Secondary Header Row
- Light gray background (`var(--gray-50)`)
- Left: "Copyright 2026 © Smith Dev"
- Right: Horizontal links (Disclaimer | Terms | Privacy | Website Credit)
- Border bottom separator

### 3. Main Footer Section
- Light gray background (`var(--gray-50)`)
- Center-aligned content
- Components:
  - Navigation menu (Issues, News, Events, Volunteer, Contact)
  - "SMITH" logo text (large, bold, black)
  - Tagline: "Faith. Family. Freedom." (gold, italic)
  - Social media icons (X, Instagram, YouTube, Truth Social)
  - "SUPPORT THE CAMPAIGN" text
  - Copyright line
  - Horizontal legal links (Privacy | Terms | Disclaimer | Credits)

## Design Specifications

### Colors
- Primary: `var(--primary)` (red for CTAs, hovers)
- Accent: `var(--accent)` (gold for tagline)
- Background: `var(--gray-50)`, `var(--gray-100)`
- Text: `var(--gray-600)`, `var(--gray-700)`, `var(--gray-800)`, `var(--gray-900)`
- Borders: `var(--gray-200)`, `var(--gray-300)`, `var(--gray-400)`

### Typography
- Logo: `var(--text-xxxxl)`, 900 weight, 8px letter spacing
- Tagline: `var(--text-xl)`, 500 weight, italic
- Support text: `var(--text-xl)`, 800 weight
- Navigation: `var(--text-m)`, 500 weight
- Links: `var(--text-s)`, 400 weight

### Spacing
- Section padding: `var(--spacing-xxxl)` to `var(--spacing-s)`
- Content gaps: `var(--spacing-xl)`, `var(--spacing-l)`, `var(--spacing-m)`, `var(--spacing-s)`
- Max width: 1400px

## Key Features

### Accessibility
- Semantic HTML structure (footer tag)
- Proper link hover states
- Clear visual hierarchy
- ACSS variable system for consistency

### Responsive
- Flexbox with wrap
- Gap-based spacing (collapses cleanly)
- Centered content with max-width constraint
- Mobile-friendly layout

### Interactive
- Button hover effect (color + transform)
- Link hover states (color change to primary)
- Smooth transitions

## Usage Notes

### ACSS Variables
This component uses **inline styles with ACSS variables** rather than Global Classes. This was the initial learning approach.

**For professional-grade production:**
Consider refactoring to use Global Classes pattern (see: `~/.claude/skills/learned/bricks-builder-global-classes-pattern.md`)

### Customization
To adapt for other campaigns:
1. Update candidate name in text fields
2. Change social media links
3. Update disclaimer text
4. Adjust colors via ACSS variables
5. Modify navigation links

### Import
Copy JSON content and paste into Bricks Builder. Ensure ACSS framework is active with proper variable definitions.

## Learnings from Development

### Initial Mistakes
1. ❌ Created array without top-level wrapper → "paste unidentified" error
2. ❌ Used hardcoded values (96px, 24px) → Inconsistent with design system
3. ❌ Confused vertical/horizontal layout (flexDirection)
4. ❌ Missing element labels

### Fixes Applied
1. ✅ Added proper wrapper: `content`, `source`, `sourceUrl`, `version`
2. ✅ Replaced hardcoded values with ACSS variables
3. ✅ Set `_flexDirection: "row"` for horizontal links
4. ✅ Added descriptive labels to all elements

### Validation Process
- Checked for hardcoded font sizes: `grep -n '"fontSize"' file.json | grep -v "var("`
- Verified layout properties: `jq '.content[] | select(.id == "element-id") | .settings._flexDirection'`
- Confirmed ACSS variable usage throughout

## Comparison to Professional Pattern

This component uses **inline styles**. Reference example (gallery-heard-in-every-county.json) uses **Global Classes** pattern:

| Aspect | Our Approach (Inline) | Professional (Global Classes) |
|--------|----------------------|------------------------------|
| Styles | In element `settings` | In `globalClasses` array |
| Reusability | Not reusable | Reusable across elements |
| Maintenance | Update each element | Update once, affects all |
| Naming | N/A | BEM convention |
| Semantic HTML | Basic | Custom tags (nav, ul, li) |
| Accessibility | Basic | Advanced (aria-label, data attributes) |

**Next Steps:** Consider refactoring to Global Classes pattern for production use.

## Files

- **JSON:** `footer-bernadette-smith.json`
- **Documentation:** `footer-bernadette-smith.md` (this file)
- **Related Skills:**
  - `~/.claude/skills/learned/bricks-builder-json-checklist.md`
  - `~/.claude/skills/learned/bricks-builder-global-classes-pattern.md`

## Version History

- **v1.0** (2026-01-28): Initial creation with inline styles and ACSS variables
  - Top disclaimer bar with donate button
  - Secondary header with horizontal links
  - Main footer with navigation, logo, tagline, social icons
  - Bottom copyright and horizontal legal links
