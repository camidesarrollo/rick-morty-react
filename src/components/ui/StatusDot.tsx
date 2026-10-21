import type { Status } from '../../data/RickAndMortyApi'
import { cx } from '../../lib/cx'

// Punto de estado de un personaje. "alive" pulsa, "dead" es fijo,
// "unknown" es un anillo vacío (como pide DESIGN.md).
// Uso:
//   <StatusDot status="alive" />
//
// La API de Rick and Morty devuelve "Alive" | "Dead" | "unknown", así que puedes hacer:
//   <StatusDot status={personaje.status.toLowerCase() as Status} />

const colors: Record<Status, string> = {
  Alive: 'bg-alive',
  Dead: 'bg-dead',
  unknown: 'border border-unknown',
}

type StatusDotProps = {
  status: Status
  className?: string
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span className={cx('relative inline-flex size-1.5 shrink-0', className)} aria-hidden="true">
      {status === 'Alive' && <span className="absolute inset-0 animate-ping rounded-full bg-alive opacity-75" />}
      <span className={cx('relative size-1.5 rounded-full', colors[status])} />
    </span>
  )
}
