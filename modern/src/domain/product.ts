export type ProductCategory = "Pintura" | "Herramienta";
export type ProductSortMode =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "stock-desc";

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

export interface ProductSelectionOptions {
  query?: string;
  primary?: string;
  secondary?: string;
  inStockOnly?: boolean;
  sort?: ProductSortMode;
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
    secondaryCategory: requiredString(
      raw.secondaryCategory,
      "secondaryCategory",
    ),
    accent: requiredString(raw.accent, "accent"),
  };
}

export function parseCatalog(input: unknown): Product[] {
  if (!Array.isArray(input)) {
    throw new TypeError("El catálogo debe ser una lista.");
  }
  const parsed = input.map(parseProduct);
  const ids = new Set<string>();
  for (const product of parsed) {
    if (ids.has(product.id)) {
      throw new TypeError(`ID de producto duplicado: ${product.id}`);
    }
    ids.add(product.id);
  }
  return parsed;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("es-AR");
}

export function filterProducts(
  products: readonly Product[],
  options: ProductSelectionOptions,
): Product[] {
  const query = normalize(options.query?.trim() ?? "");
  return products.filter((product) => {
    const primaryMatches =
      !options.primary || product.primaryCategory === options.primary;
    const secondaryMatches =
      !options.secondary || product.secondaryCategory === options.secondary;
    const stockMatches = !options.inStockOnly || product.stock > 0;
    const haystack = normalize(
      `${product.name} ${product.description} ${product.primaryCategory} ${product.secondaryCategory}`,
    );
    const queryMatches = query.length === 0 || haystack.includes(query);
    return primaryMatches && secondaryMatches && stockMatches && queryMatches;
  });
}

export function sortProducts(
  products: readonly Product[],
  mode: ProductSortMode = "featured",
): Product[] {
  const copy = [...products];
  if (mode === "featured") return copy;

  const byName = (a: Product, b: Product) =>
    a.name.localeCompare(b.name, "es-AR", { sensitivity: "base" });

  copy.sort((a, b) => {
    if (mode === "price-asc") return a.price - b.price || byName(a, b);
    if (mode === "price-desc") return b.price - a.price || byName(a, b);
    if (mode === "stock-desc") return b.stock - a.stock || byName(a, b);
    return byName(a, b);
  });
  return copy;
}

export function selectProducts(
  products: readonly Product[],
  options: ProductSelectionOptions,
): Product[] {
  return sortProducts(filterProducts(products, options), options.sort);
}
