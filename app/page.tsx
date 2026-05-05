import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { eq, asc } from 'drizzle-orm'

import { auth } from '@/auth'
import { db } from '@/db/client'
import TodoListDisplay from '@/app/_components/TodoListDisplay'
import { listsTable, todosTable } from '@/db/schema'

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/sign-in')

  const lists = await db.query.listsTable.findMany({
    where: eq(listsTable.userId, session.user.id),
    with: {
      todos: { orderBy: (t, { asc }) => [asc(t.id)] },
    },
  })

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
                <h2 data-testid="list-heading" className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer">
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
