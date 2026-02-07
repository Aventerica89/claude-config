import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { allItems } from '@/lib/generated'
import type { BrainItem, BrainItemType } from '@/lib/generated/types'
import { cn } from '@/lib/utils'

const TYPE_COLORS: Record<BrainItemType, string> = {
  command: 'bg-purple-500/30 text-purple-300',
  agent: 'bg-emerald-500/30 text-emerald-300',
  skill: 'bg-blue-500/30 text-blue-300',
  rule: 'bg-orange-500/30 text-orange-300',
}

interface QuickAddMenuProps {
  position: { x: number; y: number }
  onSelect: (item: BrainItem) => void
  onClose: () => void
}

export function QuickAddMenu({
  position,
  onSelect,
  onClose,
}: QuickAddMenuProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return allItems.slice(0, 12)
    return allItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.type.includes(q)
      )
      .slice(0, 12)
  }, [query])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const item = list.children[selectedIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((i) => Math.max(i - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            onSelect(results[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    },
    [results, selectedIndex, onSelect, onClose]
  )

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={cn(
          'absolute z-50 w-64 rounded-xl border border-border',
          'bg-card shadow-2xl overflow-hidden'
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -12px)',
        }}
      >
        {/* Search input */}
        <div className="p-2 border-b border-border">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components..."
            className={cn(
              'w-full px-3 py-2 text-sm rounded-lg',
              'bg-secondary/50 border border-border',
              'text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-1 focus:ring-violet-500/50'
            )}
          />
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-64 overflow-y-auto p-1">
          {results.map((item, i) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-left',
                'rounded-lg transition-colors text-sm',
                i === selectedIndex
                  ? 'bg-violet-500/15 text-foreground'
                  : 'text-foreground/80 hover:bg-secondary/50'
              )}
            >
              <span className={cn(
                'text-[9px] px-1.5 py-0.5 rounded-full shrink-0 uppercase font-medium',
                TYPE_COLORS[item.type]
              )}>
                {item.type.slice(0, 3)}
              </span>
              <span className="truncate">{item.name}</span>
            </button>
          ))}
          {results.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No components found
            </p>
          )}
        </div>

        {/* Hint */}
        <div className="px-3 py-1.5 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            arrows to navigate, enter to add, esc to close
          </p>
        </div>
      </div>
    </>
  )
}
