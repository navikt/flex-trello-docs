import React, { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

import { AkselLink, AkselList, AkselListItem, BodyLong, Heading } from '@/components/clientAksel'
import { TrelloCard } from '@/trello/trelloClient'

export function MarkdownAksel({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
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
                a: (props) => (
                    <AkselLink underline={false} target="_blank" as={Link} href={props.href}>
                        {props.children}
                    </AkselLink>
                ),
                ul: (props) => (
                    <AkselList as="ul" size="small">
                        {props.children}
                    </AkselList>
                ),
                ol: (props) => (
                    <AkselList as="ol" size="small">
                        {props.children}
                    </AkselList>
                ),
                li: (props) => <AkselListItem>{props.children}</AkselListItem>,
            }}
        />
    )
}
