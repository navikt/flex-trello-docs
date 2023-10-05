import '../../../styles/globals.css'
import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'
import { verifyUserLoggedIn } from '@/auth/authentication'
import { OkrLayoutMenu } from '@/components/okrLayoutMenu'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    await verifyUserLoggedIn()

    const okrList = await hentTrelloKort(process.env['TRELLO_OKR_BOARD'])
    const dokumentasjonList = await hentTrelloKort(process.env['TRELLO_BOARD'])

    return (
        <html lang="en">
            <head>
                <title>OKR</title>
                <meta name="robots" content="noindex" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body>
                <div className="min-h-screen flex">
                    <OkrLayoutMenu okrList={okrList} dokumentasjonList={dokumentasjonList} />

                    <div className="flex-1 max-w-5xl mx-auto p-10">
                        <main>{children}</main>
                    </div>
                </div>
            </body>
        </html>
    )
}
