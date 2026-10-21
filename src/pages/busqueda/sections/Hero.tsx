import { Eyebrow, Heading, Highlight, Text } from "../../../components/ui";

export function Hero(){
    return (
        <>
        {/* 1. HERO */}
        <header className="flex flex-col items-start gap-3 max-w-3xl">
            <Eyebrow>Explorador de Personajes</Eyebrow>
            <Heading as="h1" variant="display">Descubre el <Highlight>multiverso</Highlight>.</Heading>
            <Text variant="body-lg" muted>Explora personajes, descubre sus historias y viaja entre dimensiones. Encuentra a tus favoritos entre
            cientos de habitantes catalogados en el archivo central de Rick and Morty.</Text>
        </header>
        </>
    )
}