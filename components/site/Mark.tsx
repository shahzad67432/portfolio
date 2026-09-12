import { cn } from "@/lib/utils";

/**
 * The mark: a cluster of dots, one per thing currently being built. Drawn rather
 * than photographed so it stays crisp at favicon size.
 */
export function Mark({ className }: { className?: string }) {
  const dots: Array<[number, number, number]> = [
    [16, 7, 5.4],
    [8.4, 13.4, 4.6],
    [23.6, 13.4, 4.6],
    [11.2, 22.4, 5],
    [20.8, 22.4, 5],
    [16, 15.6, 4.2],
  ];
  return (
    <svg viewBox="0 0 32 32" className={cn("text-accent", className)} aria-hidden>
      {dots.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="currentColor" opacity={0.92} />
      ))}
    </svg>
  );
}
