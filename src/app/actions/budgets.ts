"use server";

import { db } from "@/db";
import { budgets, expenses, activityLog } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { budgetSchema } from "@/lib/validations";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type ActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function createBudget(input: unknown): Promise<ActionResult> {
  const user = await getCurrentUser();

  const parsed = budgetSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const { name, amount, icon, color } = parsed.data;

  await db.transaction(async (tx) => {
    await tx.insert(budgets).values({
      userId: user.id,
      name,
      amount: amount.toString(),
      icon,
      color,
    });

    await tx.insert(activityLog).values({
      userId: user.id,
      action: "budget_created",
      description: `Created budget "${name}"`,
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/budgets");
  return { success: true };
}

export async function updateBudget(budgetId: string, input: unknown): Promise<ActionResult> {
  const user = await getCurrentUser();

  const parsed = budgetSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: flattenZodErrors(parsed.error),
    };
  }

  const existing = await db.query.budgets.findFirst({
    where: and(eq(budgets.id, budgetId), eq(budgets.userId, user.id)),
  });
  if (!existing) {
    return { success: false, error: "Budget not found or you don't have access to it." };
  }

  const { name, amount, icon, color } = parsed.data;

  await db.transaction(async (tx) => {
    await tx
      .update(budgets)
      .set({ name, amount: amount.toString(), icon, color })
      .where(and(eq(budgets.id, budgetId), eq(budgets.userId, user.id)));

    await tx.insert(activityLog).values({
      userId: user.id,
      action: "budget_updated",
      description: `Updated budget "${name}"`,
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/budgets");
  return { success: true };
}

export async function deleteBudget(budgetId: string): Promise<ActionResult> {
  const user = await getCurrentUser();

  const existing = await db.query.budgets.findFirst({
    where: and(eq(budgets.id, budgetId), eq(budgets.userId, user.id)),
  });
  if (!existing) {
    return { success: false, error: "Budget not found or you don't have access to it." };
  }

  await db.transaction(async (tx) => {
    await tx.delete(expenses).where(and(eq(expenses.budgetId, budgetId), eq(expenses.userId, user.id)));
    await tx.delete(budgets).where(and(eq(budgets.id, budgetId), eq(budgets.userId, user.id)));

    await tx.insert(activityLog).values({
      userId: user.id,
      action: "budget_deleted",
      description: `Deleted budget "${existing.name}"`,
    });
  });

  revalidatePath("/dashboard");
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
