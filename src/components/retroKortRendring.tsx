import React, { ReactElement } from 'react'
import Link from 'next/link'

import { ListMedCards } from '@/trello/trelloClient'
import { Heading, AkselLink, EditIcon } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'

export function RetroKortRendring({ list }: { list: ListMedCards }): ReactElement {
    return (
        <>
            <div className="flex justify-center">
                <Heading size="large" spacing>
                    {list.name}
                </Heading>
            </div>
            <div className="p-4 bg-gray-100 mt-4">
                <Heading level="2" size="medium" spacing>
                    <div className="flex justify-between">Diskusjonspunkter:</div>
                </Heading>

                {list.cards.map((card, index) => (
                    <div key={index} className="mt-8">
                        <Heading size="small" level="3">
                            {card.name}{' '}
                        </Heading>
                        <MarkdownAksel md={card.desc} />
                        <div>
                            Ansvarlig:{' '}
                            {card.members && card.members.length > 0 ? card.members.join(', ') : 'Hele teamet'}
                        </div>
                        <AkselLink
                            as={Link}
                            className="text-gray-500"
                            target="_blank"
                            underline={false}
                            href={card.shortUrl}
                        >
                            {'Sist redigert ' + card.dateLastActivity.slice(0, 10)}{' '}
                            <EditIcon className="inline" title="a11y-title" fontSize="1.5rem" />
                        </AkselLink>
                    </div>
                ))}
            </div>
        </>
    )
}
