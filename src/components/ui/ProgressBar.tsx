import { useId } from 'react'
import { cx } from '../../lib/cx'

// Barra de progreso.
// Uso:
//   <ProgressBar label="Personajes cargados" value={cargados} max={826} />

const tones = {
  secondary: 'bg-secondary',
  midnight: 'bg-midnight',
  alive: 'bg-alive',
  dead: 'bg-dead',
}

type ProgressBarProps = {
  value: number
  max?: number
  label: string
  showValue?: boolean
  tone?: keyof typeof tones
  className?: string
}

export function ProgressBar({ value, max = 100, label, showValue = true, tone = 'secondary', className }: ProgressBarProps) {
  const labelId = useId()
  // Limitamos entre 0 y 100 por si llega un valor fuera de rango.
  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between text-label-md">
        <span id={labelId} className="text-midnight">
          {label}
        </span>
        {showValue && <span className="tabular-nums text-muted">{Math.round(percent)}%</span>}
      </div>
      <div
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2 overflow-hidden rounded-full bg-surface-container-high"
      >
        {/* El ancho cambia en cada render, así que va en style.
            `w-[${percent}%]` NO funcionaría: Tailwind no ve strings dinámicos. */}
        <div className={cx('h-full rounded-full transition-[width] duration-500', tones[tone])} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
