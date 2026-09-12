import { DeskObject } from "@/components/objects/DeskObject";
import { cn } from "@/lib/utils";

type TerminalCardProps = {
  /** Stable id. Drives the resting angle. */
  id: string;
  /** Shown in the title bar, the way a tab is labelled. */
  title: string;
  /** One entry per printed line. A line starting with "$ " reads as a command. */
  lines: readonly string[];
  order?: number;
  className?: string;
};

/**
 * A printout: near-black card, mono text, a title bar with the three dots, and
 * a faint scanline over the whole thing. The one object on the desk that is not
 * made of paper.
 */
export function TerminalCard({
  id,
  title,
  lines,
  order = 0,
  className,
}: TerminalCardProps) {
  return (
    <DeskObject
      id={id}
      order={order}
      tilt={1.4}
      className={cn("w-[26rem] max-w-full", className)}
    >
      <div className="shadow-rest relative overflow-hidden rounded-lg bg-[#15140F]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="block h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="block h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="block h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <p className="font-mono text-meta uppercase tracking-[0.14em] text-paper/50">
            {title}
          </p>
        </div>

        <pre className="overflow-x-auto px-4 py-4 font-mono text-meta leading-6 text-paper/85 sm:text-small">
          <code>
            {lines.map((line) => {
              const isCommand = line.startsWith("$ ");
              return (
                <span key={line} className="block whitespace-pre-wrap break-words">
                  {isCommand ? (
                    <>
                      <span className="text-accent">$</span>
                      {line.slice(1)}
                    </>
                  ) : (
                    line
                  )}
                </span>
              );
            })}
          </code>
        </pre>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 3px)",
          }}
        />
      </div>
    </DeskObject>
  );
}
