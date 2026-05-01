# Bueno Homes — Standalone site

A premium, fully responsive single-page site for **Bueno Homes** (Aberdeen).
Built with **HTML, CSS and vanilla JS only** — no frameworks, no build step.

## Files
- `index.html` — markup
- `styles.css` — design system & layout
- `script.js`  — interactions (lightbox, tilt, reveal, form, nav)
- `images/`    — hero & project photography

## Run locally
Just open `index.html` in any modern browser.

Or serve it (recommended for the Google Maps iframe):

```bash
# Python
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Customise
- **Brand colors** — edit the `:root` variables at the top of `styles.css`
  (`--gold`, `--bg`, etc.).
- **Hero image** — replace `images/hero.jpg`.
- **Projects** — swap files in `images/` and update the `<button class="tile">`
  blocks in `index.html`.
- **Contact details** — search `07495240435` and `buenohomes@hotmail.com`.

## Features
- Sticky transparent → solid navbar with mobile hamburger
- Scroll progress bar + loader
- IntersectionObserver reveal animations
- Masonry gallery with keyboard + swipe lightbox
- 3D mouse-tilt showcase card
- Validated contact form (name / phone / email / message)
- Embedded Google Map + click-to-call / mailto
- Mobile-first, fully responsive
