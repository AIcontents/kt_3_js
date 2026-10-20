/**
 * GitHub Pages отдаёт 404.html для несуществующих путей.
 * Копируем index.html → 404.html, чтобы SPA (React Router) загружался при прямом заходе на /product/1 и т.п.
 */
import { copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
copyFileSync(join(root, 'dist', 'index.html'), join(root, 'dist', '404.html'))
