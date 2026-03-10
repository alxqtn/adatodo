import Link from 'next/link'
import { readTodos } from '@/lib/todos-store'
import TodoListDisplay from '@/components/TodoListDisplay'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { lists } = await readTodos()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Mes Todos
        </h1>

        <div className="space-y-6">
          {lists.map((list) => (
            <div key={list.id}>
              <Link href={`/lists/${list.id}`}>
                <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer">
                  {list.name}
                </h2>
              </Link>
              <TodoListDisplay list={list} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
