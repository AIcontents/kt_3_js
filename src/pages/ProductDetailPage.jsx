import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StarRating } from '../components/StarRating'
import './ProductDetailPage.css'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      setProduct(null)
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${encodeURIComponent(id)}`
        )
        if (res.status === 404) {
          if (!cancelled) setError('notfound')
          return
        }
        if (!res.ok) throw new Error(`Ошибка ${res.status}`)
        const data = await res.json()
        if (!cancelled) setProduct(data)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Ошибка загрузки')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (id) load()
    else {
      setLoading(false)
      setError('notfound')
    }

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="product-detail">
        <p className="product-detail__status">Загрузка…</p>
      </div>
    )
  }

  if (error === 'notfound' || !product) {
    return (
      <div className="product-detail">
        <p className="product-detail__status">Товар не найден.</p>
        <button
          type="button"
          className="product-detail__back"
          onClick={() => navigate(-1)}
        >
          НАЗАД
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-detail">
        <p className="product-detail__status product-detail__status--error">
          {error}
        </p>
        <button
          type="button"
          className="product-detail__back"
          onClick={() => navigate(-1)}
        >
          НАЗАД
        </button>
      </div>
    )
  }

  const rate = product.rating?.rate ?? 0

  return (
    <div className="product-detail">
      <article className="product-detail__card">
        <h1 className="product-detail__title">{product.title}</h1>
        <div className="product-detail__image-wrap">
          <img
            className="product-detail__image"
            src={product.image}
            alt={product.title}
            width={320}
            height={320}
          />
        </div>
        <p className="product-detail__price">Price: {product.price} $</p>
        <p className="product-detail__description">
          Description: {product.description}
        </p>
        <div className="product-detail__rating-wrap">
          <StarRating rate={rate} />
        </div>
      </article>
      <button
        type="button"
        className="product-detail__back"
        onClick={() => navigate(-1)}
      >
        НАЗАД
      </button>
    </div>
  )
}
