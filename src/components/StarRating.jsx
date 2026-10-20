import './StarRating.css'

/**
 * @param {{ rate?: number }} props — rating.rate с API (дробное число)
 */
export function StarRating({ rate = 0 }) {
  const filled = Math.min(5, Math.max(0, Math.round(Number(rate) || 0)))

  return (
    <div
      className="star-rating"
      role="img"
      aria-label={`Рейтинг ${filled} из 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < filled ? 'star star--filled' : 'star star--empty'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  )
}
