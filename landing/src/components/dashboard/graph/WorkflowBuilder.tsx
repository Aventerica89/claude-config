import { useState, useCallback, useMemo, useRef } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import type { BrainItemType } from '@/lib/generated/types'
import {
  generateCommand,
  DEFAULT_CONFIG,
  type CommandConfig,
} from '@/lib/graph/generateCommand'
import type { WorkflowDetail } from '@/lib/graph/workflowApi'
import { nodeTypes } from './nodeTypes'
import { ComponentPalette } from './ComponentPalette'
import { CommandConfigPanel } from './CommandConfigPanel'
import { CommandPreview } from './CommandPreview'
import { WorkflowToolbar } from './WorkflowToolbar'

interface DroppedItem {
  id: string
  name: string
  type: BrainItemType
  description: string
  category: string
}

function getMetaForType(item: DroppedItem): {
  meta1Label: string
  meta1Value: string
  meta2Label: string
  meta2Value: string
} {
  return {
    meta1Label: 'Type',
    meta1Value: item.type,
    meta2Label: 'Category',
    meta2Value: item.category || 'general',
  }
}

let nodeIdCounter = 0
function nextNodeId(): string {
  nodeIdCounter++
  return `wf-node-${nodeIdCounter}-${Date.now()}`
}

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [config, setConfig] = useState<CommandConfig>({ ...DEFAULT_CONFIG })
  const [workflowId, setWorkflowId] = useState<string | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const reactFlowInstance = useRef<{ screenToFlowPosition: (pos: { x: number; y: number }) => { x: number; y: number } } | null>(null)

  // Generate markdown from current state
  const markdown = useMemo(
    () => generateCommand(nodes, edges, config),
    [nodes, edges, config]
  )

  // Handle edge connections
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({
        ...connection,
        animated: true,
        style: { stroke: '#7c3aed', strokeWidth: 2 },
      }, eds))
    },
    [setEdges]
  )

  // Handle drag over canvas
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  // Handle drop onto canvas
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()

      const raw = e.dataTransfer.getData('application/json')
      if (!raw) return

      let item: DroppedItem
      try {
        item = JSON.parse(raw)
      } catch {
        return
      }

      const bounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!bounds || !reactFlowInstance.current) return

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      })

      const meta = getMetaForType(item)
      const newNode: Node = {
        id: nextNodeId(),
        type: 'erNode',
        position,
        data: {
          label: item.name,
          itemType: item.type,
          brainItemId: item.id,
          description: item.description,
          category: item.category,
          ...meta,
          isHighlighted: false,
          isSelected: false,
        },
      }

      setNodes((nds) => [...nds, newNode])
    },
    [setNodes]
  )

  // Store reactflow instance for screenToFlowPosition
  const onInit = useCallback((instance: unknown) => {
    reactFlowInstance.current = instance as typeof reactFlowInstance.current
  }, [])

  // Toolbar handlers
  const handleNew = useCallback(() => {
    setNodes([])
    setEdges([])
    setConfig({ ...DEFAULT_CONFIG })
    setWorkflowId(null)
  }, [setNodes, setEdges])

  const handleLoad = useCallback((wf: WorkflowDetail) => {
    setNodes(wf.nodes || [])
    setEdges(wf.edges || [])
    setWorkflowId(wf.id)
    // Try to extract config from workflow name/description
    setConfig((prev) => ({
      ...prev,
      name: wf.name || '',
      description: wf.description || '',
    }))
  }, [setNodes, setEdges])

  const handleSave = useCallback(() => {
    return {
      name: config.name || 'Untitled',
      description: config.description || '',
      nodes: nodes,
      edges: edges,
    }
  }, [config, nodes, edges])

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-2xl font-bold">Command Composer</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Drag components onto the canvas, connect them, and generate
          deployable command files.
        </p>
      </div>

      {/* Toolbar */}
      <WorkflowToolbar
        currentId={workflowId}
        currentName={config.name}
        onNew={handleNew}
        onLoad={handleLoad}
        onSave={handleSave}
      />

      {/* Main layout: Palette | Canvas + Preview | Config */}
      <div className="flex-1 flex rounded-xl border border-border overflow-hidden bg-card">
        {/* Left: Component Palette */}
        <ComponentPalette />

        {/* Center: Canvas (top) + Preview (bottom) */}
        <div className="flex-1 flex flex-col">
          {/* Canvas */}
          <div
            ref={reactFlowWrapper}
            className="flex-1 relative"
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.3 }}
              minZoom={0.2}
              maxZoom={2}
              proOptions={{ hideAttribution: true }}
              deleteKeyCode={['Backspace', 'Delete']}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={16}
                size={1}
                color="#27272a"
              />
              <Controls
                className="!bg-card !border-border !shadow-lg"
                showInteractive={false}
              />
              {/* Empty state overlay */}
              {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground text-sm">
                      Drag components from the left panel
                    </p>
                    <p className="text-muted-foreground/60 text-xs">
                      Connect them to define execution order
                    </p>
                  </div>
                </div>
              )}
            </ReactFlow>
          </div>

          {/* Bottom: Preview */}
          <CommandPreview
            markdown={markdown}
            commandName={config.name}
            className="h-48 min-h-[120px]"
          />
        </div>

        {/* Right: Command Config */}
        <CommandConfigPanel
          config={config}
          onChange={setConfig}
        />
      </div>
    </div>
  )
}

export default WorkflowBuilder
