import { integer, pgTable, varchar, boolean, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export * from "./auth-schema";
import { user } from "./auth-schema";

export const listsTable = pgTable("lists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  userId: text('user_id').notNull().references(() => user.id),
});

export const listsRelations = relations(listsTable, ({ many, one }) => ({
	todos: many(todosTable),
	user: one(user, { fields: [listsTable.userId], references: [user.id] }),
}));

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  done: boolean().notNull().default(false),
  listId: integer('list_id').references(() => listsTable.id)
});

export const todosRelations = relations(todosTable, ({ one }) => ({
	author: one(listsTable, {
		fields: [todosTable.listId],
		references: [listsTable.id],
	}),
}));
