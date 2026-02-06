"use client"

import { ItemGrid } from './ItemGrid'
import { rules } from '@/lib/generated/rules'

export function RulesPage() {
  return (
    <ItemGrid
      items={rules}
      type="rule"
      title="Rules"
      description={`${rules.length} coding standards and behavior guidelines`}
    />
  )
}
