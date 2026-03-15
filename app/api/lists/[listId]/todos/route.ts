import { NextResponse } from 'next/server'
import { readTodos, writeTodos } from '@/lib/todos-store'
import { randomUUID } from 'crypto'

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

  const data = await readTodos()
  const list = data.lists.find((l) => l.id === listId)

  if (!list) {
    return NextResponse.json({ error: 'List not found' }, { status: 404 })
  }

  const newTodo = { id: randomUUID(), title: title.trim(), done: false }
  list.todos.push(newTodo)

  await writeTodos(data)

  return NextResponse.json(newTodo, { status: 201 })
}
