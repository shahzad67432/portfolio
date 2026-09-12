"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/** The feed address, with a button that puts it on the clipboard. */
export function CopyField({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "shadow-rest flex flex-col gap-3 rounded-sm border border-rule bg-[#FBFAF6] p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <code className="break-all font-mono text-small text-ink">{value}</code>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 items-center rounded-sm border border-accent px-4 text-small text-accent transition-colors duration-200 hover:bg-accent hover:text-paper"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <a
          href="/rss.xml"
          className="inline-flex min-h-11 items-center text-small text-ink-meta underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Raw XML
        </a>
      </div>
    </div>
  );
}
