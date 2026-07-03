"use client";

import * as React from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icon-map";
import { formatCurrency, cn } from "@/lib/utils";
import { BudgetFormDialog } from "@/components/budgets/budget-form-dialog";
import { DeleteConfirmDialog } from "@/components/dashboard/delete-confirm-dialog";
import { deleteBudget } from "@/app/actions/budgets";

export function BudgetCard({
  budget,
}: {
  budget: { id: string; name: string; amount: number; spent: number; icon: string; color: string };
}) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const Icon = getIcon(budget.icon);
  const pct = budget.amount > 0 ? Math.min(100, (budget.spent / budget.amount) * 100) : 0;
  const remaining = budget.amount - budget.spent;
  const overBudget = remaining < 0;

  return (
    <>
      <Card className="animate-fade-in transition-shadow hover:shadow-[var(--shadow-soft)]">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${budget.color}1a`, color: budget.color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{budget.name}</p>
              <p className="text-xs text-muted-foreground">
                Budget of {formatCurrency(budget.amount)}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-1 -mt-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem destructive onClick={() => setDeleteOpen(true)}>
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="px-5 pb-5">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              {formatCurrency(budget.spent)}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                overBudget ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {overBudget
                ? `${formatCurrency(Math.abs(remaining))} over`
                : `${formatCurrency(remaining)} left`}
            </span>
          </div>
          <Progress
            value={pct}
            indicatorColor={overBudget ? "var(--destructive)" : budget.color}
          />
          <p className="mt-2 text-right text-xs text-muted-foreground">
            {pct.toFixed(0)}% used
          </p>
        </div>
      </Card>

      <BudgetFormDialog open={editOpen} onOpenChange={setEditOpen} budget={budget} />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete "${budget.name}"?`}
        description="This will permanently delete the budget and all of its expenses. This action cannot be undone."
        onConfirm={() => deleteBudget(budget.id)}
      />
    </>
  );
}
