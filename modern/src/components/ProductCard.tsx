import { Link } from "react-router-dom";
import type { Product } from "../domain/product";
import { formatMoney } from "../format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-art" aria-hidden="true"><span>{product.accent}</span></div>
      <div className="product-card-body">
        <p className="eyebrow">{product.primaryCategory} · {product.secondaryCategory}</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="product-card-meta">
          <strong>{formatMoney(product.price)}</strong>
          <span>{product.stock} unidades demo</span>
        </div>
        <Link className="button button-secondary" to={`/Item/${product.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
