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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BUDGET_ICONS, BUDGET_COLORS } from "@/lib/categories";
import { getIcon } from "@/lib/icon-map";
import { budgetSchema } from "@/lib/validations";
import { createBudget, updateBudget } from "@/app/actions/budgets";

export function BudgetFormDialog({
  open,
  onOpenChange,
  budget,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget?: {
    id: string;
    name: string;
    amount: number | string;
    icon: string;
    color: string;
  };
}) {
  const router = useRouter();
  const isEdit = Boolean(budget);

  const [name, setName] = React.useState(budget?.name ?? "");
  const [amount, setAmount] = React.useState(budget ? String(budget.amount) : "");
  const [icon, setIcon] = React.useState(budget?.icon ?? BUDGET_ICONS[0]);
  const [color, setColor] = React.useState(budget?.color ?? BUDGET_COLORS[0]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setName(budget?.name ?? "");
      setAmount(budget ? String(budget.amount) : "");
      setIcon(budget?.icon ?? BUDGET_ICONS[0]);
      setColor(budget?.color ?? BUDGET_COLORS[0]);
      setErrors({});
    }
  }, [open, budget]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = budgetSchema.safeParse({ name, amount, icon, color });
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
      ? await updateBudget(budget!.id, parsed.data)
      : await createBudget(parsed.data);
    setSubmitting(false);

    if (result.success) {
      toast.success(isEdit ? "Budget updated" : "Budget created", {
        description: isEdit ? `${name} was updated.` : `${name} is ready to track.`,
      });
      onOpenChange(false);
      router.refresh();
    } else {
      setErrors(result.fieldErrors ?? {});
      toast.error(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit budget" : "Create a budget"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of this budget."
              : "Set a spending limit for a category or goal."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budget-name">Name</Label>
            <Input
              id="budget-name"
              placeholder="e.g. Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              autoFocus
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budget-amount">Amount</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                id="budget-amount"
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
            <Label>Icon</Label>
            <div className="grid grid-cols-6 gap-2">
              {BUDGET_ICONS.map((name) => {
                const Icon = getIcon(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setIcon(name)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                      icon === name
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    )}
                    aria-label={name}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {BUDGET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-8 w-8 rounded-full ring-offset-2 ring-offset-card transition-all",
                    color === c ? "ring-2 ring-foreground scale-110" : "hover:scale-105"
                  )}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save changes" : "Create budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
