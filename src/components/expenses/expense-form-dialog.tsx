"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CATEGORY_META } from "@/lib/categories";
import { expenseSchema } from "@/lib/validations";
import { createExpense, updateExpense } from "@/app/actions/expenses";

type BudgetOption = { id: string; name: string };

export function ExpenseFormDialog({
  open,
  onOpenChange,
  budgets,
  expense,
  defaultBudgetId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budgets: BudgetOption[];
  expense?: {
    id: string;
    title: string;
    amount: number;
    category: string;
    note: string | null;
    date: string | Date;
    budgetId: string;
  };
  defaultBudgetId?: string;
}) {
  const router = useRouter();
  const isEdit = Boolean(expense);

  const toDateInput = (d: string | Date) =>
    new Date(d).toISOString().slice(0, 10);

  const [budgetId, setBudgetId] = React.useState(
    expense?.budgetId ?? defaultBudgetId ?? budgets[0]?.id ?? ""
  );
  const [title, setTitle] = React.useState(expense?.title ?? "");
  const [amount, setAmount] = React.useState(expense ? String(expense.amount) : "");
  const [category, setCategory] = React.useState(expense?.category ?? CATEGORIES[0]);
  const [note, setNote] = React.useState(expense?.note ?? "");
  const [date, setDate] = React.useState(
    expense ? toDateInput(expense.date) : toDateInput(new Date())
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setBudgetId(expense?.budgetId ?? defaultBudgetId ?? budgets[0]?.id ?? "");
      setTitle(expense?.title ?? "");
      setAmount(expense ? String(expense.amount) : "");
      setCategory(expense?.category ?? CATEGORIES[0]);
      setNote(expense?.note ?? "");
      setDate(expense ? toDateInput(expense.date) : toDateInput(new Date()));
      setErrors({});
    }
  }, [open, expense, defaultBudgetId, budgets]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = expenseSchema.safeParse({
      budgetId,
      title,
      amount,
      category,
      note,
      date,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const result = isEdit
      ? await updateExpense(expense!.id, parsed.data)
      : await createExpense(parsed.data);
    setSubmitting(false);

    if (result.success) {
      toast.success(isEdit ? "Expense updated" : "Expense added", {
        description: `${title} — ${amount}`,
      });
      onOpenChange(false);
      router.refresh();
    } else {
      setErrors(result.fieldErrors ?? {});
      toast.error(result.error);
    }
  }

  if (budgets.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a budget first</DialogTitle>
            <DialogDescription>
              You need at least one budget before you can log an expense.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit expense" : "Add expense"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this transaction." : "Log a new transaction under a budget."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Budget</Label>
            <Select value={budgetId} onValueChange={setBudgetId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a budget" />
              </SelectTrigger>
              <SelectContent>
                {budgets.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budgetId && <p className="text-xs text-destructive">{errors.budgetId}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="expense-title">Title</Label>
            <Input
              id="expense-title"
              placeholder="e.g. Coffee with Abi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
              autoFocus
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="expense-amount">Amount</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="expense-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={Boolean(errors.amount)}
                  className="pl-6"
                />
              </div>
              {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={Boolean(errors.date)}
              />
              {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {CATEGORY_META[c].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="expense-note">Note (optional)</Label>
            <Textarea
              id="expense-note"
              placeholder="Add any extra detail..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            {errors.note && <p className="text-xs text-destructive">{errors.note}</p>}
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save changes" : "Add expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
