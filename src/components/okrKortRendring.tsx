import React, { ReactElement } from 'react'

import { ListMedCards, TrelloCard } from '@/trello/trelloClient'
import { Heading } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'

function EnkeltKvadrat({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
        <div className="w-1/2 h-1/2 border border-gray-200 bg-gray-50 ">
            <Heading level="2" size="medium" className="bg-blue-100 p-4" spacing>
                {kortet.name}
            </Heading>
            <div className="px-4">
                <MarkdownAksel kortet={kortet} />
            </div>
        </div>
    )
}

export function OkrKortRendring({ list }: { list: ListMedCards }): ReactElement {
    return (
        <>
            <Heading size="large" spacing>
                {list.name}
            </Heading>
            <div className="w-100 h-[50rem] flex flex-wrap ">
                <EnkeltKvadrat kortet={list.cards[0]} />
                <EnkeltKvadrat kortet={list.cards[1]} />
                <EnkeltKvadrat kortet={list.cards[2]} />
                <EnkeltKvadrat kortet={list.cards[3]} />
            </div>
        </>
    )
}
