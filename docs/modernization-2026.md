# Pint.ar modernization architecture — 2026

## Decision

Pint.ar keeps React in the maintained authority because the real problem has shared cart state, routing, asynchronous catalogue state and a multi-step checkout flow. This is deliberately different from smaller legacy projects where React would only add ceremony.

The initial maintained stack is:

- Node.js 24;
- pnpm 11.26.0;
- React 19.3.0;
- Vite 8.2.2;
- TypeScript 6.0.3;
- React Router 7.18.3;
- ESLint 10.10.0 + typescript-eslint 8.70.0;
- Vitest 5 + Testing Library;
- modern CSS without a component framework.

TypeScript 7 was reviewed but deliberately not selected in this phase because the current typescript-eslint compatibility window officially stops below TypeScript 6.1. The repository prefers a fully supported lint/compiler contract over adopting a newer major for appearance.

## Current trust boundary

The maintained app is a **local educational ecommerce demo**. It does not claim to be a secure payment, inventory reservation or order-processing service.

By default:

- catalogue data is deterministic and repository-owned;
- prices and stock are clearly demonstrative, not a current commercial catalogue;
- checkout validates locally;
- order submission uses a local demo repository that returns a demo order ID;
- customer input is not sent to Firebase or another remote service;
- no email/payment success is promised;
- cart state is scoped to the browser tab via versioned `sessionStorage`.

The old Firebase code remains historical evidence. A current Firebase adapter can be introduced later only if its Firestore rules, data contract and privacy boundary can be qualified truthfully.

## Domain boundaries

```text
repository-owned demo catalogue
          ↓
Product parser / catalogue repository
          ↓
immutable cart reducer + derived summary
          ↓
customer validation + OrderDraft
          ↓
OrderRepository interface
          ↓
local demo implementation
          ↓
React routes / accessible UI
```

### Product

Runtime parsing validates external-style records before they can enter the domain. The maintained fixture uses the same conceptual fields as the historical catalogue without pretending to reproduce exact historical Firestore values.

### Cart

One canonical list of cart lines owns product snapshots and quantities. Item count, subtotals and total are always derived. Products are never mutated to attach a quantity.

### Checkout

The form lifecycle is:

`validate → guard duplicate submit → submit repository → receive ID → clear cart → navigate to confirmation`.

On failure the cart remains intact and an actionable error stays visible. The synchronous ref guard prevents a double event from starting two submissions before React can commit a disabled state.

## Deliberate non-adoptions

The initial modern authority does **not** add Firebase, authentication, a backend, payment gateway, email, Redux/Zustand, Next.js, Docker, analytics or AI. None is required to make the historical learning project safer, clearer and more testable.

## Deployment boundary

The 2023 Vercel site is historical evidence until a maintained 2026 cutover is separately qualified. The modernization branch does not overwrite public production merely because a modern build exists.
