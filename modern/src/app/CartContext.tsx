import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import {
  cartReducer,
  deriveCartSummary,
  EMPTY_CART,
  type CartState,
} from "../domain/cart";
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
      setQuantity: (productId, quantity) =>
        dispatch({ type: "setQuantity", productId, quantity }),
      remove: (productId) => dispatch({ type: "remove", productId }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state, summary],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value)
    throw new Error("useCart debe ejecutarse dentro de CartProvider.");
  return value;
}
