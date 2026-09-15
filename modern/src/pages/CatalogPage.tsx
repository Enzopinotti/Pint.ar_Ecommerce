import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { catalogRepository } from "../data/catalogRepository";
import { filterProducts, type Product } from "../domain/product";

export function CatalogPage() {
  const params = useParams<{ kind?: string; categoryId?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    catalogRepository.list().then(
      (items) => { if (active) { setProducts(items); setStatus("ready"); } },
      () => { if (active) setStatus("error"); },
    );
    return () => { active = false; };
  }, []);

  const secondary = params.kind ? params.categoryId : undefined;
  const primary = params.kind ?? params.categoryId;
  const visible = useMemo(
    () => filterProducts(products, {
      query,
      primary: primary === "Pintura" || primary === "Herramienta" ? primary : undefined,
      secondary,
    }),
    [products, query, primary, secondary],
  );

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">2023 → 2026 · React con criterio de producto</p>
          <h1>Pint.ar, reconstruido para probar comportamiento real.</h1>
          <p className="hero-copy">Catálogo, carrito y checkout demo con estado determinístico, sin fingir pagos, emails ni seguridad backend que este proyecto no tiene.</p>
        </div>
        <aside className="trust-card" aria-label="Límite del demo">
          <strong>Modo demo local</strong>
          <p>Los valores son fixtures educativos. Tus datos de checkout no salen del navegador.</p>
        </aside>
      </section>

      <section className="catalog-controls" aria-label="Filtros de catálogo">
        <label>
          Buscar productos
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Ej. látex, rodillo…" />
        </label>
        <div className="category-links" aria-label="Categorías">
          <Link to="/">Todo</Link>
          <Link to="/category/Pintura">Pinturas</Link>
          <Link to="/category/Herramienta">Herramientas</Link>
          <Link to="/category/Pintura/Látex">Látex</Link>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="section-heading"><div><p className="eyebrow">Catálogo demostrativo</p><h2 id="catalog-title">Productos</h2></div><span>{visible.length} resultados</span></div>
        {status === "loading" && <p role="status" className="state-card">Cargando catálogo local…</p>}
        {status === "error" && <p role="alert" className="state-card error">No pudimos cargar el catálogo demo.</p>}
        {status === "ready" && visible.length === 0 && <p className="state-card">No hay productos para este filtro.</p>}
        <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </>
  );
}
