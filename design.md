# Design Direction — Building Apps with AI for Bunnies

## Aesthetic
Dark editorial. Inspired by high-end interior design portfolios — dark canvas, warm earthy tones, large bold typography, generous whitespace, premium feel. Not a dev docs site.

## Color Palette
- Background: `#0e0e0c` (near-black, warm tint)
- Surface: `#1a1916` (dark card bg)
- Surface raised: `#222220`
- Border: `#2e2e2a`
- Text primary: `#f5f0e8` (warm off-white)
- Text muted: `#8a8478`
- Accent: `#d4a853` (warm amber/gold)
- Accent hover: `#e8c070`
- Sidebar active: `#d4a853`
- Sidebar bg: `#131311`
- Code bg: `#1e1e1a`
- Callout bunny: `#1e2a1a` / green tint
- Callout warning: `#2a1e14` / orange tint
- Callout remember: `#1e1e2a` / blue tint
- Callout try: `#2a1a2a` / purple tint

## Typography
- Display / Headings: `Playfair Display` — serif, editorial, weight 700–900
- Body: `Lora` — warm readable serif for long-form reading
- Mono: `JetBrains Mono` — code blocks
- Fallback: `Georgia, serif`

## Layout
- Full-height sidebar (fixed, left) + scrollable main content
- Sidebar: ~280px, chapter list with part groupings
- Content: max-width ~780px, centered in the available space
- Generous padding, line-height 1.8 for body text

## Sidebar
- Part headers as group labels (muted, uppercase small)
- Chapter items clickable, highlight active with gold accent
- Icons: small numbers, no emojis in nav
- Intro, Glossary, Cheatsheet as special items at top/bottom

## Chapter Content Rendering
- H1: large Playfair, 2.5rem, gold accent line underneath
- H2: 1.5rem, Playfair, with generous top margin
- H3: 1.1rem, Lora bold
- Italic opener (chapter subtitle): styled distinctly, muted color
- Callout boxes (🐇 🔨 ⚠️ 📌): distinct colored cards with left border
- Code blocks: dark with JetBrains Mono
- Blockquotes: warm left border, italic

## Home/Landing
- Hero section with large title, subtitle, CTA to start reading
- Part cards grid showing 5 parts with chapter counts
- Clean, editorial, not a typical "docs" landing

## Motion
- Sidebar items fade in on load with stagger
- Chapter content fades in on navigation
- No heavy animations — subtle opacity transitions only
