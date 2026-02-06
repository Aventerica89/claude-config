"use client"

import { useState, useMemo } from 'react'
import { ItemCard } from './ItemCard'
import { ItemRow } from './ItemRow'
import { ItemCardCompact } from './ItemCardCompact'
import { ViewToggle, type ViewMode } from './ViewToggle'
import type { BrainItem, BrainItemType } from '@/lib/generated/types'

interface ItemGridProps {
  items: BrainItem[]
  type: BrainItemType
  title: string
  description: string
  onEdit?: (item: BrainItem) => void
  onDeploy?: (item: BrainItem) => void
  categories?: string[]
}

export function ItemGrid({
  items,
  type,
  title,
  description,
  onEdit,
  onDeploy,
  categories: externalCategories,
}: ItemGridProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const categories = useMemo(() => {
    if (externalCategories) return externalCategories
    const cats = new Set(items.map((i) => i.category))
    return [...cats].sort()
  }, [items, externalCategories])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [items, search, selectedCategory])

  const handleEdit = onEdit ?? ((item: BrainItem) => {
    window.location.href = `/dashboard/${type}s/${item.slug}`
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {filtered.length} of {items.length}
          </span>
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${type}s...`}
          className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-muted-foreground"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* View Modes */}
      {filtered.length > 0 ? (
        <>
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDeploy={onDeploy}
                />
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="flex flex-col gap-2">
              {filtered.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDeploy={onDeploy}
                />
              ))}
            </div>
          )}

          {viewMode === 'compact' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {filtered.map((item) => (
                <ItemCardCompact
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No {type}s found matching your search.
        </div>
      )}
    </div>
  )
}
