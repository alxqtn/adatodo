import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { listsTable, todosTable, user } from '../schema';
import seedData from './todos.json';

const db = drizzle(process.env.DATABASE_URL!);

const SEED_EMAIL = 'seed@example.com';
const SEED_PASSWORD = 'password123';
const SEED_NAME = 'Seed User';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create seed user (or fetch if already exists)
    let seedUserId: string;
    const [existing] = await db.select({ id: user.id }).from(user).where(eq(user.email, SEED_EMAIL));

    if (existing) {
      seedUserId = existing.id;
      console.log(`👤 Using existing user: ${SEED_EMAIL}`);
    } else {
      const result = await auth.api.signUpEmail({
        body: { email: SEED_EMAIL, password: SEED_PASSWORD, name: SEED_NAME },
      });
      seedUserId = result.user.id;
      console.log(`👤 Created user: ${SEED_EMAIL} (password: ${SEED_PASSWORD})`);
    }

    for (const list of seedData.lists) {
      const [insertedList] = await db
        .insert(listsTable)
        .values({ name: list.name, userId: seedUserId })
        .returning();

      console.log(`✅ Inserted list: "${insertedList.name}" (id: ${insertedList.id})`);

      if (list.todos.length > 0) {
        const todos = list.todos.map((todo) => ({
          title: todo.title,
          done: todo.done,
          listId: insertedList.id,
        }));

        const insertedTodos = await db.insert(todosTable).values(todos).returning();
        console.log(`   └─ Inserted ${insertedTodos.length} todos`);
      }
    }

    console.log('✨ Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
