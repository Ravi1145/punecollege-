/**
 * CollegePune Design System Tokens
 * Single source of truth for colours, fonts, spacing, and shadows.
 * Import this wherever you need design constants — Tailwind tokens are
 * also configured to use these values via tailwind.config.ts.
 */

export const tokens = {
  colors: {
    // ── Core brand — matches globals.css @theme CSS variables ──
    primary:   "#0A1628",   // CollegePune Navy — header, footer, dark CTAs (CSS: --color-primary)
    secondary: "#1E3A5F",   // Navy medium — card headers, AI sections (CSS: --color-secondary)
    accent:    "#FF6B2C",   // Admission Orange — primary CTA buttons, highlights (CSS: --color-accent)
    // ── Semantic ──
    blue:      "#1a56db",   // Blue — links, analytics charts only
    success:   "#16a34a",   // Placements, verified badges
    warning:   "#d97706",   // Deadline alerts
    danger:    "#dc2626",   // NEET cutoffs, critical alerts
    surface:   "#f8fafc",   // Page backgrounds (CSS: --color-surface)
    border:    "#e2e8f0",   // Card borders
    text:      "#0f172a",   // Body text
    muted:     "#64748b",   // Secondary text, labels
  },
  fonts: {
    display: '"Plus Jakarta Sans"',   // H1–H3 headings
    body:    '"DM Sans"',             // Paragraphs, labels, UI text
    mono:    '"JetBrains Mono"',      // Cutoff scores, fees, data tables
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64] as const,
  radius: {
    sm:  "6px",
    md:  "10px",
    lg:  "16px",
    xl:  "24px",
    full:"9999px",
  },
  shadow: {
    card:     "0 1px 3px rgba(0,0,0,0.08)",
    elevated: "0 4px 16px rgba(0,0,0,0.12)",
    modal:    "0 20px 60px rgba(0,0,0,0.20)",
  },
  zIndex: {
    leadBar:  50,
    header:   100,
    modal:    200,
    whatsapp: 9999,
  },
} as const

export type DesignTokens = typeof tokens
export type Color        = keyof typeof tokens.colors
export type Shadow       = keyof typeof tokens.shadow
