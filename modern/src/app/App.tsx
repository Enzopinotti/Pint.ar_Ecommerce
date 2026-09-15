import { Route, Routes } from "react-router-dom";
import { Shell } from "../components/Shell";
import { AboutPage } from "../pages/AboutPage";
import { CartPage } from "../pages/CartPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductPage } from "../pages/ProductPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/category/:categoryId" element={<CatalogPage />} />
        <Route path="/category/:kind/:categoryId" element={<CatalogPage />} />
        <Route path="/Item/:itemId" element={<ProductPage />} />
        <Route path="/item/:itemId" element={<ProductPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/brief" element={<ConfirmationPage />} />
        <Route path="/sobreNosotros" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
