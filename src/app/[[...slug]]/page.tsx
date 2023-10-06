import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { TrelloKortRendring } from '@/components/trelloKortRendring'
import { GithubRepoReadme } from '@/components/githubRepoReadme'
import { OkrKortRendring } from '@/components/okrKortRendring'

export default async function Docs({ params }: { params: { slug?: string[] } }): Promise<ReactElement> {
    const list = await hentTrelloKort(process.env['TRELLO_BOARD'])

    const slug = params.slug || []

    const flatCards = list.flatMap((l) => l.cards)

    if (slug.length > 0 && slug[0] == 'apper') {
        return <GithubRepoReadme repo={slug[1]} />
    }

    if (slug.length > 0 && slug[0] == 'okr-board') {
        const okrkortene = await hentTrelloKort(process.env['TRELLO_OKR_BOARD'])
        const kortet = slug.length > 1 ? okrkortene.find((k) => k.url === slug[1]) : okrkortene[0]
        if (kortet) {
            return <OkrKortRendring list={kortet} />
        }
    }

    const urlFraSlug = '/' + slug.join('/')
    const kortet = flatCards.find((c) => c.url === urlFraSlug)

    if (kortet) {
        return <TrelloKortRendring kortet={kortet} />
    }

    return (
        <main>
            <h1>404 rart sted</h1>
        </main>
    )
}
