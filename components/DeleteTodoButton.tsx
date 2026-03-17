'use client'

import { useRouter } from 'next/navigation'

export default function DeleteTodoButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
      aria-label="Delete todo"
    >
      ✕
    </button>
  )
}
