import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Texto de ayuda al pasar el mouse o enfocar con teclado. Solo CSS, sin estado:
// el padre tiene "group" y el tooltip aparece con group-hover / group-focus-within.
// Uso:
//   <Tooltip content="Borrar búsqueda">
//     <Button variant="ghost" icon="close" aria-label="Borrar búsqueda" />
//   </Tooltip>
//
// Ojo: el tooltip es visual. Si el botón es solo un ícono, ponle también aria-label.

const sides = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

type TooltipProps = {
  content: string
  side?: keyof typeof sides
  children: ReactNode
}

export function Tooltip({ content, side = 'top', children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cx(
          'pointer-events-none absolute z-50 whitespace-nowrap rounded-sm bg-midnight px-2 py-1 text-label-sm text-white shadow-level-2',
          'invisible opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100',
          sides[side],
        )}
      >
        {content}
      </span>
    </span>
  )
}
