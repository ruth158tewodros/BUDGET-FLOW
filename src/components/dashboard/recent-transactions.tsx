import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { CATEGORY_META } from "@/lib/categories";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentTransactions({
  transactions,
}: {
  transactions: {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string | Date;
    budgetName: string;
  }[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent transactions</CardTitle>
        <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs">
          <Link href="/dashboard/expenses">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="No transactions yet"
            description="Your latest expenses will appear here."
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {transactions.map((t) => {
              const meta = CATEGORY_META[t.category as keyof typeof CATEGORY_META];
              const Icon = meta?.icon;
              return (
                <li key={t.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${meta?.color}1a`, color: meta?.color }}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {t.budgetName} &middot; {formatDate(t.date)}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-foreground">
                    {formatCurrency(t.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
