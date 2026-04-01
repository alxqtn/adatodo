/**
 * Integration Test - Server Actions: todos
 *
 * Tests createTodo, updateTodoDone, and deleteTodo against a real PostgreSQL database.
 * Requires Docker test DB to be running: docker compose -f docker-compose.test.yml up -d
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { eq } from 'drizzle-orm'
import { testDb, resetData } from '@/db/test-client'
import { listsTable, todosTable } from '@/db/schema'

// Mock the db import to use testDb instead
vi.mock('@/db/client', () => ({
  db: testDb,
}))

import { createTodo, updateTodoDone, deleteTodo } from './todos'

describe('todos server actions', () => {
  let listId: number
  let todoId: number

  beforeEach(async () => {
    await resetData()

    const [list] = await testDb.insert(listsTable).values({ name: 'Test List' }).returning()
    listId = list.id

    const [todo] = await testDb
      .insert(todosTable)
      .values({ title: 'Test Todo', done: false, listId })
      .returning()
    todoId = todo.id
  })

  function formData(title: string) {
    const fd = new FormData()
    fd.append('title', title)
    return fd
  }

  describe('createTodo', () => {
    it('creates a todo in a list', async () => {
      const todo = await createTodo(listId, formData('New Task'))

      expect(todo.title).toBe('New Task')
      expect(todo.done).toBe(false)
      expect(todo.listId).toBe(listId)

      const [inDb] = await testDb.select().from(todosTable).where(eq(todosTable.id, todo.id))
      expect(inDb.title).toBe('New Task')
    })

    it('trims whitespace from title', async () => {
      const todo = await createTodo(listId, formData('  Buy milk  '))
      expect(todo.title).toBe('Buy milk')
    })

    it('throws for empty title', async () => {
      await expect(createTodo(listId, formData(''))).rejects.toThrow('Title is required')
    })

    it('throws for whitespace-only title', async () => {
      await expect(createTodo(listId, formData('   '))).rejects.toThrow('Title is required')
    })

    it('throws for non-existent list', async () => {
      await expect(createTodo(99999, formData('Task'))).rejects.toThrow('List not found')
    })
  })

  describe('updateTodoDone', () => {
    it('updates todo done status to true', async () => {
      const todo = await updateTodoDone(todoId, true)

      expect(todo.done).toBe(true)

      const [inDb] = await testDb.select().from(todosTable).where(eq(todosTable.id, todoId))
      expect(inDb.done).toBe(true)
    })

    it('updates todo done status to false', async () => {
      await testDb.update(todosTable).set({ done: true }).where(eq(todosTable.id, todoId))

      const todo = await updateTodoDone(todoId, false)
      expect(todo.done).toBe(false)
    })

    it('throws for non-existent todo', async () => {
      await expect(updateTodoDone(99999, true)).rejects.toThrow('Not found')
    })
  })

  describe('deleteTodo', () => {
    it('deletes a todo', async () => {
      const result = await deleteTodo(todoId)

      expect(result.ok).toBe(true)

      const [inDb] = await testDb.select().from(todosTable).where(eq(todosTable.id, todoId))
      expect(inDb).toBeUndefined()
    })

    it('throws for non-existent todo', async () => {
      await expect(deleteTodo(99999)).rejects.toThrow('Not found')
    })
  })
})
