"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn, restAngle } from "@/lib/utils";

type Props = {
  /** Stable id. Drives the resting angle, so it must not change between renders. */
  id: string;
  children: ReactNode;
  className?: string;
  /** Max resting rotation in degrees. */
  tilt?: number;
  /** Entrance order. Each step adds 60ms. */
  order?: number;
  /** Objects that sit in the background of a section, behind the text. */
  depth?: "front" | "back";
  interactive?: boolean;
};

/**
 * An object resting on the desk. It arrives with an overshoot so it lands rather
 * than fades, keeps a fixed off-axis angle, and lifts toward level on hover.
 *
 * Reduced motion: the resting angle is a fact about the object, not a movement,
 * so it is present in the initial frame and identical in the target frame. That
 * leaves opacity as the only property that changes, over a single frame, and
 * nothing translates or rotates on entry. Hover keeps the shadow change only,
 * which is handled in globals.css off the data-desk-object hook below, because
 * the shadow belongs to the child object rather than to this wrapper.
 */
export function DeskObject({
  id,
  children,
  className,
  tilt = 3,
  order = 0,
  depth = "front",
  interactive = true,
}: Props) {
  const reduced = useReducedMotion();
  const angle = restAngle(id, tilt);

  return (
    <motion.div
      data-desk-object
      initial={
        reduced
          ? { opacity: 0, y: 0, rotate: angle }
          : { opacity: 0, y: 14, rotate: angle * 1.6 }
      }
      whileInView={{ opacity: 1, y: 0, rotate: angle }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={
        reduced
          ? { duration: 0.001 }
          : {
              duration: 0.42,
              delay: order * 0.06,
              ease: [0.34, 1.56, 0.64, 1],
            }
      }
      whileHover={
        interactive && !reduced
          ? { y: -4, rotate: angle * 0.35, transition: { duration: 0.18 } }
          : undefined
      }
      className={cn(
        depth === "back" ? "z-0" : "z-10",
        interactive && "will-change-transform",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
