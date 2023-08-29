import Image from 'next/image'
import {hentTrelloKort} from "@/trello/trelloClient";

export default async function Docs({params}: { params: { slug: string[] } }) {

    const kort = await hentTrelloKort()
    return (
        <main>
            {kort.map(k => <div className={"pl-4"} key={k.id}>{k.name}
                {k.cards.map(c => <div className={"pl-4"} key={c.id}>{c.name}</div>)}

            </div>)}
        </main>
    )
}

