import Link from 'next/link'
import { ReactElement } from 'react'

import { hentTrelloKort } from '@/trello/trelloClient'

export default async function Home(): Promise<ReactElement> {
    const list = await hentTrelloKort()

    return (
        <main className="p-10">
            {list.map((l) => (
                <div key={l.id}>
                    <Link className="text-blue-800" href={l.url}>
                        {l.name}
                    </Link>
                </div>
            ))}
        </main>
    )
}
