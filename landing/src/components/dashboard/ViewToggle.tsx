"use client"

import { cn } from '@/lib/utils'

export type ViewMode = 'grid' | 'list' | 'compact'

interface ViewToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

const modes: { value: ViewMode; label: string; icon: string }[] = [
  { value: 'grid', label: 'Grid view', icon: 'grid' },
  { value: 'list', label: 'List view', icon: 'list' },
  { value: 'compact', label: 'Compact view', icon: 'compact' },
]

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1.5" width="14" height="3" rx="0.75" />
      <rect x="1" y="6.5" width="14" height="3" rx="0.75" />
      <rect x="1" y="11.5" width="14" height="3" rx="0.75" />
    </svg>
  )
}

function CompactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="4" height="4" rx="0.75" />
      <rect x="6" y="1" width="4" height="4" rx="0.75" />
      <rect x="11" y="1" width="4" height="4" rx="0.75" />
      <rect x="1" y="6" width="4" height="4" rx="0.75" />
      <rect x="6" y="6" width="4" height="4" rx="0.75" />
      <rect x="11" y="6" width="4" height="4" rx="0.75" />
      <rect x="1" y="11" width="4" height="4" rx="0.75" />
      <rect x="6" y="11" width="4" height="4" rx="0.75" />
      <rect x="11" y="11" width="4" height="4" rx="0.75" />
    </svg>
  )
}

const iconMap = {
  grid: GridIcon,
  list: ListIcon,
  compact: CompactIcon,
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-secondary/50 rounded-lg p-0.5 gap-0.5">
      {modes.map((mode) => {
        const Icon = iconMap[mode.icon as keyof typeof iconMap]
        return (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            aria-label={mode.label}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              value === mode.value
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-4 h-4" />
          </button>
        )
      })}
    </div>
  )
}
