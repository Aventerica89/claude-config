import type { Node, Edge } from '@xyflow/react'

export interface WorkflowSummary {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface WorkflowDetail extends WorkflowSummary {
  nodes: Node[]
  edges: Edge[]
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

const BASE = '/api/workflows'

export async function listWorkflows(): Promise<WorkflowSummary[]> {
  const res = await fetch(BASE)
  const json: ApiResponse<WorkflowSummary[]> = await res.json()
  if (!json.success) throw new Error(json.error ?? 'Failed to list')
  return json.data ?? []
}

export async function getWorkflow(id: string): Promise<WorkflowDetail> {
  const res = await fetch(`${BASE}/${id}`)
  const json: ApiResponse<WorkflowDetail> = await res.json()
  if (!json.success) throw new Error(json.error ?? 'Not found')
  if (!json.data) throw new Error('No data returned')
  return json.data
}

export async function createWorkflow(
  name: string,
  description: string,
  nodes: Node[],
  edges: Edge[]
): Promise<string> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, nodes, edges }),
  })
  const json: ApiResponse<{ id: string }> = await res.json()
  if (!json.success) throw new Error(json.error ?? 'Failed to create')
  return json.data!.id
}

export async function updateWorkflow(
  id: string,
  data: {
    name?: string
    description?: string
    nodes?: Node[]
    edges?: Edge[]
  }
): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json: ApiResponse<null> = await res.json()
  if (!json.success) throw new Error(json.error ?? 'Failed to update')
}

export async function deleteWorkflow(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  const json: ApiResponse<null> = await res.json()
  if (!json.success) throw new Error(json.error ?? 'Failed to delete')
}
