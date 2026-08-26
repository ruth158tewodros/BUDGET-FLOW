import { Landmark, TrendingUp, ShieldCheck } from "lucide-react";

const REASONS = [
  {
    icon: TrendingUp,
    stat: "3 min",
    label: "Average setup time",
    description: "Sign up, create your first budget, and log an expense — all in a few minutes.",
    color: "#0b6fce",
  },
  {
    icon: Landmark,
    stat: "8",
    label: "Built-in categories",
    description: "Food, transport, shopping, education, health, bills, entertainment, and more.",
    color: "#e8930f",
  },
  {
    icon: ShieldCheck,
    stat: "100%",
    label: "Your data, your account",
    description: "Every budget and expense is scoped to your account and never shared.",
    color: "#0d9488",
  },
];

export function WhyChoose() {
  return (
    <section
      id="why"
      className="relative overflow-hidden border-y border-border bg-secondary/40 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: "#0b6fce" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Why people choose BudgetFlow
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built to be the tool you actually keep using — not the one you abandon after a week.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {REASONS.map((r, i) => (
            <div
              key={r.label}
              className={`text-center ${
                i > 0 ? "sm:border-l sm:border-border sm:pl-8" : ""
              }`}
            >
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: `${r.color}1a`, color: r.color }}
              >
                <r.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-4xl font-semibold tracking-tight" style={{ color: r.color }}>
                {r.stat}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{r.label}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
