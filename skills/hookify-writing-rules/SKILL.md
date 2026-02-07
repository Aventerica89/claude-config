---
name: hookify-writing-rules
description: Guide for creating hookify rules - markdown files with YAML frontmatter that define patterns to watch for and messages to show when matched.
---

# Writing Hookify Rules

## Rule File Format

### Basic Structure

```markdown
---
name: rule-identifier
enabled: true
event: bash|file|stop|prompt|all
pattern: regex-pattern-here
action: warn|block
---

Message to show when this rule triggers.
```

### Frontmatter Fields

| Field | Required | Values | Description |
|-------|----------|--------|-------------|
| `name` | Yes | kebab-case | Unique identifier |
| `enabled` | Yes | true/false | Active or disabled |
| `event` | Yes | bash, file, stop, prompt, all | Which hook event |
| `pattern` | Simple | regex | Single-condition match |
| `action` | No | warn (default), block | Allow or prevent |
| `conditions` | Advanced | list | Multiple conditions |

### Event Types

- `bash` - Bash tool commands
- `file` - Edit, Write, MultiEdit tools
- `stop` - When agent wants to stop
- `prompt` - When user submits a prompt
- `all` - All events

### Advanced Format (Multiple Conditions)

```markdown
---
name: warn-env-file-edits
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.env$
  - field: new_text
    operator: contains
    pattern: API_KEY
---

You're adding an API key to a .env file. Ensure this is in .gitignore!
```

**Condition fields:**
- Bash: `command`
- File: `file_path`, `new_text`, `old_text`, `content`
- Prompt: `user_prompt`

**Operators:**
- `regex_match` - Regex pattern matching
- `contains` - Substring check
- `equals` - Exact match
- `not_contains` - Must NOT be present
- `starts_with` - Prefix check
- `ends_with` - Suffix check

All conditions must match for rule to trigger.

## Message Body

```markdown
Warning: **Console.log detected!**

**Why this matters:**
- Debug logs shouldn't ship to production
- Can expose sensitive data

**Alternatives:**
- Use a proper logging library
- Remove before committing
```

## Common Patterns

### Bash

```
rm\s+-rf              Dangerous delete
sudo\s+               Privilege escalation
chmod\s+777           Insecure permissions
dd\s+if=              Disk operations
```

### File

```
console\.log\(        Debug logging
eval\(                Code injection risk
innerHTML\s*=         XSS risk
\.env$                Sensitive files
node_modules/         Dependencies
```

### File Path + Content Combined

```yaml
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.tsx?$
  - field: new_text
    operator: regex_match
    pattern: console\.log\(
```

## File Organization

- Location: `.claude/hookify.{name}.local.md`
- Gitignore: Add `.claude/*.local.md`
- No restart needed - rules are read dynamically

## Examples

**Block dangerous rm:**
```yaml
name: block-dangerous-rm
enabled: true
event: bash
pattern: rm\s+-rf
action: block
```

**Warn console.log:**
```yaml
name: warn-console-log
enabled: true
event: file
pattern: console\.log\(
action: warn
```

**Require tests before stop:**
```yaml
name: require-tests-run
enabled: false
event: stop
action: block
conditions:
  - field: transcript
    operator: not_contains
    pattern: npm test|pytest|cargo test
```

## Testing Patterns

```bash
python3 -c "import re; print(re.search(r'your_pattern', 'test text'))"
```
