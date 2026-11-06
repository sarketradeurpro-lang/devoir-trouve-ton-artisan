import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Stars from '../components/Stars.jsx';
import { getArtisan, sendContact } from '../services/artisans.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function ArtisanDetailPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setNotFound(false);
    setLoadError(false);
    getArtisan(id, { signal: controller.signal })
      .then(setArtisan)
      .catch((error) => {
        if (error.name === 'AbortError') return;
        if (error.status === 404) setNotFound(true);
        else setLoadError(true);
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);
  usePageMeta(artisan ? `${artisan.nom} — Trouve ton artisan` : 'Artisan introuvable — Trouve ton artisan', artisan ? `${artisan.specialite} à ${artisan.ville}. Découvrez sa fiche et contactez cet artisan.` : 'Cette fiche artisan est introuvable.');

  if (loading) return <main id="main-content" className="page-section"><div className="container"><p className="api-message" role="status">Chargement de la fiche…</p></div></main>;
  if (notFound) return <NotFoundPage />;
  if (loadError || !artisan) return <main id="main-content" className="page-section"><div className="container"><div className="empty-state" role="alert"><h1>Fiche indisponible</h1><p>Impossible de charger cette fiche pour le moment.</p><Link className="btn btn-primary" to="/artisans">Voir les artisans</Link></div></div></main>;

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setSending(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      await sendContact(artisan.id, payload);
      formElement.reset();
      setStatus('Votre demande a été transmise. Une réponse vous sera apportée sous 48h.');
    } catch (error) {
      setStatus(`${error.message || "Le service de contact n'est pas disponible."} Votre message n'a pas été envoyé.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <main id="main-content" className="page-section detail-page">
      <div className="container">
        <nav className="breadcrumb-trail" aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link><span aria-hidden="true">›</span>
          <Link to={`/artisans?categorie=${encodeURIComponent(artisan.categorie)}`}>{artisan.categorie}</Link><span aria-hidden="true">›</span>
          <span aria-current="page">{artisan.nom}</span>
        </nav>
        <div className="detail-layout">
          <article className="artisan-profile">
            <div className="artisan-photo">
              <img
                src={artisan.image || '/images/artisan-placeholder.svg'}
                alt={artisan.image ? `Photo ou logo de ${artisan.nom}` : `Illustration de remplacement pour ${artisan.nom}`}
              />
              {!artisan.image && <small>Photo ou logo de l’artisan</small>}
            </div>
            <p className="eyebrow">{artisan.categorie}</p>
            <h1>{artisan.nom}</h1>
            <Stars note={artisan.note} />
            <p className="profile-trade">{artisan.specialite} <span aria-hidden="true">·</span> {artisan.ville}</p>
            {artisan.siteWeb && <p className="profile-website">Site web : <a href={artisan.siteWeb} target="_blank" rel="noreferrer">{artisan.siteWeb.replace(/^https?:\/\//, '')}</a></p>}
            <section className="about-section"><h2>À propos</h2><p>{artisan.aPropos}</p></section>
          </article>
          <section className="contact-panel" aria-labelledby="contact-title">
            <p className="eyebrow">Un projet en tête ?</p>
            <h2 id="contact-title">Contacter l’artisan</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field"><label htmlFor="contact-name">Nom</label><input id="contact-name" name="nom" autoComplete="name" required maxLength="100" /></div>
              <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength="255" /></div>
              <div className="form-field"><label htmlFor="contact-subject">Objet</label><input id="contact-subject" name="objet" required maxLength="150" /></div>
              <div className="form-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="5" required maxLength="3000" /></div>
              <button className="btn btn-primary w-100" type="submit" disabled={sending}>{sending ? 'Envoi en cours…' : 'Envoyer ma demande'}</button>
              <p className="form-note">Une réponse vous sera apportée sous 48h.</p>
              {status && <p className={status.startsWith('Votre demande') ? 'form-status form-status--success' : 'form-status form-status--error'} role="status">{status}</p>}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
