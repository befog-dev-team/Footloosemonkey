import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getAgeGroup(age) {
  age = parseInt(age) || 0;
  if (age <= 12) return "Group A (Kids)";
  if (age <= 19) return "Group B (Teenagers)";
  return "Group B (Adults)"; // Individual adults use Group B pricing
}