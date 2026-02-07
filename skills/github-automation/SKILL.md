---
name: github-automation
description: Automate GitHub repositories, issues, pull requests, branches, CI/CD, and permissions via gh CLI. Manage code workflows, review PRs, search code, and handle deployments programmatically.
---

# GitHub Automation

Automate GitHub repository management, issue tracking, pull request workflows, branch operations, and CI/CD using the `gh` CLI.

## Core Workflows

### 1. Create and Manage Issues

```bash
# List issues
gh issue list --state open --limit 20

# Create issue
gh issue create --title "Bug: login fails" --body "Steps to reproduce..." --label bug

# Add comment
gh issue comment 42 --body "Fixed in PR #43"

# Search issues
gh search issues "auth error" --repo owner/repo
```

**Tips:**
- `gh issue list` returns both issues AND PRs; filter with `--label`
- Only users with push access can set assignees and labels

### 2. Manage Pull Requests

```bash
# List PRs
gh pr list --state open

# Create PR
gh pr create --title "feat: add auth" --body "## Summary..."

# Review PR
gh pr diff 42
gh pr review 42 --approve

# Merge PR (verify CI first)
gh pr checks 42
gh pr merge 42 --squash
```

**Tips:**
- Always check CI status before merging: `gh pr checks`
- Require explicit user confirmation before merging

### 3. Manage Repositories and Branches

```bash
# List repos
gh repo list --limit 20

# Create repo
gh repo create my-app --private --clone

# List branches
gh api repos/owner/repo/branches --jq '.[].name'

# Create branch from current
git checkout -b feature/new-thing
git push -u origin feature/new-thing
```

### 4. Search Code and Commits

```bash
# Search code
gh search code "API_KEY" --repo owner/repo

# List commits
gh api repos/owner/repo/commits --jq '.[].commit.message' | head -20

# Get commit details
gh api repos/owner/repo/commits/SHA
```

**Tips:**
- Code search only indexes files under 384KB on default branch
- Maximum 1000 results returned

### 5. Manage CI/CD and Deployments

```bash
# List workflows
gh workflow list

# Trigger workflow
gh workflow run ci.yml --ref main

# Check run status
gh run list --workflow ci.yml --limit 5

# View run logs
gh run view RUN_ID --log
```

### 6. Manage Users and Permissions

```bash
# List collaborators
gh api repos/owner/repo/collaborators --jq '.[].login'

# Check permissions
gh api repos/owner/repo/collaborators/username/permission --jq '.permission'

# Branch protection
gh api repos/owner/repo/branches/main/protection
```

## Safety Rules

- Always verify PR mergeable status before merge
- Require explicit user confirmation for destructive operations
- Check CI status before merging
- Repo deletion is irreversible - double confirm

## Quick Reference

| Task | Command |
|------|---------|
| List repos | `gh repo list` |
| Create issue | `gh issue create` |
| List PRs | `gh pr list` |
| Create PR | `gh pr create` |
| Merge PR | `gh pr merge` |
| Check CI | `gh pr checks` |
| Search code | `gh search code` |
| List workflows | `gh workflow list` |
| Trigger workflow | `gh workflow run` |
