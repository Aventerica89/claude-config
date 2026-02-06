"use client"

import { useState, useMemo } from 'react'
import { allItems } from '@/lib/generated'
import { stats } from '@/lib/generated/stats'
import type { BrainItemType } from '@/lib/generated/types'

const REPOS = [
  'Aventerica89/HDFlowsheet-Cloud',
  'Aventerica89/renvio-companion-app',
  'Aventerica89/claude-codex',
  'Aventerica89/claude-command',
  'Aventerica89/URLsToGo',
  'Aventerica89/jb-cloud-docs',
  'Aventerica89/jb-cloud-app-tracker',
  'Aventerica89/personal-apps',
  'Aventerica89/wp-jupiter',
  'Aventerica89/wp-neptune',
  'JBMD-Creations/HDFlowsheet',
]

const TYPE_COLORS: Record<BrainItemType, string> = {
  command: 'text-blue-400',
  agent: 'text-purple-400',
  skill: 'text-green-400',
  rule: 'text-orange-400',
}

export function DeployCenter() {
  const [selectedRepo, setSelectedRepo] = useState('')
  const [selectedType, setSelectedType] = useState<BrainItemType | 'all'>('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployResult, setDeployResult] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allItems
      .filter((item) => {
        const matchesType = selectedType === 'all' || item.type === selectedType
        const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
        return matchesType && matchesSearch
      })
      .map(({ content, ...rest }) => rest)
  }, [search, selectedType])

  const toggleItem = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
  }

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((i) => i.id)))
    }
  }

  const handleDeploy = async () => {
    if (!selectedRepo || selectedIds.size === 0) return
    setIsDeploying(true)
    setDeployResult(null)

    let succeeded = 0
    let failed = 0

    for (const itemId of selectedIds) {
      try {
        const res = await fetch(`/api/codex/item/${itemId}/deploy`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ repo: selectedRepo }),
        })
        const data = await res.json()
        if (data.success) succeeded++
        else failed++
      } catch {
        failed++
      }
    }

    setDeployResult(
      `Deployed ${succeeded} items to ${selectedRepo}` +
        (failed > 0 ? ` (${failed} failed)` : '')
    )
    setIsDeploying(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deploy Center</h1>
        <p className="text-muted-foreground">
          Deploy codex items to your repositories ({stats.total} items available)
        </p>
      </div>

      {/* Repo selector */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-3">Target Repository</h3>
        <select
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select a repository</option>
          {REPOS.map((repo) => (
            <option key={repo} value={repo}>{repo}</option>
          ))}
        </select>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder:text-muted-foreground"
        />
        <div className="flex gap-2">
          {(['all', 'command', 'agent', 'skill', 'rule'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                selectedType === t
                  ? 'bg-violet-600 text-white'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'all' ? 'All' : `${t}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Item list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={selectAll}
              className="rounded"
            />
            <span>{selectedIds.size} selected</span>
          </label>
          <button
            onClick={handleDeploy}
            disabled={!selectedRepo || selectedIds.size === 0 || isDeploying}
            className="px-4 py-1.5 text-xs bg-violet-600 hover:bg-violet-700 disabled:bg-violet-600/50 text-white rounded-lg transition-colors"
          >
            {isDeploying ? 'Deploying...' : `Deploy ${selectedIds.size} items`}
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-border">
          {filtered.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/20 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => toggleItem(item.id)}
                className="rounded"
              />
              <span className={`font-mono text-sm ${TYPE_COLORS[item.type]}`}>
                {item.name}
              </span>
              <span className="text-xs text-muted-foreground truncate flex-1">
                {item.description}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {item.type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {deployResult && (
        <div className="p-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl text-sm">
          {deployResult}
        </div>
      )}
    </div>
  )
}
