import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { CartProvider } from "../app/CartContext";
import { OrderRepositoryProvider } from "../app/OrderRepositoryContext";
import type { OrderRepository } from "../data/orderRepository";
import { demoProducts } from "../data/demoProducts";
import { CART_STORAGE_KEY } from "../domain/cartStorage";
import { CheckoutPage } from "./CheckoutPage";
import { ConfirmationPage } from "./ConfirmationPage";

function seedCart() {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [{ product: demoProducts[0], quantity: 2 }] }));
}

function renderCheckout(repository: OrderRepository) {
  return render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <OrderRepositoryProvider repository={repository}>
        <CartProvider>
          <Routes>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/brief" element={<ConfirmationPage />} />
          </Routes>
        </CartProvider>
      </OrderRepositoryProvider>
    </MemoryRouter>,
  );
}

async function fillValidCustomer() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Nombre"), "Ada");
  await user.type(screen.getByLabelText("Apellido"), "Lovelace");
  await user.type(screen.getByLabelText("Teléfono"), "+54 221 555 1212");
  await user.type(screen.getByLabelText("Correo"), "ada@example.com");
  return user;
}

describe("checkout UI contract", () => {
  it("guards duplicate submits synchronously and clears only after success", async () => {
    seedCart();
    let resolveOrder: ((value: { id: string }) => void) | undefined;
    const submit = vi.fn(() => new Promise<{ id: string }>((resolve) => { resolveOrder = resolve; }));
    renderCheckout({ submit });
    const user = await fillValidCustomer();
    const button = screen.getByRole("button", { name: "Confirmar orden demo" });
    await user.click(button);
    fireEvent.submit(button.closest("form")!);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/2 unidades/)).toBeInTheDocument();
    resolveOrder?.({ id: "DEMO-TEST" });
    expect(await screen.findByText(/Gracias, Ada/)).toBeInTheDocument();
    expect(screen.getByText("DEMO-TEST")).toBeInTheDocument();
    expect(screen.getByText(/no se enviará un email/i)).toBeInTheDocument();
  });

  it("keeps the cart recoverable when persistence fails", async () => {
    seedCart();
    const submit = vi.fn().mockRejectedValue(new Error("offline"));
    renderCheckout({ submit });
    const user = await fillValidCustomer();
    await user.click(screen.getByRole("button", { name: "Confirmar orden demo" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/carrito sigue intacto/i);
    expect(screen.getByText(/2 unidades/)).toBeInTheDocument();
    expect(JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) ?? "{}").lines).toHaveLength(1);
  });
});
