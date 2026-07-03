"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExpenseFormDialog } from "@/components/expenses/expense-form-dialog";

type BudgetOption = { id: string; name: string };

export function NewExpenseButton({ budgets }: { budgets: BudgetOption[] }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm">
        <Plus className="h-4 w-4" />
        Add expense
      </Button>
      <ExpenseFormDialog open={open} onOpenChange={setOpen} budgets={budgets} />
    </>
  );
}
