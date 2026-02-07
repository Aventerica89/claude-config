import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  listWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  getWorkflow,
  type WorkflowSummary,
  type WorkflowDetail,
} from '@/lib/graph/workflowApi'

interface WorkflowToolbarProps {
  currentId: string | null
  currentName: string
  onNew: () => void
  onLoad: (workflow: WorkflowDetail) => void
  onSave: () => { name: string; description: string; nodes: unknown[]; edges: unknown[] }
  className?: string
}

export function WorkflowToolbar({
  currentId,
  currentName,
  onNew,
  onLoad,
  onSave,
  className,
}: WorkflowToolbarProps) {
  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const loadList = useCallback(async () => {
    try {
      const list = await listWorkflows()
      setWorkflows(list)
    } catch {
      // Silently handle - API may not be available in dev
    }
  }, [])

  useEffect(() => {
    loadList()
  }, [loadList])

  const showStatus = (msg: string) => {
    setStatus(msg)
    setTimeout(() => setStatus(null), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const data = onSave()
      if (!data.name) {
        showStatus('Set a command name first')
        return
      }

      if (currentId) {
        await updateWorkflow(currentId, {
          name: data.name,
          description: data.description,
          nodes: data.nodes as never[],
          edges: data.edges as never[],
        })
        showStatus('Saved')
      } else {
        await createWorkflow(
          data.name,
          data.description,
          data.nodes as never[],
          data.edges as never[]
        )
        showStatus('Created')
      }
      await loadList()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed'
      showStatus(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleLoad = async (id: string) => {
    setShowDropdown(false)
    try {
      const wf = await getWorkflow(id)
      onLoad(wf)
      showStatus('Loaded')
    } catch {
      showStatus('Load failed')
    }
  }

  const handleDelete = async () => {
    if (!currentId) return
    try {
      await deleteWorkflow(currentId)
      onNew()
      await loadList()
      showStatus('Deleted')
    } catch {
      showStatus('Delete failed')
    }
  }

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-2 bg-card border-b border-border',
      className
    )}>
      {/* New */}
      <ToolbarButton onClick={onNew}>
        New
      </ToolbarButton>

      {/* Load dropdown */}
      <div className="relative">
        <ToolbarButton
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={workflows.length === 0}
        >
          Load
        </ToolbarButton>

        {showDropdown && workflows.length > 0 && (
          <div className={cn(
            'absolute top-full left-0 mt-1 z-50',
            'w-56 max-h-48 overflow-y-auto',
            'bg-card border border-border rounded-lg shadow-xl'
          )}>
            {workflows.map((wf) => (
              <button
                key={wf.id}
                onClick={() => handleLoad(wf.id)}
                className={cn(
                  'w-full text-left px-3 py-2 text-xs',
                  'hover:bg-secondary/50 transition-colors',
                  'border-b border-border last:border-b-0',
                  wf.id === currentId && 'bg-violet-500/10'
                )}
              >
                <span className="text-foreground font-medium block truncate">
                  {wf.name}
                </span>
                {wf.description && (
                  <span className="text-muted-foreground block truncate">
                    {wf.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Save */}
      <ToolbarButton onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : currentId ? 'Save' : 'Save New'}
      </ToolbarButton>

      {/* Delete */}
      {currentId && (
        <ToolbarButton onClick={handleDelete} variant="danger">
          Delete
        </ToolbarButton>
      )}

      {/* Current workflow name */}
      <div className="flex-1 text-center">
        {currentName && (
          <span className="text-xs text-muted-foreground">
            /{currentName}
          </span>
        )}
      </div>

      {/* Status */}
      {status && (
        <span className="text-[10px] text-muted-foreground animate-pulse">
          {status}
        </span>
      )}
    </div>
  )
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  variant = 'default',
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'default' | 'danger'
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'text-xs px-3 py-1.5 rounded-md border transition-colors',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'danger'
          ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
          : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50'
      )}
    >
      {children}
    </button>
  )
}
