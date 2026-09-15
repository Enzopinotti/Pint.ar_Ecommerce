import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./App";
import { CartProvider } from "./CartContext";
import { OrderRepositoryProvider } from "./OrderRepositoryContext";

function renderRoute(route: string) {
  render(<MemoryRouter initialEntries={[route]}><OrderRepositoryProvider><CartProvider><AppRoutes /></CartProvider></OrderRepositoryProvider></MemoryRouter>);
}

describe("routing and truth boundaries", () => {
  it("renders the deterministic catalogue without a remote backend", async () => {
    renderRoute("/");
    expect(await screen.findByText("Látex interior blanco")).toBeInTheDocument();
    expect(screen.getByText(/Modo demo local/i)).toBeInTheDocument();
  });

  it("keeps the historical About route and explains both eras", () => {
    renderRoute("/sobreNosotros");
    expect(screen.getByText("Coderhouse + UTN FRLP")).toBeInTheDocument();
    expect(screen.getByText("Reconstrucción mantenible")).toBeInTheDocument();
  });

  it("renders an explicit 404", () => {
    renderRoute("/ruta-inexistente");
    expect(screen.getByRole("heading", { name: /404/ })).toBeInTheDocument();
  });
});
