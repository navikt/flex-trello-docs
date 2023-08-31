import React, { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

import { TrelloCard } from '@/trello/trelloClient'
import { AkselLink, AkselList, AkselListItem, BodyLong, EditIcon, Heading } from '@/components/clientAksel'

export function TrelloKortRendring({ kortet }: { kortet: TrelloCard }): ReactElement {
    return (
        <>
            <Heading size="large" spacing>
                {kortet.name}{' '}
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
            <AkselLink as={Link} className="text-gray-500" target="_blank" underline={false} href={kortet.shortUrl}>
                {'Sist redigert ' + kortet.dateLastActivity.slice(0, 10)}{' '}
                <EditIcon className="inline" title="a11y-title" fontSize="1.5rem" />
            </AkselLink>
        </>
    )
}
