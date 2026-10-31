
import { useEffect, useState } from 'react'
import type { Result, RickAndMortyAPI } from '../data/RickAndMortyApi'
import type { Filtros } from '../pages/busqueda/sections/BusquedaFiltros.cb'


const URL_API = 'https://rickandmortyapi.com/api/character/'

function construirUrl(filtros: Filtros, pagina: number) {
    const params = new URLSearchParams({ page: String(pagina) })

    if (filtros.nombre) params.set('name', filtros.nombre)
    if (filtros.estado !== 'all') params.set('status', filtros.estado)
    if (filtros.especie !== 'all') params.set('species', filtros.especie)

    return `${URL_API}?${params}`
}

export function usePersonajes(filtros: Filtros, pagina: number) {
    const [listaDatos, setListaDatos] = useState<Result[]>([])
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function cargarPersonajes() {
            setCargando(true)
            setError(null)

            try {
                const respuesta = await fetch(
                    construirUrl(filtros, pagina),
                    { signal: controller.signal }
                )

                if (respuesta.status === 404) {
                    setListaDatos([])
                    setTotalPaginas(0)
                    return
                }

                if (!respuesta.ok) {
                    throw new Error(`Error ${respuesta.status}`)
                }

                const datos: RickAndMortyAPI = await respuesta.json()

                setListaDatos(datos.results)
                setTotalPaginas(datos.info.pages)

            } catch {
                if (!controller.signal.aborted) {
                    setError('No se pudieron cargar los personajes')
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false)
                }
            }
        }

        cargarPersonajes()

        return () => controller.abort()

    }, [filtros, pagina])

    return {
        listaDatos,
        totalPaginas,
        cargando,
        error
    }
}
