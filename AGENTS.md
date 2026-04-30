<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Figma MCP Design System Rules

## Required Figma-to-Code Workflow

**Follow this order on every Figma implementation task — do not skip steps.**

1. Call `get_design_context` with the target `nodeId` and `fileKey` to get structured layout data and code hints.
2. If the response is truncated or too large, call `get_metadata` to get the node map, then re-fetch only the needed nodes.
3. Call `get_screenshot` for a visual reference of the exact variant being implemented.
4. Download any image/SVG assets from the Figma MCP `localhost` asset URLs. Use those URLs directly in `src` attributes — do **not** copy files locally and do **not** use placeholders.
5. Translate the MCP output (React + Tailwind reference) into this project's conventions (see sections below).
6. Validate the rendered result against the Figma screenshot before marking the task complete. Aim for 1:1 visual parity.

**IMPORTANT:** If the Figma MCP server returns a `localhost` URL for an image or SVG asset, use that URL directly as the `src`. Never replace it with a placeholder or a local path.

**IMPORTANT:** Do not install icon libraries. All icons are inline SVG components (see Icon System below).

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 — CSS-first config (`@import "tailwindcss"` in `globals.css`). No `tailwind.config.js`. |
| Build | Next.js dev/build via `npm run dev` / `npm run build` |
| Path alias | `@/*` → `./src/*` |

---

## Project Structure

```
src/
  app/
    globals.css       ← Tailwind v4 entry point + font CSS variables
    layout.tsx        ← Root layout: font loading, metadata, body background
    page.tsx          ← Home page — composes section components in order
  components/         ← All section components (flat, no subdirectories)
    HeroSection.tsx
    IntroSection.tsx
    AboutSection.tsx
    FullWidthPhoto.tsx
    ServicesSection.tsx
    PortfolioSection.tsx
    TestimonialsSection.tsx
    NewsSection.tsx
public/               ← Static SVG assets only (not used for photos)
```

- Place **new page-section components** in `src/components/` named `<DescriptiveName>Section.tsx`.
- **Sub-components** (Card, Tag, Icon, etc.) live in the **same file** as the section that uses them. Do not create separate files for components that are not shared.
- Only add `'use client'` when the component needs React state or browser APIs (e.g., `HeroSection` uses `useState` for the mobile menu). Server Components are the default.

---

## Design Tokens

### Colors

There is no separate token file. Colors are applied as Tailwind arbitrary values. Always use the exact hex values below — never substitute approximations.

| Token | Hex | Usage |
|---|---|---|
| Page background | `#fafafa` | `<body>`, mobile menu overlay |
| Primary text / near-black | `#1f1f1f` | Body text, labels, dividers |
| Pure black | `black` | Headlines, nav, buttons |
| Pure white | `white` | Text on dark backgrounds |
| Card background | `#f1f1f1` | Testimonial cards |
| Card border | `#ddd` | Testimonial card border |
| Section background (light grey) | `#f3f3f3` | News section |
| Black section background | `black` | Services section |

**IMPORTANT:** Never hardcode a hex color that is not in the table above without first confirming it from `get_design_context`. Match the Figma value exactly.

### Typography

Three font families are loaded in `src/app/layout.tsx` and exposed as CSS variables:

| Family | CSS Variable | Tailwind Class | Use |
|---|---|---|---|
| Inter | `--font-inter` | `font-sans` (default) | All body text, UI, headlines |
| Geist Mono | `--font-geist-mono` | `font-mono` | Section labels, index numbers, bracketed tags |
| Playfair Display (italic only) | `--font-playfair` | `font-[family-name:var(--font-playfair)] italic` | Accent glyphs (e.g. the `&` in "Born & raised") |

**Font size, weight, tracking conventions:**

- Section labels / index numbers: `font-mono text-[14px] leading-[1.1] uppercase`
- Bracketed labels follow the `[ Label ]` format (square brackets with a space on each side)
- Large display headlines: `font-light not-italic uppercase tracking-[-0.08em]`, size scales across breakpoints (e.g. `text-[32px] md:text-[42px] lg:text-[72px] xl:text-[96px]`)
- Hero / testimonial large text: `font-medium capitalize tracking-[-13.86px]` at `text-[198px]` (desktop)
- Body copy: `font-normal not-italic text-[14px] leading-[1.3] tracking-[-0.56px]`
- Service names / card titles: `font-bold italic uppercase tracking-[-1.44px]`
- Button text: `font-medium text-[14px] tracking-[-0.56px]`

**IMPORTANT:** Letter-tracking values come directly from Figma. Match them exactly (`tracking-[-0.56px]`, `tracking-[-0.64px]`, `tracking-[-0.08em]`, etc.).

---

## Responsive Layout Pattern

This project uses **dual-JSX layout blocks** — a separate subtree for mobile and a separate subtree for desktop — rather than purely CSS-driven responsiveness.

```tsx
{/* Mobile (below lg) */}
<div className="flex flex-col ... lg:hidden">
  ...mobile markup...
</div>

{/* Desktop (lg+) */}
<div className="hidden lg:flex ...">
  ...desktop markup...
</div>
```

Common breakpoint choices per section:

| Section | Mobile hides at | Desktop shows at |
|---|---|---|
| HeroSection | `md` (768 px) | `md` |
| IntroSection | CSS-only (`lg:` prefixes, no dual block) | — |
| AboutSection | `lg` (1024 px) | `lg` |
| ServicesSection | CSS-only | — |
| PortfolioSection | `lg` | `lg` |
| TestimonialsSection | `xl` (1280 px) | `xl` |
| NewsSection | `lg` | `lg` |

Use the breakpoint that matches the Figma design's intended layout switch. Default to `lg` unless the design clearly changes earlier (`md`) or later (`xl`).

**Sizing philosophy:** Use exact pixel values from Figma (e.g. `h-[744px]`, `w-[436px]`, `gap-[117px]`). Do not round to the nearest Tailwind scale unit unless the difference is zero. Percentage values are used for widths that must scale with the viewport (e.g. `style={{ width: '71.45%' }}`).

---

## Image Handling

All photos and images come from the Figma MCP server as `https://www.figma.com/api/mcp/asset/{uuid}` URLs. Use them directly.

Standard full-bleed cover image:
```tsx
<div className="relative w-full overflow-hidden h-[390px]">
  <img
    alt="Description"
    src="https://www.figma.com/api/mcp/asset/..."
    className="absolute inset-0 size-full object-cover object-center"
  />
</div>
```

Exact Figma crop (when `object-cover` cannot reproduce the precise framing):
```tsx
{/* Width/height/top/left are % values derived from the Figma "overscale + offset" pattern */}
<img
  alt="Description"
  src="https://www.figma.com/api/mcp/asset/..."
  className="absolute max-w-none"
  style={{ width: '101.42%', height: '101.39%', top: '-0.69%', left: '-0.71%', objectFit: 'cover' }}
/>
```

Logos with exact Figma dimensions:
```tsx
<div className="relative shrink-0" style={{ width: `${logo.w}px`, height: `${logo.h}px` }}>
  <img src={logo.src} alt="" aria-hidden="true" className="absolute inset-0 size-full object-contain object-left" />
</div>
```

**Do not** use `next/image` — plain `<img>` is used throughout to preserve Figma-exact positioning.

---

## Icon System

All icons are inline SVG components defined in the same file where they are used. There is no icon package or shared icon directory.

Conventions:
- Named by function: `HamburgerIcon`, `CloseIcon`, `ArrowUpRight`, `CornerBracket`
- Always include `aria-hidden="true"` on decorative icons
- `fill="none"` with explicit `stroke` attributes
- Accept a `size` or `className` prop when the icon needs to scale

Corner bracket motif (used in `AboutSection` and `PortfolioSection`) — define a `CornerBracket` / `CB` component locally with `variant: 'tl' | 'tr' | 'br' | 'bl'` paths and compose it into a framing container.

---

## Styling — Tailwind CSS v4

The project uses **Tailwind v4 CSS-first configuration**. There is no `tailwind.config.js`.

`src/app/globals.css`:
```css
@import "tailwindcss";

:root {
  --secondary-family: var(--font-geist-mono);
}

@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);
  --font-inter: var(--font-inter);
  --font-playfair: var(--font-playfair);
}
```

- To add a new design token, extend the `@theme inline` block in `globals.css`.
- Custom utilities go in `globals.css` with `@layer utilities { ... }` — do not create separate CSS files.
- Use Tailwind arbitrary values (`text-[14px]`, `tracking-[-0.56px]`, `bg-[#1f1f1f]`) to preserve Figma-exact values; do not approximate with the built-in scale.

---

## Component Patterns

### Section wrapper
```tsx
export default function ExampleSection() {
  return (
    <section className="px-4 py-12 lg:px-8 lg:py-[80px]">
      {/* mobile block */}
      <div className="flex flex-col gap-8 lg:hidden"> ... </div>
      {/* desktop block */}
      <div className="hidden lg:flex gap-8"> ... </div>
    </section>
  );
}
```

### CTA / primary button
```tsx
<a
  href="#contact"
  className="bg-black text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]"
>
  Let&apos;s talk
</a>
```

### Section label (bracketed mono tag)
```tsx
<p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase">
  [ section name ]
</p>
```

### Horizontal rule
```tsx
<div className="w-full h-px bg-[#1f1f1f]" />
```

### Frosted-glass tag (e.g. portfolio cards)
```tsx
<div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-full">
  <span className="font-medium text-[14px] text-[#111] tracking-[-0.56px] whitespace-nowrap">Label</span>
</div>
```

### Progressive blur overlay
The `ProgressiveBlur` component (defined in `HeroSection.tsx`) uses N stacked `backdrop-filter` layers with increasing blur and a gradient mask to simulate a smooth blur ramp. Re-use the same pattern if a similar effect appears in another section — define the component locally in that section's file.

---

## Asset Management

- **Photos/images:** served from `https://www.figma.com/api/mcp/asset/{uuid}` — reference directly in `src`.
- **Static SVGs:** the `public/` directory contains only the default Next.js boilerplate SVGs. Add project SVGs there only if they are not available as Figma MCP assets.
- **Fonts:** loaded via `next/font/google` in `layout.tsx`; never self-hosted.
- There is no CDN or image optimization pipeline — do not add one without instruction.
