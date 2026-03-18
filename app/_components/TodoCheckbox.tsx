'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TodoCheckbox({ id, done }: { id: number; done: boolean }) {
  const [checked, setChecked] = useState(done)
  const router = useRouter()

  async function handleChange() {
    const next = !checked
    setChecked(next)
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: next }),
    })
    router.refresh()
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="peer w-4 h-4 cursor-pointer"
    />
  )
}
