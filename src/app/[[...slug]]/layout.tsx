import '../../styles/globals.css'
import { ReactElement } from 'react'
import Link from 'next/link'

import apper from '../../apper.json'

import { hentTrelloKort } from '@/trello/trelloClient'
import { AkselLink, ReadMore } from '@/components/clientAksel'
import { verifyUserLoggedIn } from '@/auth/authentication'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Lenke {
    name: string
    url: string
    mapper: string[]
    mappe?: string
}

function LenkeRendring({ lenker }: { lenker: Lenke[] }): ReactElement {
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

                return (
                    <AkselLink className="block" underline={false} as={Link} key={index} href={l.url}>
                        {l.name}
                    </AkselLink>
                )
            })}

            {Array.from(underlenker.keys()).map((k, i) => {
                return (
                    <ReadMore header={k} key={i}>
                        <LenkeRendring lenker={underlenker.get(k)!} />
                    </ReadMore>
                )
            })}
        </>
    )
}

export default async function RootLayout({
    children,
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
    })
    lenker.push({
        name: 'OKR Board',
        url: '/okr-board/',
        mapper: [],
    })
    list[0].cards.forEach((c, i) => {
        if (i > 0)
            lenker.push({
                name: c.name,
                url: c.url,
                mapper: [],
            })
    })
    list.slice(1).forEach((l) => {
        l.cards.forEach((c) => {
            lenker.push({
                name: c.name,
                url: l.url + '/' + c.url,
                mapper: [l.name],
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
                        <LenkeRendring lenker={lenker} />
                    </div>
                    <div className="flex-1 max-w-5xl mx-auto p-10">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
