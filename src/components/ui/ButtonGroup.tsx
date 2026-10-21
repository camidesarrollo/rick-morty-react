import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Junta varios botones pegados, con esquinas redondeadas solo en los extremos.
// Uso:
//   <ButtonGroup label="Vista">
//     <Button variant="ghost" icon="grid_view" aria-label="Cuadrícula" />
//     <Button variant="ghost" icon="view_list" aria-label="Lista" />
//   </ButtonGroup>

type ButtonGroupProps = {
  label: string
  children: ReactNode
  className?: string
}

export function ButtonGroup({ label, children, className }: ButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      // "*:" aplica la clase a cada hijo directo. "*:first:" solo al primero, etc.
      // -ml-px superpone los bordes para que no se vean dobles.
      className={cx(
        'inline-flex',
        '*:relative *:rounded-none *:first:rounded-l *:last:rounded-r *:not-first:-ml-px *:focus-visible:z-10',
        className,
      )}
    >
      {children}
    </div>
  )
}
