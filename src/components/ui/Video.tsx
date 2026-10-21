import { cx } from '../../lib/cx'

// Video con proporción 16:9. Sirve para un archivo (.mp4) o para un embed (YouTube).
// Uso:
//   <Video title="Tráiler temporada 7" src="/videos/trailer.mp4" poster="/img/poster.jpg" />
//   <Video title="Tráiler" src="https://www.youtube.com/embed/ID_DEL_VIDEO" embed caption="Adult Swim" />

type VideoProps = {
  title: string
  src: string
  poster?: string
  embed?: boolean
  caption?: string
  className?: string
}

export function Video({ title, src, poster, embed = false, caption, className }: VideoProps) {
  return (
    <figure className={cx('overflow-hidden rounded-lg border border-hairline bg-midnight', className)}>
      {embed ? (
        <iframe
          src={src}
          title={title} // obligatorio en iframes: el lector de pantalla lo anuncia
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full"
        />
      ) : (
        <video src={src} poster={poster} controls preload="metadata" aria-label={title} className="aspect-video w-full" />
      )}
      {caption && <figcaption className="bg-white px-space-md py-3 text-body-sm text-muted">{caption}</figcaption>}
    </figure>
  )
}
