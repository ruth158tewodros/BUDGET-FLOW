"use client";

import * as React from "react";
import { Search, Pencil, Trash2, MoreVertical, Receipt } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DeleteConfirmDialog } from "@/components/dashboard/delete-confirm-dialog";
import { ExpenseFormDialog } from "@/components/expenses/expense-form-dialog";
import { CATEGORIES, CATEGORY_META } from "@/lib/categories";
import { formatCurrency, formatDate } from "@/lib/utils";
import { deleteExpense } from "@/app/actions/expenses";

type ExpenseRow = {
  id: string;
  title: string;
  amount: number;
  category: string;
  note: string | null;
  date: string | Date;
  budgetId: string;
  budgetName: string;
  budgetColor: string;
};

type BudgetOption = { id: string; name: string };

export function ExpensesTable({
  expenses,
  budgets,
}: {
  expenses: ExpenseRow[];
  budgets: BudgetOption[];
}) {
  const [search, setSearch] = React.useState("");
  const [budgetFilter, setBudgetFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [sort, setSort] = React.useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [editing, setEditing] = React.useState<ExpenseRow | null>(null);
  const [deleting, setDeleting] = React.useState<ExpenseRow | null>(null);

  const filtered = React.useMemo(() => {
    let rows = expenses;
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (e) => e.title.toLowerCase().includes(q) || (e.note ?? "").toLowerCase().includes(q)
      );
    }
    if (budgetFilter !== "all") rows = rows.filter((e) => e.budgetId === budgetFilter);
    if (categoryFilter !== "all") rows = rows.filter((e) => e.category === categoryFilter);

    rows = [...rows].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    return rows;
  }, [expenses, search, budgetFilter, categoryFilter, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search title or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex">
          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All budgets</SelectItem>
              {budgets.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {CATEGORY_META[c].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest amount</SelectItem>
              <SelectItem value="lowest">Lowest amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title={expenses.length === 0 ? "No expenses yet" : "No matching expenses"}
          description={
            expenses.length === 0
              ? "Add your first expense to start tracking your spending."
              : "Try adjusting your search or filters."
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => {
                  const meta = CATEGORY_META[e.category as keyof typeof CATEGORY_META];
                  const CatIcon = meta?.icon;
                  return (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{e.title}</p>
                        {e.note && (
                          <p className="max-w-xs truncate text-xs text-muted-foreground">{e.note}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: e.budgetColor }}
                          />
                          {e.budgetName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="gap-1.5">
                          {CatIcon && <CatIcon className="h-3 w-3" style={{ color: meta.color }} />}
                          {e.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(e.date)}</td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">
                        {formatCurrency(e.amount)}
                      </td>
                      <td className="px-2 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditing(e)}>
                              <Pencil className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem destructive onClick={() => setDeleting(e)}>
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {filtered.map((e) => {
              const meta = CATEGORY_META[e.category as keyof typeof CATEGORY_META];
              const CatIcon = meta?.icon;
              return (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${meta?.color}1a`, color: meta?.color }}
                    >
                      {CatIcon && <CatIcon className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{e.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.budgetName} &middot; {formatDate(e.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {formatCurrency(e.amount)}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditing(e)}>
                          <Pencil className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem destructive onClick={() => setDeleting(e)}>
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {editing && (
        <ExpenseFormDialog
          open={Boolean(editing)}
          onOpenChange={(o) => !o && setEditing(null)}
          budgets={budgets}
          expense={editing}
        />
      )}

      {deleting && (
        <DeleteConfirmDialog
          open={Boolean(deleting)}
          onOpenChange={(o) => !o && setDeleting(null)}
          title={`Delete "${deleting.title}"?`}
          description="This transaction will be permanently removed."
          onConfirm={() => deleteExpense(deleting.id)}
        />
      )}
    </div>
  );
}
