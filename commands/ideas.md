# /ideas - Idea Capture and Management

Manage project ideas stored in `~/.claude/ideas.md`.

## Usage

- `/ideas` or `/ideas list` - View all ideas
- `/ideas add <description>` - Add a new idea
- `/ideas search <keyword>` - Search ideas by keyword

## Instructions

1. **Read the ideas file** at `~/.claude/ideas.md`

2. **Parse the argument** passed to this command:
   - No argument or "list" → Display all ideas organized by category
   - "add <text>" → Add new idea with timestamp
   - "search <keyword>" → Filter and show matching ideas

3. **When adding ideas:**
   - Add timestamp in format `YYYY-MM-DD`
   - If the idea mentions a technology/domain, categorize it (e.g., Browser Extension, CLI Tool, API, etc.)
   - Keep descriptions concise but capture the key concept
   - Include any mentioned use cases or features as bullet points

4. **Format for new entries:**
```markdown
### [Category] Idea Title
**Added:** YYYY-MM-DD
**Status:** Idea | In Progress | Done

Description of the idea.

- Key feature 1
- Key feature 2
```

5. **After modifications**, confirm what was added/changed.

## Argument
$ARGUMENTS
