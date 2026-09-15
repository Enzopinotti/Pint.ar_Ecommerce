export function AboutPage() {
  return (
    <section className="about-page page-section">
      <p className="eyebrow">Historia del proyecto</p>
      <h1>Una evolución visible, no una historia reescrita.</h1>
      <div className="story-grid">
        <article>
          <span>2023</span>
          <h2>Coderhouse + UTN FRLP</h2>
          <p>
            El proyecto original practicó React, rutas, Context,
            Firebase/Firestore, carrito y órdenes desde el navegador. Sigue
            auditable en Git con sus decisiones y limitaciones reales.
          </p>
        </article>
        <article>
          <span>2026</span>
          <h2>Reconstrucción mantenible</h2>
          <p>
            La autoridad moderna conserva React porque el problema lo justifica,
            pero separa dominio, carrito y checkout; elimina claims falsos y usa
            datos demo determinísticos mientras la seguridad de Firebase no
            pueda verificarse.
          </p>
        </article>
      </div>
      <p className="history-note">
        Los grandes fondos, GIFs y archivos históricos permanecen en Git para
        preservar el trabajo original; el bundle actual no los arrastra sólo por
        nostalgia.
      </p>
    </section>
  );
}
