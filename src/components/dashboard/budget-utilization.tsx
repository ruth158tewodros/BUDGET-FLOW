import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getIcon } from "@/lib/icon-map";
import { formatCurrency } from "@/lib/utils";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BudgetUtilization({
  budgets,
}: {
  budgets: { id: string; name: string; amount: number; spent: number; icon: string; color: string }[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Budget utilization</CardTitle>
        <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs">
          <Link href="/dashboard/budgets">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {budgets.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No budgets yet"
            description="Create a budget to see utilization here."
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {budgets.slice(0, 5).map((b) => {
              const Icon = getIcon(b.icon);
              const pct = b.amount > 0 ? Math.min(100, (b.spent / b.amount) * 100) : 0;
              const over = b.spent > b.amount;
              return (
                <li key={b.id}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Icon className="h-3.5 w-3.5" style={{ color: b.color }} />
                      {b.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatCurrency(b.spent)} / {formatCurrency(b.amount)}
                    </span>
                  </div>
                  <Progress value={pct} indicatorColor={over ? "var(--destructive)" : b.color} />
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
