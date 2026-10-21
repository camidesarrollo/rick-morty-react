import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { Notification } from './Notification'
import { ToastContext, type ToastOptions } from './toast-context'

// Proveedor de toasts: envuelve tu app UNA vez (en main.tsx) y luego usa
// useToast() donde quieras.
//
//   // main.tsx
//   <ToastProvider>
//     <App />
//   </ToastProvider>
//
//   // cualquier componente
//   const { showToast } = useToast()
//   <Button onClick={() => showToast({ title: 'Copiado', tone: 'success' })}>Copiar</Button>

type ToastItem = ToastOptions & { id: number }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  // useRef guarda un valor que sobrevive entre renders SIN provocar un render nuevo.
  const nextId = useRef(0)

  // useCallback mantiene la misma función entre renders; así los componentes
  // que usan el contexto no se vuelven a dibujar sin motivo.
  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++
      setToasts((current) => [...current, { id, ...options }])
      window.setTimeout(() => dismiss(id), options.duration ?? 4000)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    // En React 19 el contexto se usa directo como proveedor: <ToastContext value={...}>
    <ToastContext value={value}>
      {children}
      {/* aria-live: el lector de pantalla anuncia lo que aparezca aquí */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2"
      >
        {toasts.map((toast) => (
          <Notification
            key={toast.id}
            title={toast.title}
            message={toast.message}
            tone={toast.tone}
            onClose={() => dismiss(toast.id)}
            // starting: define el estilo inicial → entra deslizando y apareciendo.
            className="pointer-events-auto transition duration-200 starting:translate-y-2 starting:opacity-0"
          />
        ))}
      </div>
    </ToastContext>
  )
}
