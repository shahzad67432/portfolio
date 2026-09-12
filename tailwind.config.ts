import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          deep: "rgb(var(--paper-deep) / <alpha-value>)",
          shade: "rgb(var(--paper-shade) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          body: "rgb(var(--ink-body) / <alpha-value>)",
          meta: "rgb(var(--ink-meta) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        highlight: "rgb(var(--highlight) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        meta: ["0.75rem", { lineHeight: "1.45" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.6" }],
        lead: ["1.25rem", { lineHeight: "1.55" }],
        title: ["1.5rem", { lineHeight: "1.3" }],
        section: ["2rem", { lineHeight: "1.25" }],
        display: ["2.5rem", { lineHeight: "1.2" }],
        hero: ["3.375rem", { lineHeight: "1.15" }],
      },
      maxWidth: {
        prose: "620px",
        index: "860px",
        desk: "1200px",
      },
      transitionTimingFunction: {
        land: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        draw: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
