# Pint.ar — maintained 2026 authority

This directory contains the maintained reconstruction of the 2023 React ecommerce learning project.

## Run

```bash
corepack enable
corepack prepare pnpm@11.26.0 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

Node 24 is the runtime authority (`../.nvmrc`).

## Product boundary

This is an educational ecommerce demo, not a real payment/order system. The maintained build intentionally uses a deterministic repository-owned catalogue and a local demo order repository. Customer data is not sent to the historical Firebase project.

Prices and stock in this directory are demonstrative fixtures for exercising catalogue/cart/checkout behavior; they are not current commercial values and are not claimed as exact historical Firestore records.

The exact 2023 implementation is preserved in Git at `3224d89c0c512b3509cea25f1c49a119d371e338`. See `../docs/historical-inventory-2026.md` and `../docs/modernization-2026.md`.
