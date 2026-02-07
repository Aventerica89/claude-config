import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface CommandPreviewProps {
  markdown: string
  commandName: string
  className?: string
}

export function CommandPreview({
  markdown,
  commandName,
  className,
}: CommandPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [markdown])

  const handleDownload = useCallback(() => {
    const filename = commandName
      ? `${commandName.replace(/[^a-z0-9-]/gi, '-')}.md`
      : 'command.md'
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [markdown, commandName])

  return (
    <div className={cn(
      'flex flex-col bg-card border-t border-border',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Generated Command
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className={cn(
              'text-[10px] px-2 py-1 rounded-md border transition-colors',
              copied
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-secondary/30 border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            disabled={!markdown || markdown.startsWith('<!--')}
            className={cn(
              'text-[10px] px-2 py-1 rounded-md border transition-colors',
              'bg-secondary/30 border-border text-muted-foreground',
              'hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            Export .md
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto p-3">
        <pre className="text-[11px] leading-relaxed text-foreground/80 whitespace-pre-wrap font-mono">
          {markdown || 'Drag components onto the canvas to begin...'}
        </pre>
      </div>
    </div>
  )
}
