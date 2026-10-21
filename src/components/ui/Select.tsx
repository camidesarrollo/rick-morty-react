import type { SelectHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// <select> nativo con el estilo de DESIGN.md y la flechita de Material Symbols.
// Uso:
//   const [estado, setEstado] = useState<'all' | 'alive' | 'dead' | 'unknown'>('all')
//   <Select
//     label="Filtrar por estado"
//     value={estado}
//     onChange={setEstado}
//     options={[
//       { value: 'all', label: 'Estado: Todos' },
//       { value: 'alive', label: 'Vivo' },
//       { value: 'dead', label: 'Muerto' },
//       { value: 'unknown', label: 'Desconocido' },
//     ]}
//   />
//
//   // Sin estado todavía (no controlado): usa defaultValue
//   <Select label="Ordenar" size="sm" defaultValue="default" options={[...]} />

const sizes = {
  sm: 'h-9 pl-3 pr-8 text-label-sm',
  md: 'h-10 pl-3.5 pr-9 text-label-md',
}

// Igual que en DataToggle: T es el tipo de tus valores ('all' | 'alive' ...),
// así onChange te entrega exactamente ese tipo.
type Option<T extends string> = {
  value: T
  label: string
}

// Omit quita del <select> original las props que redefinimos a nuestra manera.
type SelectProps<T extends string> = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'size'> & {
  // Sin <label> visible, el lector de pantalla necesita saber qué es el select.
  label: string
  options: Option<T>[]
  value?: T
  onChange?: (value: T) => void
  size?: keyof typeof sizes
}

export function Select<T extends string>({
  label,
  options,
  value,
  onChange,
  size = 'md',
  className,
  ...rest // defaultValue, disabled, name, id...
}: SelectProps<T>) {
  return (
    <div className={cx('relative inline-block', className)}>
      <select
        aria-label={label}
        value={value}
        // event.target.value siempre es string; "as T" le dice a TypeScript que
        // es uno de nuestros valores (lo es: solo puede venir de las options).
        onChange={(event) => onChange?.(event.target.value as T)}
        className={cx(
          // appearance-none quita la flecha del navegador para poner la nuestra.
          'w-full cursor-pointer appearance-none rounded border border-hairline bg-white text-midnight transition',
          'hover:border-hull focus:border-midnight focus:outline-none focus:ring-2 focus:ring-lime',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizes[size],
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="expand_more"
        size={size === 'sm' ? 16 : 18}
        // pointer-events-none: el clic "atraviesa" el ícono y abre el select.
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  )
}
