import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function LegalPage({ title }) {
  usePageMeta(`${title} — Trouve ton artisan`, `${title} du site Trouve ton artisan en Auvergne-Rhône-Alpes.`);
  return (
    <main id="main-content" className="page-section legal-page">
      <div className="container">
        <nav className="breadcrumb-trail" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">{title}</span></nav>
        <section className="legal-card">
          <span className="legal-card__icon" aria-hidden="true">i</span>
          <p className="eyebrow">Informations du site</p>
          <h1>{title}</h1>
          <h2>Page en construction</h2>
          <p>Ce contenu sera fourni ultérieurement par un cabinet spécialisé.</p>
        </section>
      </div>
    </main>
  );
}
