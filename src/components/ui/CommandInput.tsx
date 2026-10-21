import type { InputHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Buscador estilo "terminal": prefijo, botón para borrar, Enter para buscar
// y Escape para limpiar. Es controlado: el padre guarda el texto.
// Uso:
//   const [busqueda, setBusqueda] = useState('')
//   <CommandInput
//     value={busqueda}
//     onChange={setBusqueda}
//     onSubmit={(texto) => buscar(texto)}
//     placeholder="Ej. Rick, Morty, Summer..."
//   />

// Omit<..., 'onChange'> quita el onChange original del <input> para
// reemplazarlo por uno más cómodo que recibe directamente el texto.
type CommandInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onSubmit'> & {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  label?: string
  icon?: string
}

export function CommandInput({
  value,
  onChange,
  onSubmit,
  label = 'Buscar',
  icon = 'search',
  className,
  ...rest
}: CommandInputProps) {
  return (
    <div className={cx('relative flex w-full items-center', className)}>
      <Icon name={icon} size={20} className="pointer-events-none absolute left-3 text-hull" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSubmit?.(value)
          if (event.key === 'Escape') onChange('')
        }}
        aria-label={label}
        enterKeyHint="search"
        className="h-10 w-full rounded border border-hairline bg-white pl-10 pr-10 text-body-md text-midnight transition placeholder:text-placeholder focus:border-midnight focus:outline-none focus:ring-2 focus:ring-lime"
        {...rest}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Borrar búsqueda"
          className="absolute right-2 cursor-pointer rounded p-1 text-placeholder hover:bg-canvas hover:text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  )
}
