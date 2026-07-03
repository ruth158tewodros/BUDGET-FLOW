import { Wallet, Receipt, Pencil, Trash2, PlusCircle, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

const ACTION_ICONS: Record<string, { icon: LucideIcon; tone: string }> = {
  budget_created: { icon: PlusCircle, tone: "text-primary bg-primary-soft" },
  budget_updated: { icon: Pencil, tone: "text-accent bg-accent-soft" },
  budget_deleted: { icon: Trash2, tone: "text-destructive bg-destructive-soft" },
  expense_added: { icon: Receipt, tone: "text-primary bg-primary-soft" },
  expense_updated: { icon: Pencil, tone: "text-accent bg-accent-soft" },
  expense_deleted: { icon: Trash2, tone: "text-destructive bg-destructive-soft" },
};

export function ActivityFeed({
  activity,
}: {
  activity: { id: string; action: string; description: string; timestamp: string | Date }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No activity yet"
            description="Actions you take will show up here."
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {activity.map((item) => {
              const meta = ACTION_ICONS[item.action] ?? { icon: Clock, tone: "text-muted-foreground bg-muted" };
              const Icon = meta.icon;
              return (
                <li key={item.id} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${meta.tone}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(item.timestamp)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
