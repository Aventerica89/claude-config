"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  type Agent,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  formatLastUsed
} from '@/lib/agents'
import { cn } from '@/lib/utils'

interface AgentDetailProps {
  agent: Agent
}

export function AgentDetail({ agent }: AgentDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'config' | 'tools' | 'usage'>('overview')
  const categoryColor = CATEGORY_COLORS[agent.category]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'config', label: 'Configuration' },
    { id: 'tools', label: 'Tools' },
    { id: 'usage', label: 'Usage' },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <a
              href="/dashboard/agents"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-2xl font-bold">{agent.name}</h1>
            <Badge variant="secondary" className={cn(
              `bg-${categoryColor}-500/10 text-${categoryColor}-400 border-${categoryColor}-500/20`
            )}>
              {CATEGORY_LABELS[agent.category]}
            </Badge>
          </div>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </Button>
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Run Agent
          </Button>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className={cn(
            "w-2 h-2 rounded-full",
            agent.isActive ? "bg-green-500" : "bg-gray-500"
          )} />
          <span>{agent.isActive ? 'Active' : 'Inactive'}</span>
        </div>
        <div>v{agent.version}</div>
        <div>by {agent.author}</div>
        <div>{agent.usageCount.toLocaleString()} runs</div>
        <div>Last used {formatLastUsed(agent.lastUsed)}</div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Prompt Template</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{agent.promptTemplate}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Runs</span>
                  <span className="font-medium">{agent.usageCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tools</span>
                  <span className="font-medium">{agent.tools.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium text-xs">{agent.config.model?.split('-').slice(0, 2).join('-')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Required Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {agent.tools.filter(t => t.required).map((tool) => (
                    <div key={tool.name} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-violet-500" />
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Agent Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Model</label>
                  <div className="mt-1 px-3 py-2 bg-secondary rounded-lg text-sm">
                    {agent.config.model}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Max Tokens</label>
                  <div className="mt-1 px-3 py-2 bg-secondary rounded-lg text-sm">
                    {agent.config.maxTokens?.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Temperature</label>
                  <div className="mt-1 px-3 py-2 bg-secondary rounded-lg text-sm">
                    {agent.config.temperature}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Timeout</label>
                  <div className="mt-1 px-3 py-2 bg-secondary rounded-lg text-sm">
                    {(agent.config.timeout || 0) / 1000}s
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agent.tools.map((tool) => (
            <Card key={tool.name}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tool.name}</span>
                      {tool.required && (
                        <Badge variant="secondary" className="text-xs bg-violet-500/10 text-violet-400">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tool.description}
                    </p>
                  </div>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    tool.required ? "bg-violet-500" : "bg-gray-500"
                  )} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'usage' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm">Analyzed codebase structure</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">1.2s</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm">Found API endpoints in src/</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">0.8s</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div>
                    <p className="text-sm">Timeout while scanning node_modules</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">120s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AgentDetail
