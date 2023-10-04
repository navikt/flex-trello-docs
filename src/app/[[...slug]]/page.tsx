import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { TrelloKortRendring } from '@/components/trelloKortRendring'
import { GithubRepoReadme } from '@/components/githubRepoReadme'

export default async function Docs({ params }: { params: { slug?: string[] } }): Promise<ReactElement> {
    const list = await hentTrelloKort(process.env['TRELLO_BOARD'])

    const slug = params.slug
    if (!slug) {
        return <TrelloKortRendring kortet={list[0].cards[0]} />
    }

    if (slug.length == 1) {
        const kortet = list[0].cards.find((c) => c.url === slug[0])
        if (!kortet) {
            return (
                <main>
                    <h1>404</h1>
                </main>
            )
        }

        return <TrelloKortRendring kortet={kortet} />
    }
    if (slug[0] == 'apper') {
        return <GithubRepoReadme repo={slug[1]} />
    }
    const lista = list.find((k) => k.url === slug[0])

    if (!lista) {
        return (
            <main>
                <h1>404 fant ikke liste</h1>
            </main>
        )
    }
    if (slug.length == 2) {
        const kortet = lista.cards.find((c) => c.url === slug[1])
        if (!kortet) {
            return (
                <main>
                    <h1>404 fant ikke kort</h1>
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
