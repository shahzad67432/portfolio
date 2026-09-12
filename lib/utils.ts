import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic pseudo-random in [-1, 1] from a string seed. Objects on the desk
 * need a resting angle that never changes between server and client renders, so
 * this replaces Math.random everywhere in the object layer.
 */
export function seeded(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) / 4294967295) * 2 - 1;
}

/** Resting rotation for an object, in degrees, within ±max. */
export function restAngle(seed: string, max = 3): number {
  return Number((seeded(seed) * max).toFixed(2));
}
