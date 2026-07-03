import { Wallet, PieChart, Search, Activity, Moon, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "Flexible budgets",
    description:
      "Create a budget for anything — groceries, rent, a trip — with its own icon, color, and limit.",
  },
  {
    icon: Activity,
    title: "Effortless logging",
    description:
      "Add an expense in seconds: title, amount, category, and an optional note. That's it.",
  },
  {
    icon: PieChart,
    title: "Clear analytics",
    description:
      "See spending by category and by month, plus how close each budget is to its limit.",
  },
  {
    icon: Search,
    title: "Search & filter",
    description:
      "Find any transaction instantly by title, note, budget, category, or date — then sort it your way.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description:
      "Your data is yours alone. Every request is checked against your account before it's read or changed.",
  },
  {
    icon: Moon,
    title: "Light & dark mode",
    description:
      "A polished interface that looks right any time of day, and remembers your preference.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Everything you need to stay on budget
          </h2>
          <p className="mt-3 text-muted-foreground">
            No spreadsheets, no clutter — just the tools that actually help you track spending.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
