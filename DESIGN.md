---
name: Abdul Raheem Portfolio
description: Software Engineer portfolio with modern-minimal dark aesthetics, Geist typography, Tailwind CSS v4 styling, and precise OKLCH design tokens.
colors:
  canvas: "oklch(14% 0.015 260)"
  card-bg: "oklch(18% 0.02 260 / 0.75)"
  card-border: "oklch(100% 0 0 / 0.08)"
  card-border-hover: "oklch(100% 0 0 / 0.18)"
  text-primary: "oklch(98% 0 0)"
  text-secondary: "oklch(85% 0.02 260)"
  text-muted: "oklch(70% 0.02 260)"
  accent-indigo: "oklch(55% 0.22 275)"
  accent-cyan: "oklch(70% 0.16 220)"
  accent-emerald: "oklch(68% 0.18 160)"
typography:
  font-sans: "Geist, -apple-system, sans-serif"
  font-mono: "Geist Mono, monospace"
---

# Design System: Abdul Raheem Portfolio (v2 Dark Premium)

## 1. Creative Direction & Principles

**North Star: "Developer-Native Modern Minimal"**

The portfolio design system balances developer-native clarity with refined, state-of-the-art UI craft. Built on a deep OKLCH canvas (`oklch(14% 0.015 260)`), the visual architecture uses:
- **2-Column Layout**: Left sticky profile sidebar + Right content stream on desktop; clean vertical stack on mobile.
- **Surface Elevation & Depth**: Clean card surfaces (`oklch(18% 0.02 260 / 0.75)`) with hairline border highlights (`oklch(100% 0 0 / 0.08)`), crisp focus rings (`:focus-visible`), and subtle hover border transitions.
- **Restrained Micro-Motion**: Intentional initial entrance, instant micro-interactions (`var(--dur-short)`), zero ambient scroll noise, and full `prefers-reduced-motion` compliance.

## 2. Typography

- **Display & Headings**: `Geist` (weights: 500, 600, 700, roman font-style only).
- **Body Prose**: `Geist` (weight: 400, leading: `relaxed`).
- **Technical Labels & Metadata**: `Geist Mono` (timestamps, tech stack pills, metrics).

## 3. Color Tokens (OKLCH)

- **Canvas**: `oklch(14% 0.015 260)`
- **Primary Accent**: Indigo `oklch(55% 0.22 275)`
- **Secondary Accent**: Cyan `oklch(70% 0.16 220)`
- **Success Accent**: Emerald `oklch(68% 0.18 160)`
- **Text High-Contrast**: `oklch(98% 0 0)`
- **Text Secondary**: `oklch(85% 0.02 260)`
- **Text Muted**: `oklch(70% 0.02 260)`

## 4. Components

- **SidebarProfile**: High-res avatar with clean border, live IST clock widget, domain-grouped technical skill pills, contact actions, social icons.
- **ImpactExperience**: Clean work experience stream with status indicator and technology badges.
- **BentoProjects**: Engineering project cards displaying architecture details and tech stack.
- **EducationCertifications**: MTech & BE degree cards with CGPA badges (`8.58`, `7.42`) and certification listings.
- **PublicationsActivities**: Highlight cards for research publications and campus technical leadership.

