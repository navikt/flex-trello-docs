import React, { ReactElement } from 'react'

import { ListMedCards, TrelloCard } from '@/trello/trelloClient'
import { Heading } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'

function EnkeltKvadrat({ kortet, infoskjerm }: { kortet: TrelloCard; infoskjerm?: boolean }): ReactElement {
    const klasser = infoskjerm ? 'w-[50vw] h-[50vh]' : 'w-[30rem] h-[30rem]'
    const padding = infoskjerm ? 'p-9' : 'p-4'
    return (
        <div className={`flex-item border border-gray-200 bg-gray-50 ${klasser}`}>
            <Heading level="2" size="medium" className={`bg-blue-100 ${padding}`} spacing>
                {kortet.name}
            </Heading>
            <div className={padding}>
                <MarkdownAksel kortet={kortet} />
            </div>
        </div>
    )
}

export function OkrKortRendring({ list, infoskjerm }: { list: ListMedCards; infoskjerm?: boolean }): ReactElement {
    return (
        <>
            {!infoskjerm && (
                <div className="flex justify-center">
                    <Heading size="large" spacing>
                        {list.name}
                    </Heading>
                </div>
            )}
            <div className="flex justify-center">
                <EnkeltKvadrat kortet={list.cards[0]} infoskjerm={infoskjerm} />
                <EnkeltKvadrat kortet={list.cards[1]} infoskjerm={infoskjerm} />
            </div>
            <div className="flex justify-center">
                <EnkeltKvadrat kortet={list.cards[2]} infoskjerm={infoskjerm} />
                <EnkeltKvadrat kortet={list.cards[3]} infoskjerm={infoskjerm} />
            </div>
        </>
    )
}
