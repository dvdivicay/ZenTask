'use client'

import { useEffect, useState } from 'react'
import type { Task } from '@/types'

interface GardenHeroProps {
  tasks: Task[]
}

function GardenPlant({ pct }: { pct: number }) {
  const maxH = 100
  const stemH = (pct / 100) * maxH
  const base = 130
  const tipY = base - stemH

  // Leaf anchor points along the stem
  const lY1 = base - stemH * 0.38
  const rY1 = base - stemH * 0.56
  const lY2 = base - stemH * 0.72
  const rY2 = base - stemH * 0.68

  return (
    <svg
      viewBox="0 0 100 145"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 6px 12px rgba(75,111,94,0.18))' }}
    >
      {/* Soil */}
      <ellipse cx="50" cy="138" rx="44" ry="9" fill="#6B4F28" opacity="0.18" />
      <ellipse cx="50" cy="134" rx="36" ry="7" fill="#7D5A3C" opacity="0.25" />

      {/* Seed at 0% */}
      {pct === 0 && (
        <ellipse cx="50" cy="130" rx="7" ry="4.5" fill="#8B6914" opacity="0.55"
          className="animate-sprout" />
      )}

      {/* Stem */}
      {pct > 0 && (
        <line
          x1="50" y1="128"
          x2="50" y2={tipY}
          stroke="#3d6651"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ transition: 'y2 1.2s cubic-bezier(0.34,1.2,0.64,1)' }}
        />
      )}

      {/* Left leaf 1 — appears at 25%+ */}
      {pct >= 25 && (
        <g className="animate-leaf-appear animate-sway" style={{ animationDelay: '0s, 0.4s', transformOrigin: `50px ${lY1 + 8}px` }}>
          <path
            d={`M 50 ${lY1} Q 28 ${lY1 - 10} 18 ${lY1 - 20}`}
            stroke="#4b7a62" strokeWidth="1.8" fill="none" strokeLinecap="round"
          />
          <ellipse cx="14" cy={lY1 - 22} rx="15" ry="8" fill="#5d8a72" opacity="0.9"
            transform={`rotate(-28 14 ${lY1 - 22})`} />
        </g>
      )}

      {/* Right leaf 1 — appears at 50%+ */}
      {pct >= 50 && (
        <g className="animate-leaf-appear animate-sway" style={{ animationDelay: '0.1s, 0.7s', transformOrigin: `50px ${rY1 + 8}px` }}>
          <path
            d={`M 50 ${rY1} Q 72 ${rY1 - 10} 82 ${rY1 - 20}`}
            stroke="#4b7a62" strokeWidth="1.8" fill="none" strokeLinecap="round"
          />
          <ellipse cx="86" cy={rY1 - 22} rx="15" ry="8" fill="#4a7862" opacity="0.9"
            transform={`rotate(28 86 ${rY1 - 22})`} />
        </g>
      )}

      {/* Left leaf 2 — appears at 75%+ */}
      {pct >= 75 && (
        <g className="animate-leaf-appear animate-sway" style={{ animationDelay: '0.15s, 1s', transformOrigin: `50px ${lY2 + 6}px` }}>
          <path
            d={`M 50 ${lY2} Q 34 ${lY2 - 8} 26 ${lY2 - 16}`}
            stroke="#3d6651" strokeWidth="1.5" fill="none" strokeLinecap="round"
          />
          <ellipse cx="22" cy={lY2 - 18} rx="12" ry="6.5" fill="#3d6651" opacity="0.88"
            transform={`rotate(-22 22 ${lY2 - 18})`} />
        </g>
      )}

      {/* Right leaf 2 — appears at 75%+ */}
      {pct >= 75 && (
        <g className="animate-leaf-appear animate-sway" style={{ animationDelay: '0.25s, 1.3s', transformOrigin: `50px ${rY2 + 6}px` }}>
          <path
            d={`M 50 ${rY2} Q 66 ${rY2 - 8} 74 ${rY2 - 16}`}
            stroke="#3d6651" strokeWidth="1.5" fill="none" strokeLinecap="round"
          />
          <ellipse cx="78" cy={rY2 - 18} rx="12" ry="6.5" fill="#3d6651" opacity="0.88"
            transform={`rotate(22 78 ${rY2 - 18})`} />
        </g>
      )}

      {/* Growing bud (1–89%) */}
      {pct > 0 && pct < 90 && (
        <circle cx="50" cy={tipY} r="4.5" fill="#5d8a72" className="animate-sprout" />
      )}

      {/* Flower bud (90–99%) */}
      {pct >= 90 && pct < 100 && (
        <circle cx="50" cy={tipY} r="7" fill="#3d6651" className="animate-sprout" />
      )}

      {/* Full bloom (100%) */}
      {pct === 100 &&
        [0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const px = 50 + 13 * Math.cos(rad)
          const py = tipY + 13 * Math.sin(rad)
          return (
            <ellipse key={deg} cx={px} cy={py} rx="8.5" ry="5"
              fill="#FFB7C5" opacity="0.92"
              transform={`rotate(${deg} ${px} ${py})`}
              className="animate-petal animate-bloom"
              style={{ animationDelay: `${i * 0.08}s, ${i * 0.15}s` }}
            />
          )
        })
      }
      {pct === 100 && (
        <circle cx="50" cy={tipY} r="7.5" fill="#FFD700" className="animate-bloom" />
      )}
    </svg>
  )
}

export function GardenHero({ tasks }: GardenHeroProps) {
  const total = tasks.length
  const done = tasks.filter((t) => t.status === 'done').length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const todo = tasks.filter((t) => t.status === 'todo').length
  const targetPct = total > 0 ? Math.round((done / total) * 100) : 0

  const [pct, setPct] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setPct(targetPct), 150)
    return () => clearTimeout(t)
  }, [targetPct])

  const stage =
    pct === 0 ? { label: 'Plant a seed', color: 'text-stone-500' } :
    pct < 25 ? { label: 'Sprouting…', color: 'text-green-600' } :
    pct < 50 ? { label: 'Growing roots', color: 'text-green-600' } :
    pct < 75 ? { label: 'Thriving', color: 'text-emerald-600' } :
    pct < 100 ? { label: 'Almost blooming!', color: 'text-teal-600' } :
    { label: '🎉 Full bloom!', color: 'text-pink-500' }

  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 border border-primary/12 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, hsl(152 30% 95%) 0%, hsl(152 20% 92%) 100%)' }}
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, hsl(152 19% 36%) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="relative flex items-center gap-6 p-6 sm:p-8">
        {/* Stats */}
        <div className="flex-1 space-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <p className={`text-sm font-semibold ${stage.color} mb-0.5`}>{stage.label}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-primary/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${pct}%`, transition: 'width 1.2s cubic-bezier(0.34,1.2,0.64,1)' }}
                />
              </div>
              <span className="text-sm font-semibold text-primary tabular-nums w-10 text-right">
                {pct}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'To Do', value: todo, color: 'bg-slate-100 text-slate-600' },
              { label: 'In Progress', value: inProgress, color: 'bg-amber-100 text-amber-700' },
              { label: 'Done', value: done, color: 'bg-emerald-100 text-emerald-700' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`${stat.color} rounded-2xl p-3 text-center animate-fade-in-up`}
                style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              >
                <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-xs font-medium opacity-75 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plant */}
        <div className="w-28 h-36 shrink-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <GardenPlant pct={pct} />
        </div>
      </div>
    </div>
  )
}
