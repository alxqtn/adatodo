import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const listsRelations = relations(listsTable, ({ many }) => ({
  todos: many(todosTable),
}));

export const todosRelations = relations(todosTable, ({ one }) => ({
  list: one(listsTable, {
    fields: [todosTable.listId],
    references: [listsTable.id],
  }),
}));
