import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Grilla responsive según DESIGN.md: 1 columna en móvil, 2 en tablet,
// y 3 o 4 en desktop (1200px+).
// Uso:
//   <Grid cols={4}>
//     {personajes.map((p) => <Card key={p.id}>...</Card>)}
//   </Grid>
//   <Grid as="ul" cols={3}>...</Grid>   ← si los hijos son <li>

// Igual que en Typography: clases COMPLETAS en el objeto, nunca armadas
// con `grid-cols-${n}` (Tailwind no las detectaría).
const columns = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 tablet:grid-cols-2',
  3: 'grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3',
  4: 'grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4',
}

type GridProps = {
  cols?: keyof typeof columns
  as?: 'div' | 'ul' | 'ol'
  className?: string
  children: ReactNode
}

export function Grid({ cols = 4, as: Tag = 'div', className, children }: GridProps) {
  return (
    <Tag className={cx('grid w-full gap-gutter-mobile tablet:gap-gutter', columns[cols], className)}>{children}</Tag>
  )
}
