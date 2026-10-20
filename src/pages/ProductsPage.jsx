import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import './ProductsPage.css'

const PRODUCTS_URL = 'https://fakestoreapi.com/products'

export function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(PRODUCTS_URL)
        if (!res.ok) throw new Error(`Ошибка ${res.status}`)
        const data = await res.json()
        if (!cancelled) setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!cancelled) setError(e.message || 'Не удалось загрузить товары')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="products-page">
        <p className="products-page__status">Загрузка…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-page">
        <p className="products-page__status products-page__status--error">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="products-page__grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
