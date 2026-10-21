import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Componentes de texto que aplican los estilos tipográficos de DESIGN.md.
// Uso:
//   <Heading as="h1" variant="display">Descubre el <Highlight>multiverso</Highlight>.</Heading>
//   <Text variant="body-lg" muted>Explora personajes...</Text>
//   <Eyebrow>Explorador de Personajes</Eyebrow>

// IMPORTANTE: Tailwind solo genera las clases que encuentra ESCRITAS COMPLETAS
// en tu código. Por eso usamos un objeto con las clases enteras, y NO
// `text-${variant}` (Tailwind no puede adivinar ese string).
const headingStyles = {
  display: 'text-headline-lg-mobile tablet:text-display',
  'headline-lg': 'text-headline-lg-mobile tablet:text-headline-lg',
  'headline-md': 'text-headline-md',
  'headline-sm': 'text-headline-sm',
  'title-lg': 'text-title-lg',
  'title-md': 'text-title-md',
}

type HeadingProps = {
  // "as" elige la etiqueta (importa para SEO y accesibilidad);
  // "variant" elige cómo se ve. Así un h2 puede verse pequeño si hace falta.
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: keyof typeof headingStyles
  className?: string
  children: ReactNode
}

export function Heading({ as: Tag = 'h2', variant = 'headline-md', className, children }: HeadingProps) {
  return <Tag className={cx(headingStyles[variant], 'text-midnight', className)}>{children}</Tag>
}

const textStyles = {
  'body-lg': 'text-body-lg',
  'body-md': 'text-body-md',
  'body-sm': 'text-body-sm',
  'label-lg': 'text-label-lg',
  'label-md': 'text-label-md',
  'label-sm': 'text-label-sm uppercase',
  code: 'text-code-badge uppercase',
}

type TextProps = {
  as?: 'p' | 'span' | 'div' | 'small' | 'label'
  variant?: keyof typeof textStyles
  muted?: boolean
  className?: string
  children: ReactNode
}

export function Text({ as: Tag = 'p', variant = 'body-md', muted = false, className, children }: TextProps) {
  return <Tag className={cx(textStyles[variant], muted && 'text-muted', className)}>{children}</Tag>
}

// Palabra subrayada con un trazo lima, como "multiverso" en el hero.
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative isolate inline-block after:absolute after:bottom-1 after:left-0 after:-z-10 after:h-2 after:w-full after:bg-secondary-fixed/50 after:content-['']">
      {children}
    </span>
  )
}

// Etiqueta pequeña con punto que va encima de un título.
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 text-on-surface',
        className,
      )}
    >
      <span className="size-2 rounded-full bg-secondary-container" aria-hidden="true" />
      <span className="text-code-badge uppercase">{children}</span>
    </div>
  )
}
