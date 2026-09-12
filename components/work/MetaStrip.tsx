import type { Work } from "@/lib/content";
import { cn } from "@/lib/utils";

type MetaStripProps = {
  item: Work;
  className?: string;
};

/** What it was, when it ran, and what it runs on. */
export function MetaStrip({ item, className }: MetaStripProps) {
  return (
    <dl
      className={cn(
        "grid gap-x-10 gap-y-6 border-y border-rule py-6 sm:grid-cols-2",
        className,
      )}
    >
      <div>
        <dt className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          Role
        </dt>
        <dd className="mt-1.5 text-small text-ink">{item.role}</dd>
      </div>
      <div>
        <dt className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          Period
        </dt>
        <dd className="mt-1.5 text-small text-ink">{item.period}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="font-mono text-meta uppercase tracking-[0.14em] text-ink-meta">
          Stack
        </dt>
        <dd className="mt-2.5">
          <ul className="flex flex-wrap gap-2">
            {item.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-rule px-3 py-1 font-mono text-meta uppercase tracking-[0.1em] text-ink-body"
              >
                {tool}
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
