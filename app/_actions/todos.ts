'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/db/client'
import { listsTable, todosTable } from '@/db/schema'

export async function createTodo(listId: number, formData: FormData) {
  const title = formData.get('title') as string

  if (!title || title.trim() === '') {
    throw new Error('Title is required and must be a non-empty string')
  }

  const [list] = await db
    .select({ id: listsTable.id })
    .from(listsTable)
    .where(eq(listsTable.id, listId))

  if (!list) {
    throw new Error('List not found')
  }

  const [newTodo] = await db
    .insert(todosTable)
    .values({ title: title.trim(), done: false, listId: list.id })
    .returning()

  revalidatePath('/', 'layout')
  return newTodo
}

export async function updateTodoDone(id: number, done: boolean) {
  const [todo] = await db
    .update(todosTable)
    .set({ done })
    .where(eq(todosTable.id, id))
    .returning()

  if (!todo) {
    throw new Error('Not found')
  }

  return todo
}

export async function deleteTodo(id: number) {
  const [todo] = await db
    .delete(todosTable)
    .where(eq(todosTable.id, id))
    .returning()

  if (!todo) {
    throw new Error('Not found')
  }

  return { ok: true }
}
