# Smith Campaign - Bricks Builder Components

## Overview

This directory contains the Automatic.css (ACSS) settings and Bricks Builder components for the Smith campaign website (Bernadette Smith for U.S. Senate).

## Directory Structure

```
campaigns/smith/
├── acss-settings.json           # ACSS plugin configuration
├── acss-active-settings.json    # Active ACSS settings only
└── sections/                    # Bricks Builder component sections
    ├── footer-bernadette-smith.json   # Campaign footer
    ├── footer-bernadette-smith.md     # Footer documentation
    ├── gallery-heard-in-every-county.json
    ├── gallery-heard-in-every-county-v2.json
    └── gallery-heard-in-every-county-v3.json
```

## Files

### ACSS Settings
- `acss-settings.json` - Full ACSS plugin settings export (2,126 configuration keys)
- `acss-active-settings.json` - Active settings only

### Bricks Builder Sections
- `sections/footer-bernadette-smith.json` - Campaign footer with disclaimer, navigation, social icons
- `sections/gallery-heard-in-every-county.json` - Photo gallery components (3 versions)

## Settings Summary

| Category | Count | Description |
|----------|-------|-------------|
| btn-* | 429 | Button styles and variants |
| f-* | 241 | Font/typography settings |
| option-* | 227 | Plugin options/toggles |
| texture-* | 85 | Background textures |
| base-* | 69 | Base/root settings |
| Colors | 60 each | primary, accent, secondary, tertiary, neutral, danger, info, success, warning |
| action-* | 56 | Action color settings |
| shade-* | 56 | Shade variations |
| icon-* | 36 | Icon sizing/styling |
| bg-* | 28 | Background utilities |
| text-* | 61 | Text utilities |
| card-* | 20 | Card component styles |
| h1-h6 | ~65 | Heading styles |

## Important Notes

- **Not all classes/variables are active** - Some ACSS features may be disabled in the plugin settings
- This is a **campaign-specific** configuration, not a universal Bricks template
- To identify active vs inactive settings, check `option-*` keys for enabled/disabled states

## Usage

To import these settings into ACSS:
1. Go to ACSS Dashboard > Settings
2. Use Import/Export feature
3. Select this JSON file

## Bricks Builder Components

### Footer Component
**File:** `sections/footer-bernadette-smith.json`

Campaign footer with:
- Top disclaimer bar with "Paid for by..." and DONATE NOW button
- Secondary header with copyright and horizontal links
- Main footer with navigation, SMITH logo, tagline, social icons
- Bottom copyright and horizontal legal links

**Documentation:** See `sections/footer-bernadette-smith.md` for detailed specs

**Key Features:**
- Uses ACSS variables throughout (no hardcoded values)
- Responsive flexbox layout
- Hover effects on buttons and links
- Max-width 1400px centered containers

**Approach:** Inline styles with ACSS variables (beginner/learning approach)
**Future:** Consider refactoring to Global Classes pattern for production

### Gallery Components
Photo gallery sections with various layouts for campaign media.

## Import Instructions

### ACSS Settings
1. Go to ACSS Dashboard > Settings
2. Use Import/Export feature
3. Select `acss-settings.json`

### Bricks Builder Components
1. Copy JSON content from section file
2. Paste into Bricks Builder editor
3. Ensure ACSS framework is active
4. Customize text, links, and content as needed

## Last Updated

January 2026
