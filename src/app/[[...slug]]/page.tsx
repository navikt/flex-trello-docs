import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { TrelloKortRendring } from '@/components/trelloKortRendring'
import { GithubRepoReadme } from '@/components/githubRepoReadme'

export default async function Docs({ params }: { params: { slug?: string[] } }): Promise<ReactElement> {
    const list = await hentTrelloKort(process.env['TRELLO_BOARD'])

    const slug = params.slug || []

    const flatCards = list.flatMap((l) => l.cards)

    if (slug.length > 0 && slug[0] == 'apper') {
        return <GithubRepoReadme repo={slug[1]} />
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
