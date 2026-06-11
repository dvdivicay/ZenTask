'use client'

import { useState } from 'react'
import type { Task, TaskStatus } from '@/types'
import { TaskCard } from './task-card'
import { TaskForm } from './task-form'
import { Plus } from 'lucide-react'

const COLUMNS: { status: TaskStatus; label: string; emoji: string; countColor: string }[] = [
  { status: 'todo',        label: 'To Do',       emoji: '🌱', countColor: 'bg-slate-100 text-slate-600' },
  { status: 'in_progress', label: 'In Progress', emoji: '🪴', countColor: 'bg-amber-100 text-amber-700' },
  { status: 'done',        label: 'Done',         emoji: '🌸', countColor: 'bg-emerald-100 text-emerald-700' },
]

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo')

  function openCreate(status: TaskStatus) {
    setEditingTask(null)
    setDefaultStatus(status)
    setFormOpen(true)
  }

  function openEdit(task: Task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  if (tasks.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-5 animate-fade-in-up">
          <div className="text-6xl animate-sprout">🌱</div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Your garden is empty</h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              Plant your first task and watch it grow into something beautiful.
            </p>
          </div>
          <button
            onClick={() => openCreate('todo')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            Plant your first task
          </button>
        </div>
        <TaskForm open={formOpen} onClose={() => setFormOpen(false)} task={null} defaultStatus={defaultStatus} />
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((col, colIdx) => {
          const colTasks = tasks.filter((t) => t.status === col.status)
          return (
            <div
              key={col.status}
              className="flex flex-col gap-3 animate-fade-in-up"
              style={{ animationDelay: `${colIdx * 80}ms` }}
            >
              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-base inline-block ${
                    col.status === 'todo' ? 'animate-sprout' :
                    col.status === 'in_progress' ? 'animate-sway' : 'animate-bloom'
                  }`}>{col.emoji}</span>
                  <h2 className="font-semibold text-sm text-foreground">{col.label}</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${col.countColor}`}>
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => openCreate(col.status)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title={`Add task to ${col.label}`}
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Task cards */}
              <div className="flex flex-col gap-3">
                {colTasks.map((task, cardIdx) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => openEdit(task)}
                    animDelay={colIdx * 80 + cardIdx * 55}
                  />
                ))}
                {colTasks.length === 0 && (
                  <button
                    onClick={() => openCreate(col.status)}
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground text-sm hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors animate-fade-in"
                  >
                    + Add a task
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        task={editingTask}
        defaultStatus={defaultStatus}
      />
    </>
  )
}
