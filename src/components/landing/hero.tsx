import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/landing/dashboard-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, var(--primary-soft), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Now with automatic monthly insights
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Know exactly where
          <br />
          your money goes.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          BudgetFlow helps you set budgets, log expenses in seconds, and see your spending
          habits clearly — so you can stop guessing and start planning.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/sign-up">
              Start budgeting free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sign-in">Log in</Link>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Free forever for personal use. No credit card required.
        </p>
      </div>

      <div className="mt-16">
        <DashboardPreview />
      </div>
    </section>
  );
}
