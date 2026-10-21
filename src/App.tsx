import './App.css'

const listaDatos = [
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

function App() {
  return (
    <>
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8">
            {/* <!-- 1. HERO SECTION --> */}
            <header className="flex flex-col items-start gap-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="font-code-badge text-code-badge uppercase tracking-wider text-on-surface">Explorador de
                  Personajes</span>
              </div>
              <h1 className="font-display text-display text-primary tracking-tight">
                Descubre el <span
                  className="relative inline-block text-primary after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-secondary-fixed/50 after:-z-10">multiverso</span>.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Explora personajes, descubre sus historias y viaja entre dimensiones. Encuentra a tus favoritos entre
                cientos de habitantes catalogados en el archivo central de Rick and Morty.
              </p>
            </header>
            {/* <!-- 2. SEARCH & FILTER PANEL --> */}
            <section className="w-full bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4">
              {/* <!-- Row 1: Search input --> */}
              <div className="relative w-full flex items-center">
                <span
                  className="material-symbols-outlined absolute left-4 text-outline text-[22px] pointer-events-none">search</span>
                <input
                  className="w-full h-12 pl-12 pr-12 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-2 focus:ring-secondary-fixed transition-all"
                  id="search-input" placeholder="Ej. Rick, Morty, Summer..." type="text" />
                <button
                  className="absolute right-3.5 p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-variant/40 transition-colors"
                  id="btn-clear-search" title="Borrar término de búsqueda" type="button">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              {/* <!-- Row 2: Filter controls inline --> */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  {/* <!-- Status Dropdown --> */}
                  <div className="relative inline-block text-left">
                    <select
                      className="appearance-none h-10 pl-3.5 pr-9 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed transition-all"
                      id="filter-status">
                      <option value="all">Estado: Todos</option>
                      <option value="alive">Vivo</option>
                      <option value="dead">Muerto</option>
                      <option value="unknown">Desconocido</option>
                    </select>
                    <span
                      className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">expand_more</span>
                  </div>
                  {/* <!-- Species Dropdown --> */}
                  <div className="relative inline-block text-left">
                    <select
                      className="appearance-none h-10 pl-3.5 pr-9 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed transition-all"
                      id="filter-species">
                      <option value="all">Especie: Todas</option>
                      <option value="human">Humano</option>
                      <option value="alien">Alienígena</option>
                      <option value="other">Otras formas de vida</option>
                    </select>
                    <span
                      className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">expand_more</span>
                  </div>
                  {/* <!-- Active filters pill --> */}
                  <span
                    className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-code-badge text-code-badge"
                    id="active-filters-badge">
                    Filtros: <span id="active-filter-count">0</span>/2
                  </span>
                </div>
                {/* <!-- Reset Button --> */}
                <button
                  className="h-10 px-4 rounded-lg bg-surface-container-low hover:bg-surface-variant/40 text-on-surface font-label-md text-label-md inline-flex items-center gap-1.5 transition-colors"
                  id="btn-reset-filters" type="button">
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  Limpiar filtros
                </button>
              </div>
            </section>
            {/* <!-- 3. RESULTS HEADER & AUDIT STATE SWITCHER --> */}
            <section className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-baseline gap-3">
                <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Personajes</h2>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium" id="results-count">826
                  habitantes</span>
              </div>
              {/* <!-- State Demo Tabs for Reviewer Inspection --> */}
              <div className="flex items-center gap-1 p-1 bg-surface-container rounded-lg">
                <button
                  className="state-tab px-3 py-1.5 rounded-md font-label-sm text-label-sm text-on-primary bg-primary shadow-sm transition-all"
                  data-state="data" type="button">
                  Datos (8)
                </button>
                <button
                  className="state-tab px-3 py-1.5 rounded-md font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-all"
                  data-state="loading" type="button">
                  Cargando
                </button>
                <button
                  className="state-tab px-3 py-1.5 rounded-md font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-all"
                  data-state="empty" type="button">
                  Sin resultados
                </button>
                <button
                  className="state-tab px-3 py-1.5 rounded-md font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-all"
                  data-state="error" type="button">
                  Error
                </button>
              </div>
              {/* <!-- Sort dropdown --> */}
              <div className="relative">
                <select
                  className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-secondary-fixed">
                  <option>Orden: Predeterminado</option>
                  <option>Nombre (A - Z)</option>
                  <option>Nombre (Z - A)</option>
                  <option>Estado dimensional</option>
                </select>
                <span
                  className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]">expand_more</span>
              </div>
            </section>
            {/* <!-- 4. ACTIVE STATE CONTAINERS -->
            <!-- STATE: DATA VIEW (4-COLUMN CARDS GRID) --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full" id="view-data">

            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App