import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

// Ventana modal usando la etiqueta nativa <dialog>. El navegador ya resuelve
// lo difícil: cerrar con Escape, atrapar el foco dentro y poner el fondo (::backdrop).
// Uso:
//   const [abierto, setAbierto] = useState(false)
//   <Button onClick={() => setAbierto(true)}>Ver ficha</Button>
//   <Modal open={abierto} onClose={() => setAbierto(false)} title="Rick Sanchez"
//          footer={<Button onClick={() => setAbierto(false)}>Cerrar</Button>}>
//     ...contenido...
//   </Modal>

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
}

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
  size?: keyof typeof sizes
  children: ReactNode
}

export function Modal({ open, onClose, title, footer, size = 'md', children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  // useEffect sincroniza React con algo "de afuera" (aquí, la API del <dialog>):
  // cuando cambia "open", abrimos o cerramos el diálogo.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // El evento "close" se dispara con Escape o con dialog.close(): avisamos al padre.
      onClose={onClose}
      // Clic en el fondo oscuro: el target es el propio <dialog>, no su contenido.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      // No pongas "flex" aquí: pisaría el display:none del dialog cerrado.
      className={cx(
        'm-auto w-[calc(100%-2rem)] rounded-xl border border-hairline bg-white p-0 text-midnight shadow-level-3',
        'backdrop:bg-midnight/50 backdrop:backdrop-blur-xs',
        sizes[size],
      )}
    >
      <div className="flex max-h-[85vh] flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-hairline px-space-lg py-4">
          <h2 id={titleId} className="text-headline-sm">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="cursor-pointer rounded p-1.5 text-muted hover:bg-canvas hover:text-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="overflow-y-auto px-space-lg py-space-md text-body-md">{children}</div>
        {footer && (
          <footer className="flex justify-end gap-2 border-t border-hairline px-space-lg py-4">{footer}</footer>
        )}
      </div>
    </dialog>
  )
}
