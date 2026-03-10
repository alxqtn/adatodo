import TodoCheckbox from '@/components/TodoCheckbox'
import { TodoList } from '@/lib/todos-store'

export default function TodoListDisplay({ list }: { list: TodoList }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
  )
}
