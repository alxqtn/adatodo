'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddTodoInput({ listId }: { listId: string }) {
  const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAdding])

  async function handleAddTodo() {
    if (!inputValue.trim()) {
      setIsAdding(false)
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch(`/api/lists/${listId}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputValue }),
      })

      if (response.ok) {
        setInputValue('')
        router.refresh()
      }
    } finally {
      setIsSaving(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTodo()
    } else if (e.key === 'Escape') {
      setIsAdding(false)
      setInputValue('')
    }
  }

  function handleBlur() {
    if (!inputValue.trim()) {
      setIsAdding(false)
    }
  }

  return (
    <div className="border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-2">
      {!isAdding ? (
        <li
          onClick={() => setIsAdding(true)}
          className="text-sm text-neutral-400 dark:text-neutral-500 cursor-pointer hover:text-neutral-600 flex items-center gap-2 px-1 py-1.5"
        >
          <span>+ Add a task</span>
        </li>
      ) : (
        <li className="flex items-center gap-2 px-1 py-1.5">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Task title"
            disabled={isSaving}
            className="text-sm w-full bg-transparent outline-none border-b border-neutral-300 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
          />
          <button
            onClick={handleAddTodo}
            disabled={isSaving || !inputValue.trim()}
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 px-2 py-0.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Adding...' : 'Add'}
          </button>
        </li>
      )}
    </div>
  )
}
