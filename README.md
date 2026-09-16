# Robert Benard — portfolio

Personal site for **Robert Benard**, ICU / addiction-medicine NP and builder of [Oversight Reports](https://oversightreports.com). Oakland / Bay Area.

Live domain: [robbenard.com](https://robbenard.com)

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

```bash
npm run build
npm run preview
```

`npm run build` must pass before deploy. Output is `dist/`.

## Deploy on Vercel

1. Import `recallproject/robbenard-portfolio`.
2. Framework preset: **Vite** (or leave auto-detect).
3. Build command: `npm run build`
4. Output directory: `dist`
5. No environment variables required (static frontend).
6. Attach custom domain `robbenard.com` in Vercel → Project → Settings → Domains.

`vercel.json` sets cache headers for hashed `/assets` and images. This is a single-page app with in-page anchors (`#work`, `#life`, `#about`, `#contact`); no server or auth.

GitHub Pages can still work: the `CNAME` file (`robbenard.com`) lives in `public/` and is copied into `dist/`. Prefer Vercel for previews.

Static work samples (unchanged from the previous site):

- `/docs/CRUSH_RFI_CMS-6098-NC_Benard_v3.pdf`
- `/docs/HHS_OIG_Letter_Maxwell_March2026.pdf`

## Content TODOs

Public contact is currently wired from the previous live site. Confirm before calling the rebuild final:

- [ ] **Email** — `rob.benard@outlook.com` is still the address to publish (`src/content.ts`)
- [ ] **LinkedIn** — `https://www.linkedin.com/in/robertbenard/` is still the public profile
- [ ] Optional: add a preferred facility example URL if `https://oversightreports.com/facility/525165` should change
- [ ] Optional: screen recordings for the AI-demo section if you want real walkthroughs instead of the interactive stepper

Copy lives in the React components plus `src/content.ts`. Motion / mobile fallbacks: see `DESIGN.md`.
