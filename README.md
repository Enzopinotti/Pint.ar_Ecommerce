# Pint.ar — ecommerce educativo · 2023 → 2026

Pint.ar nació en 2023 como un proyecto de aprendizaje de React realizado en Coderhouse y documentado también como parte de un proyecto de Ingeniería Industrial en UTN FRLP.

La modernización 2026 **no reescribe esa historia**. El proyecto original permanece auditable en Git y la autoridad mantenida vive separada bajo [`modern/`](./modern/).

## Dos eras, dos autoridades

| Etapa | Autoridad | Propósito |
| --- | --- | --- |
| 2023 | commit [`3224d89c0c512b3509cea25f1c49a119d371e338`](https://github.com/Enzopinotti/Pint.ar_Ecommerce/tree/3224d89c0c512b3509cea25f1c49a119d371e338) | entrega histórica React + CRA + Firebase/Firestore |
| 2026 | [`modern/`](./modern/) | storefront mantenido, testeable, reproducible y explícitamente educativo |

La raíz del repositorio contiene además `index.html`, `404.html`, `assets/`, `robots.txt`, `sitemap.xml` y `.nojekyll` generados. **No son una tercera fuente de producto:** son un mirror de compatibilidad del build de Pages de `modern/`, verificado byte por byte en CI para que el publisher histórico basado en branch no pueda volver a publicar la aplicación 2023.

El Vercel de la entrega original sigue siendo evidencia histórica:

`https://pre-entrega2-pinotti-enzopinotti.vercel.app/`

La autoridad pública 2026 objetivo es:

`https://enzopinotti.github.io/Pint.ar_Ecommerce/`

## Rol dentro del portfolio

Pint.ar es el showcase de **storefront / product engineering para ecommerce**. La segunda pieza ecommerce del portfolio será **Meow Matrix**, que conserva frontend y backend históricos y se modernizará como caso full-stack.

Esa división es deliberada: Pint.ar no inventa una API, autenticación o pagos sólo para sumar tecnología. Su foco es hacer muy bien catálogo, navegación, carrito, checkout demo, experiencia responsive, accesibilidad, diseño, reproducibilidad y calidad de frontend.

## Experiencia ecommerce 2026

La autoridad moderna incluye:

- catálogo tipado y validado en runtime;
- búsqueda textual normalizada;
- categorías y subcategorías por ruta;
- filtro de stock demo;
- ordenamiento determinístico por precio, nombre, stock u orden original;
- detalle de producto;
- carrito inmutable con límites de stock y totales derivados;
- persistencia versionada del carrito en `sessionStorage`;
- checkout guest demo con validación;
- guard sincrónico contra doble submit;
- carrito que sólo se limpia después de una persistencia exitosa;
- recuperación ante error de persistencia;
- confirmación `DEMO-*` que no finge pago, email ni reserva de stock;
- rutas profundas con fallback SPA;
- responsive calificado en 360 / 768 / 1440.

Los productos, precios y stocks 2026 son **fixtures educativos**, no información comercial vigente.

## Stack mantenido

- Node.js 24;
- pnpm 11.26.0;
- React 19.3.0;
- React Router 7.18.3;
- Vite 8.2.2;
- TypeScript 6.0.3 estricto;
- Sass 1.104.1;
- ESLint 10.10.0 + typescript-eslint 8.70.0;
- Vitest 5 + Testing Library;
- Docker multi-stage;
- Nginx no-root para el artifact estático.

TypeScript 7 no se adoptó porque se priorizó mantener el compilador dentro de la ventana oficialmente soportada por el toolchain de lint usado en esta fase.

Sass tampoco se usa como una segunda fuente rígida de verdad visual: las **CSS custom properties semánticas** (`--store-*`) son la autoridad runtime de color/surface/text/action; Sass organiza composición, mixins, responsive y capas de estilos.

## Docker y runtime reproducible

[`modern/Dockerfile`](./modern/Dockerfile) usa un builder Node 24 y un runtime Nginx separado. El runtime:

- ejecuta como usuario `nginx`;
- escucha en `8080`;
- expone `/healthz`;
- soporta rutas profundas de la SPA;
- sirve assets versionados con cache immutable;
- agrega CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`.

[`modern/compose.yaml`](./modern/compose.yaml) agrega filesystem read-only, `/tmp` como `tmpfs`, `cap_drop: ALL` y `no-new-privileges`.

No hay secretos dentro de la imagen ni dependencia del Firebase histórico.

## Seguridad y datos

La versión 2026 es un **ecommerce educativo/demo local**, no una plataforma de pagos u órdenes comerciales.

El checkout usa un `OrderRepository` local. Los datos del formulario no se envían al Firebase histórico ni a otro servicio remoto. La configuración Firebase del proyecto 2023 se conserva sólo como historia; como las reglas de Firestore no están versionadas en este repositorio, no se presenta ese backend antiguo como autoridad segura actual.

La política pnpm mantiene `strictDepBuilds`. El addon nativo opcional `@parcel/watcher`, introducido por el ecosistema Sass para file watching, tiene su lifecycle build **denegado explícitamente** porque CI y producción sólo compilan y no necesitan ese watcher nativo. Cualquier script de build de dependencia nuevo debe ser revisado antes de permitirse.

## Calidad reproducible

La calificación de storefront 2026 (`35032744901`) pasó con install congelado, Prettier, ESLint, TypeScript estricto, **20/20 tests**, build Vite, Docker multi-stage, contenedor no-root/read-only/sin capabilities, health/deep routes/security headers y Chrome 152 con búsqueda, ordenamiento y responsive 360/768/1440.

El workflow permanente [`Modern Pint.ar quality`](./.github/workflows/modern-quality.yml) valida frontend, artifact Pages, paridad del mirror de raíz y, después de quedar verde, construye y ejecuta también el contrato del contenedor endurecido.

Por contraste, el CRA histórico reproducido en 2026 generó un `build/` de aproximadamente **55 MB**, principalmente por media histórica pesada que sigue preservada en Git pero ya no forma parte del delivery mantenido.

## Ejecutar nativamente

```bash
nvm use
cd modern
corepack enable
corepack prepare pnpm@11.26.0 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

## Ejecutar con Docker

```bash
cd modern
docker compose up --build
```

Luego:

- storefront: `http://localhost:8080`
- health: `http://localhost:8080/healthz`

## Documentación

- [Inventario histórico y baseline 2023](./docs/historical-inventory-2026.md)
- [Arquitectura y decisiones 2026](./docs/modernization-2026.md)
- [Maduración storefront, Sass y Docker](./docs/storefront-maturity-2026.md)
- [Cutover público y paridad de publishers](./docs/deployment-cutover-2026.md)
- [Issue de modernización general](https://github.com/Enzopinotti/Pint.ar_Ecommerce/issues/1)
- [Issue de maduración storefront](https://github.com/Enzopinotti/Pint.ar_Ecommerce/issues/3)

## Estado del cierre

La implementación local/container y el cutover por GitHub Actions están calificados. Como la configuración histórica de Pages todavía puede disparar un publisher branch/Jekyll, la raíz se mantiene como mirror generado del mismo artifact moderno y CI impide divergencias. Cambiar Pages Source a **GitHub Actions** sigue siendo una simplificación administrativa recomendable, pero ya no es necesario para preservar la corrección del producto.

El cierre total requiere únicamente que este contrato de paridad pase en `main` y que el origen público confirme home, assets, metadata y deep routes modernos.

La regla del repositorio sigue siendo: **preservar 2023 como evidencia y mejorar 2026 sin inventar capacidades que el producto no tiene**.
