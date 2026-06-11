'use client'

import { useState } from 'react'
import type { Task, TaskStatus } from '@/types'
import { deleteTask, updateTask } from '@/app/actions'
import { toast } from 'sonner'
import { Pencil, Trash2, CalendarDays } from 'lucide-react'

const PRIORITY_STYLES: Record<Task['priority'], string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

const PLANT: Record<TaskStatus, { emoji: string; label: string; animClass: string }> = {
  todo: {
    emoji: '🌱',
    label: 'Sprouting',
    animClass: 'animate-sprout',
  },
  in_progress: {
    emoji: '🪴',
    label: 'Growing',
    animClass: 'animate-sway',
  },
  done: {
    emoji: '🌸',
    label: 'Bloomed!',
    animClass: 'animate-bloom',
  },
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
    .format(new Date(dateStr + 'T12:00:00'))
}

function isOverdue(dateStr: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateStr + 'T00:00:00') < today
}

interface TaskCardProps {
  task: Task
  onEdit: () => void
  animDelay?: number
}

export function TaskCard({ task, onEdit, animDelay = 0 }: TaskCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Delete "${task.title}"?`)) return
    setDeleting(true)
    const result = await deleteTask(task.id)
    if (result.error) {
      toast.error(result.error)
      setDeleting(false)
    } else {
      toast.success('Task removed')
    }
  }

  async function handleStatusChange(status: TaskStatus) {
    if (status === task.status) return
    setStatusLoading(true)
    const result = await updateTask(task.id, { status })
    if (result.error) toast.error(result.error)
    setStatusLoading(false)
  }

  const overdue = task.due_date && task.status !== 'done' && isOverdue(task.due_date)
  const plant = PLANT[task.status]

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${animDelay}ms` }}
    >
      <div
        className={`bg-card rounded-xl p-4 shadow-sm border hover:shadow-md transition-all group ${
          task.status === 'done'
            ? 'border-emerald-200/70'
            : 'border-border hover:-translate-y-0.5'
        }`}
      >
        {/* Header row: priority + actions */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button onClick={onEdit}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Edit">
              <Pencil size={12} />
            </button>
            <button onClick={handleDelete} disabled={deleting}
              className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
              title="Delete">
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-medium text-sm leading-snug mb-1 ${
          task.status === 'done' ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}>
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-border/50 my-3" />

        {/* Footer: plant indicator + date + status */}
        <div className="flex items-center gap-2">
          {/* Plant growth indicator */}
          <div className="flex items-center gap-1.5 mr-auto">
            <span className={`text-lg inline-block ${plant.animClass}`}>{plant.emoji}</span>
            <span className="text-xs text-muted-foreground/70 hidden sm:block">{plant.label}</span>
          </div>

          {/* Due date */}
          {task.due_date && (
            <div className={`flex items-center gap-1 text-xs shrink-0 ${
              overdue ? 'text-red-500 font-medium' : 'text-muted-foreground'
            }`}>
              <CalendarDays size={11} />
              <span>{overdue ? '!' : ''}{formatDate(task.due_date)}</span>
            </div>
          )}

          {/* Status selector */}
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            disabled={statusLoading}
            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-lg border-0 cursor-pointer hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring transition-colors disabled:opacity-50 shrink-0"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
