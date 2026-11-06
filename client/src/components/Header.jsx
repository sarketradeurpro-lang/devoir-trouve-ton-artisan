import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../services/artisans.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    getCategories({ signal: controller.signal }).then(setCategories).catch(() => setCategories([]));
    return () => controller.abort();
  }, []);

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/artisans?q=${encodeURIComponent(value)}` : '/artisans');
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" to="/" aria-label="Trouve ton artisan, accueil">
          <span className="brand__title">Trouve ton artisan<span> !</span></span>
          <span className="brand__region">Avec la région<br />Auvergne-Rhône-Alpes</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <div id="main-navigation" className={`site-header__navigation${menuOpen ? ' is-open' : ''}`}>
          <nav className="category-nav" aria-label="Catégories d'artisans">
            {categories.map((category) => (
              <Link key={category.id} to={`/artisans?categorie=${encodeURIComponent(category.nom)}`} onClick={() => setMenuOpen(false)}>
                {category.nom}
              </Link>
            ))}
          </nav>
          <form className="search-form" role="search" onSubmit={submitSearch}>
            <label className="visually-hidden" htmlFor="artisan-search">Rechercher un artisan par son nom</label>
            <input
              id="artisan-search"
              type="search"
              placeholder="Rechercher un artisan"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" aria-label="Lancer la recherche">⌕</button>
          </form>
        </div>
      </div>
    </header>
  );
}
