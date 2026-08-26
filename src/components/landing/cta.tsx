import Link from "next/link";
import { ArrowRight, Coins, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_CHIPS = ["Free forever", "No credit card", "Cancel anytime"];

export function CTA() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl px-6 py-16 text-center shadow-[var(--shadow-soft)] sm:px-12"
        style={{
          background:
            "linear-gradient(135deg, #071827 0%, #0a2f52 45%, #0b6fce 100%)",
        }}
      >
        <Coins
          className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rotate-[-10deg] text-white/10"
          strokeWidth={1}
        />
        <PiggyBank
          className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rotate-[8deg] text-white/10"
          strokeWidth={1}
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Start tracking your spending today
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
            It takes less than a minute to create your first budget. No credit card, no clutter.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <Button size="lg" asChild className="bg-white text-[#0a2f52] hover:bg-white/90">
              <Link href="/sign-up">
                Create your account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
