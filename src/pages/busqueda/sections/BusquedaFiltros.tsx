import { useState } from "react";
import { Button, CommandInput, Select } from "../../../components/ui";

const [busqueda, setBusqueda] = useState('');

function buscar(texto: string){
  console.log(texto);
}

const [estado, setEstado] = useState<'all' | 'alive' | 'dead' | 'unknown'>('all');
const [especie, setEspecie] = useState<'all' |  'human' | 'alien' | 'other'>('all')


export function BusquedaFiltros(){
    return (
        <>
        <section className="w-full bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <CommandInput
              value={busqueda}
              onChange={setBusqueda}
              onSubmit={(texto) => buscar(texto)}
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
                      { value: 'all', label: 'Estado: Todos' },
                      { value: 'alive', label: 'Vivo' },
                      { value: 'dead', label: 'Muerto' },
                      { value: 'unknown', label: 'Desconocido' },
                    ]}
                  />
              </div>
              <div className="relative">
                <Select
                    label="Filtrar por especie"
                    value={especie}
                    onChange={setEspecie}
                    options={[
                      { value: 'all', label: 'Especie: Todas' },
                      { value: 'human', label: 'Humano' },
                      { value: 'alien', label: 'Alienígena' },
                      { value: 'other', label: 'Otras formas de vida' },
                    ]}
                  />
              </div>
              <span className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-code-badge">
                Filtros: 0/2
              </span>
              
            </div>
            <Button variant="ghost" icon="restart_alt" size="sm">Limpiar filtros</Button>
          </div>
        </section>
        </>
    )
}