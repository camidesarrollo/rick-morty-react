import { useId, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { useDismiss } from '../../hooks/useDismiss'
import { Button } from './Button'
import { Icon } from './Icon'

// Menú desplegable de acciones. Se cierra al elegir, al hacer clic fuera o con Escape.
// Uso:
//   <Dropdown
//     label="Ordenar"
//     items={[
//       { label: 'Nombre (A - Z)', icon: 'arrow_downward', onSelect: () => setOrden('az') },
//       { label: 'Nombre (Z - A)', icon: 'arrow_upward', onSelect: () => setOrden('za') },
//     ]}
//   />

type DropdownItem = {
  label: string
  icon?: string
  onSelect: () => void
  danger?: boolean
}

type DropdownProps = {
  label: string
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ label, items, align = 'left', className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useDismiss(rootRef, open, setOpen)

  return (
    <div ref={rootRef} className={cx('relative inline-block', className)}>
      <Button
        variant="ghost"
        iconRight="expand_more"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
      </Button>

      {open && (
        <ul
          id={menuId}
          className={cx(
            'absolute top-full z-40 mt-2 min-w-48 rounded border border-hairline bg-white p-1 shadow-level-2',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  item.onSelect()
                  setOpen(false)
                }}
                className={cx(
                  'flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-left text-body-md transition',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime',
                  item.danger ? 'text-dead hover:bg-dead-bg' : 'text-midnight hover:bg-canvas',
                )}
              >
                {item.icon && <Icon name={item.icon} size={18} />}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
