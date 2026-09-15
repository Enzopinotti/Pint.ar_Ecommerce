# Pint.ar — historical inventory and baseline qualification (2023 → 2026)

## Historical authority

The exact final 2023 project remains recoverable at commit:

`3224d89c0c512b3509cea25f1c49a119d371e338` (`Ultima version`, 2023-05-27).

The repository describes the application as a Coderhouse React project and as part of an Industrial Engineering project at UTN FRLP. That is historical context, not a claim that the 2023 implementation is a current production commerce platform.

## Historical product surface

The 2023 application includes React 18, Create React App, React Router, a Firestore-backed product catalogue, category filters, product detail, Context-based cart state, checkout, direct browser writes to the `ordenes` collection, a purchase brief and About content.

The browser is the trust boundary in the historical checkout. Product snapshots, quantity, monetary total and customer input are assembled client-side. No trusted order-validation backend or versioned Firestore rules exist in this repository, so the historical flow must be treated as an educational ecommerce exercise rather than a secure payment/order system.

## Baseline build evidence

Temporary qualification run `35028753664` reproduced the 2023 dependency tree with `npm ci` on Node 18, 20, 22 and 24. Strict CRA builds failed on all four because historical warnings become errors with `CI=true`. Findings include hook lifecycle debt, accessibility issues, loose equality, unused code and `map()` used for side effects.

Temporary footprint run `35028926324` showed that the same source can produce a non-strict CRA artifact on Node 24, but with warnings:

- full build directory: about 55 MB;
- gzip application JavaScript: about 151 kB;
- gzip CSS: about 16 kB;
- historical dependency audit snapshot: 82 advisories across the old ~1.5k-package graph.

The audit count is evidence about the historical dependency surface. The 2023 tree is not being rewritten with `npm audit fix --force`.

## Historical media cost

The old delivery copies very large assets into the production artifact. Examples measured in the build include:

- `gifSobreNosotros.gif`: 19,687,051 bytes;
- `fondoSobreNosotros.png`: 9,213,916 bytes, with an additional CSS-pipeline copy;
- `Bitter.zip`: 3,012,698 bytes;
- `fondoBody.png`: 1,896,822 bytes, with an additional CSS-pipeline copy;
- `fondoFooter.png`: 1,387,969 bytes, with an additional CSS-pipeline copy.

These files remain historical evidence in Git. They are not automatically promoted into the maintained 2026 bundle.

## Historical deployment

The URL documented by the 2023 README remained reachable during qualification:

`https://pre-entrega2-pinotti-enzopinotti.vercel.app/`

The probe observed HTTP 200 for the root, `/carrito` and `/sobreNosotros`. Chrome 152 rendered the historical root and identified the Pint.Ar / Sobre Nosotros UI. Deep-route body equivalence was not claimed because the first diagnostic harness had a temporary output-file defect.

## Data contract inferred from source

The historical source consumes product records with fields used as:

- document ID;
- `nombre`;
- `precio`;
- `stock`;
- `descripcion`;
- `img`;
- `categoriaPrim`;
- `categoriaSec`.

It reads Firestore collection `productos` and writes browser-constructed orders to `ordenes`.

Firebase web-client configuration is present historically. Those client identifiers are not, by themselves, proof of secret exposure or authorization. Actual access control depends on Firebase project configuration and Firestore rules, which are not versioned in this repository.

## Preservation rule

The maintained 2026 application lives under `modern/`. The original 2023 source, media and Firebase integration remain auditable through Git and are not silently rewritten into current product claims.
