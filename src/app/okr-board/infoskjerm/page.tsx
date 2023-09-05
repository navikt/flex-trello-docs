import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { OkrKortRendring } from '@/components/okrKortRendring'

export default async function Docs(): Promise<ReactElement> {
    const list = await hentTrelloKort(process.env['TRELLO_OKR_BOARD'])

    return <OkrKortRendring noHeading={true} list={list[0]} width="w-[50vw]" height="h-[50vh]" />
}
