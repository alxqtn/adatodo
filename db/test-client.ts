import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_TEST || 'postgresql://test:test@localhost:5433/test',
})

export const testDb = drizzle(pool, { schema })

export async function resetData() {
  // Delete in reverse order of foreign key dependencies
  await testDb.delete(schema.todosTable)
  await testDb.delete(schema.listsTable)
}

export { pool }
