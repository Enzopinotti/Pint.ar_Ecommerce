import { describe, expect, it } from "vitest";
import { demoProducts } from "../data/demoProducts";
import { cartReducer, EMPTY_CART } from "./cart";
import { buildOrderDraft, validateCustomer } from "./checkout";

const validCustomer = {
  firstName: "Ada",
  lastName: "Lovelace",
  phone: "+54 221 555 1212",
  email: "ADA@example.com",
};

describe("checkout domain", () => {
  it("normalizes and validates customer input", () => {
    expect(validateCustomer(validCustomer)).toEqual({
      ok: true,
      value: { ...validCustomer, email: "ada@example.com" },
    });
    const invalid = validateCustomer({
      firstName: "A",
      lastName: "",
      phone: "x",
      email: "wrong",
    });
    expect(invalid.ok).toBe(false);
    if (!invalid.ok)
      expect(Object.keys(invalid.errors)).toEqual([
        "firstName",
        "lastName",
        "phone",
        "email",
      ]);
  });

  it("builds totals from canonical cart lines", () => {
    const cart = cartReducer(EMPTY_CART, {
      type: "add",
      product: demoProducts[0]!,
      quantity: 2,
    });
    const validation = validateCustomer(validCustomer);
    if (!validation.ok) throw new Error("fixture inválido");
    const order = buildOrderDraft(
      validation.value,
      cart,
      new Date("2026-09-15T12:00:00Z"),
    );
    expect(order.total).toBe(demoProducts[0]!.price * 2);
    expect(order.itemCount).toBe(2);
    expect(order.lines[0]?.subtotal).toBe(demoProducts[0]!.price * 2);
    expect(order.createdAt).toBe("2026-09-15T12:00:00.000Z");
  });

  it("rejects empty-cart orders", () => {
    expect(() => buildOrderDraft(validCustomer, EMPTY_CART)).toThrow(/vacío/);
  });
});
