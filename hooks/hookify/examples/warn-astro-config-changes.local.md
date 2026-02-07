---
name: warn-astro-config-changes
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: landing/astro\.config\.mjs$
---

**Astro configuration change detected**

Critical settings to preserve:
- `output: 'hybrid'` - Required for API routes
- `adapter: vercel()` - Deployment target
- `site: 'https://codex.jbcloud.app'` - Production URL

After changes, test locally: `cd landing && npm run dev && npm run build`
