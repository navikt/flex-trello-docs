import '../styles/globals.css'
import { ReactElement } from 'react'
import Link from 'next/link'

import { hentTrelloKort } from '@/trello/trelloClient'
import { Label } from '@/components/clientAksel'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    const list = await hentTrelloKort()
    const førsteListe = list[0]
    const deAndreListene = list.slice(1)

    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gray-100 flex">
                    <div className="w-80 bg-white p-4 shadow-md space-y-4">
                        <Link className="navds-link block" href="/">
                            {førsteListe.cards[0].name}
                        </Link>
                        {deAndreListene.map((l) => (
                            <div key={l.id} className=" space-y-2">
                                <Label as="p">{l.name}</Label>
                                {l.cards.map((c) => (
                                    <Link className="navds-link block pl-4" key={c.id} href={'/' + l.url + '/' + c.url}>
                                        {c.name}
                                    </Link>
                                ))}
                                <Link className="text-blue-800" href={l.url}></Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 max-w-5xl mx-auto p-4">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
