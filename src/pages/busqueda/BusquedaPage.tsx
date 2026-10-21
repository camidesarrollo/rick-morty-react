import { useEffect, useState } from 'react'
import { Hero } from './sections/Hero'
import { BusquedaFiltros } from './sections/BusquedaFiltros'
import { DetalleResultados } from './sections/DetalleResultados'
import { TarjetaPersonaje } from './sections/TarjetaPersonajes'
import type { RickAndMortyAPI, Result } from '../../data/RickAndMortyApi'
const URL_API = 'https://rickandmortyapi.com/api/character/?page=1'

export function BusquedaPage() {
    // Empieza vacía; se llena cuando responde la API.
    const [listaDatos, setListaDatos] = useState<Result[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // El [] del final significa: "ejecuta esto solo una vez, al montar el componente".
    useEffect(() => {
        async function cargarPersonajes() {
            try {
                const respuesta = await fetch(URL_API)
                if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`)

                // Le decimos a TypeScript qué forma tiene el JSON.
                const datos: RickAndMortyAPI = await respuesta.json()
                setListaDatos(datos.results)
            } catch (e) {
                setError('No se pudieron cargar los personajes')
            } finally {
                setCargando(false)
            }
        }
        cargarPersonajes()
    }, [])

    return <>
        <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
            <Hero />
            <BusquedaFiltros />
            <DetalleResultados listaDatos={listaDatos} />

            {cargando && <p className="text-body-md text-on-surface-variant">Cargando...</p>}
            {error && <p className="text-body-md text-error">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {listaDatos.map((personaje) => (
                    // id es mejor key que el nombre: es único seguro.
                    <TarjetaPersonaje key={personaje.id} personaje={personaje} />
                ))}
            </div>
        </div>
    </>
}
