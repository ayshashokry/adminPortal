import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes cleanly.
 * @param inputs Class names or conditionals
 * @returns Merged className string
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}