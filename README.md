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
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. No environment variables required.
6. Attach custom domain `robbenard.com`.

`vercel.json` sets cache headers for hashed `/assets` and images. Single-page app with in-page anchors (`#oversight`, `#life`, `#contact`).

`CNAME` (`robbenard.com`) lives in `public/` and is copied into `dist/`.

Work samples:

- `/docs/CRUSH_RFI_CMS-6098-NC_Benard_v3.pdf`
- `/docs/HHS_OIG_Letter_Maxwell_March2026.pdf`

## Content TODOs

Confirm before calling the rebuild final:

- [ ] **Email** — `rob.benard@outlook.com` (`src/content.ts`)
- [ ] **LinkedIn** — `https://www.linkedin.com/in/robertbenard/`
- [ ] Optional: facility example URL if `https://oversightreports.com/facility/525165` should change

Motion / mobile fallbacks: `DESIGN.md`.
