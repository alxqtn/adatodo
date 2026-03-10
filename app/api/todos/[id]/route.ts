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
