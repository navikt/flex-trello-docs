import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { OkrKortRendring } from '@/components/okrKortRendring'

export default async function Docs({ params }: { params: { slug?: string[] } }): Promise<ReactElement> {
    const list = await hentTrelloKort(process.env['TRELLO_OKR_BOARD'])

    const slug = params.slug
    if (!slug) {
        return <OkrKortRendring list={list[0]} />
    }

    if (slug.length == 1) {
        const lista = list.find((k) => k.url === slug[0])
        if (!lista) {
            return (
                <main>
                    <h1>404 fant ikke kort</h1>
                </main>
            )
        }

        return <OkrKortRendring list={lista} />
    }

    return (
        <main>
            <h1>404 rart sted</h1>
        </main>
    )
}
