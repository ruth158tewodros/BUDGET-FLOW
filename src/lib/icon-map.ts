import {
  Wallet,
  Home,
  Car,
  UtensilsCrossed,
  Plane,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Gift,
  PiggyBank,
  Briefcase,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  Home,
  Car,
  UtensilsCrossed,
  Plane,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Gift,
  PiggyBank,
  Briefcase,
  Gamepad2,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Wallet;
}
