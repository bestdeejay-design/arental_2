# Security Policy

## Supported Versions

The latest `main` branch and the most recent release are supported with
security updates.

| Version | Supported |
| ------- | --------- |
| `v1.0.0` and newer | ✅ |
| older / untagged | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not open
a public issue**. Instead, report it privately to **hello@arental.ru** with:

- a description of the vulnerability and its impact;
- steps to reproduce (or a proof of concept);
- any suggested remediation, if known.

We will acknowledge receipt within 3 business days and aim to provide a
remediation timeline within 14 days. Once fixed, we will coordinate a
disclosure timeline with you.

## Scope notes

This is a static marketing site (HTML/CSS/vanilla JS). Typical concerns are
limited to:

- client-side script injection via user-supplied content (currently there is no
  server-side persistence);
- supply-chain risks from third-party scripts (e.g. the Lenis CDN build);
- accidental exposure of contact data.
