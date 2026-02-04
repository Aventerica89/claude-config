export type AgentCategory = 'planning' | 'development' | 'testing' | 'review' | 'documentation' | 'deployment'

export interface AgentTool {
  name: string
  description: string
  required: boolean
}

export interface AgentConfig {
  maxTokens?: number
  temperature?: number
  model?: string
  timeout?: number
}

export interface Agent {
  id: string
  name: string
  slug: string
  description: string
  category: AgentCategory
  version: string
  author: string
  tools: AgentTool[]
  config: AgentConfig
  promptTemplate: string
  usageCount: number
  lastUsed: Date | null
  isActive: boolean
  tags: string[]
}

export const CATEGORY_COLORS: Record<AgentCategory, string> = {
  planning: 'violet',
  development: 'blue',
  testing: 'green',
  review: 'orange',
  documentation: 'cyan',
  deployment: 'pink',
}

export const CATEGORY_LABELS: Record<AgentCategory, string> = {
  planning: 'Planning',
  development: 'Development',
  testing: 'Testing',
  review: 'Review',
  documentation: 'Documentation',
  deployment: 'Deployment',
}

export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Code Explorer',
    slug: 'code-explorer',
    description: 'Explores and analyzes codebases to understand structure, patterns, and dependencies. Ideal for onboarding to new projects.',
    category: 'development',
    version: '1.2.0',
    author: 'claude-codex',
    tools: [
      { name: 'Glob', description: 'Find files by pattern', required: true },
      { name: 'Grep', description: 'Search file contents', required: true },
      { name: 'Read', description: 'Read file contents', required: true },
      { name: 'Bash', description: 'Run shell commands', required: false },
    ],
    config: {
      maxTokens: 4096,
      temperature: 0.3,
      model: 'claude-sonnet-4-20250514',
      timeout: 120000,
    },
    promptTemplate: 'Analyze the codebase structure and provide insights...',
    usageCount: 847,
    lastUsed: new Date('2025-02-04T10:30:00'),
    isActive: true,
    tags: ['analysis', 'exploration', 'onboarding'],
  },
  {
    id: 'agent-002',
    name: 'Planner',
    slug: 'planner',
    description: 'Creates detailed implementation plans for features. Breaks down complex tasks into actionable steps with dependencies.',
    category: 'planning',
    version: '2.0.1',
    author: 'claude-codex',
    tools: [
      { name: 'Read', description: 'Read file contents', required: true },
      { name: 'Glob', description: 'Find files by pattern', required: true },
      { name: 'TodoWrite', description: 'Create task lists', required: true },
    ],
    config: {
      maxTokens: 8192,
      temperature: 0.5,
      model: 'claude-sonnet-4-20250514',
      timeout: 180000,
    },
    promptTemplate: 'Create a detailed implementation plan for...',
    usageCount: 623,
    lastUsed: new Date('2025-02-04T09:15:00'),
    isActive: true,
    tags: ['planning', 'architecture', 'breakdown'],
  },
  {
    id: 'agent-003',
    name: 'TDD Guide',
    slug: 'tdd-guide',
    description: 'Guides test-driven development workflow. Writes tests first, then helps implement code to pass them.',
    category: 'testing',
    version: '1.5.0',
    author: 'claude-codex',
    tools: [
      { name: 'Read', description: 'Read file contents', required: true },
      { name: 'Write', description: 'Write files', required: true },
      { name: 'Edit', description: 'Edit files', required: true },
      { name: 'Bash', description: 'Run tests', required: true },
    ],
    config: {
      maxTokens: 4096,
      temperature: 0.2,
      model: 'claude-sonnet-4-20250514',
      timeout: 300000,
    },
    promptTemplate: 'Follow TDD principles to implement...',
    usageCount: 412,
    lastUsed: new Date('2025-02-03T16:45:00'),
    isActive: true,
    tags: ['testing', 'tdd', 'quality'],
  },
  {
    id: 'agent-004',
    name: 'Security Reviewer',
    slug: 'security-reviewer',
    description: 'Reviews code for security vulnerabilities. Checks for OWASP top 10, injection attacks, and auth issues.',
    category: 'review',
    version: '1.1.0',
    author: 'claude-codex',
    tools: [
      { name: 'Read', description: 'Read file contents', required: true },
      { name: 'Grep', description: 'Search for patterns', required: true },
      { name: 'Glob', description: 'Find files', required: true },
    ],
    config: {
      maxTokens: 6144,
      temperature: 0.1,
      model: 'claude-sonnet-4-20250514',
      timeout: 240000,
    },
    promptTemplate: 'Review the following code for security issues...',
    usageCount: 289,
    lastUsed: new Date('2025-02-04T08:00:00'),
    isActive: true,
    tags: ['security', 'review', 'owasp'],
  },
  {
    id: 'agent-005',
    name: 'Doc Updater',
    slug: 'doc-updater',
    description: 'Keeps documentation in sync with code changes. Updates READMEs, API docs, and inline comments.',
    category: 'documentation',
    version: '1.0.0',
    author: 'claude-codex',
    tools: [
      { name: 'Read', description: 'Read file contents', required: true },
      { name: 'Write', description: 'Write files', required: true },
      { name: 'Edit', description: 'Edit files', required: true },
      { name: 'Glob', description: 'Find files', required: true },
    ],
    config: {
      maxTokens: 4096,
      temperature: 0.4,
      model: 'claude-sonnet-4-20250514',
      timeout: 120000,
    },
    promptTemplate: 'Update documentation to reflect changes in...',
    usageCount: 156,
    lastUsed: new Date('2025-02-02T14:20:00'),
    isActive: true,
    tags: ['documentation', 'readme', 'api-docs'],
  },
  {
    id: 'agent-006',
    name: 'Build Error Resolver',
    slug: 'build-error-resolver',
    description: 'Diagnoses and fixes build failures. Parses error logs and applies targeted fixes.',
    category: 'deployment',
    version: '1.3.0',
    author: 'claude-codex',
    tools: [
      { name: 'Bash', description: 'Run build commands', required: true },
      { name: 'Read', description: 'Read file contents', required: true },
      { name: 'Edit', description: 'Edit files', required: true },
      { name: 'Grep', description: 'Search errors', required: true },
    ],
    config: {
      maxTokens: 4096,
      temperature: 0.2,
      model: 'claude-sonnet-4-20250514',
      timeout: 300000,
    },
    promptTemplate: 'Analyze the build error and fix...',
    usageCount: 534,
    lastUsed: new Date('2025-02-04T11:00:00'),
    isActive: true,
    tags: ['build', 'errors', 'ci-cd'],
  },
]

export function getAgentBySlug(slug: string): Agent | undefined {
  return mockAgents.find(agent => agent.slug === slug)
}

export function getAgentsByCategory(category: AgentCategory): Agent[] {
  return mockAgents.filter(agent => agent.category === category)
}

export function formatLastUsed(date: Date | null): string {
  if (!date) return 'Never'
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
