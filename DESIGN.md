# Design & motion

Composed cinematic reel — not a beige résumé, not a motion-soup award site.

North star: **one beautiful moving thing on a calm page** (Cindy Zhu). Inspiration: Motionsites-style heroes, Swishy motion *grammar* (blur-ins, staggered type, scrubbed UI reveal), IG-story chapter pacing. Julien-level density is explicitly out.

## System

- Fresh cinematic palette (not the old HTML paper/beige/acid-yellow, not clinic ice-blue): **lilac-white** `#f2efff`, **ink** `#0a0612`, **violet** `#6d4aff`, **magenta** `#ff2f7a`.
- Dark bands (`#07060c`) only for Thesis + Oversight so the reel has rhythm without constant effects.
- Display: [Syne](https://fonts.google.com/specimen/Syne). UI: Outfit. Meta: IBM Plex Mono.
- Glass CTAs / nav: CSS `backdrop-filter` + readable contrast. No Liquid Glass JS refraction (it fights type).
- No custom cursor. No particle field. No HUD chrome.

## The one graphic moment

Hero only: a slow pearl → cobalt → magenta **shader wash** (`src/components/HeroGradient.tsx`).

This is the ShaderGradient language ([ruucm/shadergradient](https://github.com/ruucm/shadergradient)) implemented as a ~2KB WebGL plane — not the React Three Fiber package. Installing `@shadergradient/react` pulled Three / Expo and failed React 19.3 peer resolution; a dedicated fragment shader keeps Lighthouse sane and still gives the soft cinematic field.

- Desktop: slow `uTime`, light grain.
- Mobile / coarse pointer: **one static frame** (no rAF).
- `prefers-reduced-motion`: static frame.
- Hidden tab: rAF skips draws.

No R3F float, no liquid-metal logo, no second WebGL scene.

## Motion grammar (Swishy, used quietly)

- Hero type: blur + rise, staggered by line (Framer Motion).
- Section heads: same reveal, `once`.
- Thesis: ScrollTrigger pin + word stagger (desktop only).
- Bedside: one sticky timeline; scenes swap on scrub. Buttons still work.
- Oversight: **the** set piece — pinned scrub. Facility Brief mock website-reveals (`--p` drives rise, unblur, stats, $29 sheet, live CTA).
- Lenis on fine-pointer desktops only. Native scroll on touch / reduced motion.

## Mobile & reduced motion

- No pin/scrub under `960px` or `hover: none`. Chapters stack; Oversight shows the finished Brief.
- WebGL hero does not animate on coarse pointers.
- CSS kill-switch: no animation / transition when `prefers-reduced-motion: reduce`.

## Chapters

1. Hook — portrait + shader wash + one line.
2. Thesis — one sentence.
3. Bedside — three scenarios (ICU, consult, habit).
4. Build — small interactive console (no PHI).
5. Oversight — scroll-scrubbed Facility Brief, live link.
6. Labs — warm-handoff + AI stepper.
7. Life / Hello — photos + CTAs.

Copy TODOs for email / LinkedIn stay in `src/content.ts`.
