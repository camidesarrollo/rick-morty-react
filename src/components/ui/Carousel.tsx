import { Children, useRef, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Button } from './Button'

// Carrusel horizontal con scroll nativo + "scroll snap" de CSS
// (funciona con mouse, touch y trackpad sin librerías).
// Uso:
//   <Carousel title="Familia Smith" slideClassName="w-56">
//     {familia.map((p) => (
//       <Card key={p.id}><CardMedia src={p.image} alt={p.name} /><CardBody title={p.name} /></Card>
//     ))}
//   </Carousel>

type CarouselProps = {
  title: string
  slideClassName?: string // ancho de cada slide, ej. "w-56" o "w-[80%] tablet:w-72"
  children: ReactNode
}

export function Carousel({ title, slideClassName = 'w-64', children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    // Avanza ~80% del ancho visible; el snap lo acomoda al slide más cercano.
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section aria-roledescription="carrusel" aria-label={title} className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-headline-sm text-midnight">{title}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" icon="chevron_left" aria-label="Anterior" onClick={() => scroll(-1)} />
          <Button variant="ghost" size="sm" icon="chevron_right" aria-label="Siguiente" onClick={() => scroll(1)} />
        </div>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {/* Children.toArray conserva las "key" de cada hijo */}
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            className={cx('shrink-0 snap-start', slideClassName)}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  )
}
