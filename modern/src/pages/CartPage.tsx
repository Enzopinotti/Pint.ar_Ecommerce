import { Link } from "react-router-dom";
import { useCart } from "../app/CartContext";
import { formatMoney } from "../format";

export function CartPage() {
  const { state, summary, setQuantity, remove, clear } = useCart();
  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Carrito local</p><h1>Tu selección</h1></div><span>{summary.itemCount} productos</span></div>
      {state.lines.length === 0 ? (
        <div className="state-card"><h2>El carrito está vacío</h2><p>Elegí productos del catálogo demo para probar el flujo.</p><Link className="button" to="/">Ir al catálogo</Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-lines">
            {state.lines.map((line) => (
              <article className="cart-line" key={line.product.id}>
                <div className="mini-art" aria-hidden="true">{line.product.accent}</div>
                <div className="cart-line-info"><h2>{line.product.name}</h2><p>{formatMoney(line.product.price)} por unidad</p></div>
                <label>Cantidad
                  <input type="number" min="1" max={line.product.stock} value={line.quantity} onChange={(event) => setQuantity(line.product.id, Number(event.target.value))} />
                </label>
                <strong>{formatMoney(line.product.price * line.quantity)}</strong>
                <button className="text-button danger" onClick={() => remove(line.product.id)}>Eliminar</button>
              </article>
            ))}
            <button className="text-button danger" onClick={clear}>Vaciar carrito</button>
          </div>
          <aside className="order-summary">
            <p className="eyebrow">Resumen</p><h2>{formatMoney(summary.total)}</h2>
            <p>{summary.itemCount} unidades en {summary.distinctLines} líneas.</p>
            <Link className="button" to="/checkout">Continuar al checkout demo</Link>
            <Link className="button button-secondary" to="/">Seguir comprando</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
