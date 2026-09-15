import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { catalogRepository } from "../data/catalogRepository";
import {
  selectProducts,
  type Product,
  type ProductSortMode,
} from "../domain/product";

const SORT_OPTIONS: Array<{ value: ProductSortMode; label: string }> = [
  { value: "featured", label: "Orden original" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre A–Z" },
  { value: "stock-desc", label: "Más stock demo" },
];

export function CatalogPage() {
  const params = useParams<{ kind?: string; categoryId?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<ProductSortMode>("featured");
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let active = true;
    catalogRepository.list().then(
      (items) => {
        if (active) {
          setProducts(items);
          setStatus("ready");
        }
      },
      () => {
        if (active) setStatus("error");
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const secondary = params.kind ? params.categoryId : undefined;
  const primary = params.kind ?? params.categoryId;
  const visible = useMemo(
    () =>
      selectProducts(products, {
        query,
        inStockOnly,
        sort,
        primary:
          primary === "Pintura" || primary === "Herramienta"
            ? primary
            : undefined,
        secondary,
      }),
    [products, query, inStockOnly, sort, primary, secondary],
  );

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">2023 → 2026 · storefront engineering</p>
          <h1>Pint.ar, un ecommerce educativo reconstruido con criterio.</h1>
          <p className="hero-copy">
            Catálogo, filtros, carrito y checkout demo con estado
            determinístico, sin fingir pagos, emails ni seguridad backend que
            este proyecto no tiene.
          </p>
        </div>
        <aside className="trust-card" aria-label="Límite del demo">
          <strong>Modo demo local</strong>
          <p>
            Productos, precios y stock son fixtures educativos 2026. Los datos
            de checkout no salen del navegador.
          </p>
        </aside>
      </section>

      <section
        className="catalog-controls storefront-controls"
        aria-label="Filtros de catálogo"
      >
        <label className="catalog-control catalog-search">
          Buscar productos
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Ej. látex, rodillo…"
          />
        </label>

        <label className="catalog-control">
          Ordenar
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as ProductSortMode)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="stock-toggle">
          <input
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
            type="checkbox"
          />
          Sólo con stock demo
        </label>

        <div className="category-links" aria-label="Categorías">
          <Link to="/">Todo</Link>
          <Link to="/category/Pintura">Pinturas</Link>
          <Link to="/category/Herramienta">Herramientas</Link>
          <Link to="/category/Pintura/Látex">Látex</Link>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catálogo demostrativo</p>
            <h2 id="catalog-title">Productos</h2>
          </div>
          <span aria-live="polite">{visible.length} resultados</span>
        </div>
        {status === "loading" && (
          <p role="status" className="state-card">
            Cargando catálogo local…
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="state-card error">
            No pudimos cargar el catálogo demo.
          </p>
        )}
        {status === "ready" && visible.length === 0 && (
          <div className="state-card">
            <p>No hay productos para esta combinación de filtros.</p>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => {
                setQuery("");
                setInStockOnly(false);
                setSort("featured");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
