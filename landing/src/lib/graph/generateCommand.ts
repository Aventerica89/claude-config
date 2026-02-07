import type { Node, Edge } from '@xyflow/react'
import type { BrainItemType } from '@/lib/generated/types'

export interface CommandConfig {
  name: string
  description: string
  allowedTools: string[]
  model: 'sonnet' | 'opus' | 'haiku' | 'inherit'
  argumentHint: string
}

interface WorkflowNodeData {
  label: string
  itemType: BrainItemType
  brainItemId: string
  description?: string
  [key: string]: unknown
}

const STEP_VERBS: Record<BrainItemType, string> = {
  command: 'Execute the',
  agent: 'Launch the',
  skill: 'Apply',
  rule: 'Enforce',
}

const STEP_SUFFIXES: Record<BrainItemType, string> = {
  command: 'workflow',
  agent: 'agent',
  skill: 'skill patterns',
  rule: 'rule constraints',
}

function topologicalSort(
  nodes: Node[],
  edges: Edge[]
): string[][] {
  const nodeIds = new Set(nodes.map((n) => n.id))
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  for (const id of nodeIds) {
    inDegree.set(id, 0)
    adjacency.set(id, [])
  }

  for (const edge of edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) continue
    adjacency.get(edge.source)!.push(edge.target)
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1)
  }

  const layers: string[][] = []
  let queue = [...nodeIds].filter((id) => inDegree.get(id) === 0)

  while (queue.length > 0) {
    layers.push([...queue])
    const nextQueue: string[] = []

    for (const nodeId of queue) {
      for (const neighbor of adjacency.get(nodeId) ?? []) {
        const newDeg = (inDegree.get(neighbor) ?? 1) - 1
        inDegree.set(neighbor, newDeg)
        if (newDeg === 0) {
          nextQueue.push(neighbor)
        }
      }
    }

    queue = nextQueue
  }

  return layers
}

function buildStepText(
  data: WorkflowNodeData,
  stepNum: number
): string {
  const verb = STEP_VERBS[data.itemType]
  const suffix = STEP_SUFFIXES[data.itemType]
  const desc = data.description
    ? ` - ${data.description.slice(0, 120)}`
    : ''

  const heading = `## Step ${stepNum}: ${data.label}`
  const body = `${verb} **${data.label}** ${suffix}${desc}`

  return `${heading}\n${body}`
}

function buildParallelSection(
  nodesInLayer: WorkflowNodeData[],
  stepNum: number
): string {
  const heading = `## Step ${stepNum}: Parallel Phase`
  const lines = nodesInLayer.map(
    (d) => `- **${d.label}** (${d.itemType}): ${STEP_VERBS[d.itemType]} ${STEP_SUFFIXES[d.itemType]}`
  )

  return `${heading}\nRun simultaneously:\n${lines.join('\n')}`
}

export function generateCommand(
  nodes: Node[],
  edges: Edge[],
  config: CommandConfig
): string {
  if (nodes.length === 0) {
    return '<!-- Add components to the canvas to generate a command -->'
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const layers = topologicalSort(nodes, edges)

  // Build frontmatter
  const frontmatter = buildFrontmatter(config)

  // Build description line
  const descLine = config.description || 'Auto-generated command workflow.'

  // Build steps from topological layers
  const steps: string[] = []
  let stepNum = 1

  for (const layer of layers) {
    const layerNodes = layer
      .map((id) => nodeMap.get(id))
      .filter(Boolean)
      .map((n) => n!.data as unknown as WorkflowNodeData)

    if (layerNodes.length === 0) continue

    if (layerNodes.length === 1) {
      steps.push(buildStepText(layerNodes[0], stepNum))
    } else {
      steps.push(buildParallelSection(layerNodes, stepNum))
    }
    stepNum++
  }

  const parts = [frontmatter, descLine, ...steps]
  return parts.join('\n\n')
}

function buildFrontmatter(config: CommandConfig): string {
  const lines = ['---']

  if (config.description) {
    lines.push(`description: ${config.description}`)
  }

  if (config.allowedTools.length > 0) {
    lines.push(`allowed-tools: ${config.allowedTools.join(', ')}`)
  }

  if (config.model && config.model !== 'inherit') {
    lines.push(`model: ${config.model}`)
  }

  if (config.argumentHint) {
    lines.push(`argument-hint: ${config.argumentHint}`)
  }

  lines.push('---')
  return lines.join('\n')
}

export const DEFAULT_CONFIG: CommandConfig = {
  name: '',
  description: '',
  allowedTools: [],
  model: 'inherit',
  argumentHint: '',
}

export const COMMON_TOOLS = [
  'Read', 'Write', 'Edit', 'Bash',
  'Grep', 'Glob', 'WebFetch', 'WebSearch',
  'Task', 'TodoWrite',
] as const
