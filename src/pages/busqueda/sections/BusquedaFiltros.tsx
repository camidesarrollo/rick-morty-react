
import { useState } from "react";
import { Button, CommandInput, Select, type Status } from "../../../components/ui";
import type { Species } from "../../../data/RickAndMortyApi";

type Estado = "all"  | Status;
type Especie = "all" | Species;

export function BusquedaFiltros() {
  // 1. Estados del componente
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState<Estado>("all");
  const [especie, setEspecie] = useState<Especie>("all");

  // 2. Lógica de búsqueda
  function buscar(texto: string) {
    console.log("Buscando:", texto);
  }

  // 3. Contar los filtros activos
  const filtrosActivos =
    Number(estado !== "all") +
    Number(especie !== "all");

  // 4. Limpiar todos los controles
  function limpiarFiltros() {
    setBusqueda("");
    setEstado("all");
    setEspecie("all");
  }

  // 5. Renderizar la interfaz
  return (
    <section className="w-full bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <CommandInput
        value={busqueda}
        onChange={setBusqueda}
        onSubmit={buscar}
        placeholder="Ej. Rick, Morty, Summer..."
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Select
              label="Filtrar por estado"
              value={estado}
              onChange={setEstado}
              options={[
                { value: "all", label: "Estado: Todos" },
                { value: "Alive", label: "Vivo" },
                { value: "Dead", label: "Muerto" },
                { value: "unknown", label: "Desconocido" },
              ]}
            />
          </div>

          <div className="relative">
            <Select
              label="Filtrar por especie"
              value={especie}
              onChange={setEspecie}
              options={[
                { value: "all", label: "Especie: Todas" },
                { value: "Human", label: "Humano" },
                { value: "Alien", label: "Alienígena" },
              ]}
            />
          </div>

          <span className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-code-badge">
            Filtros: {filtrosActivos}/2
          </span>
        </div>

        <Button
          variant="ghost"
          icon="restart_alt"
          size="sm"
          onClick={limpiarFiltros}
        >
          Limpiar filtros
        </Button>
      </div>
    </section>
  );
}
