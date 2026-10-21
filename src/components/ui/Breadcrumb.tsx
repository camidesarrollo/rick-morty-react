import { Icon } from './Icon'

// Ruta de navegación: Inicio › Personajes › Rick Sanchez
// Uso:
//   <Breadcrumb items={[
//     { label: 'Inicio', href: '/' },
//     { label: 'Personajes', href: '/personajes' },
//     { label: 'Rick Sanchez' },            ← el último es la página actual
//   ]} />

type Crumb = {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-1 text-label-md text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <Icon name="chevron_right" size={16} className="text-placeholder" />}
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-midnight' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="rounded-sm hover:text-midnight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime">
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
