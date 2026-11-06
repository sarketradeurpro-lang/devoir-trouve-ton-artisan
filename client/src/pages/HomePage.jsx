import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard.jsx';
import { getFeaturedArtisans } from '../services/artisans.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

const steps = [
  "Choisir la catégorie d'artisanat dans le menu.",
  'Choisir un artisan.',
  'Le contacter via le formulaire de contact.',
  'Une réponse sera apportée sous 48h.',
];

export default function HomePage() {
  usePageMeta('Trouve ton artisan — Auvergne-Rhône-Alpes', 'Trouvez un artisan en Auvergne-Rhône-Alpes et contactez-le facilement.');
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getFeaturedArtisans({ signal: controller.signal })
      .then(setArtisans)
      .catch((error) => { if (error.name !== 'AbortError') setLoadError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  return (
    <main id="main-content">
      <section className="hero-section">
        <div className="container hero-section__inner">
          <div className="hero-copy">
            <p className="eyebrow">Auvergne-Rhône-Alpes · Antenne de Lyon</p>
            <h1>Des artisans de la région, à portée de clic</h1>
            <p>Trouvez un artisan en Auvergne-Rhône-Alpes et demandez-lui facilement renseignements, prestations ou tarifs.</p>
            <Link className="btn btn-primary hero-cta" to="/artisans">Découvrir les artisans <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="hero-art__sun" />
            <span className="hero-art__shape hero-art__shape--one" />
            <span className="hero-art__shape hero-art__shape--two" />
            <span className="hero-art__tool">⌁</span>
            <span className="hero-art__caption">Les talents d'ici</span>
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Simple comme bonjour</p>
            <h2>Comment trouver mon artisan ?</h2>
          </div>
          <ol className="steps-grid">
            {steps.map((step, index) => (
              <li className="step-card" key={step}>
                <span className="step-card__number">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-heading section-heading--row">
            <div><p className="eyebrow">À découvrir</p><h2>Les artisans du mois</h2></div>
            <Link className="text-link" to="/artisans">Voir tous les artisans <span aria-hidden="true">→</span></Link>
          </div>
          {loadError && <p className="api-message" role="status">Les artisans du mois sont momentanément indisponibles.</p>}
          {loading && <p className="api-message" role="status">Chargement des artisans du mois…</p>}
          <div className="artisan-grid artisan-grid--featured">
            {artisans.map((artisan) => <ArtisanCard artisan={artisan} key={artisan.id} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
