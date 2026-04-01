import { createTodo } from '@/app/_actions/todos'

export default function AddTodoInput({ listId }: { listId: number }) {
  const action = createTodo.bind(null, listId)

  return (
    <div className="border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-2">
      <form action={action}>
        <li className="flex items-center gap-2 px-1 py-1.5">
          <input
            type="text"
            name="title"
            data-testid="add-todo-input"
            placeholder="Add a task..."
            className="text-sm w-full bg-transparent outline-none border-b border-neutral-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
          />
          <button
            type="submit"
            className="text-xs font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 px-2.5 py-1 rounded-full transition-colors shrink-0"
          >
            Add
          </button>
        </li>
      </form>
    </div>
  )
}
