import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Título de sección con contador y acciones a la derecha
// (como "Personajes · 826 habitantes" + el select de orden).
// Uso:
//   <SectionHeader
//     title="Personajes"
//     count={`${total} habitantes`}
//     actions={<DataToggle ... />}
//   />

type SectionHeaderProps = {
  title: string
  count?: ReactNode
  description?: string
  actions?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export function SectionHeader({ title, count, description, actions, as: Tag = 'h2', className }: SectionHeaderProps) {
  return (
    <div className={cx('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-3">
          <Tag className="text-headline-md text-midnight">{title}</Tag>
          {count !== undefined && <span className="text-body-sm font-medium text-muted">{count}</span>}
        </div>
        {description && <p className="text-body-md text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
