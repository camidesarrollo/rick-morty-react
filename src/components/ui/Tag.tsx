import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Chip de taxonomía (episodio, dimensión, especie...). Opcionalmente se puede quitar.
// Uso:
//   <Tag icon="public">Dimensión C-137</Tag>
//   <Tag onRemove={() => quitarFiltro('human')} removeLabel="Quitar filtro Humano">Humano</Tag>

type TagProps = {
  children: ReactNode
  icon?: string
  onRemove?: () => void
  removeLabel?: string
  className?: string
}

export function Tag({ children, icon, onRemove, removeLabel = 'Quitar', className }: TagProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-badge border border-hairline bg-canvas px-2 py-0.5 text-label-md text-hull',
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="-mr-1 inline-flex cursor-pointer rounded-sm p-0.5 hover:bg-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </span>
  )
}
