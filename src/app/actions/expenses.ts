"use server";

import { db } from "@/db";
import { budgets, expenses, activityLog } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { expenseSchema } from "@/lib/validations";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "./budgets";

export async function createExpense(input: unknown): Promise<ActionResult> {
  const user = await getCurrentUser();

  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const { budgetId, title, amount, category, note, date } = parsed.data;

  // Verify budget ownership before attaching an expense to it.
  const budget = await db.query.budgets.findFirst({
    where: and(eq(budgets.id, budgetId), eq(budgets.userId, user.id)),
  });
  if (!budget) {
    return { success: false, error: "That budget doesn't exist or isn't yours." };
  }

  await db.transaction(async (tx) => {
    await tx.insert(expenses).values({
      budgetId,
      userId: user.id,
      title,
      amount: amount.toString(),
      category,
      note: note || null,
      date,
    });

    await tx.insert(activityLog).values({
      userId: user.id,
      action: "expense_added",
      description: `Added expense "${title}" to ${budget.name}`,
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard/budgets");
  return { success: true };
}

export async function updateExpense(expenseId: string, input: unknown): Promise<ActionResult> {
  const user = await getCurrentUser();

  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const existing = await db.query.expenses.findFirst({
    where: and(eq(expenses.id, expenseId), eq(expenses.userId, user.id)),
  });
  if (!existing) {
    return { success: false, error: "Expense not found or you don't have access to it." };
  }

  const { budgetId, title, amount, category, note, date } = parsed.data;

  const budget = await db.query.budgets.findFirst({
    where: and(eq(budgets.id, budgetId), eq(budgets.userId, user.id)),
  });
  if (!budget) {
    return { success: false, error: "That budget doesn't exist or isn't yours." };
  }

  await db.transaction(async (tx) => {
    await tx
      .update(expenses)
      .set({ budgetId, title, amount: amount.toString(), category, note: note || null, date })
      .where(and(eq(expenses.id, expenseId), eq(expenses.userId, user.id)));

    await tx.insert(activityLog).values({
      userId: user.id,
      action: "expense_updated",
      description: `Updated expense "${title}"`,
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard/budgets");
  return { success: true };
}

export async function deleteExpense(expenseId: string): Promise<ActionResult> {
  const user = await getCurrentUser();

  const existing = await db.query.expenses.findFirst({
    where: and(eq(expenses.id, expenseId), eq(expenses.userId, user.id)),
  });
  if (!existing) {
    return { success: false, error: "Expense not found or you don't have access to it." };
  }

  await db.transaction(async (tx) => {
    await tx.delete(expenses).where(and(eq(expenses.id, expenseId), eq(expenses.userId, user.id)));

    await tx.insert(activityLog).values({
      userId: user.id,
      action: "expense_deleted",
      description: `Deleted expense "${existing.title}"`,
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard/budgets");
  return { success: true };
}

function flattenZodErrors(error: import("zod").ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
