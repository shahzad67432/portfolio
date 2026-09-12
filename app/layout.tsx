import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Instrument_Sans,
  Caveat,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Grain } from "@/components/site/Grain";
import { CoffeeStain } from "@/components/site/CoffeeStain";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadshahzadali.netlify.app"),
  title: {
    default: "Muhammad Shahzad Ali",
    template: "%s · Muhammad Shahzad Ali",
  },
  description:
    "Full stack applied AI engineer in Lahore. I build products with agents, and write about what breaks.",
  openGraph: {
    type: "website",
    title: "Muhammad Shahzad Ali",
    description:
      "Full stack applied AI engineer in Lahore. I build products with agents, and write about what breaks.",
  },
  twitter: { card: "summary_large_image", creator: "@shahzadexec" },
};

/** The paper token, so the browser chrome matches the ground on a phone. */
export const viewport: Viewport = {
  themeColor: "#F7F5F1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${hand.variable} ${mono.variable}`}
    >
      <body className="paper-surface font-sans text-body text-ink-body antialiased">
        <a
          href="#main"
          data-skip-link
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-paper focus:px-4 focus:py-3 focus:text-ink focus:shadow-rest"
        >
          Skip to content
        </a>
        <Grain />
        <CoffeeStain />
        <Nav />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
