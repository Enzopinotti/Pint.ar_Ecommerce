import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../app/CartContext";
import { catalogRepository } from "../data/catalogRepository";
import type { Product } from "../domain/product";
import { formatMoney } from "../format";

export function ProductPage() {
  const { itemId = "" } = useParams();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const { add, state } = useCart();

  useEffect(() => {
    let active = true;
    setProduct(undefined);
    catalogRepository.getById(itemId).then((item) => {
      if (active) setProduct(item);
    });
    return () => {
      active = false;
    };
  }, [itemId]);

  if (product === undefined)
    return (
      <p role="status" className="state-card page-state">
        Cargando detalle…
      </p>
    );
  if (product === null)
    return (
      <section className="state-card page-state">
        <h1>Producto no encontrado</h1>
        <Link to="/">Volver al catálogo</Link>
      </section>
    );

  const existing =
    state.lines.find((line) => line.product.id === product.id)?.quantity ?? 0;
  const remaining = product.stock - existing;

  return (
    <article className="detail-page">
      <Link to="/" className="back-link">
        ← Volver al catálogo
      </Link>
      <div className="detail-layout">
        <div className="product-art product-art-large" aria-hidden="true">
          <span>{product.accent}</span>
        </div>
        <div>
          <p className="eyebrow">
            {product.primaryCategory} · {product.secondaryCategory}
          </p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">{formatMoney(product.price)}</p>
          <p>{remaining} unidades demo disponibles para agregar.</p>
          {remaining > 0 ? (
            <div className="quantity-row">
              <label>
                Cantidad
                <input
                  type="number"
                  min="1"
                  max={remaining}
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                />
              </label>
              <button
                className="button"
                onClick={() => add(product, quantity)}
                disabled={
                  !Number.isInteger(quantity) ||
                  quantity < 1 ||
                  quantity > remaining
                }
              >
                Agregar al carrito
              </button>
            </div>
          ) : (
            <p role="status" className="inline-status">
              Ya agregaste todo el stock demo disponible.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
