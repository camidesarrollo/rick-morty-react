
import { useState } from 'react'
import { BusquedaFiltros } from './sections/BusquedaFiltros'
import { FILTROS_INICIALES, type Filtros } from './sections/BusquedaFiltros.cb'
import { DetalleResultados } from './sections/DetalleResultados'
import { Hero } from './sections/Hero'
import { TarjetaPersonaje } from './sections/TarjetaPersonajes'
import { usePersonajes } from '../../hooks/usePersonajes'
import { Pagination } from '../../components/ui/Pagination'
import { Spinner } from '../../components/ui'

export function BusquedaPage() {

    const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIALES)
    const [pagina, setPagina] = useState(1)

    // Consumimos el Custom Hook
    const {
        listaDatos,
        totalPaginas,
        cargando,
        error
    } = usePersonajes(filtros, pagina)

    // Cambiar filtros también reinicia la paginación.
    function cambiarFiltros(nuevosFiltros: Filtros) {
        setFiltros(nuevosFiltros)
        setPagina(1)
    }

    return (
        <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">

            <Hero />

            <BusquedaFiltros
                filtros={filtros}
                onCambiar={cambiarFiltros}
            />

            <DetalleResultados listaDatos={listaDatos} />

            {cargando && (
                <div className="flex justify-center items-center py-10">
                    <Spinner
                        size="lg"
                        label="Cargando personajes"
                        className="text-midnight"
                    />
                </div>
            )}

            {error && (
                <p className="text-body-md text-error">
                    {error}
                </p>
            )}

            {!cargando && !error && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {listaDatos.map((personaje) => (
                            <TarjetaPersonaje
                                key={personaje.id}
                                personaje={personaje}
                            />
                        ))}
                    </div>

                    <Pagination
                        page={pagina}
                        totalPages={totalPaginas}
                        onPageChange={setPagina}
                        className="mt-6"
                    />
                </>
            )}

        </div>
    )
}
