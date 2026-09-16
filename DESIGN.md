# Design & motion

Editorial, light-paper portfolio. Bold type, sticky progress nav, a cursor-reactive hero, and application-style case studies instead of a résumé wall.

## System

- **Paper** `#f4efe4`, **ink** `#10120f`, **acid** `#d9ff57`, **signal orange** `#ff4e27`, garden green, clinic blue.
- Display + UI: [Anybody](https://fonts.google.com/specimen/Anybody) (variable width). Meta: IBM Plex Mono.
- No WebGL / no 3D. Canvas 2D particles, CSS parallax, Framer Motion reveals.

## Hero

- Oversized cutout portrait (`public/images/hero-stethoscope.jpg`) on the light field.
- Canvas wireframe / particles sit under type + portrait.
- **Pointer (fine hover):** nodes drift, nearby edges pull toward the cursor, orange “aim” ring. Digital chips (ICU / Oakland / Oversight) spring a few pixels with the pointer.
- **Touch / coarse pointer:** idle drift only. No cursor ring, no hover preview on the work index.
- Portrait uses CSS masking so the studio backdrop dissolves into paper.

## Scroll

- Sticky nav + orange progress bar + `00–99` counter.
- Section heads, Oversight case, life photos reveal via Framer Motion `whileInView` (once).
- Life photos: CSS scale/translate on hover (desktop). Green “GROW” field uses a static type watermark, not a 3D scene.
- Marquee ticker is CSS-only.

## Oversight marquee

Featured case, not a list row. Right column is a CSS/SVG-ish **Facility Brief mock**: browser chrome, scanline, tabbed Snapshot / Staffing / Brief, count-up stats from the live public example (Samaritan Nursing and Rehab, CCN 525165), `$29` price, link out to the live facility page.

## Work index

Numbered rows with a ghost preview that follows the cursor (desktop only). Each row includes a **live-build demo**:

- SUD warm-handoff: clickable mock queue (no PHI).
- AI demos: problem → build → what changes stepper.

## Reduced motion

`MotionConfig reducedMotion="user"` plus a CSS `@media (prefers-reduced-motion: reduce)` kill-switch:

- No marquee / pulse / scanline / seed float.
- Particles draw a static field (no rAF loop).
- No scroll-smooth, no hover parallax.
- Count-ups jump to the final number.

Hidden-tab: particle rAF pauses.

## Mobile performance

- Particle count ~26 on coarse pointers, DPR capped at 1.
- Hover preview unmounted via CSS (`display: none` under `1050px` and `hover: none`).
- No Lenis / no smooth-scroll library — native scrolling.
- Images are compressed JPEGs in `public/images`. Life photos are CSS `object-fit` crops, not extra JS.

## Assets not used

The prior HTML draft embedded a Getty World Cup photo. It is **not** in this rebuild (copyright). World Cup flag-carrying stays in copy + the ticker only.
