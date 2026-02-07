---
name: warn-source-edit-needs-regen
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: (commands|agents|skills|rules)/.*\.md$
---

**Source markdown file updated**

This file feeds into the landing page brain database.

After editing, regenerate with:
```bash
cd landing && npm run generate
```

Or changes will auto-regenerate on next `npm run dev` or `npm run build`.
