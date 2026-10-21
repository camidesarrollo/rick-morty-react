import { cx } from '../../lib/cx'

// Indicador de carga. Hereda el color del texto (currentColor).
// Uso:
//   <Spinner />
//   <Spinner size="lg" className="text-midnight" label="Cargando personajes" />

const sizes = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-10',
}

type SpinnerProps = {
  size?: keyof typeof sizes
  label?: string
  className?: string
}

export function Spinner({ size = 'md', label = 'Cargando', className }: SpinnerProps) {
  return (
    <span role="status" className={cx('inline-flex', className)}>
      <svg className={cx('animate-spin', sizes[size])} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {/* sr-only: invisible en pantalla, pero el lector de pantalla lo lee */}
      <span className="sr-only">{label}</span>
    </span>
  )
}
