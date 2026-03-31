/**
 * Integration Test - /api/todos/[id] Route
 *
 * Tests the PATCH and DELETE handlers against a real PostgreSQL database.
 * Requires Docker test DB to be running: docker compose -f docker-compose.test.yml up -d
 */
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { eq } from 'drizzle-orm'
import { testDb, resetData } from '@/db/test-client'
import { listsTable, todosTable } from '@/db/schema'

// Mock the db import to use testDb instead
vi.mock('@/db/client', () => ({
  db: testDb,
}))

import { PATCH, DELETE } from './route'

describe('/api/todos/[id]', () => {
  let listId: number
  let todoId: number

  beforeAll(async () => {
    // Tables are created by migrations
  })

  beforeEach(async () => {
    // Reset and seed data for each test
    await resetData()

    const [list] = await testDb.insert(listsTable).values({ name: 'Test List' }).returning()
    listId = list.id

    const [todo] = await testDb
      .insert(todosTable)
      .values({ title: 'Test Todo', done: false, listId })
      .returning()
    todoId = todo.id
  })

  describe('PATCH', () => {
    it('updates todo done status to true', async () => {
      const request = new Request('http://localhost/api/todos/' + todoId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: true }),
      })

      const response = await PATCH(request, { params: Promise.resolve({ id: String(todoId) }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.done).toBe(true)

      // Verify in database
      const [updated] = await testDb
        .select()
        .from(todosTable)
        .where(eq(todosTable.id, todoId))
      expect(updated.done).toBe(true)
    })

    it('updates todo done status to false', async () => {
      // First set to true
      await testDb.update(todosTable).set({ done: true }).where(eq(todosTable.id, todoId))

      const request = new Request('http://localhost/api/todos/' + todoId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: false }),
      })

      const response = await PATCH(request, { params: Promise.resolve({ id: String(todoId) }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.done).toBe(false)
    })

    it('returns 404 for non-existent todo', async () => {
      const request = new Request('http://localhost/api/todos/99999', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: true }),
      })

      const response = await PATCH(request, { params: Promise.resolve({ id: '99999' }) })

      expect(response.status).toBe(404)
    })
  })

  describe('DELETE', () => {
    it('deletes a todo', async () => {
      const request = new Request('http://localhost/api/todos/' + todoId, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: String(todoId) }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)

      // Verify deleted from database
      const [deleted] = await testDb
        .select()
        .from(todosTable)
        .where(eq(todosTable.id, todoId))
      expect(deleted).toBeUndefined()
    })

    it('returns 404 for non-existent todo', async () => {
      const request = new Request('http://localhost/api/todos/99999', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: '99999' }) })

      expect(response.status).toBe(404)
    })
  })
})
