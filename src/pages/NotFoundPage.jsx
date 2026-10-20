import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Страница не найдена</h1>
      <p className="not-found__text">
        Такого адреса нет. Проверьте URL или вернитесь в каталог.
      </p>
      <Link to="/products" className="not-found__link">
        К списку товаров
      </Link>
    </div>
  )
}
