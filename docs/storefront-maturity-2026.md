# Pint.ar storefront maturity — 2026

## Role in the portfolio

Pint.ar is the storefront/product-engineering ecommerce showcase. The historical 2023 CRA/Firebase application remains preserved as evidence; the maintained authority is `modern/`.

Meow Matrix is tracked separately as the future full-stack ecommerce showcase. Pint.ar therefore does not invent a backend, authentication or payments only to increase technology count.

## Frontend authority

The maintained storefront uses React, TypeScript, Vite and Sass. Sass owns composition, mixins and responsive organization, while semantic CSS custom properties own runtime visual meaning.

The first 2026 CSS pass is retained as `_legacy-bridge.scss` so the transition remains reviewable rather than pretending the design system existed from day one. New semantic tokens use the `--store-*` namespace.

Accessibility hardening includes visible focus treatment, `prefers-reduced-motion` handling and forced-colors compatibility.

## Storefront contract

Catalogue selection combines:

- free-text search;
- primary/secondary route categories;
- an in-stock-only toggle;
- original, price ascending/descending, name and stock sorting.

Selection and sorting are domain functions with deterministic tests and do not mutate the source catalogue.

Product data remains explicit demo fixture data. No UI copy should imply current commercial inventory, payment, email or stock reservation.

## Container authority

`modern/Dockerfile` is multi-stage:

1. Node 24 + pnpm build the maintained Vite artifact;
2. Nginx serves only `dist/` as the unprivileged `nginx` user on port 8080.

The Nginx contract includes:

- SPA fallback for deep routes;
- `/healthz`;
- immutable caching for versioned assets;
- `Content-Security-Policy`;
- `X-Content-Type-Options`;
- `X-Frame-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`.

`modern/compose.yaml` runs the container read-only, drops all Linux capabilities, enables `no-new-privileges` and exposes only `/tmp` as writable `tmpfs`.

## Dependency build policy

pnpm 11 keeps strict dependency-build enforcement enabled. Sass resolves the optional native filesystem watcher `@parcel/watcher`; Pint.ar explicitly sets that package to `false` under `allowBuilds` because CI and production compile Sass without watch mode.

This is deliberately narrower than globally allowing lifecycle scripts. A future dependency that introduces an unreviewed build script should fail installation until reviewed.

## Qualification evidence

Run `35032744901` succeeded against the phase-2 branch and proved:

- frozen install passes supply-chain policy;
- Prettier passes;
- ESLint passes;
- TypeScript strict passes with `skipLibCheck: false`;
- **6 test files / 20 tests / 20 passed**;
- Vite production build succeeds;
- JS: `281.20 kB` / `88.81 kB gzip`;
- CSS compiled from Sass: `11.48 kB` / `3.30 kB gzip`;
- Docker multi-stage image builds from scratch;
- the production container starts read-only with all capabilities dropped and `no-new-privileges`;
- runtime user is `nginx`;
- `/healthz` responds successfully;
- `/`, `/carrito`, `/checkout`, `/sobreNosotros`, `/Item/latex-interior-blanco` and `/category/Pintura` all return the SPA artifact;
- expected security headers are present;
- Chrome 152 validates search and price sorting against the real container;
- catalogue layout has no horizontal overflow at 360 / 768 / 1440;
- filtered catalogue remains valid at 360;
- browser smoke observes no remote resource requests.

The permanent `Modern Pint.ar quality` workflow carries the frontend quality gate and the hardened-container runtime contract forward for pull requests and `main`.

## Remaining boundary

This phase does not by itself establish a public 2026 production authority. Deployment/cutover remains a separate final step: choose one publisher, validate the public origin, document rollback and only then retire the historical deployment from any current-authority claim.
