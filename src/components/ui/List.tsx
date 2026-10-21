import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Lista con filas separadas por líneas. Cada fila puede tener algo al inicio
// (ícono/avatar), título, descripción y algo al final (badge, botón...).
// Uso:
//   <List>
//     <ListItem leading={<Icon name="tv" />} title="Pilot" description="S01E01" trailing="2 dic 2013" />
//     <ListItem title="Lawnmower Dog" onClick={() => abrir(2)} />
//   </List>

type ListProps = {
  children: ReactNode
  className?: string
}

export function List({ children, className }: ListProps) {
  return (
    <ul className={cx('divide-y divide-hairline overflow-hidden rounded-lg border border-hairline bg-white', className)}>
      {children}
    </ul>
  )
}

type ListItemProps = {
  title: ReactNode
  description?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  // Si pasas onClick, toda la fila se vuelve un botón clicable.
  onClick?: () => void
}

export function ListItem({ title, description, leading, trailing, onClick }: ListItemProps) {
  const content = (
    <>
      {leading && <span className="flex shrink-0 text-hull">{leading}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-title-md text-midnight">{title}</span>
        {description && <span className="truncate text-body-sm text-muted">{description}</span>}
      </span>
      {trailing && <span className="shrink-0 text-body-sm text-muted">{trailing}</span>}
    </>
  )

  const rowClass = 'flex w-full items-center gap-3 px-space-md py-3 text-left'

  return (
    <li>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={cx(
            rowClass,
            'cursor-pointer transition hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime',
          )}
        >
          {content}
        </button>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </li>
  )
}
