import '../../styles/globals.css'
import { ReactElement } from 'react'
import Link from 'next/link'

import apper from '../../apper.json'

import { hentTrelloKort, urlFriendly } from '@/trello/trelloClient'
import { AkselLink, ReadMore } from '@/components/clientAksel'
import { verifyUserLoggedIn } from '@/auth/authentication'
import { arraysAreEqual } from '@/utlis/arrayEqual'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Lenke {
    name: string
    url: string
    mapper: string[]
    urlMapper: string[]
    mappe?: string
}

function LenkeRendring({ lenker, slug, aktiv }: { lenker: Lenke[]; slug: string[]; aktiv: boolean }): ReactElement {
    const underlenker = lenker
        .filter((l) => l.mapper.length > 0)
        .map((l) => {
            return {
                ...l,
                mapper: l.mapper.slice(1),
                mappe: l.mapper[0],
            }
        })
        .reduce((acc: Map<string, Lenke[]>, obj: Lenke) => {
            const categoryList = acc.get(obj.mappe!) || []
            categoryList.push(obj)
            acc.set(obj.mappe!, categoryList)
            return acc
        }, new Map<string, Lenke[]>())

    // grupper undermapper basert på mapper

    return (
        <>
            {lenker.map((l, index) => {
                if (l.mapper.length !== 0) return null

                function bold(): boolean {
                    if (!aktiv) {
                        return false
                    }
                    if (l.url === '/' && slug.length === 0) {
                        return true
                    }

                    const urlSplittet = l.url.split('/').filter((s) => s.length > 0)

                    return arraysAreEqual(urlSplittet, slug)
                }

                return (
                    <AkselLink
                        className={`block${bold() ? ' font-bold' : ''}`}
                        underline={false}
                        as={Link}
                        key={index}
                        href={l.url}
                    >
                        {l.name}
                    </AkselLink>
                )
            })}

            {Array.from(underlenker.keys()).map((k, i) => {
                const aktiv = urlFriendly(k) == slug[0]
                return (
                    <ReadMore header={k} key={i} defaultOpen={aktiv}>
                        <LenkeRendring lenker={underlenker.get(k)!} slug={slug} aktiv={aktiv} />
                    </ReadMore>
                )
            })}
        </>
    )
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { slug?: string[] }
}): Promise<ReactElement> {
    await verifyUserLoggedIn()
    const list = await hentTrelloKort(process.env['TRELLO_BOARD'])

    const lenker = [] as Lenke[]

    lenker.push({
        name: list[0].cards[0].name,
        url: '/',
        mapper: [],
        urlMapper: [],
    })
    lenker.push({
        name: 'OKR Board',
        url: '/okr-board/',
        mapper: [],
        urlMapper: [],
    })
    list[0].cards.forEach((c, i) => {
        if (i > 0)
            lenker.push({
                name: c.name,
                url: c.url,
                mapper: [],
                urlMapper: [],
            })
    })
    list.slice(1).forEach((l) => {
        l.cards.forEach((c) => {
            lenker.push({
                name: c.name,
                url: c.url,
                mapper: c.mapper,
                urlMapper: c.urlMapper,
            })
        })
    })
    apper
        .map((c) => c.name)
        .sort()
        .forEach((a) => {
            lenker.push({
                name: a,
                url: '/apper/' + a,
                mapper: ['Apper'],
                urlMapper: ['apper'],
            })
        })

    return (
        <html lang="en">
            <head>
                <title>{list[0].cards[0].name}</title>
                <meta name="robots" content="noindex" />
            </head>
            <body>
                <div className="min-h-screen bg-gray-100 flex">
                    <div className="w-[22rem] bg-white py-10 pl-10 pr-5 shadow-md space-y-4">
                        <LenkeRendring lenker={lenker} slug={params.slug || []} aktiv={true} />
                    </div>
                    <div className="flex-1 max-w-5xl mx-auto p-10">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
