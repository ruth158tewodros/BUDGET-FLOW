"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, UtensilsCrossed, Car, ShoppingBag } from "lucide-react";

const ROWS = [
  { icon: UtensilsCrossed, label: "Food", amount: "$182.40", color: "var(--cat-food)", pct: 68 },
  { icon: Car, label: "Transport", amount: "$64.00", color: "var(--cat-transport)", pct: 40 },
  { icon: ShoppingBag, label: "Shopping", amount: "$210.15", color: "var(--cat-shopping)", pct: 85 },
];

export function DashboardPreview() {
  const circumference = 2 * Math.PI * 54;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="text-xs text-muted-foreground">Monthly overview</p>
          <p className="text-lg font-semibold text-foreground">June spending</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
          <ArrowUpRight className="h-3 w-3" />
          On track
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-5 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto flex flex-col items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--muted)" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: circumference * (1 - 0.64) }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            />
          </svg>
          <div className="-mt-[86px] flex flex-col items-center">
            <span className="text-2xl font-semibold text-foreground">64%</span>
            <span className="text-xs text-muted-foreground">of budget used</span>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">Remaining this month</p>
            <p className="text-lg font-semibold text-foreground">$743.60</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${row.color}1a`, color: row.color }}
              >
                <row.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{row.label}</span>
                  <span className="text-muted-foreground">{row.amount}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: row.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
