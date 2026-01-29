# String Length Management

## The Problem

Long inline strings cause:
- API errors: "messages: text content blocks must be non-empty"
- Context window overflow
- Poor code readability
- Difficult debugging
- Copy-paste errors

## Maximum String Lengths (MANDATORY)

| Context | Max Length | Action if Exceeded |
|---------|-----------|-------------------|
| Error messages | 200 chars | Simplify message |
| Notification text | 100 chars | Use shorter message |
| Button labels | 50 chars | Abbreviate or split |
| Inline templates | 500 chars | Extract to constant |
| HTML templates | 1000 chars | Move to separate file |
| SVG inline | 300 chars | Use external file or component |
| JSON config | 1000 chars | Move to .json file |

## Refactoring Patterns

### Pattern 1: Extract to Constants

```javascript
// WRONG: Inline long string
function showNotification() {
  return `This is a very long notification message that goes on and on and on...`
}

// CORRECT: Extract to constant
const NOTIFICATION_MESSAGES = {
  SAVE_SUCCESS: 'Saved!',
  SAVE_ERROR: 'Save failed',
  LOADING: 'Loading...'
}

function showNotification(type) {
  return NOTIFICATION_MESSAGES[type]
}
```

### Pattern 2: Extract HTML Templates

```javascript
// WRONG: Massive inline template
function render() {
  return `
    <html>
      <head>...</head>
      <body>
        <div>...hundreds of lines...</div>
      </body>
    </html>
  `
}

// CORRECT: Move to separate file
// templates/page.html
import pageTemplate from './templates/page.html'

function render(data) {
  return pageTemplate.replace('{{data}}', data)
}
```

### Pattern 3: Compose from Parts

```javascript
// WRONG: One huge template
const PAGE = `<header>...</header><main>...</main><footer>...</footer>`

// CORRECT: Compose from smaller parts
const HEADER = '<header>...</header>'
const MAIN = '<main>...</main>'
const FOOTER = '<footer>...</footer>'

const PAGE = [HEADER, MAIN, FOOTER].join('\n')
```

### Pattern 4: Use Template Functions

```javascript
// WRONG: Concatenating long strings
const html = '<div>' + veryLongContent + '</div>'

// CORRECT: Template function
function wrapInDiv(content) {
  return `<div>${content}</div>`
}

const html = wrapInDiv(content)
```

## SVG Icons - Special Case

SVG icons are common culprits for long strings. Solutions:

### Option 1: SVG Sprite Sheet

```javascript
// icons.svg (external file)
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="icon-save" viewBox="0 0 24 24">...</symbol>
    <symbol id="icon-close" viewBox="0 0 24 24">...</symbol>
  </defs>
</svg>

// Usage in code
<svg><use href="icons.svg#icon-save"/></svg>
```

### Option 2: Icon Component Library

```javascript
// icons.js
export const SaveIcon = () => `
  <svg width="14" height="14">
    <path d="M19 21H5"/>
  </svg>
`

// Usage
import { SaveIcon } from './icons'
button.innerHTML = `${SaveIcon()} Save`
```

### Option 3: Icon Constants

```javascript
// constants/icons.js
export const ICONS = {
  save: '<svg>...</svg>',
  close: '<svg>...</svg>',
  check: '<svg>...</svg>'
}

// Keep each SVG under 300 chars
// If larger, use Option 1 or 2
```

## Validation Checklist

Before committing ANY code:

- [ ] Run: `grep -n '.{500,}' *.js *.ts *.jsx *.tsx`
- [ ] Check for inline HTML > 1000 chars
- [ ] Check for SVG > 300 chars
- [ ] Check for error messages > 200 chars
- [ ] Check for notification text > 100 chars
- [ ] Verify no empty string blocks

## Emergency Fix Process

If you encounter "long string error":

1. **Find the culprit:**
   ```bash
   grep -rn '.{500,}' .
   ```

2. **Identify type:**
   - HTML template? → Extract to file
   - SVG icon? → Use sprite or component
   - Error message? → Shorten
   - Config data? → Move to JSON

3. **Refactor immediately:**
   - Don't wait or "fix later"
   - Apply one of the patterns above
   - Test that it still works

4. **Prevent recurrence:**
   - Add comment explaining why extracted
   - Update this rule if new pattern found
   - Add linter rule if possible

## Linting (Optional)

Add to your linter config:

```json
{
  "rules": {
    "max-len": ["error", {
      "code": 500,
      "ignoreStrings": false,
      "ignoreTemplateLiterals": false
    }]
  }
}
```

## File Organization

Structure for extracted content:

```
project/
├── src/
│   ├── templates/
│   │   ├── page.html
│   │   ├── modal.html
│   │   └── card.html
│   ├── constants/
│   │   ├── messages.js
│   │   ├── icons.js
│   │   └── config.js
│   └── components/
│       └── ...
```

## Success Metrics

Code is good when:
- No line exceeds 500 characters
- No template literal exceeds 1000 characters
- All SVGs are < 300 chars or externalized
- Grep returns nothing: `grep '.{500,}' *.js`
- No API errors about empty text blocks

## Remember

**Long strings are a code smell.** If you're writing a string longer than 500 characters inline, you're doing it wrong. Extract, compose, or modularize.
