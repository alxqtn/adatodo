'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddTodoInput({ listId }: { listId: number }) {
  const [inputValue, setInputValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  async function handleAddTodo() {
    if (!inputValue.trim()) return

    setIsSaving(true)
    try {
      await fetch(`/api/lists/${listId}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputValue }),
      })
      setInputValue('')
      router.refresh()
    } finally {
      setIsSaving(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTodo()
    }
  }

  return (
    <div className="border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-2">
      <li className="flex items-center gap-2 px-1 py-1.5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task..."
          disabled={isSaving}
          className="text-sm w-full bg-transparent outline-none border-b border-neutral-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
        />
        <button
          onClick={handleAddTodo}
          disabled={isSaving || !inputValue.trim()}
          className="text-xs font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 px-2.5 py-1 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {isSaving ? 'Adding...' : 'Add'}
        </button>
      </li>
    </div>
  )
}
