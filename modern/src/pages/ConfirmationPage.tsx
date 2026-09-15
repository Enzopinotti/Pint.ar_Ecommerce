import { Link, useLocation } from "react-router-dom";
import { formatMoney } from "../format";

interface ConfirmationState { id: string; firstName: string; total: number; itemCount: number }

export function ConfirmationPage() {
  const { state } = useLocation();
  const confirmation = state as ConfirmationState | null;
  if (!confirmation?.id) {
    return <section className="state-card page-state"><h1>No hay una confirmación activa</h1><p>Las confirmaciones demo no se reconstruyen como si fueran órdenes reales.</p><Link to="/">Volver al catálogo</Link></section>;
  }
  return (
    <section className="confirmation page-section">
      <p className="eyebrow">Orden demo registrada localmente</p>
      <h1>Gracias, {confirmation.firstName}.</h1>
      <p>El flujo de demostración terminó correctamente. No se realizó un pago, no se reservó stock y no se enviará un email.</p>
      <dl className="confirmation-grid"><div><dt>ID demo</dt><dd>{confirmation.id}</dd></div><div><dt>Unidades</dt><dd>{confirmation.itemCount}</dd></div><div><dt>Total demo</dt><dd>{formatMoney(confirmation.total)}</dd></div></dl>
      <Link className="button" to="/">Volver al catálogo</Link>
    </section>
  );
}
