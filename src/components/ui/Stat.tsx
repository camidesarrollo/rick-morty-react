import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Tarjeta con una cifra destacada.
// Uso:
//   <Stat label="Personajes" value="826" icon="group" hint="en 126 ubicaciones" />
//   <Stat label="Vivos" value={439} trend={{ value: '+12', direction: 'up' }} />

type StatProps = {
  label: string
  value: ReactNode
  icon?: string
  hint?: string
  trend?: { value: string; direction: 'up' | 'down' }
  className?: string
}

export function Stat({ label, value, icon, hint, trend, className }: StatProps) {
  return (
    <div className={cx('flex flex-col gap-2 rounded-lg border border-hairline bg-white p-space-md', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-label-sm uppercase text-muted">{label}</span>
        {icon && <Icon name={icon} size={20} className="text-hull" />}
      </div>
      <div className="flex items-baseline gap-2">
        {/* tabular-nums: todos los dígitos con el mismo ancho, las cifras no "bailan" */}
        <span className="text-headline-lg tabular-nums text-midnight">{value}</span>
        {trend && (
          <span
            className={cx(
              'inline-flex items-center rounded-badge px-1.5 py-0.5 text-label-sm',
              trend.direction === 'up' ? 'bg-alive-bg text-alive' : 'bg-dead-bg text-dead',
            )}
          >
            <Icon name={trend.direction === 'up' ? 'arrow_upward' : 'arrow_downward'} size={12} />
            {trend.value}
          </span>
        )}
      </div>
      {hint && <span className="text-body-sm text-muted">{hint}</span>}
    </div>
  )
}
