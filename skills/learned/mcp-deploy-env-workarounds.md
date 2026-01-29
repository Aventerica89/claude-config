# MCP Deploy Env Vars - Platform Workarounds

**Extracted:** 2026-01-28
**Context:** When 1p MCP deploy_env_vars fails for Vercel or Cloudflare

## Problem

The 1Password MCP `deploy_env_vars` tool may fail on:
- **Vercel**: `--project` flag not supported in CLI v50.8+
- **Cloudflare**: Multiple accounts require explicit account ID

## Solution

### Vercel - Use API directly

```bash
# Get env var ID first
curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
  "https://api.vercel.com/v10/projects/{projectId}/env?teamId={teamId}"

# Update existing
curl -s -X PATCH \
  "https://api.vercel.com/v10/projects/{projectId}/env/{envId}?teamId={teamId}" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":"secret-value","type":"encrypted"}'

# Create new
curl -s -X POST \
  "https://api.vercel.com/v10/projects/{projectId}/env?teamId={teamId}" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"key":"VAR_NAME","value":"secret","type":"encrypted","target":["production"]}'
```

### Cloudflare - Set account ID

```bash
CLOUDFLARE_ACCOUNT_ID="your-account-id" \
  wrangler secret put VAR_NAME --name worker-name
```

### GitHub - Works as-is

```bash
# 1p MCP works directly
deploy_env_vars(platform: "github", repo: "owner/repo", envVars: [...])
```

## When to Use

- MCP deploy_env_vars fails with CLI errors
- Deploying to Vercel with CLI v50.8+
- Deploying to Cloudflare with multiple accounts
