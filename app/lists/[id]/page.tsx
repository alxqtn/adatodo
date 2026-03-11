import { notFound } from 'next/navigation'
import { readTodos } from '@/lib/todos-store'
import TodoListDisplay from '@/components/TodoListDisplay'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const dynamic = 'force-dynamic'

export default async function ListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await delay(2000)
  const { lists } = await readTodos()
  const list = lists.find((l) => l.id === id)

  if (!list) notFound()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {list.name}
        </h1>

        <TodoListDisplay list={list} />
      </main>
    </div>
  )
}
