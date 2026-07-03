const FAQS = [
  {
    q: "Is BudgetFlow free to use?",
    a: "Yes. Creating budgets, logging expenses, and viewing your analytics is free for personal use.",
  },
  {
    q: "Can I track more than one budget at a time?",
    a: "Yes — create as many budgets as you like, each with its own name, limit, icon, and color.",
  },
  {
    q: "Is my financial data private?",
    a: "Every budget and expense is tied to your account. The app checks ownership before any read, edit, or delete.",
  },
  {
    q: "Does BudgetFlow work on mobile?",
    a: "Yes — the entire dashboard, including charts and forms, is fully responsive from phone to desktop.",
  },
  {
    q: "Can I export my data?",
    a: "Data export isn't available yet, but it's on the roadmap. See the README for planned improvements.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                {f.q}
                <span className="ml-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
