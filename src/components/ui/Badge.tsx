import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { StatusDot, type Status } from './StatusDot'

// Badge de estado: Vivo / Muerto / Desconocido.
// Uso:
//   <Badge status="Alive" />                 → "VIVO"
//   <Badge status="Dead">Fallecido</Badge>    → texto personalizado

const styles: Record<Status, string> = {
  Alive: 'bg-alive-bg text-alive',
  Dead: 'bg-dead-bg text-dead',
  unknown: 'bg-unknown-bg text-unknown',
}

const labels: Record<Status, string> = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
}

type BadgeProps = {
  status: Status
  children?: ReactNode
  className?: string
}

export function Badge({ status, children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-badge px-2 py-0.5 text-label-sm uppercase',
        styles[status],
        className,
      )}
    >
      <StatusDot status={status} />
      {/* ?? usa lo de la derecha solo si children es null/undefined */}
      {children ?? labels[status]}
    </span>
  )
}
