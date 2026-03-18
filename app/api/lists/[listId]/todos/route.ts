import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { listsTable, todosTable } from '@/db/schema'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params
  const { title } = await request.json()

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return NextResponse.json(
      { error: 'Title is required and must be a non-empty string' },
      { status: 400 }
    )
  }

  const [list] = await db
    .select({ id: listsTable.id })
    .from(listsTable)
    .where(eq(listsTable.id, parseInt(listId)))

  if (!list) {
    return NextResponse.json({ error: 'List not found' }, { status: 404 })
  }

  const [newTodo] = await db
    .insert(todosTable)
    .values({ title: title.trim(), done: false, listId: list.id })
    .returning()

  return NextResponse.json(newTodo, { status: 201 })
}
