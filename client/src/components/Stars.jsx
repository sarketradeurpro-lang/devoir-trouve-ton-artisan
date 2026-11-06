export default function Stars({ note }) {
  const filled = Math.round(Number(note));
  return (
    <span className="rating" aria-label={`Note : ${Number(note).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} sur 5`}>
      <span className="rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span className={index < filled ? 'is-filled' : ''} key={index}>★</span>
        ))}
      </span>
      <span className="rating__value">{Number(note).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / 5</span>
    </span>
  );
}
