"use client"

import { ItemGrid } from './ItemGrid'
import { agents } from '@/lib/generated/agents'

export function AgentsPage() {
  return (
    <ItemGrid
      items={agents}
      type="agent"
      title="Agents"
      description={`${agents.length} specialized AI agents for complex tasks`}
    />
  )
}
