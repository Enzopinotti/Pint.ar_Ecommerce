# Pint.ar — ecommerce educativo · 2023 → 2026

Pint.ar nació en 2023 como un proyecto de aprendizaje de React realizado en el contexto de Coderhouse y también documentado como parte de un proyecto de Ingeniería Industrial en UTN FRLP.

La modernización 2026 **no reescribe esa historia**. Mantiene el proyecto original auditable en Git y agrega una autoridad mantenida separada bajo [`modern/`](./modern/).

## Estado del repositorio

| Etapa | Autoridad | Propósito |
| --- | --- | --- |
| 2023 | commit [`3224d89c0c512b3509cea25f1c49a119d371e338`](https://github.com/Enzopinotti/Pint.ar_Ecommerce/tree/3224d89c0c512b3509cea25f1c49a119d371e338) | entrega histórica React + CRA + Firebase/Firestore |
| 2026 | [`modern/`](./modern/) | reconstrucción mantenida, testeable y explícitamente educativa |

El deploy de Vercel documentado por la entrega original sigue siendo **evidencia histórica** mientras se califica un cutover separado para la versión 2026:

`https://pre-entrega2-pinotti-enzopinotti.vercel.app/`

No se presenta esa URL como autoridad de la reconstrucción moderna hasta completar la calificación pública.

## Qué preserva la versión 2026

La reconstrucción conserva las capacidades que hacían interesante al ejercicio original:

- catálogo y categorías;
- detalle de producto;
- rutas React;
- carrito compartido;
- cantidades, stock demostrativo y totales;
- formulario de checkout;
- confirmación de orden;
- página de historia / Sobre Nosotros.

Pero cambia los contratos que en 2023 eran propios de un ejercicio inicial:

- el carrito usa líneas inmutables y deriva cantidad/total desde una única fuente de verdad;
- los productos no se mutan para agregarles cantidad;
- el checkout valida antes de persistir;
- un guard sincrónico evita envíos duplicados;
- el carrito sólo se limpia después de una persistencia exitosa;
- un error conserva el carrito y deja una acción recuperable;
- la confirmación ya no promete un email que el repositorio no implementa;
- no se finge procesamiento de pagos, reserva transaccional de stock ni autenticación;
- el runtime actual no depende del Firebase histórico mientras sus reglas de Firestore no estén versionadas y calificadas.

## Límite de seguridad y datos

La aplicación 2026 es un **ecommerce educativo/demo local**, no una plataforma de pagos u órdenes comerciales.

El catálogo actual usa fixtures determinísticos versionados en el repositorio. Los precios y stocks son valores demostrativos y no se presentan como precios comerciales vigentes ni como una reproducción exacta de los documentos históricos de Firestore.

El checkout usa un `OrderRepository` local que devuelve IDs `DEMO-*`. Los datos ingresados en el formulario no se envían al Firebase histórico ni a otro servicio remoto.

La configuración web de Firebase que existe en la entrega 2023 se conserva como parte de la historia. Configuración de cliente y autorización son conceptos distintos: la seguridad real de Firestore depende de reglas/configuración del proyecto, y esas reglas no existen hoy como autoridad versionada dentro de este repositorio.

## Stack mantenido

La elección sigue la complejidad real del producto:

- Node.js 24;
- pnpm 11.26.0;
- React 19.3.0;
- React Router 7.18.3;
- Vite 8.2.2;
- TypeScript 6.0.3;
- ESLint 10.10.0 + typescript-eslint 8.70.0;
- Vitest 5 + Testing Library;
- CSS propio responsive.

React se mantiene porque acá sí existen routing, estado compartido, datos asíncronos y checkout. TypeScript 7 no se adoptó en esta fase porque la versión actual de `typescript-eslint` usada por el repositorio declara soporte oficial por debajo de TypeScript 6.1; se prioriza un contrato completo soportado antes que subir majors por apariencia.

No se agregaron Redux/Zustand, Next.js, backend, autenticación, pasarela de pagos, email, Docker, analytics ni IA porque no existe una necesidad de producto que los justifique.

## Calidad reproducible

La primera fundación 2026 fue calificada con:

- install congelado bajo política pnpm de antigüedad mínima de paquetes;
- Prettier;
- ESLint;
- TypeScript estricto con `skipLibCheck: false`;
- **6 archivos de test / 17 tests / 17 passed**;
- build Vite de producción;
- artifact moderno muy por debajo de 2 MiB y sin ZIP/GIF históricos pesados.

El build moderno observado en la primera calificación fue aproximadamente:

- JavaScript: `279.86 kB` / `88.38 kB gzip`;
- CSS: `9.07 kB` / `2.71 kB gzip`.

Por contraste, la entrega CRA histórica reproducida en 2026 generó un `build/` de aproximadamente **55 MB**, impulsado sobre todo por media original que permanece preservada en Git pero ya no se arrastra al delivery actual.

El workflow permanente [`Modern Pint.ar quality`](./.github/workflows/modern-quality.yml) usa permisos `contents: read`, acciones fijadas por SHA, `pnpm install --frozen-lockfile`, `pnpm check` y un presupuesto explícito del artifact.

## Ejecutar la versión mantenida

```bash
nvm use
cd modern
corepack enable
corepack prepare pnpm@11.26.0 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

La autoridad de runtime está en [`.nvmrc`](./.nvmrc) y la de dependencias en [`modern/pnpm-lock.yaml`](./modern/pnpm-lock.yaml).

## Documentación de la modernización

- [Inventario histórico y baseline 2023](./docs/historical-inventory-2026.md)
- [Arquitectura y decisiones 2026](./docs/modernization-2026.md)
- [Issue de modernización 2026](https://github.com/Enzopinotti/Pint.ar_Ecommerce/issues/1)

## Qué sigue

La fundación moderna todavía no implica por sí sola un cutover público. Antes de declarar completa la modernización hay que calificar el flujo real en navegador, el responsive 360/768/1440, la navegación de rutas profundas, el artifact de producción y el host público seleccionado; después se documentará rollback y se sincronizará nuevamente el roadmap central.

La regla de este repositorio sigue siendo simple: **preservar 2023 como evidencia y mejorar 2026 sin inventar capacidades que el producto no tiene**.
