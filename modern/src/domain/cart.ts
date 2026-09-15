import type { Product } from "./product";

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
      const current = state.lines.find(
        (line) => line.product.id === action.product.id,
      );
      if (!current) {
        return {
          lines: [
            ...state.lines,
            { product: { ...action.product }, quantity: action.quantity },
          ],
        };
      }
      const nextQuantity = current.quantity + action.quantity;
      if (!validQuantity(nextQuantity, current.product.stock)) return state;
      return {
        lines: state.lines.map((line) =>
          line.product.id === action.product.id
            ? { ...line, quantity: nextQuantity }
            : line,
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
      return {
        lines: state.lines.filter(
          (line) => line.product.id !== action.productId,
        ),
      };
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
