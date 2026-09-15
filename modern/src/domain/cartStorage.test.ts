import { describe, expect, it } from "vitest";
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
