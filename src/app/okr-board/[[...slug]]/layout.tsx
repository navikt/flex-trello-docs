import '../../../styles/globals.css'
import { ReactElement } from 'react'
import Link from 'next/link'

import { hentTrelloKort } from '@/trello/trelloClient'
import { AkselLink } from '@/components/clientAksel'
import { verifyUserLoggedIn } from '@/auth/authentication'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    await verifyUserLoggedIn()

    const list = await hentTrelloKort(process.env['TRELLO_OKR_BOARD'])
    const dokumentasjonList = await hentTrelloKort(process.env['TRELLO_BOARD'])

    return (
        <html lang="en">
            <head>
                <title>{list[0].cards[0].name}</title>
                <meta name="robots" content="noindex" />
            </head>
            <body>
                <div className="min-h-screen flex">
                    <div className="w-[22rem] bg-white py-10 pl-10 pr-5 shadow-md space-y-4">
                        <AkselLink className="block}" underline={false} as={Link} href="/">
                            {dokumentasjonList[0].cards[0].name}
                        </AkselLink>
                        {list.map((l, index) => {
                            const first = index === 0
                            const url = first ? '/okr-board/' : '/okr-board/' + l.url
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
                    </div>
                    <div className="flex-1 max-w-5xl mx-auto p-10">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
