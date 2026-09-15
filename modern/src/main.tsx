import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/App";
import { CartProvider } from "./app/CartContext";
import { OrderRepositoryProvider } from "./app/OrderRepositoryContext";
import "./styles/main.scss";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró #root.");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <OrderRepositoryProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </OrderRepositoryProvider>
    </BrowserRouter>
  </StrictMode>,
);
