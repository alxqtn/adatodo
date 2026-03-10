import { readTodos } from '@/lib/todos-store'
import TodoCheckbox from '@/components/TodoCheckbox'

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
            <div
              key={list.id}
              className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {list.name}
              </h2>
              <ul className="space-y-2">
                {list.todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2"
                  >
                    <TodoCheckbox id={todo.id} done={todo.done} />
                    <span className="peer-checked:line-through peer-checked:opacity-50 text-zinc-700 dark:text-zinc-300">
                      {todo.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
