import type { Result } from '../../../data/RickAndMortyApi'

export function TarjetaPersonaje({ personaje }: { personaje: Result }) {
    return (
        <article className="...">
            <img className="..." src={personaje.image} alt={personaje.name} loading="lazy" />
            <div className="flex flex-col gap-1 p-4">
                <h3 className="text-title-md text-primary">{personaje.name}</h3>
                {/* La API no trae descripción; mostramos estado y especie */}
                <p className="text-body-sm text-on-surface-variant">
                    {personaje.status} · {personaje.species}
                </p>
            </div>
        </article>
    )
}
