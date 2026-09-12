"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Common = {
  className?: string;
  /** Seconds to wait after it enters the viewport. */
  delay?: number;
  strokeWidth?: number;
};

type AnnotationProps =
  | (Common & { kind?: "circle" | "underline"; children: ReactNode })
  | (Common & { kind: "arrow"; children?: undefined });

type Shape = {
  viewBox: string;
  stretch: boolean;
  /** Each path draws in order, the second picking up where the first stopped. */
  paths: readonly string[];
};

const SHAPES: Record<"circle" | "underline" | "arrow", Shape> = {
  circle: {
    viewBox: "0 0 200 90",
    stretch: true,
    paths: [
      "M166 20C147 6 98 1 58 10 18 19 3 41 10 60c8 22 63 29 108 25 45-4 77-18 76-40-1-16-21-29-43-35",
    ],
  },
  underline: {
    viewBox: "0 0 200 12",
    stretch: true,
    paths: ["M3 7c37-5 79 4 119-2 30-4 55 2 75-1"],
  },
  arrow: {
    viewBox: "0 0 120 90",
    stretch: false,
    paths: ["M6 10c32-6 84 8 90 52", "M82 44l14 18 17-14"],
  },
};

/**
 * The pen layer. A circle around a word, an underline under one, or an arrow
 * pointing at something, each drawn with stroke-dashoffset over 1.2s the first
 * time it scrolls into view. Reduced motion gets it already drawn.
 */
export function Annotation(props: AnnotationProps) {
  const { className, delay = 0, strokeWidth = 2.4 } = props;
  const kind = props.kind ?? "circle";
  const shape = SHAPES[kind];

  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const drawn = reduced || inView;

  const svg = (
    <svg
      aria-hidden
      viewBox={shape.viewBox}
      preserveAspectRatio={shape.stretch ? "none" : "xMidYMid meet"}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pointer-events-none text-accent",
        kind === "circle" && "absolute -inset-x-4 -inset-y-2",
        kind === "underline" && "absolute inset-x-0 top-full -mt-1 h-3 w-full",
        kind === "arrow" && "h-full w-full",
      )}
    >
      {shape.paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: i === 0 ? 1.2 : 0.35,
                  delay: delay + (i === 0 ? 0 : 1.05),
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        />
      ))}
    </svg>
  );

  if (kind === "arrow") {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none block h-20 w-28", className)}
      >
        {svg}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="relative">{props.children}</span>
      {svg}
    </span>
  );
}
