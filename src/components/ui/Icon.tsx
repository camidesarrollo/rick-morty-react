import { cx } from '../../lib/cx'

// Ícono de Material Symbols (la fuente se carga en index.css).
// Uso:
//   <Icon name="search" />
//   <Icon name="favorite" filled size={24} className="text-dead" />
//   <Icon name="warning" label="Atención" />   ← si el ícono comunica algo por sí solo

type IconProps = {
  name: string
  size?: number
  filled?: boolean
  // Si no hay label, el ícono es decorativo y se oculta a lectores de pantalla.
  label?: string
  className?: string
}

export function Icon({ name, size = 20, filled = false, label, className }: IconProps) {
  return (
    <span
      className={cx('material-symbols-outlined shrink-0 select-none leading-none', className)}
      // Tamaño y relleno son valores dinámicos → van en style, no en className.
      style={{ fontSize: size, fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {name}
    </span>
  )
}
