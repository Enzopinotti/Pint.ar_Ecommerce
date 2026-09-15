import { describe, expect, it } from "vitest";
import { filterProducts, parseCatalog, parseProduct } from "./product";
import { demoProducts } from "../data/demoProducts";

describe("product domain", () => {
  it("parses a valid product and rejects invalid stock/category", () => {
    expect(parseProduct(demoProducts[0])).toEqual(demoProducts[0]);
    expect(() => parseProduct({ ...demoProducts[0], stock: 1.5 })).toThrow(
      /stock/,
    );
    expect(() =>
      parseProduct({ ...demoProducts[0], primaryCategory: "Otro" }),
    ).toThrow(/primaryCategory/);
  });

  it("rejects duplicate ids in a catalogue", () => {
    expect(() => parseCatalog([demoProducts[0], demoProducts[0]])).toThrow(
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
        (p) => p.id,
      ),
    ).toEqual(["latex-interior-color"]);
  });
});
