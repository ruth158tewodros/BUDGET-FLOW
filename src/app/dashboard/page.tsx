import { Wallet, TrendingDown, PiggyBank, CalendarClock, LayoutGrid } from "lucide-react";
import { Topbar } from "@/components/dashboard/topbar";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { MonthlyBarChart } from "@/components/dashboard/monthly-bar-chart";
import { BudgetUtilization } from "@/components/dashboard/budget-utilization";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { getCurrentUser } from "@/lib/auth";
import {
  getDashboardSummary,
  getExpensesByCategory,
  getMonthlySpending,
  getRecentActivity,
  getRecentTransactions,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const [summary, byCategory, monthly, activity, transactions] = await Promise.all([
    getDashboardSummary(user.id),
    getExpensesByCategory(user.id),
    getMonthlySpending(user.id),
    getRecentActivity(user.id),
    getRecentTransactions(user.id),
  ]);

  return (
    <>
      <Topbar title="Dashboard" />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
            </h2>
            <p className="text-sm text-muted-foreground">
              Here&apos;s an overview of your finances.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <SummaryCard label="Total budget" value={summary.totalBudget} icon={Wallet} tone="default" />
            <SummaryCard label="Total expenses" value={summary.totalSpent} icon={TrendingDown} tone="destructive" />
            <SummaryCard label="Remaining" value={summary.remaining} icon={PiggyBank} tone="accent" />
            <SummaryCard label="This month" value={summary.monthlySpending} icon={CalendarClock} tone="warning" />
            <SummaryCard
              label="Budgets"
              value={summary.numberOfBudgets}
              icon={LayoutGrid}
              tone="default"
              isCurrency={false}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <MonthlyBarChart data={monthly.map((m) => ({ label: m.label, total: m.total }))} />
            <CategoryPieChart data={byCategory} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <BudgetUtilization budgets={summary.budgets} />
            </div>
            <div className="lg:col-span-1">
              <RecentTransactions transactions={transactions} />
            </div>
            <div className="lg:col-span-1">
              <ActivityFeed activity={activity} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
