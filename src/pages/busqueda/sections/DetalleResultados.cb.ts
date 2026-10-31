import type { Result } from "../../../data/RickAndMortyApi";

export type Orden = "default" | "az" | "za" | "status";

const ORDEN_ESTADO: Record<Result["status"], number> = {
  Alive: 0,
  Dead: 1,
  unknown: 2,
}

// Devuelve una copia ordenada; no muta la lista original.
export function ordenarPersonajes(lista: Result[], orden: Orden): Result[] {
  switch (orden) {
    case "az":
      return [...lista].sort((a, b) => a.name.localeCompare(b.name))
    case "za":
      return [...lista].sort((a, b) => b.name.localeCompare(a.name))
    case "status":
      return [...lista].sort((a, b) => ORDEN_ESTADO[a.status] - ORDEN_ESTADO[b.status])
    default:
      return lista
  }
}
