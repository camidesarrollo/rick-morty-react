import { createContext, useContext } from 'react'
import type { Tone } from './Notification'

// El "contexto" permite que CUALQUIER componente dentro de <ToastProvider>
// muestre un toast sin pasar props por todos los niveles.
//
// Está en un archivo .ts aparte (y no en Toast.tsx) porque el recargado en
// caliente de Vite (Fast Refresh) solo funciona bien si un archivo .tsx
// exporta únicamente componentes.
//
// Uso (en cualquier componente):
//   const { showToast } = useToast()
//   showToast({ title: 'Guardado', tone: 'success' })

export type ToastOptions = {
  title: string
  message?: string
  tone?: Tone
  duration?: number // milisegundos (por defecto 4000)
}

type ToastContextValue = {
  showToast: (options: ToastOptions) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de <ToastProvider>')
  }
  return context
}
