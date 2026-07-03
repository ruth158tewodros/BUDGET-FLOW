import "server-only";
import { db } from "@/db";
import { budgets, expenses, activityLog } from "@/db/schema";
import { and, eq, desc, gte, sql } from "drizzle-orm";

export async function getBudgetsWithSpend(userId: string) {
  const rows = await db
    .select({
      id: budgets.id,
      name: budgets.name,
      amount: budgets.amount,
      icon: budgets.icon,
      color: budgets.color,
      createdAt: budgets.createdAt,
      spent: sql<string>`coalesce(sum(${expenses.amount}), 0)`,
    })
    .from(budgets)
    .leftJoin(expenses, eq(expenses.budgetId, budgets.id))
    .where(eq(budgets.userId, userId))
    .groupBy(budgets.id)
    .orderBy(desc(budgets.createdAt));

  return rows.map((b) => ({
    ...b,
    amount: Number(b.amount),
    spent: Number(b.spent),
  }));
}

export async function getExpenses(
  userId: string,
  filters?: {
    budgetId?: string;
    category?: string;
    search?: string;
    sort?: "newest" | "oldest" | "highest" | "lowest";
  }
) {
  const conditions = [eq(expenses.userId, userId)];
  if (filters?.budgetId) conditions.push(eq(expenses.budgetId, filters.budgetId));
  if (filters?.category) conditions.push(eq(expenses.category, filters.category));

  let orderBy;
  switch (filters?.sort) {
    case "oldest":
      orderBy = expenses.date;
      break;
    case "highest":
      orderBy = desc(expenses.amount);
      break;
    case "lowest":
      orderBy = expenses.amount;
      break;
    default:
      orderBy = desc(expenses.date);
  }

  const rows = await db
    .select({
      id: expenses.id,
      title: expenses.title,
      amount: expenses.amount,
      category: expenses.category,
      note: expenses.note,
      date: expenses.date,
      budgetId: expenses.budgetId,
      budgetName: budgets.name,
      budgetColor: budgets.color,
    })
    .from(expenses)
    .innerJoin(budgets, eq(budgets.id, expenses.budgetId))
    .where(and(...conditions))
    .orderBy(orderBy);

  let result = rows.map((r) => ({ ...r, amount: Number(r.amount) }));

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (e) => e.title.toLowerCase().includes(q) || (e.note ?? "").toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getDashboardSummary(userId: string) {
  const budgetRows = await getBudgetsWithSpend(userId);

  const totalBudget = budgetRows.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgetRows.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [monthlyRow] = await db
    .select({ total: sql<string>`coalesce(sum(${expenses.amount}), 0)` })
    .from(expenses)
    .where(and(eq(expenses.userId, userId), gte(expenses.date, startOfMonth)));

  return {
    totalBudget,
    totalSpent,
    remaining,
    monthlySpending: Number(monthlyRow?.total ?? 0),
    numberOfBudgets: budgetRows.length,
    budgets: budgetRows,
  };
}

export async function getExpensesByCategory(userId: string) {
  const rows = await db
    .select({
      category: expenses.category,
      total: sql<string>`sum(${expenses.amount})`,
    })
    .from(expenses)
    .where(eq(expenses.userId, userId))
    .groupBy(expenses.category);

  return rows.map((r) => ({ category: r.category, total: Number(r.total) }));
}

export async function getMonthlySpending(userId: string, months = 6) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

  const rows = await db
    .select({
      month: sql<string>`to_char(${expenses.date}, 'YYYY-MM')`,
      total: sql<string>`sum(${expenses.amount})`,
    })
    .from(expenses)
    .where(and(eq(expenses.userId, userId), gte(expenses.date, start)))
    .groupBy(sql`to_char(${expenses.date}, 'YYYY-MM')`)
    .orderBy(sql`to_char(${expenses.date}, 'YYYY-MM')`);

  const map = new Map(rows.map((r) => [r.month, Number(r.total)]));
  const out: { month: string; label: string; total: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    out.push({
      month: key,
      label: d.toLocaleDateString("en-US", { month: "short" }),
      total: map.get(key) ?? 0,
    });
  }
  return out;
}

export async function getRecentActivity(userId: string, limit = 8) {
  return db
    .select()
    .from(activityLog)
    .where(eq(activityLog.userId, userId))
    .orderBy(desc(activityLog.timestamp))
    .limit(limit);
}

export async function getRecentTransactions(userId: string, limit = 5) {
  const rows = await db
    .select({
      id: expenses.id,
      title: expenses.title,
      amount: expenses.amount,
      category: expenses.category,
      date: expenses.date,
      budgetName: budgets.name,
    })
    .from(expenses)
    .innerJoin(budgets, eq(budgets.id, expenses.budgetId))
    .where(eq(expenses.userId, userId))
    .orderBy(desc(expenses.date))
    .limit(limit);

  return rows.map((r) => ({ ...r, amount: Number(r.amount) }));
}
