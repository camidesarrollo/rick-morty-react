import { Button, CommandInput, Select } from "../../../components/ui";
import { useBusquedaFiltros, type BusquedaFiltrosProps } from "./BusquedaFiltros.cb";

// La vista solo dibuja: toda la lógica viene del hook.
export function BusquedaFiltros(props: BusquedaFiltrosProps) {
  const { filtros } = props;
  const {
    texto,
    setTexto,
    buscar,
    cambiarEstado,
    cambiarEspecie,
    filtrosActivos,
    limpiarFiltros,
  } = useBusquedaFiltros(props);

  return (
    <section className="w-full bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <CommandInput
        value={texto}
        onChange={setTexto}
        onSubmit={buscar}
        placeholder="Ej. Rick, Morty, Summer..."
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Select
              label="Filtrar por estado"
              value={filtros.estado}
              onChange={cambiarEstado}
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
              value={filtros.especie}
              onChange={cambiarEspecie}
              options={[
                { value: "all", label: "Especie: Todas" },
                { value: "Human", label: "Humano" },
                { value: "Alien", label: "Alienígena" },
              ]}
            />
          </div>

          <span className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-code-badge">Filtros: {filtrosActivos}/2</span>
        </div>

        <Button variant="ghost" icon="restart_alt" size="sm" onClick={limpiarFiltros}>
          Limpiar filtros
        </Button>
      </div>
    </section>
  );
}
