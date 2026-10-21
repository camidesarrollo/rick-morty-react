import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Tarjeta de notificación (blanca, con sombra). Se usa sola, en una lista de
// avisos, y también la reutiliza ToastProvider para dibujar cada toast.
// Uso:
//   <Notification tone="success" title="Favorito guardado" message="Rick Sanchez se añadió a tu lista." time="hace 2 min" />

// "Tone" lo comparten Alert, Notification y los toasts.
export type Tone = 'info' | 'success' | 'warning' | 'error'

const tones: Record<Tone, { icon: string; color: string }> = {
  info: { icon: 'info', color: 'bg-primary-fixed text-on-primary-fixed' },
  success: { icon: 'check_circle', color: 'bg-alive-bg text-alive' },
  warning: { icon: 'warning', color: 'bg-secondary-fixed text-on-secondary-fixed' },
  error: { icon: 'error', color: 'bg-dead-bg text-dead' },
}

type NotificationProps = {
  title: string
  message?: ReactNode
  tone?: Tone
  time?: string
  onClose?: () => void
  className?: string
}

export function Notification({ title, message, tone = 'info', time, onClose, className }: NotificationProps) {
  const { icon, color } = tones[tone]

  return (
    <div
      className={cx(
        'flex items-start gap-3 rounded-lg border border-hairline bg-white p-space-md shadow-level-2',
        className,
      )}
    >
      <span className={cx('flex size-8 shrink-0 items-center justify-center rounded-full', color)}>
        <Icon name={icon} size={18} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-title-md text-midnight">{title}</p>
          {time && <span className="shrink-0 text-body-sm text-placeholder">{time}</span>}
        </div>
        {message && <p className="text-body-md text-muted">{message}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="-mr-1 -mt-1 cursor-pointer rounded p-1 text-placeholder hover:bg-canvas hover:text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  )
}
