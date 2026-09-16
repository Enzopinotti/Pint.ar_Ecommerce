import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/App";
import { CartProvider } from "./app/CartContext";
import { OrderRepositoryProvider } from "./app/OrderRepositoryContext";
import "./styles/main.scss";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró #root.");

const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === "/" ? undefined : baseUrl.replace(/\/$/, "");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <OrderRepositoryProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </OrderRepositoryProvider>
    </BrowserRouter>
  </StrictMode>,
);
