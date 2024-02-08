import React, { ReactElement } from 'react'

import { TrelloCard } from '@/trello/trelloClient'
import { Heading } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'
import { EditButton } from '@/components/EditBurron'

export function TrelloKortRendring({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
        <>
            <Heading size="large" spacing>
                {kortet.name}{' '}
            </Heading>

            <MarkdownAksel md={kortet.desc} />
            <EditButton kortet={kortet} />
        </>
    )
}
