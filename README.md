# sofia-web

Public marketing site for **Sofia** — the 24/7 multilingual voice AI receptionist built by [Z.E Digital Tech](https://zedigital.tech).

Live: https://zedigitaltech.github.io/sofia-web/

## What Sofia is

Sofia answers business phones around the clock in Albanian, English, Italian, German, French, and Spanish. She knows each client's services, prices, and FAQs, captures leads when she doesn't know an answer, and forwards call reports to staff. First pilot customer: Regina Group (hotels, taxi, boats, travel) in Vlorë, Albania.

Voice pipeline: Zadarma SIP → LiveKit SIP trunk → LiveKit Agents worker → Google Gemini Live API (speech-to-speech). Agent code and knowledge base live in a separate private repo (`zedigitaltech/sofia-hotel`); this repo is the public-facing marketing/onboarding site only.

## What lives here

Static site served via GitHub Pages from `main` branch root. CSS is compiled from Tailwind source — see "CSS build" below.

| File | Purpose |
|---|---|
| `index.html` | Landing page |
| `features.html`, `pricing.html`, `demo.html`, `faq.html` | Product pages |
| `onboard.html` | Client onboarding wizard (preview only — calls `api.sofia.zedigital.tech`, not yet deployed) |
| `dashboard.html` | Client dashboard (preview only — calls `api.sofia.zedigital.tech`, not yet deployed) |
| `privacy.html`, `terms.html` | Legal |
| `main.js`, `styles.css` | Shared client code and styles |
| `styles-tailwind.css` | Compiled Tailwind CSS (generated — do not edit by hand) |
| `manifest.json`, `robots.txt`, `sitemap.xml`, `.nojekyll` | PWA / SEO / Pages config |

## CSS build

```bash
npm install
npm run build:css   # one-off build
npm run watch:css   # watch mode during development
```

A GitHub Action (`build-css.yml`) rebuilds and commits `styles-tailwind.css` automatically on every push that touches HTML, JS, or Tailwind config files.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Related

- `zedigitaltech/sofia-hotel` (private) — agent code, knowledge base, deploy runbooks
- `zedigital.tech` — Z.E Digital Tech corporate site / Verto CRM
