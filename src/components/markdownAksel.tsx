import React, { ReactElement } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

import { AkselLink, AkselList, AkselListItem, BodyLong, Heading } from '@/components/clientAksel'

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
                pre: (props) => <pre className="p-4 bg-gray-300 mb-4 rounded-xl" {...props} />,
                code: (props) => <code className="bg-gray-300 p-0.5 rounded" {...props} />,
            }}
        />
    )
}
