import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Paginación con "…" cuando hay muchas páginas (la API de Rick and Morty tiene 42).
// Es "controlado": el padre guarda la página actual y la cambia en onPageChange.
// Uso:
//   const [pagina, setPagina] = useState(1)
//   <Pagination page={pagina} totalPages={data.info.pages} onPageChange={setPagina} />

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

// Función pura (fuera del componente): dada la página actual, decide qué
// botones mostrar. Ej: página 5 de 42 → [1, '…', 4, 5, 6, '…', 42]
function getPages(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const visible = [1, current - 1, current, current + 1, total]
    .filter((p) => p >= 1 && p <= total)
    .filter((p, i, arr) => arr.indexOf(p) === i) // quitar repetidos
    .sort((a, b) => a - b)

  const result: (number | '…')[] = []
  visible.forEach((p, i) => {
    if (i > 0 && p - visible[i - 1] > 1) result.push('…')
    result.push(p)
  })
  return result
}

const buttonBase =
  'inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded px-2 text-label-lg tabular-nums transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime disabled:cursor-not-allowed disabled:opacity-40'

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Paginación" className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
            className={cx(buttonBase, 'text-midnight hover:bg-white')}
          >
            <Icon name="chevron_left" />
          </button>
        </li>

        {getPages(page, totalPages).map((p, index) =>
          p === '…' ? (
            <li key={`dots-${index}`} className="px-1 text-muted" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Página ${p}`}
                className={cx(
                  buttonBase,
                  p === page ? 'bg-midnight text-white' : 'text-midnight hover:bg-white hover:shadow-level-1',
                )}
              >
                {p}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Página siguiente"
            className={cx(buttonBase, 'text-midnight hover:bg-white')}
          >
            <Icon name="chevron_right" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
