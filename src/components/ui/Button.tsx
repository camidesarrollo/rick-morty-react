import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'
import { Spinner } from './Spinner'

// Botón con las 3 variantes de DESIGN.md (Primary, Accent, Ghost).
// Uso:
//   <Button onClick={guardar}>Guardar</Button>
//   <Button variant="accent" icon="rocket_launch">Explorar</Button>
//   <Button variant="ghost" icon="restart_alt" size="sm">Limpiar filtros</Button>
//   <Button loading>Enviando…</Button>
//   <Button variant="ghost" icon="close" aria-label="Cerrar" />   ← solo ícono: SIEMPRE con aria-label

const variants = {
  primary: 'bg-midnight text-white hover:bg-hull',
  accent: 'bg-lime text-midnight font-bold hover:brightness-95',
  ghost: 'border border-hairline bg-transparent text-midnight hover:border-hull hover:bg-white',
}

const sizes = {
  sm: 'h-8 gap-1.5 px-3 text-label-md',
  md: 'h-10 gap-2 px-4 text-label-lg',
  lg: 'h-12 gap-2 px-6 text-title-md',
}

// Extendemos los atributos normales de <button> (onClick, disabled, type...)
// y le sumamos los nuestros. Así el Button acepta todo lo que acepta un <button>.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: string
  iconRight?: string
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled,
  type = 'button', // por defecto "button": dentro de un <form> evita enviarlo sin querer
  className,
  children,
  ...rest // todas las demás props (onClick, aria-label, title...) pasan tal cual
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner size="sm" /> : icon && <Icon name={icon} size={18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={18} />}
    </button>
  )
}
