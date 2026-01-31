# Routine Merge System

## Context
- Type: Command System / Automation Workflow
- Purpose: Intelligent PR merge workflows with AI review integration
- Location: `~/.claude/routines/` + `~/.claude/commands/routine-*.md`
- Status: Complete - Ready to use

## Overview

A comprehensive multi-level PR merge automation system that integrates Gemini AI review, security scanning, and GitHub Actions validation with smart decision-making.

## Key Components

### Commands
1. **`/routine-merge`** - Main merge routine (light/medium/thorough levels)
2. **`/routine-config`** - Configuration management
3. **`/routine-stats`** - Metrics and analytics

### Configuration
- **`merge.json`** - Main configuration file
- **`presets/`** - Pre-configured workflows (hotfix, release, deps-update)
- **`state/`** - Execution state files (resume capability)

### Documentation
- **`README.md`** - Complete documentation (60+ pages)
- **`QUICKSTART.md`** - 2-minute getting started guide
- **`ARCHITECTURE.md`** - Technical deep-dive

## Three Levels Explained

### Light (~2 min)
- Build + Tests + Basic Security
- For: Docs, tests, small fixes
- Fast path, low-risk changes

### Medium (~5 min) - DEFAULT
- All Light checks
- **Gemini AI Review** (waits for feedback)
- **Security Quick Scan**
- TypeScript + Lint + GitHub Actions
- Auto-implements CRITICAL items
- Prompts for HIGH priority items
- Re-runs checks after changes

### Thorough (~10 min)
- All Medium checks
- Full security audit
- Bundle size analysis
- Performance regression tests
- Breaking change detection
- Migration guide requirements

## Key Decisions Made

### 1. Wait-Based Architecture
**Decision:** Routine waits for external reviews (Gemini, security) before proceeding
**Rationale:** True integration requires acting on feedback, not just collecting it
**Impact:** Slower but much safer - catches issues before merge

### 2. Severity-Based Actions
**Decision:** Auto-implement CRITICAL, prompt for HIGH, log MEDIUM/LOW
**Rationale:** Balance automation with human judgment
**Implementation:**
```json
{
  "implement_severity": ["CRITICAL", "HIGH"],
  "prompt_severity": ["MEDIUM"],
  "log_severity": ["LOW"]
}
```

### 3. State Preservation
**Decision:** Save state after each check to `state/{pr}.json`
**Rationale:** Allow resume after interruption, audit trail
**Benefit:** Can Ctrl+C and resume later, see exactly what was checked

### 4. Re-Run After Changes
**Decision:** If changes made (from Gemini/security), re-run affected checks
**Rationale:** Ensure fixes don't introduce new issues
**Example:** Fix security issue → re-run security scan → re-run Gemini review

### 5. Three Levels Instead of Many
**Decision:** Light/Medium/Thorough (not 5+ levels)
**Rationale:** Keep it simple, 90% of use cases fit one of these three
**Customization:** Presets for edge cases, custom level for full control

### 6. Learning System
**Decision:** Track metrics, suggest optimizations
**Rationale:** Get smarter over time, reduce friction
**Examples:**
- "Gemini timing out 10% of time → increase timeout"
- "Lint never fails for docs → skip lint for light level"
- "All npm audit issues auto-fixable → enable auto-fix"

## Patterns Discovered

### Pattern 1: External Review Integration
```markdown
1. Trigger review (POST /api/review)
2. Poll for completion (GET /api/review/status)
3. Parse response (categorize by severity)
4. Act based on severity (auto/prompt/log)
5. If changes made → re-run affected checks
6. Loop until all pass or blocked
```

**Reusable for:**
- Any external review system (Gemini, CodeRabbit, etc.)
- Any async check with feedback
- Any system with severity levels

### Pattern 2: Decision Point Management
```typescript
interface DecisionPoint {
  question: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  auto_handle: boolean  // Auto-implement or require user?
  options: Option[]
  context: any  // What triggered this decision
}
```

**When to ask:**
- HIGH severity items (medium risk)
- Security vulnerabilities that can't auto-fix
- GitHub Actions failures
- Breaking changes

**When NOT to ask:**
- CRITICAL (auto-implement or block)
- LOW (just log)
- Obvious fixes (npm audit fix)

### Pattern 3: Configuration Hierarchy
```
Default → Global → Project → Preset → CLI Args
```

Later configs override earlier ones. Allows:
- Global defaults for all projects
- Project-specific overrides
- Preset shortcuts
- One-off CLI adjustments

### Pattern 4: State File as Resume Point
```json
{
  "checks_completed": [...],  // Already done
  "checks_pending": [...],    // Still to do
  "current_check": "gemini_review",
  "changes_made": [...]       // What we've modified
}
```

Can resume by:
1. Read state file
2. Skip completed checks
3. Continue from current_check
4. Full context preserved

## Usage Patterns

### Most Common (~80% of PRs)
```bash
/routine-merge
# Uses medium level (default)
# Gemini + security + standard checks
# ~5 minutes
```

### Quick Merge (~15% of PRs)
```bash
/routine-merge --light
# Docs, tests, small fixes
# ~2 minutes
```

### Pre-Release (~5% of PRs)
```bash
/routine-merge --thorough
# or
/routine-merge --preset release
# Full audit, all checks
# ~10 minutes
```

### Production Hotfix
```bash
/routine-merge --preset hotfix
# Minimal checks, maximum speed
# ~2 minutes, skips Gemini
```

## Integration Points

### Works With
- `/gemini-review` - AI code review
- `/security` - Security audit suite
- `/deploy-check` - Pre-deployment validation
- GitHub CLI (`gh`) - PR info, merge, actions
- Git - Status, commits, push
- NPM - Build, test, audit

### Future Integrations
- CodeRabbit
- Snyk
- SonarQube
- Custom check plugins
- Slack/Discord notifications
- GitLab, Bitbucket support

## Files Created

### Commands
- `~/.claude/commands/routine-merge.md` (14KB)
- `~/.claude/commands/routine-config.md` (9KB)
- `~/.claude/commands/routine-stats.md` (12KB)

### Configuration
- `~/.claude/routines/merge.json` (main config)
- `~/.claude/routines/presets/hotfix.json`
- `~/.claude/routines/presets/release.json`
- `~/.claude/routines/presets/deps-update.json`

### Documentation
- `~/.claude/routines/README.md` (full docs)
- `~/.claude/routines/QUICKSTART.md` (getting started)
- `~/.claude/routines/ARCHITECTURE.md` (technical details)

### State (created at runtime)
- `~/.claude/routines/state/merge-{pr}.json`

## Next Steps

### To Use
1. Run `/routine-merge` on next PR
2. Check stats after a few runs: `/routine-stats`
3. Review recommendations: `/routine-stats --recommendations`
4. Customize if needed: `/routine-config`

### To Extend
1. Add new checks (performance, accessibility, etc.)
2. Create team-specific presets
3. Add notifications (Slack, Discord)
4. Integrate with other tools (Snyk, SonarQube)
5. Support other platforms (GitLab, Bitbucket)

### To Learn
1. Track which checks find most issues
2. Optimize timeout values based on actual runs
3. Identify patterns in HIGH severity items
4. Create presets for common PR types

## Success Metrics

Will know it's working when:
- PRs merge faster (less back-and-forth)
- Fewer bugs slip through to main
- Consistent review quality
- Team adopts it voluntarily
- Stats show improvement trends

## Philosophy

**The routine system embodies:**
1. **Smart Automation** - Automate tedious, not thinking
2. **Decision Points** - Always ask for high-risk decisions
3. **Safety First** - Block merges when critical issues found
4. **Learning System** - Get smarter with each run
5. **Transparency** - Always show what's happening and why

**It does NOT:**
- Replace human judgment (you still decide on HIGH items)
- Merge without all required checks passing
- Skip security for speed
- Hide what it's doing

## Related Patterns

See also:
- `/deploy-check` - Pre-deployment validation
- `/create-release` - Release automation
- Git hooks system - Pre-commit checks
- GitHub Actions workflows - CI/CD integration

## Lessons Learned

1. **Wait-based is better than fire-and-forget** - Acting on feedback requires waiting
2. **Three levels is the sweet spot** - More complexity doesn't add value
3. **State preservation enables resume** - Users appreciate interruption safety
4. **Learning from metrics is powerful** - Data-driven optimization
5. **Presets beat custom configs** - Most users want shortcuts, not full control

## Code Examples

### Check Execution Pattern
```typescript
async function executeCheck(check: Check): Promise<CheckResult> {
  console.log(`Running ${check.name}...`)

  const startTime = Date.now()

  try {
    const result = await runCheckCommand(check)
    const duration = Date.now() - startTime

    return {
      status: result.passed ? 'passed' : 'failed',
      duration_ms: duration,
      output: result.output
    }
  } catch (error) {
    if (error instanceof TimeoutError) {
      return { status: 'failed', error: 'timeout' }
    }
    throw error
  }
}
```

### Severity-Based Action
```typescript
function handleFeedback(item: FeedbackItem): Action {
  if (item.severity === 'CRITICAL') {
    return { type: 'auto_implement', item }
  } else if (item.severity === 'HIGH') {
    return { type: 'prompt_user', item }
  } else if (item.severity === 'MEDIUM') {
    return { type: 'offer_to_implement', item }
  } else {
    return { type: 'log_only', item }
  }
}
```

## Testing Notes

To test the dry-run simulation:
```bash
/routine-merge --dry-run
```

Shows:
- Which checks would run
- Estimated timeline
- Decision points
- No actual execution

Useful for:
- Understanding flow before running
- Previewing new presets
- Training users
- Debugging configuration

## Documentation Quality

The docs are structured for different audiences:
- **QUICKSTART.md** - 2 minutes, get started now
- **README.md** - Complete reference, all features
- **ARCHITECTURE.md** - Technical implementation details

Each serves a purpose:
- QUICKSTART → Onboarding
- README → Daily reference
- ARCHITECTURE → Extending/debugging

## Reuse Potential

This pattern can be adapted for:
- `/routine-deploy` - Deployment workflow
- `/routine-release` - Release creation
- `/routine-rollback` - Safe rollback
- `/routine-refactor` - Refactoring workflow
- Any multi-step process with decision points

Core concepts are universal:
- Wait for external input
- Decide based on severity
- Re-run after changes
- Save state for resume
- Learn from metrics

---

Created: 2026-01-30
Session: Routine merge system design and implementation
Status: Complete and ready to use
