import { useId, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { useDismiss } from '../../hooks/useDismiss'
import { Button } from './Button'

// Cajita flotante con contenido libre (a diferencia de Dropdown, que solo tiene acciones).
// Uso:
//   <Popover label="Más filtros" icon="tune" title="Filtros avanzados">
//     <label className="flex items-center gap-2">
//       <input type="checkbox" className="accent-midnight" /> Solo vivos
//     </label>
//   </Popover>

type PopoverProps = {
  label: string
  icon?: string
  title?: string
  align?: 'left' | 'right'
  children: ReactNode
}

export function Popover({ label, icon, title, align = 'left', children }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const titleId = useId()

  useDismiss(rootRef, open, setOpen)

  return (
    <div ref={rootRef} className="relative inline-block">
      <Button
        variant="ghost"
        icon={icon}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
      </Button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
          aria-label={title ? undefined : label}
          className={cx(
            'absolute top-full z-40 mt-2 w-72 rounded-lg border border-hairline bg-white p-space-md shadow-level-2',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {title && (
            <p id={titleId} className="mb-3 text-title-md text-midnight">
              {title}
            </p>
          )}
          <div className="text-body-md text-midnight">{children}</div>
        </div>
      )}
    </div>
  )
}
