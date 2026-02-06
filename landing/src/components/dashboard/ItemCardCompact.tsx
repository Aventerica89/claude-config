"use client"

import { cn } from '@/lib/utils'
import type { BrainItem } from '@/lib/generated/types'

const typeColors: Record<string, { badge: string; name: string }> = {
  command: { badge: 'bg-blue-500/10 text-blue-400', name: 'text-blue-400' },
  agent: { badge: 'bg-purple-500/10 text-purple-400', name: 'text-purple-400' },
  skill: { badge: 'bg-green-500/10 text-green-400', name: 'text-green-400' },
  rule: { badge: 'bg-orange-500/10 text-orange-400', name: 'text-orange-400' },
}

interface ItemCardCompactProps {
  item: BrainItem
  onEdit?: (item: BrainItem) => void
}

export function ItemCardCompact({ item, onEdit }: ItemCardCompactProps) {
  const colors = typeColors[item.type] ?? typeColors.command

  return (
    <button
      onClick={() => onEdit?.(item)}
      className={cn(
        'flex items-start gap-2 p-3 text-left w-full',
        'bg-card border border-border rounded-lg',
        'hover:border-violet-500/30 transition-colors'
      )}
    >
      <div className="min-w-0 flex-1">
        <code className={cn('font-mono text-xs font-semibold block truncate', colors.name)}>
          {item.name}
        </code>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {item.description}
        </p>
      </div>
      <span className={cn('px-1.5 py-0.5 text-[10px] rounded shrink-0', colors.badge)}>
        {item.category}
      </span>
    </button>
  )
}
