import { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { TrelloCard } from '@/trello/trelloClient'
import { BodyLong, Heading } from '@/components/clientAksel'

export function TrelloKortRendring({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
        <>
            <h1>{kortet.name}</h1>
            <MDXRemote
                source={kortet.desc}
                components={{
                    p: (props) => <BodyLong>{props.children}</BodyLong>,
                    h2: (props) => (
                        <Heading size="medium" level="2">
                            {props.children}
                        </Heading>
                    ),
                    h3: (props) => (
                        <Heading size="small" level="3">
                            {props.children}
                        </Heading>
                    ),
                }}
            />
        </>
    )
}
