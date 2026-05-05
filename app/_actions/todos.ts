'use server'

import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { db } from '@/db/client'
import { listsTable, todosTable } from '@/db/schema'

async function requireUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  return session.user.id
}

export async function createTodo(listId: number, formData: FormData) {
  const title = formData.get('title') as string

  if (!title || title.trim() === '') {
    throw new Error('Title is required and must be a non-empty string')
  }

  const userId = await requireUserId()

  const [list] = await db
    .select({ id: listsTable.id })
    .from(listsTable)
    .where(and(eq(listsTable.id, listId), eq(listsTable.userId, userId)))

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
  const userId = await requireUserId()

  const [row] = await db
    .select({ todoId: todosTable.id, userId: listsTable.userId })
    .from(todosTable)
    .innerJoin(listsTable, eq(todosTable.listId, listsTable.id))
    .where(eq(todosTable.id, id))

  if (!row || row.userId !== userId) throw new Error('Not found')

  const [todo] = await db
    .update(todosTable)
    .set({ done })
    .where(eq(todosTable.id, id))
    .returning()

  return todo
}

export async function deleteTodo(id: number) {
  const userId = await requireUserId()

  const [row] = await db
    .select({ todoId: todosTable.id, userId: listsTable.userId })
    .from(todosTable)
    .innerJoin(listsTable, eq(todosTable.listId, listsTable.id))
    .where(eq(todosTable.id, id))

  if (!row || row.userId !== userId) throw new Error('Not found')

  const [todo] = await db
    .delete(todosTable)
    .where(eq(todosTable.id, id))
    .returning()

  if (!todo) {
    throw new Error('Not found')
  }

  return { ok: true }
}
