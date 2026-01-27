# Ideas Backlog

A collection of project ideas captured during Claude Code sessions.

---

## Browser Extensions

### Env Var Assistant - Auto-paste secrets to dashboards
**Added:** 2026-01-26
**Status:** Idea

A browser extension + 1Password integration for storing API keys and automatically entering them into provider dashboards.

**Architecture:**
```
Claude Chat → 1Password CLI (op) → 1Password Vault
                                        ↓
Browser Extension ← 1Password Connect/API
        ↓
Dashboard Automation (navigate + fill + click)
```

**1Password Integration:**
- Store secrets via `op` CLI with tags and metadata
- Use custom fields to store target dashboard URL and field selectors
- 1Password Connect (self-hosted REST API) for extension access
- Native messaging bridge between extension and 1Password

**Browser Extension Role:**
- Read tagged items from 1Password (via Connect or native messaging)
- Maintain manifest of dashboard selectors (Cloudflare, Vercel, Netlify, AWS, Supabase, etc.)
- Navigate to stored URL for each secret
- Content script finds fields, fills values, clicks save

**Advantages:**
- No secret storage in extension - 1Password handles all security
- Cross-device sync via 1Password
- Full audit trail in 1Password
- Could leverage 1Password's existing autofill UI
- Pattern matching for common formats (`API_KEY=`, `sk-...`, `ghp_...`, etc.)

**Potential Extensions:**
- MCP server integration - Claude invokes "store this key for Cloudflare"
- Batch mode for setting up new projects (multiple env vars at once)
- Dashboard selector manifest as community-maintained repo

---

## CLI Tools

(Empty - add ideas with `/ideas add`)

---

## APIs & Services

(Empty - add ideas with `/ideas add`)

---

## Other

(Empty - add ideas with `/ideas add`)
