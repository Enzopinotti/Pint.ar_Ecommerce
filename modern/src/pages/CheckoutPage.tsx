import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../app/CartContext";
import { useOrderRepository } from "../app/OrderRepositoryContext";
import { buildOrderDraft, validateCustomer, type CustomerErrors, type CustomerInput } from "../domain/checkout";
import { formatMoney } from "../format";

const EMPTY_CUSTOMER: CustomerInput = { firstName: "", lastName: "", phone: "", email: "" };

export function CheckoutPage() {
  const { state, summary, clear } = useCart();
  const repository = useOrderRepository();
  const navigate = useNavigate();
  const inFlightRef = useRef(false);
  const [customer, setCustomer] = useState<CustomerInput>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  if (state.lines.length === 0) {
    return <section className="state-card page-state"><h1>No hay una compra para finalizar</h1><p>El checkout demo necesita al menos un producto.</p><Link to="/">Volver al catálogo</Link></section>;
  }

  const update = (field: keyof CustomerInput, value: string) => setCustomer((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;
    const validation = validateCustomer(customer);
    if (!validation.ok) { setErrors(validation.errors); setStatus("idle"); return; }
    setErrors({});
    inFlightRef.current = true;
    setStatus("submitting");
    try {
      const draft = buildOrderDraft(validation.value, state);
      const result = await repository.submit(draft);
      clear();
      navigate("/brief", { replace: true, state: { id: result.id, firstName: validation.value.firstName, total: draft.total, itemCount: draft.itemCount } });
    } catch {
      setStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  }

  return (
    <section className="checkout-page page-section">
      <div><p className="eyebrow">Checkout educativo</p><h1>Finalizar demo</h1><p>Estos datos se usan sólo para construir la confirmación local de esta sesión. No se envían al Firebase histórico.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <Field id="firstName" label="Nombre" value={customer.firstName} error={errors.firstName} onChange={(value) => update("firstName", value)} autoComplete="given-name" />
          <Field id="lastName" label="Apellido" value={customer.lastName} error={errors.lastName} onChange={(value) => update("lastName", value)} autoComplete="family-name" />
          <Field id="phone" label="Teléfono" value={customer.phone} error={errors.phone} onChange={(value) => update("phone", value)} autoComplete="tel" inputMode="tel" />
          <Field id="email" label="Correo" type="email" value={customer.email} error={errors.email} onChange={(value) => update("email", value)} autoComplete="email" />
          {status === "error" && <p role="alert" className="form-alert">No pudimos registrar la orden demo. Tu carrito sigue intacto; podés intentar nuevamente.</p>}
          <button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Registrando demo…" : "Confirmar orden demo"}</button>
          <Link to="/carrito" className="back-link">Volver al carrito</Link>
        </form>
        <aside className="order-summary"><p className="eyebrow">Total demostrativo</p><h2>{formatMoney(summary.total)}</h2><p>{summary.itemCount} unidades.</p><p className="fine-print">No se procesa un pago real ni se promete un email posterior.</p></aside>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange(value: string): void;
  type?: string;
  autoComplete: string;
  inputMode?: "tel";
}

function Field({ id, label, value, error, onChange, type = "text", autoComplete, inputMode }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <label className="form-field" htmlFor={id}>{label}
      <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} autoComplete={autoComplete} inputMode={inputMode} />
      {error && <span id={errorId} className="field-error">{error}</span>}
    </label>
  );
}
