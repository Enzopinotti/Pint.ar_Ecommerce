import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../app/CartContext";

export function Shell() {
  const { summary } = useCart();
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Pint.ar inicio">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span><strong>PINT.AR</strong><small>ecommerce educativo · 2026</small></span>
        </NavLink>
        <nav aria-label="Navegación principal" className="site-nav">
          <NavLink to="/">Catálogo</NavLink>
          <NavLink to="/sobreNosotros">Historia</NavLink>
          <NavLink to="/carrito" aria-label={`Carrito, ${summary.itemCount} productos`}>
            Carrito <span className="cart-count">{summary.itemCount}</span>
          </NavLink>
        </nav>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer className="site-footer">
        <p>Reconstrucción educativa del proyecto React 2023. No es una tienda ni un medio de pago real.</p>
        <a href="https://github.com/Enzopinotti/Pint.ar_Ecommerce/tree/3224d89c0c512b3509cea25f1c49a119d371e338">Ver baseline 2023 en Git</a>
      </footer>
    </div>
  );
}
