"use client"

import { ItemGrid } from './ItemGrid'
import { commands } from '@/lib/generated/commands'

export function CommandsPage() {
  return (
    <ItemGrid
      items={commands}
      type="command"
      title="Commands"
      description={`${commands.length} slash commands for development tasks`}
    />
  )
}
