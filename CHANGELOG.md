# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-08-12

First official release of the АТМОСФЕРА landing site, now with a fully
set-up repository (docs, license, community health files) and an accessibility
& resilience polish pass.

### Added
- `README.md` (EN) and `README.ru.md` (RU mirror) with structure, stack,
  quick-start and accessibility notes.
- `LICENSE` (MIT), `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`,
  `SUPPORT.md`.
- Issue templates (`bug_report.yml`, `feature_request.yml`),
  `pull_request_template.md`, and `release.yml` for auto-generated notes.
- `.sr-only` utility class for visually-hidden form labels.
- Mobile menu `aria-expanded` / `aria-controls`, `Escape`-to-close, and focus
  management (focus first link on open, return focus to toggle on close).
- Slider dots exposed as keyboard-operable buttons (`role="button"`,
  `tabindex="0"`, `aria-label`, `Enter`/`Space`).
- `prefers-reduced-motion` block disabling transitions/animations.
- Thank-you alert on contact-form submit.
- Animated README `assets/header.svg` and `assets/footer.svg` (SMIL, no external
  services).

### Changed
- Scoped `.reveal` hidden state under `html.js` so content stays visible without
  JS.
- Guarded Lenis init behind a `typeof` check with null-safe `scrollTo` /
  `onScroll` helpers — anchors and menu now work even if the Lenis CDN fails.
- Anchor handler updates the URL hash via `pushState` and works with/without
  Lenis.
- Adjusted `--ink-tertiary` (dark) and `--accent` (light) for WCAG AA contrast.
- Added `scroll-padding-top: 80px` so the fixed navbar never covers anchored
  sections.
- Raised partner-logo opacity (`0.5` → `0.9`, hover → `1`).

### Fixed
- Form fields now have associated `<label for>` (were `aria-label`-only).

[1.0.0]: https://github.com/bestdeejay-design/arental_2/releases/tag/v1.0.0
