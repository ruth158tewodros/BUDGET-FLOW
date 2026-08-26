import Link from "next/link";
import {
  ArrowRight,
  Users,
  Coins,
  Banknote,
  PiggyBank,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/landing/dashboard-preview";

const EYEBROW_TAGS = ["Budgets", "Expenses", "Insights"];

export function Hero() {
  return (
    <>
      <section
        className="relative overflow-hidden px-4 pb-32 pt-20 sm:px-6 sm:pt-28 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, #071827 0%, #0a2f52 45%, #0b6fce 100%)",
        }}
      >
        <Coins
          className="pointer-events-none absolute -left-8 top-20 h-28 w-28 rotate-[-12deg] text-white/10"
          strokeWidth={1}
        />
        <Banknote
          className="pointer-events-none absolute right-6 top-36 hidden h-24 w-24 rotate-[10deg] text-white/10 sm:block"
          strokeWidth={1}
        />
        <PiggyBank
          className="pointer-events-none absolute left-[18%] bottom-10 hidden h-20 w-20 rotate-[8deg] text-white/10 lg:block"
          strokeWidth={1}
        />
        <TrendingUp
          className="pointer-events-none absolute right-[28%] top-14 hidden h-16 w-16 rotate-[-6deg] text-white/10 lg:block"
          strokeWidth={1}
        />
        <CreditCard
          className="pointer-events-none absolute right-10 bottom-24 hidden h-24 w-24 rotate-[-15deg] text-white/10 sm:block"
          strokeWidth={1}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {EYEBROW_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block font-normal text-white/70">
              Your spending,
            </span>
            <span className="block font-black text-white">
              finally makes{" "}
              <span style={{ color: "#fbbf24" }}>sense.</span>
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
            Set real limits, log expenses in seconds, and watch exactly where
            every dollar goes — no spreadsheets, no guesswork.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-white text-[#0a2f52] hover:bg-white/90"
            >
              <Link href="/sign-up">
                Start budgeting free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/sign-in">Log in</Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Free forever for personal use. No credit card required.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 max-w-2xl px-4 sm:px-6 lg:px-8">
        <DashboardPreview />

        <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Users className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">
              12,400+ budgets
            </p>
            <p className="text-xs text-muted-foreground">
              tracked and counting
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
