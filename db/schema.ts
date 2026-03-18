import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";

export const listsTable = pgTable("lists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  done: boolean().notNull().default(false),
  listId: integer('list_id').references(() => listsTable.id)
});

export const relations = defineRelations({ listsTable, todosTable }, (r) => ({
  listsTable: {
    todos: r.many.todosTable(),
  },
  todosTable: {
    list: r.one.listsTable({
      from: r.todosTable.listId,
      to: r.listsTable.id,
    }),
  },
}));
