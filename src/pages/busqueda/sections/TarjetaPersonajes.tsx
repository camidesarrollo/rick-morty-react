import type { Result } from '../../../data/RickAndMortyApi'

export function TarjetaPersonaje({ personaje }: { personaje: Result }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 transition-[transform,box-shadow] will-change-transform">
            {/* Sin loading="lazy": con transform + overflow-hidden Chrome a veces no pinta la imagen ya descargada */}
            <img
                className="block w-full aspect-square object-cover bg-surface-container"
                src={personaje.image}
                alt={personaje.name}
                width={300}
                height={300}
                decoding="async"
                onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden'
                }}
            />
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
