<p align="center">
  <img src="assets/header.svg" alt="АТМОСФЕРА — Digital-агентство" width="100%">
</p>

<h1 align="center">АТМОСФЕРА</h1>

<p align="center">
  <strong>Full-cycle digital agency landing page</strong><br>
  Lead generation · Integrations · Ad automation · CRM packaging
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="Stack" src="https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue">
  <img alt="Themes" src="https://img.shields.io/badge/themes-dark%20%7C%20light%20%7C%20bright-orange">
  <img alt="Smooth scroll" src="https://img.shields.io/badge/smooth--scroll-Lenis-cyan">
  <img alt="A11y" src="https://img.shields.io/badge/a11y-WCAG%20AA-success">
  <img alt="Responsive" src="https://img.shields.io/badge/responsive-mobile--first-9cf">
</p>

<p align="center">
  <strong>🌐 Versions:</strong> [English](README.md) · [Русский](README.ru.md) · [Website](https://arental.ru/)
</p>

---

**АТМОСФЕРА** is the marketing site for a full-cycle digital agency. It is a
fully static, dependency-free project (HTML + CSS + vanilla JS) with an
optional smooth-scroll enhancement via [Lenis](https://github.com/darkroomengineering/lenis).
The site is served at **[arental.ru](https://arental.ru/)**.

## Features

- **Multi-section landing** — services, cases, process, career, contacts.
- **Three themes** — dark / light / bright, persisted in `localStorage`.
- **Smooth scrolling** — Lenis with a graceful, no-JS fallback (`scrollIntoView`).
- **Scroll reveal** — `IntersectionObserver` animations, hidden only when JS is
  active so content is always visible without JS.
- **Accessible by default** — semantic landmarks, `aria-expanded`/`aria-controls`
  on the mobile menu, keyboard-operable review dots, labelled form fields,
  `prefers-reduced-motion` support.
- **Mobile-first responsive** — burger menu, fluid metrics grid, adaptive hero.
- **Contact form** — opens the visitor's mail client with a pre-filled message
  and shows a thank-you confirmation.

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Markup | HTML5 (semantic, `lang="ru"`) |
| Styles | CSS3 custom properties, responsive, 3 themes |
| Behavior | Vanilla JS (IIFE), `IntersectionObserver`, `localStorage` |
| Enhancement | Lenis (CDN, optional, guarded) |
| Hosting | Static — GitHub Pages → `arental.ru` (via `CNAME`) |

## Project structure

```
arental_2/
├── index.html              # single-page landing
├── style.css               # tokens, themes, layout, responsive
├── script.js               # interactions, a11y, smooth scroll
├── favicon.svg
├── partner-it-sports.png
├── CNAME                   # arental.ru
├── assets/
│   ├── header.svg          # animated README header (SMIL)
│   └── footer.svg          # animated README footer (SMIL)
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/     # bug_report.yml, feature_request.yml
│   ├── pull_request_template.md
│   └── release.yml
├── README.md
├── README.ru.md
├── LICENSE                 # MIT
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── SUPPORT.md
└── CHANGELOG.md
```

## Quick start

No build step required.

```bash
# clone
git clone https://github.com/bestdeejay-design/arental_2.git
cd arental_2

# preview locally
python3 -m http.server 8000
# open http://127.0.0.1:8000
```

> The Lenis CDN script is loaded over the network. If it is unavailable, the
> site automatically falls back to native smooth scrolling — all features keep
> working.

## Theming

Themes are driven by a class on `<html>` (`dark` / `light` / `bright`). The
choice is stored in `localStorage` under `arental_theme` and applied before
first paint by an inline script to avoid a flash of incorrect theme (FOUC).

All colors live as CSS custom properties in `:root` and the per-theme blocks —
add new tokens there rather than hard-coding values.

## Accessibility notes

- Anchored sections respect `scroll-padding-top` so the fixed navbar never
  covers a section heading.
- The mobile menu manages `aria-expanded`, moves focus to the first link on
  open, returns focus to the toggle on close, and closes on `Escape`.
- Review-slider dots are real buttons (`role="button"`, `tabindex="0"`) with
  `Enter`/`Space` support and `aria-label`s.
- Form inputs are associated with `<label for>` (visually hidden via `.sr-only`)
  and have accessible names.
- `prefers-reduced-motion: reduce` disables transitions and scroll animations.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). By participating you agree to the
[Code of Conduct](CODE_OF_CONDUCT.md). Security issues: see
[SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2026 Сергей Кузюков (bestdeejay-design).

<p align="center">
  <img src="assets/footer.svg" alt="" width="100%">
</p>
