import fs from 'fs/promises'
import path from 'path'

export type Todo = { id: string; title: string; done: boolean }
export type TodoList = { id: string; name: string; todos: Todo[] }
export type TodoData = { lists: TodoList[] }

const filePath = path.join(process.cwd(), 'data/todos.json')

export async function readTodos(): Promise<TodoData> {
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function writeTodos(data: TodoData): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}
