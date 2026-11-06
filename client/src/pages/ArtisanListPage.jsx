import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard.jsx';
import { getArtisans, getCategories } from '../services/artisans.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ArtisanListPage() {
  const [params] = useSearchParams();
  const category = params.get('categorie') || '';
  const query = params.get('q') || '';
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    getCategories({ signal: controller.signal }).then(setCategories).catch(() => setCategories([]));
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError(false);
    getArtisans({ categorie: category, query, signal: controller.signal })
      .then(setArtisans)
      .catch((error) => { if (error.name !== 'AbortError') setLoadError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [category, query]);
  const title = category || (query ? `Résultats pour « ${query} »` : 'Tous les artisans');
  usePageMeta(`${title} — Trouve ton artisan`, 'Parcourez les artisans et trouvez le professionnel adapté à votre besoin.');

  return (
    <main id="main-content" className="page-section">
      <div className="container">
        <nav className="breadcrumb-trail" aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">{title}</span>
        </nav>
        <div className="list-heading">
          <div><p className="eyebrow">Le bon savoir-faire près de chez vous</p><h1>{title}</h1>
            <p className="result-count">{artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}</p>
          </div>
          <div className="category-pills" aria-label="Filtrer par catégorie">
            <Link className={!category ? 'category-pill is-active' : 'category-pill'} to="/artisans">Tous</Link>
            {categories.map((item) => (
              <Link className={category === item.nom ? 'category-pill is-active' : 'category-pill'} key={item.id} to={`/artisans?categorie=${encodeURIComponent(item.nom)}`}>{item.nom}</Link>
            ))}
          </div>
        </div>
        {loading ? <p className="api-message" role="status">Chargement des artisans…</p> : loadError ? (
          <div className="empty-state" role="alert"><h2>La liste est indisponible</h2><p>Vérifiez que l’API est démarrée, puis réessayez.</p></div>
        ) : artisans.length ? (
          <div className="artisan-grid artisan-grid--listing">
            {artisans.map((artisan) => <ArtisanCard artisan={artisan} key={artisan.id} />)}
          </div>
        ) : (
          <div className="empty-state"><span aria-hidden="true">⌕</span><h2>Aucun artisan trouvé</h2>
            <p>Essayez un autre nom ou choisissez une catégorie.</p><Link className="btn btn-primary" to="/artisans">Voir tous les artisans</Link>
          </div>
        )}
      </div>
    </main>
  );
}
