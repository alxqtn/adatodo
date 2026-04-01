'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateTodoDone } from '@/app/_actions/todos'

export default function TodoCheckbox({ id, done }: { id: number; done: boolean }) {
  const [checked, setChecked] = useState(done)
  const router = useRouter()

  async function handleChange() {
    const next = !checked
    setChecked(next)
    await updateTodoDone(id, next)
    router.refresh()
  }

  return (
    <input
      type="checkbox"
      data-testid="todo-checkbox"
      checked={checked}
      onChange={handleChange}
      className="peer w-4 h-4 cursor-pointer"
    />
  )
}
