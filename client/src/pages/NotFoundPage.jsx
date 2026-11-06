import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function NotFoundPage() {
  usePageMeta('Page non trouvée — Trouve ton artisan', 'La page demandée n’existe pas ou a été déplacée.');
  return (
    <main id="main-content" className="page-section not-found-page">
      <div className="container">
        <section className="not-found-card">
          <p className="not-found-card__number" aria-hidden="true">404</p>
          <div className="not-found-card__illustration"><img src="/images/not-found.svg" alt="Illustration d’une page introuvable" /></div>
          <h1>Page non trouvée</h1>
          <p>La page que vous avez demandée n'existe pas ou a été déplacée.</p>
          <Link className="btn btn-primary" to="/">Retour à l'accueil</Link>
        </section>
      </div>
    </main>
  );
}
