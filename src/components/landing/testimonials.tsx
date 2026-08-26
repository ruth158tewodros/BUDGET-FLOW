import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I finally know where my paycheck actually goes each month. Setting up my first budget took less time than making coffee.",
    name: "Sara M.",
    role: "Placeholder testimonial",
    color: "#0b6fce",
  },
  {
    quote:
      "The category breakdown is what did it for me — I could see shopping was eating my whole budget within the first week.",
    name: "Daniel K.",
    role: "Placeholder testimonial",
    color: "#e8930f",
  },
  {
    quote:
      "Simple, fast, and it doesn't try to be a bank app. Exactly what I wanted for tracking personal spending.",
    name: "Amina T.",
    role: "Placeholder testimonial",
    color: "#0d9488",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            What early users are saying
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Sample quotes shown for layout purposes — swap in real feedback once you launch.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 ${
                i === 1 ? "sm:-translate-y-4" : ""
              }`}
            >
              <Quote
                className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 opacity-[0.06]"
                style={{ color: t.color }}
                fill={t.color}
              />
              <blockquote className="relative z-10 text-sm text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="relative z-10 mt-5 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${t.color}1a`, color: t.color }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
