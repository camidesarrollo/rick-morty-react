import { useState } from "react";
import type { Species, Status } from "../../../data/RickAndMortyApi";

type Estado = "all" | Status;
type Especie = "all" | Species;

// Exportamos el tipo para que el padre lo use.
export type Filtros = {
    nombre: string;
    estado: Estado;
    especie: Especie;
};

export const FILTROS_INICIALES: Filtros = { nombre: "", estado: "all", especie: "all" };

// Los tipos se exportan con "export type", no se devuelven en un return.
export type BusquedaFiltrosProps = {
    filtros: Filtros;
    onCambiar: (filtros: Filtros) => void;
};

// Custom hook: una función que empieza con "use" y puede usar otros hooks.
// Recibe las props que necesita y devuelve lo que la vista va a usar.
export function useBusquedaFiltros({ filtros, onCambiar }: BusquedaFiltrosProps) {
    // Lo único local: lo que el usuario va escribiendo antes de presionar Enter.
    const [texto, setTexto] = useState(filtros.nombre);

    // "...filtros" copia los valores actuales y solo reemplaza el que cambió.
    function buscar(valor: string) {
        onCambiar({ ...filtros, nombre: valor });
    }

    function cambiarEstado(estado: Estado) {
        onCambiar({ ...filtros, estado });
    }

    function cambiarEspecie(especie: Especie) {
        onCambiar({ ...filtros, especie });
    }

    const filtrosActivos =
        Number(filtros.estado !== "all") +
        Number(filtros.especie !== "all");

    function limpiarFiltros() {
        setTexto("");
        onCambiar(FILTROS_INICIALES);
    }

    return {
        texto,
        setTexto,
        buscar,
        cambiarEstado,
        cambiarEspecie,
        filtrosActivos,
        limpiarFiltros,
    };
}
