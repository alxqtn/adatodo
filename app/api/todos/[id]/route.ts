import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { todosTable } from '@/db/schema'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { done } = await request.json()

  const [todo] = await db
    .update(todosTable)
    .set({ done })
    .where(eq(todosTable.id, parseInt(id)))
    .returning()

  if (!todo) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(todo)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const [todo] = await db
    .delete(todosTable)
    .where(eq(todosTable.id, parseInt(id)))
    .returning()

  if (!todo) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
