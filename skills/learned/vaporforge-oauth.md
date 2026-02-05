# VaporForge OAuth Pattern (Learned from 1Code)

## The Legitimate Approach

Using the **official Claude Code CLI's OAuth mechanism** inside a container is legitimate because:
- You're not impersonating Claude Code
- You're using the official binary/SDK
- User authenticates with their own Claude.ai account
- Usage comes from their subscription quota

## How 1Code Does It

### Flow
1. **Start Auth**: Create a sandbox/container running `claude login`
2. **Poll for URL**: Container runs claude login, which outputs an OAuth URL
3. **User Auth**: Opens URL in browser, user logs in on claude.ai
4. **Get Code**: User gets back an auth code (format: `XXX#YYY`)
5. **Submit Code**: User pastes code, container completes `claude login`
6. **Extract Token**: Read credentials from container's keychain/file
7. **Store Locally**: Token stored in user's browser (not server)

### Key Files in 1Code
- `src/main/lib/claude-token.ts` - Reads credentials from system keychain
- `src/main/lib/trpc/routers/claude-code.ts` - OAuth flow implementation
- `src/renderer/components/dialogs/claude-login-modal.tsx` - UI

### Credential Locations
- **macOS**: Keychain (`security find-generic-password -s "Claude Code-credentials"`)
- **Windows**: `~/.claude/.credentials.json`
- **Linux**: `secret-tool` or `~/.claude/.credentials.json`

### Credential Format
```json
{
  "claudeAiOauth": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresAt": ...,
    "scopes": [...]
  }
}
```

### Token Refresh
```typescript
const response = await fetch('https://api.anthropic.com/v1/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: 'claude-desktop',
  }).toString(),
});
```

## VaporForge Implementation Plan

### Container Setup
- Container has `@anthropic-ai/claude-code` installed
- Expose auth endpoints at `/api/auth/{sessionId}/start`, `/status`, `/code`

### Auth Flow
1. Create session, start `claude login --print-code-url` in container
2. Parse the OAuth URL from stdout
3. Return URL to frontend
4. User authenticates, gets code
5. User submits code to container
6. Container completes auth, reads credentials
7. Return token to frontend
8. Frontend stores in localStorage (encrypted if possible)

### Security
- Token never stored on server
- Each user has their own container
- OAuth token is scoped to Claude Code usage
- Refresh token allows seamless re-auth

## What NOT to Do
- Don't make direct API calls pretending to be Claude Code
- Don't store user tokens on your server
- Don't use `sk-ant-api` format keys for subscription users
- Don't impersonate or brand as Claude Code
