"use client"

import { useState } from 'react'

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

interface DeployModalProps {
  itemId: string
  itemName: string
  onClose: () => void
}

export function DeployModal({ itemId, itemName, onClose }: DeployModalProps) {
  const [selectedRepo, setSelectedRepo] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleDeploy = async () => {
    if (!selectedRepo) return
    setIsDeploying(true)
    setResult(null)

    try {
      const res = await fetch(`/api/codex/item/${itemId}/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: selectedRepo }),
      })
      const data = await res.json()

      setResult({
        success: data.success,
        message: data.success
          ? `Deployed to ${selectedRepo}`
          : data.error || 'Deploy failed',
      })
    } catch {
      setResult({ success: false, message: 'Network error' })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Deploy Item</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Deploy <span className="text-foreground font-mono">{itemName}</span> to a repository.
        </p>

        <select
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select a repository</option>
          {REPOS.map((repo) => (
            <option key={repo} value={repo}>{repo}</option>
          ))}
        </select>

        {result && (
          <div
            className={`p-3 mb-4 rounded-lg text-sm ${
              result.success
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {result.message}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={!selectedRepo || isDeploying}
            className="flex-1 px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 disabled:bg-violet-600/50 text-white rounded-lg transition-colors"
          >
            {isDeploying ? 'Deploying...' : 'Deploy'}
          </button>
        </div>
      </div>
    </div>
  )
}
