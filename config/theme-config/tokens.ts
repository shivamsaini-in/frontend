/**
 * Single source of truth for all design tokens.
 * Edit theme.config.json → values cascade everywhere automatically.
 *
 * HOW TO RETHEME: change brand.primary / brand.accent / fonts in theme.config.json.
 * globals.css, layout.tsx, and all components read from here via CSS variables.
 */

import cfg from './theme.config.json';

// ─── Brand ────────────────────────────────────────────────────────────────────
export const brand = cfg.brand;

// ─── Fonts ────────────────────────────────────────────────────────────────────
export const fonts = cfg.fonts;

// ─── Theme modes (dark / light) ───────────────────────────────────────────────
export const dark  = cfg.themeModes.dark;
export const light = cfg.themeModes.light;

// ─── Radius (px) ──────────────────────────────────────────────────────────────
export const radius = cfg.radius;

// ─── Spacing (px) ─────────────────────────────────────────────────────────────
export const spacing = cfg.spacing;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const shadows = cfg.shadows;

// ─── Gradients ────────────────────────────────────────────────────────────────
export const gradients = cfg.gradients;

// ─── Animations ───────────────────────────────────────────────────────────────
export const animations = cfg.animations;

// ─── Derived helpers (used by JS canvas, inline styles, etc.) ─────────────────

/** Ember gradient string — primary → accent */
export const gradientEmber = `linear-gradient(135deg, ${brand.primary} 0%, ${brand.accent} 100%)`;

/** hex → rgba helper */
export function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Pre-built alpha variants for the primary brand color */
export const primaryAlpha = {
  '04':  hexAlpha(brand.primary, 0.04),
  '06':  hexAlpha(brand.primary, 0.06),
  '08':  hexAlpha(brand.primary, 0.08),
  '10':  hexAlpha(brand.primary, 0.10),
  '12':  hexAlpha(brand.primary, 0.12),
  '15':  hexAlpha(brand.primary, 0.15),
  '20':  hexAlpha(brand.primary, 0.20),
  '25':  hexAlpha(brand.primary, 0.25),
  '30':  hexAlpha(brand.primary, 0.30),
  '40':  hexAlpha(brand.primary, 0.40),
  '50':  hexAlpha(brand.primary, 0.50),
};

/** Pre-built alpha variants for the accent brand color */
export const accentAlpha = {
  '08':  hexAlpha(brand.accent, 0.08),
  '10':  hexAlpha(brand.accent, 0.10),
  '15':  hexAlpha(brand.accent, 0.15),
  '20':  hexAlpha(brand.accent, 0.20),
  '25':  hexAlpha(brand.accent, 0.25),
};

/** Canvas / inline-style background for SpaceHero nebula */
export const canvasColors = {
  nebulaEmber:  brand.primary,
  nebulaAmber:  brand.accent,
  nebulaPurple: brand.purple,
  planet1:      brand.primary,
  planet2:      brand.accent,
  planet3:      brand.info,
  bgDeep:       dark.background,
};

/** Feature card palette — cycles through brand colors */
export const featurePalette: Array<{ color: string; bg: string; border: string }> = [
  { color: brand.primary, bg: hexAlpha(brand.primary, 0.08), border: hexAlpha(brand.primary, 0.20) },
  { color: brand.accent,  bg: hexAlpha(brand.accent,  0.08), border: hexAlpha(brand.accent,  0.20) },
  { color: brand.success, bg: hexAlpha(brand.success, 0.08), border: hexAlpha(brand.success, 0.20) },
  { color: brand.info,    bg: hexAlpha(brand.info,    0.08), border: hexAlpha(brand.info,    0.20) },
  { color: brand.purple,  bg: hexAlpha(brand.purple,  0.08), border: hexAlpha(brand.purple,  0.20) },
];

/** Login page brand dot colors */
export const loginDots = [brand.primary, brand.accent, brand.success];

/** Top loading bar colors */
export const loadingBar = {
  from:  brand.primary,
  to:    brand.accent,
  glow1: brand.primary,
  glow2: brand.accent,
};
