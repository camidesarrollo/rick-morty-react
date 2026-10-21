import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Paso de un proceso (completado, actual o pendiente).
// Uso:
//   <ol className="flex flex-col gap-3">
//     <StepCard step={1} title="Elige una dimensión" status="done" />
//     <StepCard step={2} title="Busca un personaje" description="Por nombre o especie" status="current" />
//     <StepCard step={3} title="Guárdalo en favoritos" status="upcoming" />
//   </ol>

type StepStatus = 'done' | 'current' | 'upcoming'

const circleStyles: Record<StepStatus, string> = {
  done: 'bg-midnight text-lime',
  current: 'bg-lime text-midnight',
  upcoming: 'border border-hairline bg-canvas text-muted',
}

type StepCardProps = {
  step: number
  title: string
  description?: string
  status?: StepStatus
}

export function StepCard({ step, title, description, status = 'upcoming' }: StepCardProps) {
  return (
    <li
      aria-current={status === 'current' ? 'step' : undefined}
      className={cx(
        'flex items-start gap-4 rounded-lg border bg-white p-space-md',
        status === 'current' ? 'border-hull shadow-level-1' : 'border-hairline',
      )}
    >
      <span
        className={cx(
          'flex size-8 shrink-0 items-center justify-center rounded-full text-label-lg',
          circleStyles[status],
        )}
      >
        {status === 'done' ? <Icon name="check" size={18} label="Completado" /> : step}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className={cx('text-title-md', status === 'upcoming' ? 'text-muted' : 'text-midnight')}>{title}</span>
        {description && <span className="text-body-sm text-muted">{description}</span>}
      </div>
    </li>
  )
}
