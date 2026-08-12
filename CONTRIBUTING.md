# Contributing to АТМОСФЕРА

Thanks for your interest in improving the **АТМОСФЕРА** landing site! This
document explains how to work in this repository.

## Project shape

This is a **static site** — plain HTML, CSS and vanilla JavaScript. There is no
build step and no framework. The site is served directly; for local preview just
open `index.html` or run a static server:

```bash
python3 -m http.server 8000
# then visit http://127.0.0.1:8000
```

## Branching & commits

- Default branch is `main`.
- For any change, open a feature branch (`feat/...`, `fix/...`, `docs/...`).
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`.
- Keep commits focused; one logical change per commit.

## Pull requests

- Fill in the PR template.
- Describe **what** changed and **why**; link the relevant issue.
- Verify locally: open the page, test nav/anchor links, theme switch, mobile
  menu, form, and check the browser console for errors.
- Make sure the site still works **with and without** the Lenis CDN
  (the script degrades gracefully).

## Code style

- `style.css` uses CSS custom properties for theming (`--bg`, `--ink`,
  `--accent`, …). Add new tokens there rather than hard-coding colors.
- `script.js` is an IIFE; keep it dependency-free except the optional Lenis CDN.
  Always guard third-party globals with a `typeof` check.
- Accessibility matters: any interactive element needs an accessible name
  (`aria-label` / `<label for>`), keyboard support, and visible focus.

## Releases

Releases are tagged on `main` using SemVer (`v1.0.0`). `.github/release.yml`
drives auto-generated notes.

## Code of Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
