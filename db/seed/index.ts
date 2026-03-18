import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { listsTable, todosTable } from '../schema';
import seedData from './todos.json';

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    for (const list of seedData.lists) {
      const [insertedList] = await db
        .insert(listsTable)
        .values({ name: list.name })
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
