# /ideas - Idea Capture and Management

Manage project ideas stored in `~/.claude/ideas.md`.

## Usage

- `/ideas` or `/ideas list` - View all ideas
- `/ideas add <description>` - Add a new idea
- `/ideas search <keyword>` - Search ideas by keyword

## Quick Links

When displaying ideas, always include these reference links at the top:

**Resources:**
- [JB Cloud Docs](https://docs.jbcloud.app) - Published documentation site
- [GitHub Repository](https://github.com/Aventerica89/jb-cloud-docs) - Source code and issues

## Instructions

1. **Display Quick Links** at the top of your response:
   ```markdown
   **Resources:**
   - [JB Cloud Docs](https://docs.jbcloud.app) - Published documentation site
   - [GitHub Repository](https://github.com/Aventerica89/jb-cloud-docs) - Source code and issues
   ```

2. **Read the ideas file** at `~/.claude/ideas.md`

3. **Parse the argument** passed to this command:
   - No argument or "list" → Display all ideas organized by category
   - "add <text>" → Add new idea with timestamp
   - "search <keyword>" → Filter and show matching ideas

4. **When adding ideas:**
   - Add timestamp in format `YYYY-MM-DD`
   - If the idea mentions a technology/domain, categorize it (e.g., Browser Extension, CLI Tool, API, etc.)
   - Keep descriptions concise but capture the key concept
   - Include any mentioned use cases or features as bullet points

5. **Format for new entries:**
```markdown
### [Category] Idea Title
**Added:** YYYY-MM-DD
**Status:** Idea | In Progress | Done

Description of the idea.

- Key feature 1
- Key feature 2
```

6. **After modifications**, confirm what was added/changed.

## Argument
$ARGUMENTS
