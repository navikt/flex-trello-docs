import Link from 'next/link'
import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { TrelloKortRendring } from '@/components/trelloKortRendring'

export default async function Docs({ params }: { params: { slug?: string[] } }): Promise<ReactElement> {
    const list = await hentTrelloKort()

    const slug = params.slug
    if (!slug) {
        return <TrelloKortRendring kortet={list[0].cards[0]} />
    }

    const lista = list.find((k) => k.url === slug[0])

    if (!lista) {
        return (
            <main>
                <h1>404 fant ikke liste</h1>
            </main>
        )
    }
    if (slug.length == 1) {
        return (
            <main>
                <h1>{lista.name}</h1>
                {lista.cards.map((c) => (
                    <div key={c.id}>
                        <Link className="text-blue-800" href={lista.url + '/' + c.url}>
                            {c.name}
                        </Link>
                    </div>
                ))}
            </main>
        )
    }

    if (slug.length == 2) {
        const kortet = lista.cards.find((c) => c.url === slug[1])
        if (!kortet) {
            return (
                <main>
                    <h1>404</h1>
                </main>
            )
        }

        return <TrelloKortRendring kortet={kortet} />
    }
    return (
        <main>
            <h1>404 rart sted</h1>
        </main>
    )
}
