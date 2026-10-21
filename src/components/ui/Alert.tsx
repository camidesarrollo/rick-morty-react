import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'
import type { Tone } from './Notification'

// Mensaje dentro de la página (no flota). Ideal para el estado "Error" o
// "Sin resultados" de la grilla.
// Uso:
//   <Alert tone="error" title="No pudimos cargar los personajes"
//          action={<Button size="sm" onClick={reintentar}>Reintentar</Button>}>
//     Revisa tu conexión e inténtalo de nuevo.
//   </Alert>

const tones: Record<Tone, { icon: string; box: string }> = {
  info: { icon: 'info', box: 'border-primary-fixed-dim bg-primary-fixed/40 text-on-primary-fixed' },
  success: { icon: 'check_circle', box: 'border-alive/20 bg-alive-bg text-alive' },
  warning: { icon: 'warning', box: 'border-secondary-fixed-dim bg-secondary-fixed/30 text-on-secondary-fixed-variant' },
  error: { icon: 'error', box: 'border-dead/20 bg-dead-bg text-dead' },
}

type AlertProps = {
  tone?: Tone
  title: string
  children?: ReactNode
  action?: ReactNode
  onClose?: () => void
  className?: string
}

export function Alert({ tone = 'info', title, children, action, onClose, className }: AlertProps) {
  const { icon, box } = tones[tone]

  return (
    <div
      // role="alert" interrumpe al lector de pantalla: solo para errores.
      // role="status" lo anuncia sin interrumpir.
      role={tone === 'error' ? 'alert' : 'status'}
      className={cx('flex items-start gap-3 rounded border p-space-md', box, className)}
    >
      <Icon name={icon} size={20} filled className="mt-0.5" />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-title-md">{title}</p>
        {children && <div className="text-body-md opacity-90">{children}</div>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          className="cursor-pointer rounded p-1 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  )
}
