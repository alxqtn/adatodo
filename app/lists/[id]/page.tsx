import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { asc, eq } from 'drizzle-orm';

import { auth } from '@/auth'
import { db } from '@/db/client'
import TodoListDisplay from '@/app/_components/TodoListDisplay'
import { listsTable, todosTable } from '@/db/schema';

export default async function ListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/sign-in')

  const list = await db.query.listsTable.findFirst({
    where: eq(listsTable.id, Number(id)),
    with: { todos: { orderBy: [asc(todosTable.id)] } },
  })
  if (!list || list.userId !== session.user.id) notFound()

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
