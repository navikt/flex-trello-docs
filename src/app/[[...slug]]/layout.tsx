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
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
    params: { slug?: string[] }
}): Promise<ReactElement> {
    await verifyUserLoggedIn()
    const list = await hentTrelloKort(process.env['TRELLO_BOARD'])
    const førsteListe = list[0]
    const deAndreListene = list.slice(1)

    return (
        <html lang="en">
            <head>
                <title>{førsteListe.cards[0].name}</title>
                <meta name="robots" content="noindex" />
            </head>
            <body>
                <div className="min-h-screen bg-gray-100 flex">
                    <div className="w-[22rem] bg-white py-10 pl-10 pr-5 shadow-md space-y-4">
                        <AkselLink className="block font-extrabold" underline={false} as={Link} href="/">
                            {førsteListe.cards[0].name}
                        </AkselLink>
                        <AkselLink className="block" underline={false} as={Link} href="/okr-board/">
                            OKR Board
                        </AkselLink>
                        {førsteListe.cards.map((l, index) => {
                            if (index === 0) return null
                            return (
                                <AkselLink className="block" underline={false} as={Link} key={l.id} href={'/' + l.url}>
                                    {l.name}
                                </AkselLink>
                            )
                        })}
                        {deAndreListene.map((l) => (
                            <ReadMore header={l.name} key={l.id}>
                                {l.cards.map((c) => (
                                    <AkselLink
                                        className="block pl-4"
                                        underline={false}
                                        as={Link}
                                        key={l.id}
                                        href={'/' + l.url + '/' + c.url}
                                    >
                                        {c.name}
                                    </AkselLink>
                                ))}
                            </ReadMore>
                        ))}

                        <ReadMore header="Apper">
                            <div className=" space-y-2">
                                {apper
                                    .map((c) => c.name)
                                    .sort()
                                    .map((c, idx) => (
                                        <AkselLink
                                            className="block pl-4"
                                            underline={false}
                                            as={Link}
                                            key={idx}
                                            href={'/' + 'apper' + '/' + c}
                                        >
                                            {c}
                                        </AkselLink>
                                    ))}
                            </div>
                        </ReadMore>
                    </div>
                    <div className="flex-1 max-w-5xl mx-auto p-10">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
