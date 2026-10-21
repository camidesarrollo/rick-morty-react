import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Card "componible": en vez de una sola Card con 20 props, se arma con piezas.
// Uso:
//   <Card interactive>
//     <CardMedia src={p.image} alt={p.name} badge={<Badge status="alive" />} />
//     <CardBody title={p.name} subtitle={`${p.species} · ${p.origin.name}`}>
//       <CardFacts items={[
//         { label: 'Ubicación', value: p.location.name },
//         { label: 'Episodios', value: p.episode.length },
//       ]} />
//     </CardBody>
//   </Card>

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'div' | 'li'
  // interactive: sube, cambia el borde y suma sombra al pasar el mouse.
  interactive?: boolean
}

export function Card({ as: Tag = 'article', interactive = false, className, children, ...rest }: CardProps) {
  return (
    <Tag
      className={cx(
        'group flex flex-col overflow-hidden rounded-lg border border-hairline bg-white transition',
        interactive && 'hover:-translate-y-0.5 hover:border-hull hover:shadow-level-1 focus-within:border-hull',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

type CardMediaProps = {
  src: string
  alt: string
  // badge: cualquier elemento que se ancla arriba a la derecha (ej. <Badge />).
  badge?: ReactNode
}

export function CardMedia({ src, alt, badge }: CardMediaProps) {
  return (
    <div className="relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        // group-hover: reacciona cuando el mouse está sobre la Card (que tiene "group").
        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
      />
      {badge && <div className="absolute right-3 top-3">{badge}</div>}
    </div>
  )
}

type CardBodyProps = {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function CardBody({ title, subtitle, children }: CardBodyProps) {
  return (
    <div className="flex flex-1 flex-col gap-3 p-space-md">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-title-lg text-midnight">{title}</h3>
        {subtitle && <p className="text-body-sm text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

type Fact = { label: string; value: ReactNode }

// Grilla clave-valor de 2 columnas. <dl>/<dt>/<dd> es la etiqueta HTML
// pensada justo para pares "término → descripción".
export function CardFacts({ items }: { items: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-hairline pt-3">
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 flex-col">
          <dt className="text-label-sm uppercase text-muted">{item.label}</dt>
          <dd className="truncate text-body-md text-midnight">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
