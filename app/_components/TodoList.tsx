"use client"
import todoData from "@/data/todos.json";
import Todo from "./Todo";
import { use } from "react";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchTodos() {
  await delay(2000)
  return todoData.lists
}

export const TodoList = () => {
  const todoLists = use(fetchTodos());

  return (
    <>
    {todoLists.map((list) => (
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
    </>
  )
}
