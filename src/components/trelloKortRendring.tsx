import { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { TrelloCard } from '@/trello/trelloClient'
import { BodyLong, Heading } from '@/components/clientAksel'

export function TrelloKortRendring({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
        <>
            <Heading size="large" spacing>
                {kortet.name}
            </Heading>
            <MDXRemote
                source={kortet.desc}
                components={{
                    p: (props) => <BodyLong spacing>{props.children}</BodyLong>,
                    h2: (props) => (
                        <Heading size="medium" level="2" spacing>
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
