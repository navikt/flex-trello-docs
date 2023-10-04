import React, { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

import { AkselLink, AkselList, AkselListItem, BodyLong, Heading, LinkIcon } from '@/components/clientAksel'
import { Bilde } from '@/components/bilde'
import { urlFriendly } from '@/trello/trelloClient'

export function MarkdownAksel({ md }: { md: string }): ReactElement {
    return (
        <MDXRemote
            source={md}
            components={{
                p: (props) => {
                    // eslint-disable-next-line
                    const renderChildren = (): any => {
                        if (Array.isArray(props.children)) {
                            return props.children.map((child, index) => {
                                if (typeof child === 'string') {
                                    const parts = child.split('\n').map((part, idx) =>
                                        idx === 0 ? (
                                            part
                                        ) : (
                                            <>
                                                <br />
                                                {part}
                                            </>
                                        ),
                                    )
                                    return <React.Fragment key={index}>{parts}</React.Fragment>
                                }
                                return child
                            })
                        } else if (typeof props.children === 'string') {
                            const parts = props.children.split('\n').map((part, idx) =>
                                idx === 0 ? (
                                    part
                                ) : (
                                    <>
                                        <br />
                                        {part}
                                    </>
                                ),
                            )
                            return parts
                        }
                        return props.children
                    }
                    return <BodyLong spacing>{renderChildren()}</BodyLong>
                },
                h1: (props) => <Tittel level="1">{props.children}</Tittel>,
                h2: (props) => <Tittel level="2">{props.children}</Tittel>,
                h3: (props) => <Tittel level="3">{props.children}</Tittel>,
                h4: (props) => <Tittel level="4">{props.children}</Tittel>,
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
                img: (props) => <Bilde {...props} />,
                li: (props) => <AkselListItem>{props.children}</AkselListItem>,
                pre: (props) => <pre className="p-4 bg-gray-200 mb-4 rounded-xl" {...props} />,
                code: (props) => <span className="bg-gray-200" {...props} />,
            }}
        />
    )
}

function Tittel(props: { children: React.ReactNode; level: '1' | '2' | '3' | '4' }): ReactElement {
    const anker = urlFriendly(props.children ? props.children.toString() : '')
    return (
        <Heading id={anker} level={props.level} size={props.level == '1' ? 'large' : 'medium'} spacing>
            {props.children}
            <a href={'#' + anker}>
                <LinkIcon className="inline ml-2" title="a11y-title" fontSize="1.5rem" />
            </a>
        </Heading>
    )
}
