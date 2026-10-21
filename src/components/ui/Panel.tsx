import { useId, type ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Contenedor blanco con borde (nivel 1) o con sombra (nivel 2, "elevated").
// Uso:
//   <Panel title="Filtros" description="Refina la búsqueda" actions={<Button size="sm">Limpiar</Button>}>
//     ...contenido...
//   </Panel>

type PanelProps = {
  title?: string
  description?: string
  actions?: ReactNode
  elevated?: boolean
  className?: string
  children: ReactNode
}

export function Panel({ title, description, actions, elevated = false, className, children }: PanelProps) {
  // useId genera un id único y estable, útil para conectar elementos con aria-*.
  const titleId = useId()

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      className={cx(
        'flex flex-col gap-4 rounded-lg border border-hairline bg-white p-space-md tablet:p-space-lg',
        elevated && 'shadow-level-2',
        className,
      )}
    >
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            {title && (
              <h3 id={titleId} className="text-title-lg text-midnight">
                {title}
              </h3>
            )}
            {description && <p className="text-body-sm text-muted">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  )
}
