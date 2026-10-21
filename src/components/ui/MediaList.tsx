import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Lista de elementos con imagen (ej. personajes que aparecen en un episodio).
// Recibe los datos como arreglo y se encarga de dibujar cada fila.
// Uso:
//   <MediaList
//     items={personajes.map((p) => ({
//       id: p.id,
//       image: p.image,
//       title: p.name,
//       subtitle: p.species,
//       meta: <Badge status="alive" />,
//     }))}
//     onSelect={(id) => abrirDetalle(id)}
//   />

export type MediaItem = {
  id: string | number
  image: string
  title: string
  subtitle?: string
  meta?: ReactNode
}

type MediaListProps = {
  items: MediaItem[]
  onSelect?: (id: MediaItem['id']) => void
  className?: string
}

export function MediaList({ items, onSelect, className }: MediaListProps) {
  return (
    <ul className={cx('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const content = (
          <>
            <img src={item.image} alt="" loading="lazy" className="size-12 shrink-0 rounded-full object-cover" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-title-md text-midnight">{item.title}</span>
              {item.subtitle && <span className="truncate text-body-sm text-muted">{item.subtitle}</span>}
            </span>
            {item.meta && <span className="shrink-0">{item.meta}</span>}
          </>
        )
        const rowClass = 'flex w-full items-center gap-3 rounded-lg border border-hairline bg-white p-2 pr-4 text-left'

        return (
          <li key={item.id}>
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cx(
                  rowClass,
                  'cursor-pointer transition hover:border-hull hover:shadow-level-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime',
                )}
              >
                {content}
              </button>
            ) : (
              <div className={rowClass}>{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
