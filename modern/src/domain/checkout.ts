import { deriveCartSummary, type CartState } from "./cart";

export interface CustomerInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export type CustomerErrors = Partial<Record<keyof CustomerInput, string>>;

export type CustomerValidation =
  { ok: true; value: CustomerInput } | { ok: false; errors: CustomerErrors };

export function validateCustomer(input: CustomerInput): CustomerValidation {
  const value: CustomerInput = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLocaleLowerCase("es-AR"),
  };
  const errors: CustomerErrors = {};
  if (value.firstName.length < 2)
    errors.firstName = "Ingresá al menos 2 caracteres.";
  if (value.lastName.length < 2)
    errors.lastName = "Ingresá al menos 2 caracteres.";
  if (!/^[0-9+()\-\s]{6,20}$/.test(value.phone))
    errors.phone = "Ingresá un teléfono válido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    errors.email = "Ingresá un correo válido.";
  return Object.keys(errors).length > 0
    ? { ok: false, errors }
    : { ok: true, value };
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

export function buildOrderDraft(
  customer: CustomerInput,
  cart: CartState,
  now = new Date(),
): OrderDraft {
  if (cart.lines.length === 0)
    throw new Error("No se puede crear una orden con el carrito vacío.");
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
