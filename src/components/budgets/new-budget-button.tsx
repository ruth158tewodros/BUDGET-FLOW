"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BudgetFormDialog } from "@/components/budgets/budget-form-dialog";

export function NewBudgetButton() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm">
        <Plus className="h-4 w-4" />
        New budget
      </Button>
      <BudgetFormDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
