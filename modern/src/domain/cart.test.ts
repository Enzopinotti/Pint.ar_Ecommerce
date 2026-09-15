import { describe, expect, it } from "vitest";
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
