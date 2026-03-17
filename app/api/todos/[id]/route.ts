import { NextResponse } from 'next/server'
import { readTodos, writeTodos } from '@/lib/todos-store'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { done } = await request.json()

  const data = await readTodos()

  for (const list of data.lists) {
    const todo = list.todos.find((t) => t.id === id)
    if (todo) {
      todo.done = done
      await writeTodos(data)
      return NextResponse.json(todo)
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await readTodos()
  for (const list of data.lists) {
    const index = list.todos.findIndex((t) => t.id === id)
    if (index !== -1) {
      list.todos.splice(index, 1)
      await writeTodos(data)
      return NextResponse.json({ ok: true })
    }
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
