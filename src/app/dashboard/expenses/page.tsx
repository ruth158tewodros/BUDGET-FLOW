import { Topbar } from "@/components/dashboard/topbar";
import { ExpensesTable } from "@/components/expenses/expenses-table";
import { NewExpenseButton } from "@/components/expenses/new-expense-button";
import { getCurrentUser } from "@/lib/auth";
import { getExpenses, getBudgetsWithSpend } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const user = await getCurrentUser();
  const [expenses, budgets] = await Promise.all([
    getExpenses(user.id),
    getBudgetsWithSpend(user.id),
  ]);

  const budgetOptions = budgets.map((b) => ({ id: b.id, name: b.name }));

  return (
    <>
      <Topbar title="Expenses" />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Expenses</h2>
              <p className="text-sm text-muted-foreground">
                Every transaction, searchable and filterable.
              </p>
            </div>
            <NewExpenseButton budgets={budgetOptions} />
          </div>

          <ExpensesTable expenses={expenses} budgets={budgetOptions} />
        </div>
      </main>
    </>
  );
}
