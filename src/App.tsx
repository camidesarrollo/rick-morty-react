import { useState } from 'react'
import './App.css'
import { Button, CommandInput, Select } from './components/ui'
import { Hero } from './pages/busqueda/sections/Hero'
import { BusquedaFiltros } from './pages/busqueda/sections/BusquedaFiltros'

// Un "type" describe la forma de cada objeto. Así TypeScript te avisa
// si escribes mal una propiedad (ej. personaje.nombe).
type Personaje = {
  imagen: string
  nombre: string
  descripcion: string
}

const listaDatos: Personaje[] = [
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    nombre: "Rick Sanchez",
    descripcion: "Científico genio y alcohólico. El hombre más inteligente del universo."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    nombre: "Morty Smith",
    descripcion: "Nieto adolescente de Rick. Torpe pero con buen corazón."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    nombre: "Summer Smith",
    descripcion: "Hermana mayor de Morty. Popular, sarcástica y valiente."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    nombre: "Beth Smith",
    descripcion: "Madre de Morty y Summer. Cirujana de caballos con carácter fuerte."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    nombre: "Jerry Smith",
    descripcion: "Padre de Morty. Inseguro, torpe y frecuentemente ridiculizado."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    nombre: "Abadango Cluster Princess",
    descripcion: "Gobernante de un imperio intergaláctico de criaturas brillantes."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    nombre: "Abradolf Lincler",
    descripcion: "Híbrido entre Abraham Lincoln y Adolf Hitler. Busca su propósito."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    nombre: "Adjudicator Rick",
    descripcion: "Versión de Rick que trabaja como juez en la Ciudadela."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
    nombre: "Agency Director",
    descripcion: "Director de una agencia secreta que persigue a Rick."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    nombre: "Alan Rails",
    descripcion: "Superhéroe con poderes basados en ferrocarriles y trenes fantasma."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
    nombre: "Albert Einstein",
    descripcion: "Versión del famoso físico en el multiverso de Rick and Morty."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
    nombre: "Alexander",
    descripcion: "Personaje secundario visto en la Ciudadela de los Ricks."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
    nombre: "Alien Googah",
    descripcion: "Criatura alienígena con múltiples ojos y forma extraña."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
    nombre: "Alien Morty",
    descripcion: "Versión alienígena de Morty de una dimensión desconocida."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
    nombre: "Alien Rick",
    descripcion: "Versión alienígena de Rick con apariencia grotesca."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    nombre: "Amish Cyborg",
    descripcion: "Granjero amish con implantes cibernéticos. Vive en el campo."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
    nombre: "Annie",
    descripcion: "Chica que aparece en la fiesta de Rick. Muere en circunstancias trágicas."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
    nombre: "Antenna Morty",
    descripcion: "Morty con antenas parabólicas en la cabeza, de otra dimensión."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    nombre: "Ants in my Eyes Johnson",
    descripcion: "Vendedor de electrónica que literalmente tiene hormigas en los ojos."
  },
  {
    imagen: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    nombre: "Aqua Morty",
    descripcion: "Versión acuática de Morty, mitad hombre mitad pez."
  }
]

// Clases repetidas en los <select> de filtros: las guardamos en una constante
// para no copiar y pegar el mismo texto largo.
const claseSelect =
  "appearance-none h-10 pl-3.5 pr-9 rounded-lg bg-surface-container-low text-on-surface text-label-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed transition-all"

// Componente pequeño y reutilizable: una tarjeta por personaje.
// Recibe un personaje por "props" y devuelve su JSX.
function TarjetaPersonaje({ personaje }: { personaje: Personaje }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <img
        className="w-full aspect-square object-cover"
        src={personaje.imagen}
        alt={personaje.nombre}
        loading="lazy"
      />
      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-title-md text-primary">{personaje.nombre}</h3>
        <p className="text-body-sm text-on-surface-variant">{personaje.descripcion}</p>
      </div>
    </article>
  )
}

function App() {
  return (
    <main className="w-full bg-surface min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
        {/* 1. HERO */}
        <Hero/>
        {/* 2. BÚSQUEDA Y FILTROS */}
        <BusquedaFiltros/>

        {/* 3. ENCABEZADO DE RESULTADOS */}
        <section className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-headline-md text-primary">Personajes</h2>
            {/* El número sale de los datos, no escrito a mano */}
            <span className="text-body-sm text-on-surface-variant font-medium">
              {listaDatos.length} habitantes
            </span>
          </div>
          <div className="relative">
            <select
              className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-surface-container-lowest text-on-surface text-label-sm cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-secondary-fixed"
              aria-label="Ordenar personajes"
              defaultValue="default"
            >
              <option value="default">Orden: Predeterminado</option>
              <option value="az">Nombre (A - Z)</option>
              <option value="za">Nombre (Z - A)</option>
              <option value="status">Estado dimensional</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]">
              expand_more
            </span>
          </div>
        </section>

        {/* 4. GRILLA DE TARJETAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* .map() recorre el arreglo y crea una tarjeta por personaje.
              "key" es obligatorio en listas: ayuda a React a saber qué cambió. */}
          {listaDatos.map((personaje) => (
            <TarjetaPersonaje key={personaje.nombre} personaje={personaje} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
