import { z } from "zod";
import { CATEGORIES } from "./categories";

export const budgetSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Budget name is required")
    .max(100, "Budget name must be under 100 characters"),
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .max(999999999, "Amount is too large"),
  icon: z.string().min(1, "Choose an icon"),
  color: z.string().min(1, "Choose a color"),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;

export const expenseSchema = z.object({
  budgetId: z.string().uuid("Choose a budget"),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title must be under 150 characters"),
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than 0")
    .max(999999999, "Amount is too large"),
  category: z.enum(CATEGORIES, { message: "Choose a category" }),
  note: z
    .string()
    .trim()
    .max(500, "Note must be under 500 characters")
    .optional()
    .or(z.literal("")),
  date: z.coerce.date({ message: "Choose a valid date" }),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
