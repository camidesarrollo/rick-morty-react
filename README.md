<div align="center">

# 🌀 Cosmic Index

### *El archivo central del multiverso de Rick and Morty*

> *"Escúchame, Morty. Hay infinitas realidades... y alguien tenía que catalogarlas."*

<br>

![React](https://img.shields.io/badge/React_19-020b1e?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-020b1e?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-020b1e?style=for-the-badge&logo=vite&logoColor=B6F26A)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-020b1e?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![API](https://img.shields.io/badge/Rick_and_Morty_API-416900?style=for-the-badge&logo=portainer&logoColor=B6F26A)

</div>

---

## 🧪 Informe del laboratorio

**Cosmic Index** es un explorador de personajes del universo de *Rick and Morty*. Busca habitantes por nombre, fíltralos por estado vital y especie, ordénalos y viaja página por página por cientos de registros dimensionales.

No es solo un consumo de API: es un pequeño **sistema de diseño propio** construido desde cero, con componentes accesibles y reutilizables, encima de una arquitectura de React limpia.

```
   ╭──────────────────────────────────────────╮
   │  🔍  Buscar habitante...                 │
   ├──────────────────────────────────────────┤
   │  Estado: [Vivo ▾]   Especie: [Humano ▾]  │
   ╰──────────────────────────────────────────╯
        │
        ▼   fetch → rickandmortyapi.com
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │  👨‍🔬   │ │  👦    │ │  👧    │ │  👽    │
   │ Rick   │ │ Morty  │ │ Summer │ │ ???    │
   │ ● Vivo │ │ ● Vivo │ │ ● Vivo │ │ ○ ¿?   │
   └────────┘ └────────┘ └────────┘ └────────┘
              ‹  1  2  3  …  42  ›
```

<!-- 📸 Añade aquí una captura real: ![Cosmic Index](./docs/captura.png) -->

---

## ⚡ Funciones del portal

| | Función | Qué hace |
|---|---|---|
| 🔎 | **Búsqueda por nombre** | Consulta en vivo la API mientras escribes |
| 🧬 | **Filtros combinables** | Estado (vivo / muerto / desconocido) y especie, con contador de filtros activos |
| 🔀 | **Ordenamiento** | A–Z, Z–A o por estado dimensional |
| 📄 | **Paginación inteligente** | Con elipsis, y se reinicia al cambiar los filtros |
| ⏳ | **Estados de carga y error** | Spinner accesible y mensajes claros; un 404 se trata como "sin resultados" |
| 🛑 | **Peticiones cancelables** | `AbortController` evita respuestas viejas que pisen a las nuevas |

---

## 🛸 Arquitectura

```
src/
├── components/ui/        # 🎨 Sistema de diseño: 30+ componentes reutilizables
│   ├── Badge · Button · Card · Modal · Tabs · Tooltip · Toast …
│   └── index.ts          #    Barrel export: un solo punto de importación
├── hooks/
│   ├── usePersonajes.ts  # 🌐 Fetch + estado (lista, páginas, carga, error)
│   └── useDismiss.ts     # 🖱️ Clic fuera / tecla Escape
├── data/
│   └── RickAndMortyApi.ts# 📡 Tipos de la API
└── pages/busqueda/
    ├── BusquedaPage.tsx  # 🧭 Orquesta filtros, orden y paginación
    └── sections/
        ├── *.tsx         #    Vista (solo componentes)
        └── *.cb.ts       #    Lógica separada (tipos, helpers, hooks)
```

### 🧠 Decisiones de diseño

- **Vista y lógica separadas.** Cada sección tiene su `.tsx` (UI) y su `.cb.ts` (lógica), lo que mantiene los componentes limpios y compatibles con Fast Refresh.
- **Custom hooks.** `usePersonajes` encapsula todo el ciclo de datos, así la página solo *consume*.
- **Accesibilidad primero.** Tabs con navegación por teclado, roles ARIA, `aria-live` en las notificaciones y diálogos nativos (`<dialog>`).
- **React Compiler activado.** Memoización automática sin `useMemo` manual.
- **Design tokens.** Paleta *Cosmic Index* (azul medianoche `#020b1e` + verde portal `#b6f26a`) definida como tokens de Tailwind v4.

---

## 🚀 Abrir el portal en local

```bash
# 1. Clona esta dimensión
git clone https://github.com/camidesarrollo/rick-morty-react.git
cd rick-morty-react

# 2. Instala los ingredientes
npm install

# 3. Dispara la pistola de portales
npm run dev
```

| Comando | Efecto |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Chequeo de tipos + build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | ESLint (reglas de hooks + React Refresh) |

---

## 🗺️ Próximas dimensiones

- [ ] Página de detalle por personaje (episodios, origen, ubicación)
- [ ] Filtros sincronizados con la URL (enlaces compartibles)
- [ ] Debounce en la búsqueda
- [ ] Modo oscuro *"Dimensión C-137"*
- [ ] Favoritos persistentes
- [ ] Tests con Vitest + Testing Library

---

## 📚 Lo que aprendí en este viaje

> Consumir una API REST con cancelación de peticiones · diseñar un sistema de componentes con TypeScript genérico · aplicar las Reglas de los Hooks (¡y depurar cuando HMR las rompe!) · separar responsabilidades entre vista, lógica y datos.

---

<div align="center">

### 🧑‍💻 Hecho por **[camidesarrollo](https://github.com/camidesarrollo)**

Datos cortesía de [The Rick and Morty API](https://rickandmortyapi.com) · Personajes © Adult Swim

*Wubba Lubba Dub Dub!* 🥒

</div>
