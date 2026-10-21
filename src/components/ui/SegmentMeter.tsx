import { useId } from 'react'
import { cx } from '../../lib/cx'

// Medidor "de telemetría" hecho con segmentos (estilo consola sci-fi).
// Uso:
//   <SegmentMeter label="Peligrosidad" value={7} segments={10} tone="dead" />

const tones = {
  lime: 'bg-lime',
  midnight: 'bg-midnight',
  alive: 'bg-alive',
  dead: 'bg-dead',
}

type SegmentMeterProps = {
  label: string
  value: number
  segments?: number
  tone?: keyof typeof tones
  className?: string
}

export function SegmentMeter({ label, value, segments = 10, tone = 'lime', className }: SegmentMeterProps) {
  const labelId = useId()

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between">
        <span id={labelId} className="text-label-sm uppercase text-muted">
          {label}
        </span>
        <span className="text-code-badge tabular-nums text-midnight">
          {value}/{segments}
        </span>
      </div>
      <div
        role="meter"
        aria-labelledby={labelId}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={segments}
        className="flex gap-1"
      >
        {/* Array.from({ length: n }) crea un arreglo de n elementos para poder hacer .map() */}
        {Array.from({ length: segments }, (_, index) => (
          <span
            key={index}
            className={cx('h-2 flex-1 rounded-sm', index < value ? tones[tone] : 'bg-surface-container-high')}
          />
        ))}
      </div>
    </div>
  )
}
