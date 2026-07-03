import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function SummaryCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  isCurrency = true,
  hint,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: "default" | "accent" | "destructive" | "warning";
  isCurrency?: boolean;
  hint?: string;
}) {
  const toneClasses: Record<string, string> = {
    default: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent",
    destructive: "bg-destructive-soft text-destructive",
    warning: "bg-warning-soft text-warning",
  };

  return (
    <Card className="animate-fade-in">
      <CardContent className="flex items-start justify-between p-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {isCurrency ? formatCurrency(value) : value.toLocaleString()}
          </span>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </CardContent>
    </Card>
  );
}
