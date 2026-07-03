import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  text,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const budgets = pgTable(
  "budgets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    icon: varchar("icon", { length: 50 }).notNull().default("Wallet"),
    color: varchar("color", { length: 20 }).notNull().default("#059669"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("budgets_user_id_idx").on(table.userId)]
);

export const expenses = pgTable(
  "expenses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    budgetId: uuid("budget_id")
      .notNull()
      .references(() => budgets.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 150 }).notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    note: text("note"),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("expenses_budget_id_idx").on(table.budgetId),
    index("expenses_user_id_idx").on(table.userId),
    index("expenses_date_idx").on(table.date),
  ]
);

export const activityLog = pgTable(
  "activity_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    action: varchar("action", { length: 50 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => [index("activity_log_user_id_idx").on(table.userId)]
);

export const usersRelations = relations(users, ({ many }) => ({
  budgets: many(budgets),
  expenses: many(expenses),
  activity: many(activityLog),
}));

export const budgetsRelations = relations(budgets, ({ one, many }) => ({
  user: one(users, { fields: [budgets.userId], references: [users.id] }),
  expenses: many(expenses),
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
  budget: one(budgets, { fields: [expenses.budgetId], references: [budgets.id] }),
  user: one(users, { fields: [expenses.userId], references: [users.id] }),
}));

export const activityLogRelations = relations(activityLog, ({ one }) => ({
  user: one(users, { fields: [activityLog.userId], references: [users.id] }),
}));

export type User = typeof users.$inferSelect;
export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;
export type ActivityLogEntry = typeof activityLog.$inferSelect;
