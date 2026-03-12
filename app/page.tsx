import todoData from "@/data/todos.json";
import Todo from "./_components/Todo";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function Home() {
  await delay(1000)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Mes Todos
        </h1>

        <div className="space-y-6">
          {todoData.lists.map((list) => (
            <div
              key={list.id}
              className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {list.name}
              </h2>
              <ul className="space-y-2">
                {list.todos.map((todo) => (
                  <Todo todo={todo} key={todo.id} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
