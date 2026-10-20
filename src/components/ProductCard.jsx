import { Link } from 'react-router-dom'
import { StarRating } from './StarRating'
import './ProductCard.css'

/**
 * @param {{ product: { id: number; title: string; rating?: { rate?: number } } }} props
 */
export function ProductCard({ product }) {
  const rate = product.rating?.rate ?? 0

  return (
    <article className="product-card">
      <h2 className="product-card__title">
        <Link to={`/product/${product.id}`} className="product-card__link">
          {product.title}
        </Link>
      </h2>
      <div className="product-card__rating">
        <StarRating rate={rate} />
      </div>
    </article>
  )
}
