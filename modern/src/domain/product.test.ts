import { describe, expect, it } from "vitest";
import { demoProducts } from "../data/demoProducts";
import {
  filterProducts,
  parseCatalog,
  parseProduct,
  selectProducts,
  sortProducts,
} from "./product";

const firstProduct = demoProducts[0];
if (!firstProduct) {
  throw new Error(
    "El catálogo demo necesita al menos un producto para los tests.",
  );
}

describe("product domain", () => {
  it("parses a valid product and rejects invalid stock/category", () => {
    expect(parseProduct(firstProduct)).toEqual(firstProduct);
    expect(() => parseProduct({ ...firstProduct, stock: 1.5 })).toThrow(
      /stock/,
    );
    expect(() =>
      parseProduct({ ...firstProduct, primaryCategory: "Otro" }),
    ).toThrow(/primaryCategory/);
  });

  it("rejects duplicate ids in a catalogue", () => {
    expect(() => parseCatalog([firstProduct, firstProduct])).toThrow(
      /duplicado/,
    );
  });

  it("filters accents, text and categories deterministically", () => {
    expect(filterProducts(demoProducts, { query: "latex" })).toHaveLength(2);
    expect(
      filterProducts(demoProducts, { primary: "Herramienta" }),
    ).toHaveLength(3);
    expect(
      filterProducts(demoProducts, { secondary: "Látex", query: "COLOR" }).map(
        (product) => product.id,
      ),
    ).toEqual(["latex-interior-color"]);
  });

  it("can hide products without demo stock without mutating the catalogue", () => {
    const catalogue = [
      ...demoProducts,
      { ...firstProduct, id: "sin-stock", stock: 0 },
    ];
    const original = structuredClone(catalogue);

    expect(filterProducts(catalogue, { inStockOnly: true })).toHaveLength(
      demoProducts.length,
    );
    expect(catalogue).toEqual(original);
  });

  it("sorts price, name and stock deterministically", () => {
    expect(sortProducts(demoProducts, "price-asc")[0]?.price).toBe(
      Math.min(...demoProducts.map((product) => product.price)),
    );
    expect(sortProducts(demoProducts, "price-desc")[0]?.price).toBe(
      Math.max(...demoProducts.map((product) => product.price)),
    );
    expect(
      sortProducts(demoProducts, "name-asc").map((product) => product.name),
    ).toEqual(
      [...demoProducts]
        .sort((a, b) =>
          a.name.localeCompare(b.name, "es-AR", { sensitivity: "base" }),
        )
        .map((product) => product.name),
    );
    expect(sortProducts(demoProducts, "stock-desc")[0]?.stock).toBe(
      Math.max(...demoProducts.map((product) => product.stock)),
    );
  });

  it("selects with combined search, category, stock and sort filters", () => {
    const selected = selectProducts(demoProducts, {
      query: "pintura",
      primary: "Pintura",
      inStockOnly: true,
      sort: "price-desc",
    });

    expect(selected.length).toBeGreaterThan(0);
    expect(
      selected.every((product) => product.primaryCategory === "Pintura"),
    ).toBe(true);
    expect(selected.every((product) => product.stock > 0)).toBe(true);
    expect(selected.map((product) => product.price)).toEqual(
      [...selected.map((product) => product.price)].sort((a, b) => b - a),
    );
  });
});
