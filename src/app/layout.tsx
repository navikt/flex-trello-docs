import '../styles/globals.css'
import { ReactElement } from 'react'
import Link from 'next/link'

import { hentTrelloKort } from '@/trello/trelloClient'
import { AkselLink, Label } from '@/components/clientAksel'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    const list = await hentTrelloKort()
    const førsteListe = list[0]
    const deAndreListene = list.slice(1)

    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gray-100 flex">
                    <div className="w-[22rem] bg-white py-10 pl-10 pr-5 shadow-md space-y-4">
                        {førsteListe.cards.map((l, index) => {
                            const first = index === 0
                            const url = first ? '/' : '/' + l.url
                            return (
                                <AkselLink
                                    className={`block${first ? ' font-extrabold' : ''}`}
                                    underline={false}
                                    as={Link}
                                    key={l.id}
                                    href={url}
                                >
                                    {l.name}
                                </AkselLink>
                            )
                        })}
                        {deAndreListene.map((l) => (
                            <div key={l.id} className=" space-y-2">
                                <Label as="p">{l.name}</Label>
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
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 max-w-5xl mx-auto p-10">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
