# Pint.ar storefront maturity — 2026

## Role in the portfolio

Pint.ar is the storefront/product-engineering ecommerce showcase. The historical 2023 CRA/Firebase application remains preserved as evidence; the maintained authority is `modern/`.

Meow Matrix is tracked separately as the future full-stack ecommerce showcase. Pint.ar therefore does not invent a backend, authentication or payments only to increase technology count.

## Frontend authority

The maintained storefront uses React, TypeScript, Vite and Sass. Sass owns composition, mixins and responsive organization, while semantic CSS custom properties own runtime visual meaning. The original first-pass CSS is retained temporarily as `_legacy-bridge.scss` so the migration stays reviewable instead of becoming a visual rewrite.

## Container authority

`modern/Dockerfile` builds with Node 24 and serves the static artifact from Nginx as the unprivileged `nginx` user on port 8080. The Nginx contract includes SPA fallback, `/healthz`, restrictive browser headers and cache handling for immutable assets.

`modern/compose.yaml` additionally runs read-only, drops Linux capabilities, enables `no-new-privileges` and provides only `/tmp` as writable memory-backed storage.

## Product maturity in this phase

Catalogue selection now combines free-text search, route category filters, an in-stock-only toggle and deterministic sorting. Product data remains explicit demo fixture data; no UI copy should imply current commercial inventory, payment, email or stock reservation.

## Dependency build policy

pnpm 11 keeps `strictDepBuilds` enabled. Sass currently resolves the optional native filesystem watcher `@parcel/watcher`; Pint.ar explicitly denies its lifecycle build because CI and production compile Sass without watch mode. Any future package with an unreviewed build script must fail install until reviewed.

## Next qualification

This phase is not complete until frozen install, formatting, lint, strict TypeScript, tests, production build, Docker build, container health/deep-route smoke and real-browser responsive smoke all pass.
