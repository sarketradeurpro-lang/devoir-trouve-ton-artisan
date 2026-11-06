import { Link } from 'react-router-dom';
import Stars from './Stars.jsx';

export default function ArtisanCard({ artisan }) {
  return (
    <Link className="artisan-card" to={`/artisan/${artisan.id}`} aria-label={`Voir la fiche de ${artisan.nom}`}>
      <span className="artisan-card__mark" aria-hidden="true">✦</span>
      <span className="artisan-card__content">
        <strong className="artisan-card__name">{artisan.nom}</strong>
        <Stars note={artisan.note} />
        <span className="artisan-card__trade">{artisan.specialite} <span aria-hidden="true">·</span> {artisan.ville}</span>
      </span>
      <span className="artisan-card__arrow" aria-hidden="true">›</span>
    </Link>
  );
}
