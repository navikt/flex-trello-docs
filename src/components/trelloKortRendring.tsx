import React, { ReactElement } from 'react'
import Link from 'next/link'

import { TrelloCard } from '@/trello/trelloClient'
import { AkselLink, EditIcon, Heading } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'

export function TrelloKortRendring({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
        <>
            <Heading size="large" spacing>
                {kortet.name}{' '}
            </Heading>

            <MarkdownAksel kortet={kortet} />
            <AkselLink as={Link} className="text-gray-500" target="_blank" underline={false} href={kortet.shortUrl}>
                {'Sist redigert ' + kortet.dateLastActivity.slice(0, 10)}{' '}
                <EditIcon className="inline" title="a11y-title" fontSize="1.5rem" />
            </AkselLink>
        </>
    )
}
