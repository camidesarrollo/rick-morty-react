import { useId, useState, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Secciones que se abren y cierran.
// Uso:
//   <Accordion
//     items={[
//       { id: 'origen', title: 'Origen', content: 'Tierra (C-137)' },
//       { id: 'ubicacion', title: 'Última ubicación', content: 'Ciudadela de los Ricks' },
//     ]}
//     defaultOpen={['origen']}
//     multiple   ← permite tener varias abiertas a la vez
//   />

type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  multiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  // Estado: la lista de ids abiertos.
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen)
  const baseId = useId()

  function toggle(id: string) {
    // Usamos la forma con función (prev => ...) porque el nuevo estado depende del anterior.
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((openId) => openId !== id)
      return multiple ? [...prev, id] : [id]
    })
  }

  return (
    <div className={cx('divide-y divide-hairline overflow-hidden rounded-lg border border-hairline bg-white', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        const panelId = `${baseId}-${item.id}`

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                // aria-expanded le dice al lector de pantalla si está abierto;
                // aria-controls indica qué panel controla este botón.
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-title-md text-midnight transition hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime"
              >
                {item.title}
                <Icon name="expand_more" className={cx('text-muted transition-transform', isOpen && 'rotate-180')} />
              </button>
            </h3>
            <div id={panelId} role="region" hidden={!isOpen} className="px-5 pb-4 text-body-md text-muted">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
