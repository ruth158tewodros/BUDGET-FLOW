import {
  Wallet,
  Activity,
  PieChart,
  Search,
  ShieldCheck,
  Moon,
  Landmark,
  Receipt,
  Calculator,
} from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "Flexible budgets",
    description:
      "Create a budget for anything — groceries, rent, a trip — with its own icon, color, and limit.",
    color: "#0b6fce",
    soft: "#d6ecfb",
    wide: true,
  },
  {
    icon: Activity,
    title: "Effortless logging",
    description:
      "Add an expense in seconds: title, amount, category, and an optional note.",
    color: "#e8930f",
    soft: "#fbe8cc",
  },
  {
    icon: PieChart,
    title: "Clear analytics",
    description:
      "See spending by category and by month, plus how close each budget is to its limit.",
    color: "#0d9488",
    soft: "#d3f0ec",
  },
  {
    icon: Search,
    title: "Search & filter",
    description:
      "Find any transaction instantly by title, note, budget, category, or date.",
    color: "#7c4fe0",
    soft: "#e6ddfb",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description:
      "Every request is checked against your account before it's read or changed.",
    color: "#db2777",
    soft: "#fbdcea",
  },
  {
    icon: Moon,
    title: "Light & dark mode",
    description:
      "A polished interface that looks right any time of day, and remembers your preference.",
    color: "#06b6d4",
    soft: "#d3f5fa",
    wide: true,
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "#0b6fce" }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "#06b6d4" }}
      />
      <Landmark className="pointer-events-none absolute left-6 top-8 hidden h-16 w-16 rotate-[-8deg] text-primary/10 lg:block" strokeWidth={1} />
      <Receipt className="pointer-events-none absolute right-10 top-24 hidden h-20 w-20 rotate-[10deg] text-accent/10 lg:block" strokeWidth={1} />
      <Calculator className="pointer-events-none absolute bottom-10 left-1/3 hidden h-16 w-16 rotate-[6deg] text-primary/10 lg:block" strokeWidth={1} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Everything you need to stay on budget
          </h2>
          <p className="mt-3 text-muted-foreground">
            No spreadsheets, no clutter — just the tools that actually help you track spending.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)] ${
                f.wide ? "sm:col-span-2" : "lg:col-span-1"
              }`}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ backgroundColor: f.soft, color: f.color }}
              >
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
