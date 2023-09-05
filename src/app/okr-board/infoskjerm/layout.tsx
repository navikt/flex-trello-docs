import '../../../styles/globals.css'
import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { verifyUserLoggedIn } from '@/auth/authentication'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    await verifyUserLoggedIn()

    const list = await hentTrelloKort(process.env['TRELLO_OKR_BOARD'])

    return (
        <html lang="en">
            <head>
                <title>{list[0].cards[0].name}</title>
                <meta name="robots" content="noindex" />
            </head>
            <body>
                <main className="py-20 px-20">{children}</main>
            </body>
        </html>
    )
}
