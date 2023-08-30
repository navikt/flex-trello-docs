import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ReactElement } from 'react'
import { MDXComponents } from 'mdx/types'

import { hentTrelloKort } from '@/trello/trelloClient'

export default async function Docs({ params }: { params: { slug: string[] } }): Promise<ReactElement> {
    const list = await hentTrelloKort()
    const lista = list.find((k) => k.url === params.slug[0])

    if (!lista) {
        return (
            <main>
                <h1>404 fant ikke liste</h1>
            </main>
        )
    }
    if (params.slug.length == 1) {
        return (
            <main>
                <h1>{lista.name}</h1>
                {lista.cards.map((c) => (
                    <div key={c.id}>
                        <Link className="text-blue-800" href={lista.url + '/' + c.url}>
                            {c.name}
                        </Link>
                    </div>
                ))}
            </main>
        )
    }

    if (params.slug.length == 2) {
        const kortet = lista.cards.find((c) => c.url === params.slug[1])
        if (!kortet) {
            return (
                <main>
                    <h1>404</h1>
                </main>
            )
        }
        const overrides = (components: MDXComponents): MDXComponents => {
            console.log('JEg blir kjørt')
            return {
                // Allows customizing built-in components, e.g. to add styling.
                h1: ({ children }) => <h3 className="text-red-500">{children}</h3>,
                h3: ({ children }) => <h5 className="text-red-500">{children}</h5>,
                ...components,
            }
        }

        return (
            <main className="p-10">
                <h1>{kortet.name}</h1>
                <MDXRemote source={kortet.desc} components={overrides} />
            </main>
        )
    }
    return (
        <main>
            <h1>404 rart sted</h1>
        </main>
    )
}
