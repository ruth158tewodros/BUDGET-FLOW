import { Wallet } from "lucide-react";
import { Topbar } from "@/components/dashboard/topbar";
import { BudgetCard } from "@/components/budgets/budget-card";
import { NewBudgetButton } from "@/components/budgets/new-budget-button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getCurrentUser } from "@/lib/auth";
import { getBudgetsWithSpend } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function BudgetsPage() {
  const user = await getCurrentUser();
  const budgets = await getBudgetsWithSpend(user.id);

  return (
    <>
      <Topbar title="Budgets" />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Budgets</h2>
              <p className="text-sm text-muted-foreground">
                Create budgets to organize and cap your spending.
              </p>
            </div>
            <NewBudgetButton />
          </div>

          {budgets.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="No budgets yet"
              description="Create your first budget to start tracking spending against a limit."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {budgets.map((b) => (
                <BudgetCard key={b.id} budget={b} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
