"use client"

import { useState } from 'react'
import { ItemGrid } from './ItemGrid'
import { skills } from '@/lib/generated/skills'
import { stats } from '@/lib/generated/stats'

export function SkillsPage() {
  const [tab, setTab] = useState<'all' | 'core' | 'learned'>('all')

  const filtered = tab === 'all'
    ? skills
    : skills.filter((s) => s.kind === tab)

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('all')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            tab === 'all'
              ? 'bg-violet-600 text-white'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          All ({stats.skills})
        </button>
        <button
          onClick={() => setTab('core')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            tab === 'core'
              ? 'bg-violet-600 text-white'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          Core ({stats.coreSkills})
        </button>
        <button
          onClick={() => setTab('learned')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            tab === 'learned'
              ? 'bg-violet-600 text-white'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          Learned ({stats.learnedSkills})
        </button>
      </div>

      <ItemGrid
        items={filtered}
        type="skill"
        title="Skills"
        description={`${stats.coreSkills} core + ${stats.learnedSkills} learned skills`}
      />
    </div>
  )
}
