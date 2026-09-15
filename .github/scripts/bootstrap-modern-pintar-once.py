from pathlib import Path

FILES: dict[str, str] = {
    ".nvmrc": "24\n",
    "docs/historical-inventory-2026.md": r'''# Pint.ar — historical inventory and baseline qualification (2023 → 2026)

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
''',
    "docs/modernization-2026.md": r'''# Pint.ar modernization architecture — 2026

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
''',
    "modern/.gitignore": "node_modules\ndist\ncoverage\n.env\n.env.*\n!.env.example\n",
    "modern/.env.example": "# The maintained 2026 build uses the local demo repository by default.\n# Remote Firebase/order configuration is intentionally not accepted until rules are auditable.\n",
    "modern/pnpm-workspace.yaml": "packages: []\nminimumReleaseAge: 1440\nstrictPeerDependencies: true\n",
    "modern/package.json": r'''{
  "name": "pintar-modern",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@11.26.0",
  "engines": {
    "node": ">=24 <25"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\" index.html package.json tsconfig.json vite.config.ts eslint.config.js README.md",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css}\" index.html package.json tsconfig.json vite.config.ts eslint.config.js README.md",
    "check": "pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build"
  },
  "dependencies": {
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "react-router-dom": "7.18.3"
  },
  "devDependencies": {
    "@testing-library/dom": "10.4.1",
    "@testing-library/jest-dom": "7.0.1",
    "@testing-library/react": "16.3.3",
    "@testing-library/user-event": "14.6.6",
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
    "@vitejs/plugin-react": "6.1.1",
    "eslint": "10.10.0",
    "eslint-plugin-react-hooks": "7.1.1",
    "jsdom": "30.0.1",
    "prettier": "3.9.6",
    "typescript": "6.0.3",
    "typescript-eslint": "8.70.0",
    "vite": "8.2.2",
    "vitest": "5.0.0"
  }
}
''',
    "modern/tsconfig.json": r'''{
  "compilerOptions": {
    "target": "ES2023",
    "useDefineForClassFields": true,
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false,
    "isolatedModules": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": false,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
''',
    "modern/vite.config.ts": r'''import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
''',
    "modern/eslint.config.js": r'''import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "coverage"] },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
);
''',
    "modern/index.html": r'''<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Pint.ar 2026: reconstrucción educativa del ecommerce React de 2023, con carrito y checkout demo local." />
    <meta name="theme-color" content="#151816" />
    <title>Pint.ar — Ecommerce educativo 2026</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
''',
    "modern/README.md": r'''# Pint.ar — maintained 2026 authority

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
''',
    "modern/src/domain/product.ts": r'''export type ProductCategory = "Pintura" | "Herramienta";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  primaryCategory: ProductCategory;
  secondaryCategory: string;
  accent: string;
}

function asRecord(input: unknown): Record<string, unknown> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("El producto debe ser un objeto.");
  }
  return input as Record<string, unknown>;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${field} debe ser un texto no vacío.`);
  }
  return value.trim();
}

function nonNegativeNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${field} debe ser un número no negativo.`);
  }
  return value;
}

export function parseProduct(input: unknown): Product {
  const raw = asRecord(input);
  const category = requiredString(raw.primaryCategory, "primaryCategory");
  if (category !== "Pintura" && category !== "Herramienta") {
    throw new TypeError("primaryCategory no pertenece al dominio Pint.ar.");
  }

  const stock = nonNegativeNumber(raw.stock, "stock");
  if (!Number.isInteger(stock)) {
    throw new TypeError("stock debe ser entero.");
  }

  return {
    id: requiredString(raw.id, "id"),
    name: requiredString(raw.name, "name"),
    description: requiredString(raw.description, "description"),
    price: nonNegativeNumber(raw.price, "price"),
    stock,
    primaryCategory: category,
    secondaryCategory: requiredString(raw.secondaryCategory, "secondaryCategory"),
    accent: requiredString(raw.accent, "accent"),
  };
}

export function parseCatalog(input: unknown): Product[] {
  if (!Array.isArray(input)) throw new TypeError("El catálogo debe ser una lista.");
  const parsed = input.map(parseProduct);
  const ids = new Set<string>();
  for (const product of parsed) {
    if (ids.has(product.id)) throw new TypeError(`ID de producto duplicado: ${product.id}`);
    ids.add(product.id);
  }
  return parsed;
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("es-AR");
}

export function filterProducts(
  products: readonly Product[],
  options: { query?: string; primary?: string; secondary?: string },
): Product[] {
  const query = normalize(options.query?.trim() ?? "");
  return products.filter((product) => {
    const primaryMatches = !options.primary || product.primaryCategory === options.primary;
    const secondaryMatches = !options.secondary || product.secondaryCategory === options.secondary;
    const haystack = normalize(`${product.name} ${product.description} ${product.primaryCategory} ${product.secondaryCategory}`);
    const queryMatches = query.length === 0 || haystack.includes(query);
    return primaryMatches && secondaryMatches && queryMatches;
  });
}
''',
    "modern/src/data/demoProducts.ts": r'''import { parseCatalog } from "../domain/product";

export const demoProducts = parseCatalog([
  {
    id: "latex-interior-blanco",
    name: "Látex interior blanco",
    description: "Fixture demostrativo inspirado en la categoría histórica de pinturas látex.",
    price: 12400,
    stock: 12,
    primaryCategory: "Pintura",
    secondaryCategory: "Látex",
    accent: "LT",
  },
  {
    id: "latex-interior-color",
    name: "Látex interior color",
    description: "Producto de demostración para probar variantes de catálogo y carrito.",
    price: 13800,
    stock: 8,
    primaryCategory: "Pintura",
    secondaryCategory: "Látex",
    accent: "LC",
  },
  {
    id: "pintura-cal-demo",
    name: "Pintura a la cal",
    description: "Fixture educativo para conservar la navegación de categorías del proyecto 2023.",
    price: 9800,
    stock: 10,
    primaryCategory: "Pintura",
    secondaryCategory: "Cal",
    accent: "PC",
  },
  {
    id: "rodillo-lana-22",
    name: "Rodillo de lana 22 cm",
    description: "Herramienta demo basada en los assets históricos del repositorio.",
    price: 6200,
    stock: 16,
    primaryCategory: "Herramienta",
    secondaryCategory: "Rodillos",
    accent: "RL",
  },
  {
    id: "pincel-30",
    name: "Pincel N.º 30",
    description: "Fixture local para ejercitar detalle, cantidades y validación de stock.",
    price: 3100,
    stock: 20,
    primaryCategory: "Herramienta",
    secondaryCategory: "Pinceles",
    accent: "P30",
  },
  {
    id: "lija-pared-pack",
    name: "Pack de lijas para pared",
    description: "Producto demostrativo inspirado en el catálogo visual histórico.",
    price: 8900,
    stock: 6,
    primaryCategory: "Herramienta",
    secondaryCategory: "Preparación",
    accent: "LP",
  },
]);
''',
    "modern/src/data/catalogRepository.ts": r'''import type { Product } from "../domain/product";
import { demoProducts } from "./demoProducts";

export interface CatalogRepository {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}

export class DemoCatalogRepository implements CatalogRepository {
  async list(): Promise<Product[]> {
    return demoProducts.map((product) => ({ ...product }));
  }

  async getById(id: string): Promise<Product | null> {
    const product = demoProducts.find((item) => item.id === id);
    return product ? { ...product } : null;
  }
}

export const catalogRepository: CatalogRepository = new DemoCatalogRepository();
''',
    "modern/src/domain/cart.ts": r'''import type { Product } from "./product";

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CartState {
  lines: CartLine[];
}

export type CartAction =
  | { type: "add"; product: Product; quantity: number }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" }
  | { type: "replace"; state: CartState };

export const EMPTY_CART: CartState = { lines: [] };

function validQuantity(quantity: number, stock: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= stock;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      if (!validQuantity(action.quantity, action.product.stock)) return state;
      const current = state.lines.find((line) => line.product.id === action.product.id);
      if (!current) {
        return { lines: [...state.lines, { product: { ...action.product }, quantity: action.quantity }] };
      }
      const nextQuantity = current.quantity + action.quantity;
      if (!validQuantity(nextQuantity, current.product.stock)) return state;
      return {
        lines: state.lines.map((line) =>
          line.product.id === action.product.id ? { ...line, quantity: nextQuantity } : line,
        ),
      };
    }
    case "setQuantity":
      return {
        lines: state.lines.map((line) => {
          if (line.product.id !== action.productId) return line;
          if (!validQuantity(action.quantity, line.product.stock)) return line;
          return { ...line, quantity: action.quantity };
        }),
      };
    case "remove":
      return { lines: state.lines.filter((line) => line.product.id !== action.productId) };
    case "clear":
      return EMPTY_CART;
    case "replace":
      return action.state;
  }
}

export interface CartSummary {
  distinctLines: number;
  itemCount: number;
  total: number;
}

export function deriveCartSummary(state: CartState): CartSummary {
  return state.lines.reduce<CartSummary>(
    (summary, line) => ({
      distinctLines: summary.distinctLines + 1,
      itemCount: summary.itemCount + line.quantity,
      total: summary.total + line.product.price * line.quantity,
    }),
    { distinctLines: 0, itemCount: 0, total: 0 },
  );
}
''',
    "modern/src/domain/cartStorage.ts": r'''import { EMPTY_CART, type CartState } from "./cart";
import { parseProduct } from "./product";

export const CART_STORAGE_KEY = "pintar.cart.v1";

interface StoredCart {
  version: 1;
  lines: Array<{ product: unknown; quantity: unknown }>;
}

export function loadCartState(storage: Storage): CartState {
  const raw = storage.getItem(CART_STORAGE_KEY);
  if (!raw) return EMPTY_CART;
  try {
    const payload = JSON.parse(raw) as Partial<StoredCart>;
    if (payload.version !== 1 || !Array.isArray(payload.lines)) return EMPTY_CART;
    const lines = payload.lines.map((line) => {
      const product = parseProduct(line.product);
      const quantity = line.quantity;
      if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
        throw new TypeError("Cantidad de carrito inválida.");
      }
      return { product, quantity };
    });
    return { lines };
  } catch {
    return EMPTY_CART;
  }
}

export function saveCartState(storage: Storage, state: CartState): void {
  storage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: state.lines } satisfies StoredCart));
}
''',
    "modern/src/domain/checkout.ts": r'''import { deriveCartSummary, type CartState } from "./cart";

export interface CustomerInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export type CustomerErrors = Partial<Record<keyof CustomerInput, string>>;

export type CustomerValidation =
  | { ok: true; value: CustomerInput }
  | { ok: false; errors: CustomerErrors };

export function validateCustomer(input: CustomerInput): CustomerValidation {
  const value: CustomerInput = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLocaleLowerCase("es-AR"),
  };
  const errors: CustomerErrors = {};
  if (value.firstName.length < 2) errors.firstName = "Ingresá al menos 2 caracteres.";
  if (value.lastName.length < 2) errors.lastName = "Ingresá al menos 2 caracteres.";
  if (!/^[0-9+()\-\s]{6,20}$/.test(value.phone)) errors.phone = "Ingresá un teléfono válido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) errors.email = "Ingresá un correo válido.";
  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, value };
}

export interface OrderLine {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderDraft {
  customer: CustomerInput;
  lines: OrderLine[];
  itemCount: number;
  total: number;
  createdAt: string;
}

export function buildOrderDraft(customer: CustomerInput, cart: CartState, now = new Date()): OrderDraft {
  if (cart.lines.length === 0) throw new Error("No se puede crear una orden con el carrito vacío.");
  const summary = deriveCartSummary(cart);
  return {
    customer,
    lines: cart.lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      unitPrice: line.product.price,
      quantity: line.quantity,
      subtotal: line.product.price * line.quantity,
    })),
    itemCount: summary.itemCount,
    total: summary.total,
    createdAt: now.toISOString(),
  };
}
''',
    "modern/src/data/orderRepository.ts": r'''import type { OrderDraft } from "../domain/checkout";

export interface OrderResult {
  id: string;
}

export interface OrderRepository {
  submit(order: OrderDraft): Promise<OrderResult>;
}

export class DemoOrderRepository implements OrderRepository {
  async submit(_order: OrderDraft): Promise<OrderResult> {
    const suffix = globalThis.crypto?.randomUUID?.().slice(0, 8).toUpperCase() ?? Date.now().toString(36).toUpperCase();
    return { id: `DEMO-${suffix}` };
  }
}

export const demoOrderRepository: OrderRepository = new DemoOrderRepository();
''',
    "modern/src/app/CartContext.tsx": r'''import { createContext, useContext, useEffect, useMemo, useReducer, type PropsWithChildren } from "react";
import { cartReducer, deriveCartSummary, EMPTY_CART, type CartState } from "../domain/cart";
import { loadCartState, saveCartState } from "../domain/cartStorage";
import type { Product } from "../domain/product";

interface CartContextValue {
  state: CartState;
  summary: ReturnType<typeof deriveCartSummary>;
  add(product: Product, quantity: number): void;
  setQuantity(productId: string, quantity: number): void;
  remove(productId: string): void;
  clear(): void;
}

const CartContext = createContext<CartContextValue | null>(null);

function initialState(): CartState {
  if (typeof window === "undefined") return EMPTY_CART;
  return loadCartState(window.sessionStorage);
}

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, undefined, initialState);
  const summary = useMemo(() => deriveCartSummary(state), [state]);

  useEffect(() => {
    saveCartState(window.sessionStorage, state);
  }, [state]);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      summary,
      add: (product, quantity) => dispatch({ type: "add", product, quantity }),
      setQuantity: (productId, quantity) => dispatch({ type: "setQuantity", productId, quantity }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state, summary],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart debe ejecutarse dentro de CartProvider.");
  return value;
}
''',
    "modern/src/app/OrderRepositoryContext.tsx": r'''import { createContext, useContext, type PropsWithChildren } from "react";
import { demoOrderRepository, type OrderRepository } from "../data/orderRepository";

const OrderRepositoryContext = createContext<OrderRepository>(demoOrderRepository);

export function OrderRepositoryProvider({ children, repository = demoOrderRepository }: PropsWithChildren<{ repository?: OrderRepository }>) {
  return <OrderRepositoryContext.Provider value={repository}>{children}</OrderRepositoryContext.Provider>;
}

export function useOrderRepository(): OrderRepository {
  return useContext(OrderRepositoryContext);
}
''',
    "modern/src/components/Shell.tsx": r'''import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../app/CartContext";

export function Shell() {
  const { summary } = useCart();
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Pint.ar inicio">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span><strong>PINT.AR</strong><small>ecommerce educativo · 2026</small></span>
        </NavLink>
        <nav aria-label="Navegación principal" className="site-nav">
          <NavLink to="/">Catálogo</NavLink>
          <NavLink to="/sobreNosotros">Historia</NavLink>
          <NavLink to="/carrito" aria-label={`Carrito, ${summary.itemCount} productos`}>
            Carrito <span className="cart-count">{summary.itemCount}</span>
          </NavLink>
        </nav>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer className="site-footer">
        <p>Reconstrucción educativa del proyecto React 2023. No es una tienda ni un medio de pago real.</p>
        <a href="https://github.com/Enzopinotti/Pint.ar_Ecommerce/tree/3224d89c0c512b3509cea25f1c49a119d371e338">Ver baseline 2023 en Git</a>
      </footer>
    </div>
  );
}
''',
    "modern/src/components/ProductCard.tsx": r'''import { Link } from "react-router-dom";
import type { Product } from "../domain/product";
import { formatMoney } from "../format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-art" aria-hidden="true"><span>{product.accent}</span></div>
      <div className="product-card-body">
        <p className="eyebrow">{product.primaryCategory} · {product.secondaryCategory}</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="product-card-meta">
          <strong>{formatMoney(product.price)}</strong>
          <span>{product.stock} unidades demo</span>
        </div>
        <Link className="button button-secondary" to={`/Item/${product.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
''',
    "modern/src/format.ts": r'''export const formatMoney = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
''',
    "modern/src/pages/CatalogPage.tsx": r'''import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { catalogRepository } from "../data/catalogRepository";
import { filterProducts, type Product } from "../domain/product";

export function CatalogPage() {
  const params = useParams<{ kind?: string; categoryId?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    catalogRepository.list().then(
      (items) => { if (active) { setProducts(items); setStatus("ready"); } },
      () => { if (active) setStatus("error"); },
    );
    return () => { active = false; };
  }, []);

  const secondary = params.kind ? params.categoryId : undefined;
  const primary = params.kind ?? params.categoryId;
  const visible = useMemo(
    () => filterProducts(products, {
      query,
      primary: primary === "Pintura" || primary === "Herramienta" ? primary : undefined,
      secondary,
    }),
    [products, query, primary, secondary],
  );

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">2023 → 2026 · React con criterio de producto</p>
          <h1>Pint.ar, reconstruido para probar comportamiento real.</h1>
          <p className="hero-copy">Catálogo, carrito y checkout demo con estado determinístico, sin fingir pagos, emails ni seguridad backend que este proyecto no tiene.</p>
        </div>
        <aside className="trust-card" aria-label="Límite del demo">
          <strong>Modo demo local</strong>
          <p>Los valores son fixtures educativos. Tus datos de checkout no salen del navegador.</p>
        </aside>
      </section>

      <section className="catalog-controls" aria-label="Filtros de catálogo">
        <label>
          Buscar productos
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Ej. látex, rodillo…" />
        </label>
        <div className="category-links" aria-label="Categorías">
          <Link to="/">Todo</Link>
          <Link to="/category/Pintura">Pinturas</Link>
          <Link to="/category/Herramienta">Herramientas</Link>
          <Link to="/category/Pintura/Látex">Látex</Link>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="section-heading"><div><p className="eyebrow">Catálogo demostrativo</p><h2 id="catalog-title">Productos</h2></div><span>{visible.length} resultados</span></div>
        {status === "loading" && <p role="status" className="state-card">Cargando catálogo local…</p>}
        {status === "error" && <p role="alert" className="state-card error">No pudimos cargar el catálogo demo.</p>}
        {status === "ready" && visible.length === 0 && <p className="state-card">No hay productos para este filtro.</p>}
        <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </>
  );
}
''',
    "modern/src/pages/ProductPage.tsx": r'''import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../app/CartContext";
import { catalogRepository } from "../data/catalogRepository";
import type { Product } from "../domain/product";
import { formatMoney } from "../format";

export function ProductPage() {
  const { itemId = "" } = useParams();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const { add, state } = useCart();

  useEffect(() => {
    let active = true;
    setProduct(undefined);
    catalogRepository.getById(itemId).then((item) => { if (active) setProduct(item); });
    return () => { active = false; };
  }, [itemId]);

  if (product === undefined) return <p role="status" className="state-card page-state">Cargando detalle…</p>;
  if (product === null) return <section className="state-card page-state"><h1>Producto no encontrado</h1><Link to="/">Volver al catálogo</Link></section>;

  const existing = state.lines.find((line) => line.product.id === product.id)?.quantity ?? 0;
  const remaining = product.stock - existing;

  return (
    <article className="detail-page">
      <Link to="/" className="back-link">← Volver al catálogo</Link>
      <div className="detail-layout">
        <div className="product-art product-art-large" aria-hidden="true"><span>{product.accent}</span></div>
        <div>
          <p className="eyebrow">{product.primaryCategory} · {product.secondaryCategory}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">{formatMoney(product.price)}</p>
          <p>{remaining} unidades demo disponibles para agregar.</p>
          {remaining > 0 ? (
            <div className="quantity-row">
              <label>Cantidad
                <input type="number" min="1" max={remaining} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
              </label>
              <button className="button" onClick={() => add(product, quantity)} disabled={!Number.isInteger(quantity) || quantity < 1 || quantity > remaining}>Agregar al carrito</button>
            </div>
          ) : <p role="status" className="inline-status">Ya agregaste todo el stock demo disponible.</p>}
        </div>
      </div>
    </article>
  );
}
''',
    "modern/src/pages/CartPage.tsx": r'''import { Link } from "react-router-dom";
import { useCart } from "../app/CartContext";
import { formatMoney } from "../format";

export function CartPage() {
  const { state, summary, setQuantity, remove, clear } = useCart();
  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Carrito local</p><h1>Tu selección</h1></div><span>{summary.itemCount} productos</span></div>
      {state.lines.length === 0 ? (
        <div className="state-card"><h2>El carrito está vacío</h2><p>Elegí productos del catálogo demo para probar el flujo.</p><Link className="button" to="/">Ir al catálogo</Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {state.lines.map((line) => (
              <article className="cart-line" key={line.product.id}>
                <div className="mini-art" aria-hidden="true">{line.product.accent}</div>
                <div className="cart-line-info"><h2>{line.product.name}</h2><p>{formatMoney(line.product.price)} por unidad</p></div>
                <label>Cantidad
                  <input type="number" min="1" max={line.product.stock} value={line.quantity} onChange={(event) => setQuantity(line.product.id, Number(event.target.value))} />
                </label>
                <strong>{formatMoney(line.product.price * line.quantity)}</strong>
                <button className="text-button danger" onClick={() => remove(line.product.id)}>Eliminar</button>
              </article>
            ))}
            <button className="text-button danger" onClick={clear}>Vaciar carrito</button>
          </div>
          <aside className="order-summary">
            <p className="eyebrow">Resumen</p><h2>{formatMoney(summary.total)}</h2>
            <p>{summary.itemCount} unidades en {summary.distinctLines} líneas.</p>
            <Link className="button" to="/checkout">Continuar al checkout demo</Link>
            <Link className="button button-secondary" to="/">Seguir comprando</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
''',
    "modern/src/pages/CheckoutPage.tsx": r'''import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../app/CartContext";
import { useOrderRepository } from "../app/OrderRepositoryContext";
import { buildOrderDraft, validateCustomer, type CustomerErrors, type CustomerInput } from "../domain/checkout";
import { formatMoney } from "../format";

const EMPTY_CUSTOMER: CustomerInput = { firstName: "", lastName: "", phone: "", email: "" };

export function CheckoutPage() {
  const { state, summary, clear } = useCart();
  const repository = useOrderRepository();
  const navigate = useNavigate();
  const inFlightRef = useRef(false);
  const [customer, setCustomer] = useState<CustomerInput>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  if (state.lines.length === 0) {
    return <section className="state-card page-state"><h1>No hay una compra para finalizar</h1><p>El checkout demo necesita al menos un producto.</p><Link to="/">Volver al catálogo</Link></section>;
  }

  const update = (field: keyof CustomerInput, value: string) => setCustomer((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;
    const validation = validateCustomer(customer);
    if (!validation.ok) { setErrors(validation.errors); setStatus("idle"); return; }
    setErrors({});
    inFlightRef.current = true;
    setStatus("submitting");
    try {
      const draft = buildOrderDraft(validation.value, state);
      const result = await repository.submit(draft);
      clear();
      navigate("/brief", { replace: true, state: { id: result.id, firstName: validation.value.firstName, total: draft.total, itemCount: draft.itemCount } });
    } catch {
      setStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  }

  return (
    <section className="checkout-page page-section">
      <div><p className="eyebrow">Checkout educativo</p><h1>Finalizar demo</h1><p>Estos datos se usan sólo para construir la confirmación local de esta sesión. No se envían al Firebase histórico.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <Field id="firstName" label="Nombre" value={customer.firstName} error={errors.firstName} onChange={(value) => update("firstName", value)} autoComplete="given-name" />
          <Field id="lastName" label="Apellido" value={customer.lastName} error={errors.lastName} onChange={(value) => update("lastName", value)} autoComplete="family-name" />
          <Field id="phone" label="Teléfono" value={customer.phone} error={errors.phone} onChange={(value) => update("phone", value)} autoComplete="tel" inputMode="tel" />
          <Field id="email" label="Correo" type="email" value={customer.email} error={errors.email} onChange={(value) => update("email", value)} autoComplete="email" />
          {status === "error" && <p role="alert" className="form-alert">No pudimos registrar la orden demo. Tu carrito sigue intacto; podés intentar nuevamente.</p>}
          <button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Registrando demo…" : "Confirmar orden demo"}</button>
          <Link to="/carrito" className="back-link">Volver al carrito</Link>
        </form>
        <aside className="order-summary"><p className="eyebrow">Total demostrativo</p><h2>{formatMoney(summary.total)}</h2><p>{summary.itemCount} unidades.</p><p className="fine-print">No se procesa un pago real ni se promete un email posterior.</p></aside>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange(value: string): void;
  type?: string;
  autoComplete: string;
  inputMode?: "tel";
}

function Field({ id, label, value, error, onChange, type = "text", autoComplete, inputMode }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <label className="form-field" htmlFor={id}>{label}
      <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} autoComplete={autoComplete} inputMode={inputMode} />
      {error && <span id={errorId} className="field-error">{error}</span>}
    </label>
  );
}
''',
    "modern/src/pages/ConfirmationPage.tsx": r'''import { Link, useLocation } from "react-router-dom";
import { formatMoney } from "../format";

interface ConfirmationState { id: string; firstName: string; total: number; itemCount: number }

export function ConfirmationPage() {
  const { state } = useLocation();
  const confirmation = state as ConfirmationState | null;
  if (!confirmation?.id) {
    return <section className="state-card page-state"><h1>No hay una confirmación activa</h1><p>Las confirmaciones demo no se reconstruyen como si fueran órdenes reales.</p><Link to="/">Volver al catálogo</Link></section>;
  }
  return (
    <section className="confirmation page-section">
      <p className="eyebrow">Orden demo registrada localmente</p>
      <h1>Gracias, {confirmation.firstName}.</h1>
      <p>El flujo de demostración terminó correctamente. No se realizó un pago, no se reservó stock y no se enviará un email.</p>
      <dl className="confirmation-grid"><div><dt>ID demo</dt><dd>{confirmation.id}</dd></div><div><dt>Unidades</dt><dd>{confirmation.itemCount}</dd></div><div><dt>Total demo</dt><dd>{formatMoney(confirmation.total)}</dd></div></dl>
      <Link className="button" to="/">Volver al catálogo</Link>
    </section>
  );
}
''',
    "modern/src/pages/AboutPage.tsx": r'''export function AboutPage() {
  return (
    <section className="about-page page-section">
      <p className="eyebrow">Historia del proyecto</p>
      <h1>Una evolución visible, no una historia reescrita.</h1>
      <div className="story-grid">
        <article><span>2023</span><h2>Coderhouse + UTN FRLP</h2><p>El proyecto original practicó React, rutas, Context, Firebase/Firestore, carrito y órdenes desde el navegador. Sigue auditable en Git con sus decisiones y limitaciones reales.</p></article>
        <article><span>2026</span><h2>Reconstrucción mantenible</h2><p>La autoridad moderna conserva React porque el problema lo justifica, pero separa dominio, carrito y checkout; elimina claims falsos y usa datos demo determinísticos mientras la seguridad de Firebase no pueda verificarse.</p></article>
      </div>
      <p className="history-note">Los grandes fondos, GIFs y archivos históricos permanecen en Git para preservar el trabajo original; el bundle actual no los arrastra sólo por nostalgia.</p>
    </section>
  );
}
''',
    "modern/src/pages/NotFoundPage.tsx": r'''import { Link } from "react-router-dom";
export function NotFoundPage() { return <section className="state-card page-state"><h1>404 · Página no encontrada</h1><p>Esta ruta no forma parte del ecommerce demo.</p><Link to="/">Volver al catálogo</Link></section>; }
''',
    "modern/src/app/App.tsx": r'''import { Route, Routes } from "react-router-dom";
import { Shell } from "../components/Shell";
import { AboutPage } from "../pages/AboutPage";
import { CartPage } from "../pages/CartPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductPage } from "../pages/ProductPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/category/:categoryId" element={<CatalogPage />} />
        <Route path="/category/:kind/:categoryId" element={<CatalogPage />} />
        <Route path="/Item/:itemId" element={<ProductPage />} />
        <Route path="/item/:itemId" element={<ProductPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/brief" element={<ConfirmationPage />} />
        <Route path="/sobreNosotros" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
''',
    "modern/src/main.tsx": r'''import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/App";
import { CartProvider } from "./app/CartContext";
import { OrderRepositoryProvider } from "./app/OrderRepositoryContext";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró #root.");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <OrderRepositoryProvider>
        <CartProvider><AppRoutes /></CartProvider>
      </OrderRepositoryProvider>
    </BrowserRouter>
  </StrictMode>,
);
''',
    "modern/src/styles.css": r''':root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #172019;
  background: #f3f0e8;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  --ink: #172019;
  --muted: #617064;
  --paper: #fffdf8;
  --line: #d8d6ca;
  --green: #315d42;
  --green-dark: #1f4430;
  --lime: #dce9a9;
  --orange: #e9874a;
  --danger: #9b302c;
  --shadow: 0 18px 50px rgb(33 49 38 / 10%);
}
* { box-sizing: border-box; }
html { min-width: 320px; background: #f3f0e8; }
body { margin: 0; min-width: 320px; min-height: 100vh; }
a { color: inherit; }
button, input { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid #d8702f; outline-offset: 3px; }
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }
#main-content { flex: 1; width: min(1180px, calc(100% - 32px)); margin: 0 auto; }
.site-header { width: min(1180px, calc(100% - 32px)); margin: 0 auto; min-height: 86px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--line); }
.brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; min-width: 0; }
.brand-mark { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px 4px 12px 4px; background: var(--green); color: white; font-weight: 900; font-size: 1.25rem; }
.brand strong { display: block; letter-spacing: .08em; }
.brand small { display: block; color: var(--muted); margin-top: 2px; }
.site-nav { display: flex; align-items: center; gap: 20px; }
.site-nav a { text-decoration: none; font-weight: 700; color: var(--muted); }
.site-nav a.active { color: var(--green-dark); }
.cart-count { display: inline-grid; place-items: center; min-width: 25px; height: 25px; padding: 0 7px; border-radius: 99px; color: var(--green-dark); background: var(--lime); }
.hero { padding: 72px 0 46px; display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(280px, .7fr); gap: 48px; align-items: end; }
.eyebrow { color: var(--green); font-size: .78rem; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
h1 { max-width: 820px; margin: 8px 0 18px; font-size: clamp(2.4rem, 7vw, 5.7rem); line-height: .94; letter-spacing: -.055em; }
h2 { letter-spacing: -.025em; }
.hero-copy { max-width: 710px; font-size: clamp(1.05rem, 2vw, 1.35rem); line-height: 1.6; color: var(--muted); }
.trust-card, .order-summary { background: var(--green-dark); color: #f6f7e8; padding: 26px; border-radius: 26px; box-shadow: var(--shadow); }
.trust-card strong { font-size: 1.25rem; }
.trust-card p, .order-summary p { color: #d6dfd5; line-height: 1.5; }
.catalog-controls { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(0, 1.4fr); gap: 24px; padding: 24px; border: 1px solid var(--line); background: rgb(255 253 248 / 70%); border-radius: 24px; }
.catalog-controls label, .form-field, .quantity-row label, .cart-line label { display: grid; gap: 7px; font-weight: 750; }
input { min-width: 0; border: 1px solid #bfc8bd; border-radius: 12px; background: white; color: var(--ink); padding: 12px 13px; }
.category-links { display: flex; flex-wrap: wrap; align-items: end; gap: 8px; }
.category-links a { padding: 10px 13px; border-radius: 999px; background: #e8e5dc; text-decoration: none; font-weight: 750; }
.catalog, .page-section { padding: 42px 0 72px; }
.section-heading { display: flex; justify-content: space-between; gap: 20px; align-items: end; margin-bottom: 20px; }
.section-heading h1, .section-heading h2 { margin: 3px 0; font-size: clamp(2rem, 4vw, 3.1rem); }
.section-heading > span { color: var(--muted); }
.product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.product-card { min-width: 0; overflow: hidden; background: var(--paper); border: 1px solid var(--line); border-radius: 26px; box-shadow: 0 8px 24px rgb(33 49 38 / 6%); }
.product-art { min-height: 180px; display: grid; place-items: center; background: radial-gradient(circle at 28% 24%, #f4f0c4, transparent 34%), linear-gradient(135deg, #d7e1bd, #8fb39a); color: var(--green-dark); }
.product-art span { display: grid; place-items: center; width: 88px; height: 88px; border: 2px solid rgb(31 68 48 / 30%); border-radius: 50%; font-weight: 950; font-size: 1.6rem; background: rgb(255 255 255 / 35%); backdrop-filter: blur(8px); }
.product-card-body { padding: 22px; }
.product-card-body h2 { margin: 6px 0 10px; }
.product-card-body > p:not(.eyebrow) { min-height: 3.2em; color: var(--muted); line-height: 1.55; }
.product-card-meta { display: flex; justify-content: space-between; gap: 12px; align-items: center; margin: 20px 0; }
.product-card-meta span { font-size: .85rem; color: var(--muted); }
.button { display: inline-flex; justify-content: center; align-items: center; border: 0; border-radius: 12px; background: var(--green); color: white; padding: 12px 16px; text-decoration: none; font-weight: 850; cursor: pointer; }
.button:hover { background: var(--green-dark); }
.button:disabled { opacity: .5; cursor: not-allowed; }
.button-secondary { background: #e8e5dc; color: var(--ink); }
.button-secondary:hover { background: #d9d5ca; }
.state-card { padding: 28px; border: 1px dashed #aeb9ad; border-radius: 20px; background: var(--paper); }
.state-card.error, .form-alert, .field-error { color: var(--danger); }
.page-state { margin: 72px auto; max-width: 740px; }
.page-state h1 { font-size: clamp(2rem, 7vw, 4rem); }
.detail-page { padding: 36px 0 80px; }
.back-link { display: inline-block; margin-bottom: 28px; color: var(--green-dark); font-weight: 750; }
.detail-layout { display: grid; grid-template-columns: minmax(280px, 1fr) minmax(0, 1.1fr); gap: 56px; align-items: center; }
.product-art-large { min-height: 500px; border-radius: 32px; }
.detail-layout h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
.detail-description { color: var(--muted); font-size: 1.15rem; line-height: 1.65; }
.detail-price { font-size: 2rem; font-weight: 900; }
.quantity-row { display: flex; gap: 12px; align-items: end; margin-top: 26px; }
.quantity-row input { width: 110px; }
.inline-status { color: var(--green-dark); font-weight: 750; }
.cart-layout, .checkout-layout { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(280px, .65fr); gap: 28px; align-items: start; }
.cart-lines { display: grid; gap: 12px; }
.cart-line { display: grid; grid-template-columns: auto minmax(0, 1fr) 110px auto auto; gap: 18px; align-items: center; padding: 16px; border: 1px solid var(--line); border-radius: 18px; background: var(--paper); }
.mini-art { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 14px; background: var(--lime); font-weight: 900; }
.cart-line h2 { margin: 0; font-size: 1.05rem; }
.cart-line p { margin: 4px 0 0; color: var(--muted); }
.cart-line input { width: 90px; }
.text-button { border: 0; padding: 8px; background: transparent; text-decoration: underline; cursor: pointer; font-weight: 700; }
.danger { color: var(--danger); }
.order-summary { display: grid; gap: 12px; position: sticky; top: 16px; }
.order-summary h2 { margin: 0; font-size: 2.2rem; }
.order-summary .button-secondary { color: var(--ink); }
.checkout-page > div:first-child { max-width: 740px; margin-bottom: 30px; }
.checkout-page h1, .about-page h1, .confirmation h1 { font-size: clamp(2.5rem, 7vw, 5.4rem); }
.checkout-form { display: grid; gap: 18px; padding: 26px; background: var(--paper); border: 1px solid var(--line); border-radius: 24px; }
.field-error { font-size: .86rem; }
.form-alert { padding: 14px; background: #fff0ed; border-radius: 12px; }
.fine-print { font-size: .9rem; }
.confirmation { max-width: 900px; }
.confirmation > p:not(.eyebrow) { font-size: 1.15rem; color: var(--muted); line-height: 1.6; }
.confirmation-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin: 30px 0; }
.confirmation-grid div { padding: 18px; border-radius: 16px; background: var(--paper); border: 1px solid var(--line); }
.confirmation-grid dt { color: var(--muted); font-size: .85rem; }
.confirmation-grid dd { margin: 6px 0 0; font-weight: 900; overflow-wrap: anywhere; }
.story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.story-grid article { background: var(--paper); border: 1px solid var(--line); border-radius: 24px; padding: 28px; }
.story-grid article > span { display: inline-block; color: var(--green); font-weight: 950; font-size: 1.4rem; }
.story-grid p, .history-note { color: var(--muted); line-height: 1.7; }
.history-note { max-width: 800px; margin-top: 28px; }
.site-footer { margin-top: auto; padding: 34px max(16px, calc((100vw - 1180px) / 2)); display: flex; justify-content: space-between; gap: 24px; border-top: 1px solid var(--line); color: var(--muted); font-size: .9rem; }
.site-footer p { margin: 0; }
.site-footer a { font-weight: 750; }
@media (max-width: 900px) {
  .hero, .detail-layout, .cart-layout, .checkout-layout { grid-template-columns: minmax(0, 1fr); }
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .order-summary { position: static; }
  .cart-line { grid-template-columns: auto minmax(0, 1fr) 100px; }
  .cart-line > strong, .cart-line > button { grid-column: 2 / -1; }
  .product-art-large { min-height: 340px; }
}
@media (max-width: 620px) {
  #main-content, .site-header { width: min(100% - 22px, 1180px); }
  .site-header { align-items: flex-start; padding: 16px 0; flex-direction: column; }
  .site-nav { width: 100%; gap: 12px; justify-content: space-between; }
  .brand small { font-size: .72rem; }
  .hero { padding-top: 44px; gap: 24px; }
  h1 { font-size: clamp(2.45rem, 14vw, 4rem); overflow-wrap: anywhere; }
  .catalog-controls { grid-template-columns: minmax(0, 1fr); padding: 16px; }
  .product-grid, .story-grid, .confirmation-grid { grid-template-columns: minmax(0, 1fr); }
  .section-heading { align-items: flex-start; flex-direction: column; }
  .cart-line { grid-template-columns: auto minmax(0, 1fr); }
  .cart-line label, .cart-line > strong, .cart-line > button { grid-column: 2; }
  .quantity-row { align-items: stretch; flex-direction: column; }
  .quantity-row input { width: 100%; }
  .site-footer { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }
''',
    "modern/src/test/setup.ts": r'''import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
});
''',
    "modern/src/domain/product.test.ts": r'''import { describe, expect, it } from "vitest";
import { filterProducts, parseCatalog, parseProduct } from "./product";
import { demoProducts } from "../data/demoProducts";

describe("product domain", () => {
  it("parses a valid product and rejects invalid stock/category", () => {
    expect(parseProduct(demoProducts[0])).toEqual(demoProducts[0]);
    expect(() => parseProduct({ ...demoProducts[0], stock: 1.5 })).toThrow(/stock/);
    expect(() => parseProduct({ ...demoProducts[0], primaryCategory: "Otro" })).toThrow(/primaryCategory/);
  });

  it("rejects duplicate ids in a catalogue", () => {
    expect(() => parseCatalog([demoProducts[0], demoProducts[0]])).toThrow(/duplicado/);
  });

  it("filters accents, text and categories deterministically", () => {
    expect(filterProducts(demoProducts, { query: "latex" })).toHaveLength(2);
    expect(filterProducts(demoProducts, { primary: "Herramienta" })).toHaveLength(3);
    expect(filterProducts(demoProducts, { secondary: "Látex", query: "COLOR" }).map((p) => p.id)).toEqual(["latex-interior-color"]);
  });
});
''',
    "modern/src/domain/cart.test.ts": r'''import { describe, expect, it } from "vitest";
import { demoProducts } from "../data/demoProducts";
import { cartReducer, deriveCartSummary, EMPTY_CART } from "./cart";

const product = demoProducts[0]!;

describe("cart domain", () => {
  it("adds immutable lines and combines an existing product", () => {
    const first = cartReducer(EMPTY_CART, { type: "add", product, quantity: 2 });
    const second = cartReducer(first, { type: "add", product, quantity: 3 });
    expect(first.lines[0]?.quantity).toBe(2);
    expect(second.lines).toHaveLength(1);
    expect(second.lines[0]?.quantity).toBe(5);
    expect(product).not.toHaveProperty("quantity");
  });

  it("refuses invalid quantities and stock overflow", () => {
    const state = cartReducer(EMPTY_CART, { type: "add", product, quantity: product.stock });
    expect(cartReducer(state, { type: "add", product, quantity: 1 })).toBe(state);
    expect(cartReducer(state, { type: "setQuantity", productId: product.id, quantity: 0 }).lines[0]?.quantity).toBe(product.stock);
  });

  it("derives count and monetary total instead of storing them independently", () => {
    let state = cartReducer(EMPTY_CART, { type: "add", product: demoProducts[0]!, quantity: 2 });
    state = cartReducer(state, { type: "add", product: demoProducts[3]!, quantity: 1 });
    expect(deriveCartSummary(state)).toEqual({ distinctLines: 2, itemCount: 3, total: demoProducts[0]!.price * 2 + demoProducts[3]!.price });
  });

  it("removes and clears lines", () => {
    const state = cartReducer(EMPTY_CART, { type: "add", product, quantity: 1 });
    expect(cartReducer(state, { type: "remove", productId: product.id })).toEqual(EMPTY_CART);
    expect(cartReducer(state, { type: "clear" })).toEqual(EMPTY_CART);
  });
});
''',
    "modern/src/domain/checkout.test.ts": r'''import { describe, expect, it } from "vitest";
import { demoProducts } from "../data/demoProducts";
import { cartReducer, EMPTY_CART } from "./cart";
import { buildOrderDraft, validateCustomer } from "./checkout";

const validCustomer = { firstName: "Ada", lastName: "Lovelace", phone: "+54 221 555 1212", email: "ADA@example.com" };

describe("checkout domain", () => {
  it("normalizes and validates customer input", () => {
    expect(validateCustomer(validCustomer)).toEqual({ ok: true, value: { ...validCustomer, email: "ada@example.com" } });
    const invalid = validateCustomer({ firstName: "A", lastName: "", phone: "x", email: "wrong" });
    expect(invalid.ok).toBe(false);
    if (!invalid.ok) expect(Object.keys(invalid.errors)).toEqual(["firstName", "lastName", "phone", "email"]);
  });

  it("builds totals from canonical cart lines", () => {
    const cart = cartReducer(EMPTY_CART, { type: "add", product: demoProducts[0]!, quantity: 2 });
    const validation = validateCustomer(validCustomer);
    if (!validation.ok) throw new Error("fixture inválido");
    const order = buildOrderDraft(validation.value, cart, new Date("2026-09-15T12:00:00Z"));
    expect(order.total).toBe(demoProducts[0]!.price * 2);
    expect(order.itemCount).toBe(2);
    expect(order.lines[0]?.subtotal).toBe(demoProducts[0]!.price * 2);
    expect(order.createdAt).toBe("2026-09-15T12:00:00.000Z");
  });

  it("rejects empty-cart orders", () => {
    expect(() => buildOrderDraft(validCustomer, EMPTY_CART)).toThrow(/vacío/);
  });
});
''',
    "modern/src/domain/cartStorage.test.ts": r'''import { describe, expect, it } from "vitest";
import { demoProducts } from "../data/demoProducts";
import { cartReducer, EMPTY_CART } from "./cart";
import { CART_STORAGE_KEY, loadCartState, saveCartState } from "./cartStorage";

describe("cart session storage", () => {
  it("round-trips a valid versioned cart", () => {
    const state = cartReducer(EMPTY_CART, { type: "add", product: demoProducts[1]!, quantity: 2 });
    saveCartState(sessionStorage, state);
    expect(loadCartState(sessionStorage)).toEqual(state);
  });

  it("fails closed on corrupt or incompatible data", () => {
    sessionStorage.setItem(CART_STORAGE_KEY, "broken-json");
    expect(loadCartState(sessionStorage)).toEqual(EMPTY_CART);
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 99, lines: [] }));
    expect(loadCartState(sessionStorage)).toEqual(EMPTY_CART);
  });
});
''',
    "modern/src/pages/CheckoutPage.test.tsx": r'''import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { CartProvider } from "../app/CartContext";
import { OrderRepositoryProvider } from "../app/OrderRepositoryContext";
import type { OrderRepository } from "../data/orderRepository";
import { demoProducts } from "../data/demoProducts";
import { CART_STORAGE_KEY } from "../domain/cartStorage";
import { CheckoutPage } from "./CheckoutPage";
import { ConfirmationPage } from "./ConfirmationPage";

function seedCart() {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [{ product: demoProducts[0], quantity: 2 }] }));
}

function renderCheckout(repository: OrderRepository) {
  return render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <OrderRepositoryProvider repository={repository}>
        <CartProvider>
          <Routes>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/brief" element={<ConfirmationPage />} />
          </Routes>
        </CartProvider>
      </OrderRepositoryProvider>
    </MemoryRouter>,
  );
}

async function fillValidCustomer() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Nombre"), "Ada");
  await user.type(screen.getByLabelText("Apellido"), "Lovelace");
  await user.type(screen.getByLabelText("Teléfono"), "+54 221 555 1212");
  await user.type(screen.getByLabelText("Correo"), "ada@example.com");
  return user;
}

describe("checkout UI contract", () => {
  it("guards duplicate submits synchronously and clears only after success", async () => {
    seedCart();
    let resolveOrder: ((value: { id: string }) => void) | undefined;
    const submit = vi.fn(() => new Promise<{ id: string }>((resolve) => { resolveOrder = resolve; }));
    renderCheckout({ submit });
    const user = await fillValidCustomer();
    const button = screen.getByRole("button", { name: "Confirmar orden demo" });
    await user.click(button);
    fireEvent.submit(button.closest("form")!);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/2 unidades/)).toBeInTheDocument();
    resolveOrder?.({ id: "DEMO-TEST" });
    expect(await screen.findByText(/Gracias, Ada/)).toBeInTheDocument();
    expect(screen.getByText("DEMO-TEST")).toBeInTheDocument();
    expect(screen.getByText(/no se enviará un email/i)).toBeInTheDocument();
  });

  it("keeps the cart recoverable when persistence fails", async () => {
    seedCart();
    const submit = vi.fn().mockRejectedValue(new Error("offline"));
    renderCheckout({ submit });
    const user = await fillValidCustomer();
    await user.click(screen.getByRole("button", { name: "Confirmar orden demo" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/carrito sigue intacto/i);
    expect(screen.getByText(/2 unidades/)).toBeInTheDocument();
    expect(JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) ?? "{}").lines).toHaveLength(1);
  });
});
''',
    "modern/src/app/App.test.tsx": r'''import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./App";
import { CartProvider } from "./CartContext";
import { OrderRepositoryProvider } from "./OrderRepositoryContext";

function renderRoute(route: string) {
  render(<MemoryRouter initialEntries={[route]}><OrderRepositoryProvider><CartProvider><AppRoutes /></CartProvider></OrderRepositoryProvider></MemoryRouter>);
}

describe("routing and truth boundaries", () => {
  it("renders the deterministic catalogue without a remote backend", async () => {
    renderRoute("/");
    expect(await screen.findByText("Látex interior blanco")).toBeInTheDocument();
    expect(screen.getByText(/Modo demo local/i)).toBeInTheDocument();
  });

  it("keeps the historical About route and explains both eras", () => {
    renderRoute("/sobreNosotros");
    expect(screen.getByText("Coderhouse + UTN FRLP")).toBeInTheDocument();
    expect(screen.getByText("Reconstrucción mantenible")).toBeInTheDocument();
  });

  it("renders an explicit 404", () => {
    renderRoute("/ruta-inexistente");
    expect(screen.getByRole("heading", { name: /404/ })).toBeInTheDocument();
  });
});
''',
    ".github/workflows/modern-quality.yml": r'''name: Modern Pint.ar quality

on:
  pull_request:
    paths:
      - "modern/**"
      - "docs/**"
      - ".nvmrc"
      - ".github/workflows/modern-quality.yml"
  push:
    branches: [main]
    paths:
      - "modern/**"
      - "docs/**"
      - ".nvmrc"
      - ".github/workflows/modern-quality.yml"

permissions:
  contents: read

jobs:
  quality:
    runs-on: ubuntu-24.04
    timeout-minutes: 12
    defaults:
      run:
        working-directory: modern
    steps:
      - name: Check out repository
        uses: actions/checkout@fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09 # v5
      - name: Set up pnpm
        uses: pnpm/action-setup@0977fd99725f1db4007ccb2928dbb4e90d06cc86 # v6
        with:
          version: 11.26.0
          run_install: false
      - name: Set up Node.js
        uses: actions/setup-node@a0853c24544627f65ddf259abe73b1d18a591444 # v5
        with:
          node-version-file: .nvmrc
          cache: pnpm
          cache-dependency-path: modern/pnpm-lock.yaml
      - name: Install locked dependencies
        run: pnpm install --frozen-lockfile
      - name: Run maintained quality contract
        run: pnpm check
''',
}

for relative, content in FILES.items():
    path = Path(relative)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")

print(f"wrote {len(FILES)} maintained files")
