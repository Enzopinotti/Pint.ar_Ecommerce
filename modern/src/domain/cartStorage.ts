import { EMPTY_CART, type CartState } from "./cart";
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
    if (payload.version !== 1 || !Array.isArray(payload.lines))
      return EMPTY_CART;
    const lines = payload.lines.map((line) => {
      const product = parseProduct(line.product);
      const quantity = line.quantity;
      if (
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > product.stock
      ) {
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
  storage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify({ version: 1, lines: state.lines } satisfies StoredCart),
  );
}
