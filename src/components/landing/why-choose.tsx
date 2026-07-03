const REASONS = [
  {
    stat: "3 min",
    label: "Average setup time",
    description: "Sign up, create your first budget, and log an expense — all in a few minutes.",
  },
  {
    stat: "8",
    label: "Built-in categories",
    description: "Food, transport, shopping, education, health, bills, entertainment, and more.",
  },
  {
    stat: "100%",
    label: "Your data, your account",
    description: "Every budget and expense is scoped to your account and never shared.",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="border-y border-border bg-secondary/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Why people choose BudgetFlow
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built to be the tool you actually keep using — not the one you abandon after a week.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.label} className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-primary">{r.stat}</p>
              <p className="mt-2 text-sm font-medium text-foreground">{r.label}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
