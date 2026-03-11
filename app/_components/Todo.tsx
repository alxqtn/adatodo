"use client"
import { useState } from "react"
import Checkbox from "./Checkbox"

type Props = {
  todo: {
    id: string
    done: boolean
    title: string
  }
}

export default function Todo({ todo }: Props) {
  const [checked, setChecked] = useState(todo.done)

  return (
    <li
      key={todo.id}
      className={`flex items-center gap-3 rounded-md px-3 py-2 ${
        checked
          ? "bg-zinc-50 dark:bg-zinc-800/50"
          : "bg-white dark:bg-zinc-900"
      }`}
    >
      <Checkbox checked={checked} toggle={() => setChecked(!checked)} />
      <span
        className={
          checked
            ? "text-zinc-400 line-through dark:text-zinc-500"
            : "text-zinc-700 dark:text-zinc-300"
        }
      >
        {todo.title}
      </span>
    </li>
  )
}
