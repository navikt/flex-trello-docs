import './globals.css'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    const list = await hentTrelloKort()

    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
