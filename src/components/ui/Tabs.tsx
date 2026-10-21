import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Pestañas. Se navega con clic o con las flechas ← → del teclado.
// Uso:
//   <Tabs
//     tabs={[
//       { id: 'info', label: 'Información', icon: 'info', content: <p>...</p> },
//       { id: 'episodios', label: 'Episodios', content: <List>...</List> },
//     ]}
//     onChange={(id) => console.log('pestaña', id)}
//   />

type Tab = {
  id: string
  label: string
  icon?: string
  content: ReactNode
}

type TabsProps = {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (id: string) => void
  className?: string
}

export function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab ?? tabs[0]?.id)
  const baseId = useId()
  // Guardamos referencias a los botones para poder moverles el foco con el teclado.
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function select(index: number) {
    const tab = tabs[index]
    setActiveId(tab.id)
    onChange?.(tab.id) // ?.() llama a la función solo si existe
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const last = tabs.length - 1
    if (event.key === 'ArrowRight') select(index === last ? 0 : index + 1)
    else if (event.key === 'ArrowLeft') select(index === 0 ? last : index - 1)
    else if (event.key === 'Home') select(0)
    else if (event.key === 'End') select(last)
    else return
    event.preventDefault()
  }

  const activeTab = tabs.find((tab) => tab.id === activeId)

  return (
    <div className={cx('flex flex-col gap-4', className)}>
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-hairline">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              // Solo la pestaña activa entra en el orden de Tab; las demás se alcanzan con flechas.
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cx(
                '-mb-px inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-label-lg transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime',
                isActive ? 'border-midnight text-midnight' : 'border-transparent text-muted hover:text-midnight',
              )}
            >
              {tab.icon && <Icon name={tab.icon} size={18} />}
              {tab.label}
            </button>
          )
        })}
      </div>
      {activeTab && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab.id}`}
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  )
}
