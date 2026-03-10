'use client'

import { useState } from 'react'

export default function TodoCheckbox({ done }: { done: boolean }) {
  const [checked, setChecked] = useState(done)
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => setChecked(!checked)}
      className="peer w-4 h-4 cursor-pointer"
    />
  )
}
