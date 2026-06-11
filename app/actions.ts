'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { TaskStatus, TaskPriority } from '@/types'

type TaskInput = {
  title: string
  description?: string
  priority: TaskPriority
  status: TaskStatus
  due_date?: string
}

export async function createTask(data: TaskInput) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('tasks').insert({
    title: data.title,
    description: data.description || null,
    priority: data.priority,
    status: data.status,
    due_date: data.due_date || null,
    user_id: user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateTask(id: string, data: Partial<TaskInput>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('tasks')
    .update({
      ...data,
      description: data.description !== undefined ? data.description || null : undefined,
      due_date: data.due_date !== undefined ? data.due_date || null : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}
