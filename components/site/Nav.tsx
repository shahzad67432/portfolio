"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { nav, profile } from "@/content/profile";
import { LogoMark } from "@/components/brand/Logo";
import { SocialRow } from "@/components/site/SocialRow";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header data-site-nav className="relative z-30">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 w-full max-w-desk items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex min-h-11 min-w-11 items-center"
          aria-label={`${profile.name}, home`}
        >
          <LogoMark className="h-8 w-8" />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center text-small transition-colors duration-200",
                  isActive(item.href)
                    ? "text-accent underline decoration-accent decoration-1 underline-offset-[6px]"
                    : "text-ink-body hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <SocialRow />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden>
            <path
              d={open ? "M2 2 L18 12 M18 2 L2 12" : "M0 1h20M0 7h20M0 13h20"}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="mx-5 mb-4 rounded-md bg-paper/90 p-4 shadow-rest backdrop-blur-sm md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center text-lead",
                    isActive(item.href) ? "text-accent" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-rule pt-3">
            <SocialRow />
          </div>
        </div>
      ) : null}
    </header>
  );
}
