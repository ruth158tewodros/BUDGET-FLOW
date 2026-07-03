import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-primary px-6 py-14 text-center shadow-[var(--shadow-soft)] sm:px-12">
        <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground">
          Start tracking your spending today
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/85">
          It takes less than a minute to create your first budget. No credit card, no clutter.
        </p>
        <div className="mt-7">
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link href="/sign-up">
              Create your account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
