import React, { ReactElement } from 'react'

import { ListMedCards, TrelloCard } from '@/trello/trelloClient'
import { Heading } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'

function EnkeltKvadrat({ kortet, height, width }: { kortet: TrelloCard; height: string; width: string }): ReactElement {
    return (
        <div className={`flex-item border border-gray-200 bg-gray-50 ${width} ${height}`}>
            <Heading level="2" size="medium" className="bg-blue-100 p-4" spacing>
                {kortet.name}
            </Heading>
            <div className="px-4">
                <MarkdownAksel kortet={kortet} />
            </div>
        </div>
    )
}

export function OkrKortRendring({
    list,
    height,
    width,
}: {
    list: ListMedCards
    height: string
    width: string
}): ReactElement {
    return (
        <>
            <div className="flex justify-center">
                <Heading size="large" spacing>
                    {list.name}
                </Heading>
            </div>
            <div className="flex justify-center">
                <EnkeltKvadrat kortet={list.cards[0]} height={height} width={width} />
                <EnkeltKvadrat kortet={list.cards[1]} height={height} width={width} />
            </div>
            <div className="flex justify-center">
                <EnkeltKvadrat kortet={list.cards[2]} height={height} width={width} />
                <EnkeltKvadrat kortet={list.cards[3]} height={height} width={width} />
            </div>
        </>
    )
}
