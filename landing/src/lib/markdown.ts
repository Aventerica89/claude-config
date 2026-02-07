import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

marked.setOptions({
  gfm: true,
  breaks: true,
})

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'ul', 'ol', 'li', 'blockquote',
  'code', 'pre', 'a', 'strong', 'em',
  'br', 'hr', 'table', 'thead', 'tbody',
  'tr', 'th', 'td', 'img', 'del', 'sup', 'sub',
]

const ALLOWED_ATTR = ['href', 'class', 'id', 'src', 'alt', 'title']

export function renderMarkdown(content: string): string {
  const rawHtml = marked.parse(content) as string
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })
}
