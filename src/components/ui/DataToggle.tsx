import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Control segmentado: elegir UNA opción de varias (vista cuadrícula/lista,
// o los estados Datos / Cargando / Sin resultados / Error de la maqueta).
// Uso:
//   const [vista, setVista] = useState<'grid' | 'list'>('grid')
//   <DataToggle
//     label="Vista"
//     value={vista}
//     onChange={setVista}
//     options={[
//       { value: 'grid', label: 'Cuadrícula', icon: 'grid_view' },
//       { value: 'list', label: 'Lista', icon: 'view_list' },
//     ]}
//   />

// <T extends string> es un "genérico": T será el tipo de tus valores
// ('grid' | 'list'), así onChange recibe exactamente ese tipo y no cualquier string.
type Option<T extends string> = {
  value: T
  label: string
  icon?: string
}

type DataToggleProps<T extends string> = {
  label: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  iconOnly?: boolean
  className?: string
}

export function DataToggle<T extends string>({
  label,
  options,
  value,
  onChange,
  iconOnly = false,
  className,
}: DataToggleProps<T>) {
  return (
    <div role="group" aria-label={label} className={cx('inline-flex items-center gap-1 rounded bg-surface-container p-1', className)}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            // aria-pressed indica que es un botón "activado/desactivado".
            aria-pressed={selected}
            aria-label={iconOnly ? option.label : undefined}
            title={iconOnly ? option.label : undefined}
            onClick={() => onChange(option.value)}
            className={cx(
              'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-sm px-3 text-label-md transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime',
              selected ? 'bg-midnight text-white shadow-level-1' : 'text-muted hover:text-midnight',
            )}
          >
            {option.icon && <Icon name={option.icon} size={18} />}
            {!iconOnly && option.label}
          </button>
        )
      })}
    </div>
  )
}
