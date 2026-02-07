import { useState, useMemo } from 'react'
import { allItems } from '@/lib/generated'
import type { BrainItem, BrainItemType } from '@/lib/generated/types'
import { cn } from '@/lib/utils'

const TYPE_CONFIG: Record<BrainItemType, {
  label: string
  color: string
  bg: string
}> = {
  command: {
    label: 'Commands',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30',
  },
  agent: {
    label: 'Agents',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
  },
  skill: {
    label: 'Skills',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
  },
  rule: {
    label: 'Rules',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/30',
  },
}

const TYPE_ORDER: BrainItemType[] = ['command', 'agent', 'skill', 'rule']

interface ComponentPaletteProps {
  className?: string
}

export function ComponentPalette({ className }: ComponentPaletteProps) {
  const [search, setSearch] = useState('')
  const [collapsed, setCollapsed] = useState<Set<BrainItemType>>(
    () => new Set()
  )

  const grouped = useMemo(() => {
    const q = search.toLowerCase().trim()
    const result = new Map<BrainItemType, BrainItem[]>()

    for (const type of TYPE_ORDER) {
      result.set(type, [])
    }

    for (const item of allItems) {
      if (q && !item.name.toLowerCase().includes(q)) continue
      result.get(item.type)!.push(item)
    }

    return result
  }, [search])

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: BrainItem
  ) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        id: item.id,
        name: item.name,
        type: item.type,
        description: item.description,
        category: item.category,
      })
    )
    e.dataTransfer.effectAllowed = 'move'
  }

  const toggleGroup = (type: BrainItemType) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  return (
    <div className={cn(
      'w-56 flex flex-col bg-card border-r border-border',
      className
    )}>
      {/* Header */}
      <div className="p-3 border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Components
        </h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            'w-full px-2 py-1.5 text-xs rounded-md',
            'bg-secondary/50 border border-border',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-1 focus:ring-violet-500/50'
          )}
        />
      </div>

      {/* Grouped items */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {TYPE_ORDER.map((type) => {
          const items = grouped.get(type) ?? []
          const config = TYPE_CONFIG[type]
          const isCollapsed = collapsed.has(type)

          return (
            <div key={type}>
              <button
                onClick={() => toggleGroup(type)}
                className={cn(
                  'w-full flex items-center justify-between',
                  'px-2 py-1.5 text-xs font-medium rounded-md',
                  'hover:bg-secondary/50 transition-colors',
                  config.color
                )}
              >
                <span>{config.label}</span>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground">
                    {items.length}
                  </span>
                  <svg
                    className={cn(
                      'w-3 h-3 transition-transform',
                      isCollapsed && '-rotate-90'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {!isCollapsed && (
                <div className="mt-1 space-y-0.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={cn(
                        'px-2 py-1.5 text-xs rounded-md border',
                        'cursor-grab active:cursor-grabbing',
                        'hover:brightness-125 transition-all',
                        config.bg
                      )}
                    >
                      <span className="text-foreground truncate block">
                        {item.name}
                      </span>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="px-2 py-1 text-xs text-muted-foreground">
                      No matches
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Help text */}
      <div className="p-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Drag components onto the canvas to build your command workflow.
        </p>
      </div>
    </div>
  )
}
