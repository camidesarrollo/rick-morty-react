import { useState } from "react";
import { Select } from "../../../components/ui";
import type { Result } from "../../../data/RickAndMortyApi";

type Orden = "default" | "az" | "za" | "status";

type DetalleResultadosProps = {
  listaDatos: Result[]
}

export function DetalleResultados({ listaDatos }: DetalleResultadosProps) {

    const [orden, setOrden] = useState<Orden>("default");
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
                        onChange={setOrden}
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