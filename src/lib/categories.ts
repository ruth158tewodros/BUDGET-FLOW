import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Receipt,
  Clapperboard,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Education",
  "Health",
  "Bills",
  "Entertainment",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<
  Category,
  { icon: LucideIcon; color: string; label: string }
> = {
  Food: { icon: UtensilsCrossed, color: "var(--cat-food)", label: "Food" },
  Transport: { icon: Car, color: "var(--cat-transport)", label: "Transport" },
  Shopping: { icon: ShoppingBag, color: "var(--cat-shopping)", label: "Shopping" },
  Education: { icon: GraduationCap, color: "var(--cat-education)", label: "Education" },
  Health: { icon: HeartPulse, color: "var(--cat-health)", label: "Health" },
  Bills: { icon: Receipt, color: "var(--cat-bills)", label: "Bills" },
  Entertainment: { icon: Clapperboard, color: "var(--cat-entertainment)", label: "Entertainment" },
  Other: { icon: MoreHorizontal, color: "var(--cat-other)", label: "Other" },
};

export const BUDGET_ICONS = [
  "Wallet",
  "Home",
  "Car",
  "UtensilsCrossed",
  "Plane",
  "GraduationCap",
  "HeartPulse",
  "ShoppingBag",
  "Gift",
  "PiggyBank",
  "Briefcase",
  "Gamepad2",
] as const;

export const BUDGET_COLORS = [
  "#059669", // emerald
  "#2563eb", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#ef4444", // red
  "#06b6d4", // cyan
  "#84a98c", // sage
] as const;
