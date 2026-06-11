import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/navbar'
import { TaskBoard } from '@/components/task-board'
import { GardenHero } from '@/components/garden-hero'
import type { Task } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  const typedTasks = (tasks as Task[]) ?? []

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-5 mb-6 text-sm">
            <strong>Database not set up yet.</strong> Run the SQL in{' '}
            <code className="bg-destructive/10 px-1 rounded">supabase/schema.sql</code>{' '}
            in your Supabase SQL Editor to create the tasks table.
          </div>
        ) : (
          <GardenHero tasks={typedTasks} />
        )}

        <div className="mb-5">
          <h1 className="text-xl font-bold text-foreground">My Garden</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Each task is a seed — tend to it and watch it bloom.
          </p>
        </div>

        <TaskBoard tasks={error ? [] : typedTasks} />
      </main>
    </div>
  )
}
