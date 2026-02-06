"use client"

import { useState, useEffect } from 'react'
import { MarkdownEditor } from './MarkdownEditor'
import { DeployModal } from './DeployModal'

interface ItemEditorProps {
  itemId: string
}

interface ItemData {
  id: string
  name: string
  type: string
  slug: string
  content: string
  description: string
  hasOverride?: boolean
}

export function ItemEditor({ itemId }: ItemEditorProps) {
  const [item, setItem] = useState<ItemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDeploy, setShowDeploy] = useState(false)

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/codex/item/${itemId}`)
        const data = await res.json()
        if (data.success) {
          setItem(data.data)
        } else {
          setError(data.error || 'Failed to load item')
        }
      } catch {
        setError('Failed to load item')
      } finally {
        setLoading(false)
      }
    }
    loadItem()
  }, [itemId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error || 'Item not found'}</p>
        <a
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Back to dashboard
        </a>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <a
          href={`/dashboard/${item.type}s`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {item.type}s
        </a>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm">{item.name}</span>
        <div className="ml-auto">
          <button
            onClick={() => setShowDeploy(true)}
            className="px-4 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
          >
            Deploy to Repo
          </button>
        </div>
      </div>

      <MarkdownEditor
        itemId={item.id}
        initialContent={item.content}
        itemName={item.name}
        itemType={item.type}
        hasOverride={item.hasOverride}
      />

      {showDeploy && (
        <DeployModal
          itemId={item.id}
          itemName={item.name}
          onClose={() => setShowDeploy(false)}
        />
      )}
    </div>
  )
}
