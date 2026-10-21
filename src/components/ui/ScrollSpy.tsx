import { useEffect, useState } from 'react'
import { cx } from '../../lib/cx'

// Índice lateral que resalta la sección que estás viendo mientras haces scroll.
// Cada sección de la página debe tener el id correspondiente: <section id="origen">.
// Uso:
//   // FUERA del componente, para que el arreglo no se recree en cada render:
//   const secciones = [
//     { id: 'origen', label: 'Origen' },
//     { id: 'episodios', label: 'Episodios' },
//   ]
//   <ScrollSpy sections={secciones} className="sticky top-6" />

type Section = {
  id: string
  label: string
}

type ScrollSpyProps = {
  sections: Section[]
  className?: string
}

export function ScrollSpy({ sections, className }: ScrollSpyProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    // IntersectionObserver avisa cuando un elemento entra o sale de la pantalla.
    // rootMargin "-60%" abajo: cuenta como "activa" la sección en el 40% superior.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '0px 0px -60% 0px' },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="En esta página" className={className}>
      <ul className="flex flex-col border-l border-hairline">
        {sections.map((section) => {
          const isActive = section.id === activeId
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cx(
                  '-ml-px block border-l-2 py-1.5 pl-4 text-label-lg transition',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime',
                  isActive ? 'border-midnight text-midnight' : 'border-transparent text-muted hover:text-midnight',
                )}
              >
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
