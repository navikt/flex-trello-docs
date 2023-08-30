import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ReactElement } from 'react'

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

        return (
            <main className="p-10">
                <h1>{kortet.name}</h1>
                <MDXRemote
                    source={kortet.desc}
                    components={{
                        p: (props) => <p {...props} className="mb-0" />,
                        h3: (props) => <p {...props} className="text-red-500" />,
                    }}
                />
            </main>
        )
    }
    return (
        <main>
            <h1>404 rart sted</h1>
        </main>
    )
}
