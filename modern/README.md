# Pint.ar — maintained 2026 authority

This directory contains the maintained storefront reconstruction of the 2023 React ecommerce learning project.

## Native development

```bash
corepack enable
corepack prepare pnpm@11.26.0 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

Node 24 is the runtime authority (`../.nvmrc`). The locked dependency graph is `pnpm-lock.yaml` and lifecycle-script policy lives in `pnpm-workspace.yaml`.

## Container workflow

```bash
docker compose up --build
```

The hardened storefront is then available at:

- `http://localhost:8080`
- healthcheck: `http://localhost:8080/healthz`

The production image is multi-stage: Node 24 builds the Vite artifact, then unprivileged Nginx serves only the static output. Compose runs it read-only, drops all Linux capabilities and enables `no-new-privileges`.

## Frontend design contract

The storefront uses Sass for composition, mixins and responsive structure. Semantic CSS custom properties under `--store-*` remain the runtime authority for visual meaning. `_legacy-bridge.scss` intentionally keeps the first 2026 CSS pass visible while styles migrate in reviewable increments.

## Product boundary

This is an educational ecommerce demo, not a real payment/order system. The maintained build intentionally uses a deterministic repository-owned catalogue and a local demo order repository. Customer data is not sent to the historical Firebase project.

Prices and stock in this directory are demonstrative fixtures for exercising catalogue, filters, cart and checkout behavior; they are not current commercial values and are not claimed as exact historical Firestore records.

The storefront supports search, route categories, in-stock filtering and deterministic sorting. Checkout confirmation explicitly does not claim payment processing, email delivery or transactional stock reservation.

## Historical authority

The exact 2023 implementation is preserved in Git at `3224d89c0c512b3509cea25f1c49a119d371e338`.

See:

- `../docs/historical-inventory-2026.md`
- `../docs/modernization-2026.md`
- `../docs/storefront-maturity-2026.md`
