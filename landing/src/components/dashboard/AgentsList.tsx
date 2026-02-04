"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  mockAgents,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  formatLastUsed,
  type Agent
} from '@/lib/agents'
import { cn } from '@/lib/utils'

const CATEGORY_ICONS: Record<string, string> = {
  planning: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z',
  development: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  testing: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  review: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  documentation: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  deployment: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
}

function AgentCard({ agent }: { agent: Agent }) {
  const color = CATEGORY_COLORS[agent.category]
  const icon = CATEGORY_ICONS[agent.category]

  return (
    <a
      href={`/dashboard/agents/${agent.slug}`}
      className="block"
    >
      <Card className="h-full hover:border-violet-500/30 transition-all hover:shadow-lg hover:shadow-violet-500/5 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              `bg-${color}-500/10`
            )}>
              <svg
                className={cn("w-5 h-5", `text-${color}-400`)}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{agent.name}</h3>
                <span className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  agent.isActive ? "bg-green-500" : "bg-gray-500"
                )} />
              </div>
              <span className="text-xs text-muted-foreground">
                {CATEGORY_LABELS[agent.category]}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {agent.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  "text-xs",
                  `bg-${color}-500/10 text-${color}-400 border-${color}-500/20`
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <span>{agent.usageCount.toLocaleString()} runs</span>
            <span>{formatLastUsed(agent.lastUsed)}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export function AgentsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agents</h1>
          <p className="text-muted-foreground">
            Specialized AI agents for complex tasks
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Agent
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
        <select className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
          <option value="">All Categories</option>
          <option value="planning">Planning</option>
          <option value="development">Development</option>
          <option value="testing">Testing</option>
          <option value="review">Review</option>
          <option value="documentation">Documentation</option>
          <option value="deployment">Deployment</option>
        </select>
      </div>

      {/* Agents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}

        {/* Add new agent card */}
        <Card className="border-dashed hover:border-violet-500/30 transition-colors cursor-pointer">
          <CardContent className="p-5 h-full flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-sm font-medium">Create New Agent</p>
              <p className="text-xs text-muted-foreground mt-1">
                Build a custom agent
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AgentsList
