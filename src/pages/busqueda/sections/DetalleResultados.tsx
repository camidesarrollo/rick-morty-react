import { Select } from "../../../components/ui";
import type { Result } from "../../../data/RickAndMortyApi";
import type { Orden } from "./DetalleResultados.cb";

type DetalleResultadosProps = {
  listaDatos: Result[]
  orden: Orden
  onCambiarOrden: (orden: Orden) => void
}

export function DetalleResultados({ listaDatos, orden, onCambiarOrden }: DetalleResultadosProps) {
    return (
        <>
            <section className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-headline-md text-primary">Personajes</h2>
                    {/* El número sale de los datos, no escrito a mano */}
                    <span className="text-body-sm text-on-surface-variant font-medium">
                        {listaDatos.length} habitantes
                    </span>
                </div>
                <div className="relative">
                     <Select
                        label="Ordenar personajes"
                        value={orden}
                        onChange={onCambiarOrden}
                        options={[
                        { value: "default", label: "Orden: Predeterminado" },
                        { value: "az", label: "Nombre (A - Z)" },
                        { value: "za", label: "Nombre (Z - A)" },
                        { value: "status", label: "Estado dimensional" },
                        ]}
                    />
                </div>
            </section>
        </>)
}
