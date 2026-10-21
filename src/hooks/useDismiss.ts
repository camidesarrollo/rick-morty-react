import { useEffect, type RefObject } from 'react'

// Hook personalizado: cierra un menú/popover al hacer clic fuera o al
// presionar Escape. Lo usan Dropdown y Popover, así no repetimos la lógica.
//
// Recibe el "setter" de useState (setOpen) porque React garantiza que es
// siempre la misma función: así el efecto no se vuelve a suscribir en cada render.
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  setOpen: (open: boolean) => void,
) {
  useEffect(() => {
    if (!open) return

    function handlePointer(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    // La función que devuelve el efecto es la "limpieza": quita los listeners
    // cuando se cierra o cuando el componente desaparece.
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [ref, open, setOpen])
}
