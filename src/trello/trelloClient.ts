interface TrelloList {
    id: string
    name: string
    url: string
}

export interface TrelloCard {
    id: string
    name: string
    url: string
    desc: string
    idList: string
    shortUrl: string
    dateLastActivity: string
}

export interface ListMedCards extends TrelloList {
    cards: TrelloCard[]
}

const token = process.env['TRELLO_TOKEN']
const key = process.env['TRELLO_KEY']
const revalidateSeconds = 2

async function hentTrellokort(board: string | undefined): Promise<TrelloCard[]> {
    if (!board || !token || !key) {
        throw Error('Missing trello envs ')
    }
    const a = await fetch(`https://api.trello.com/1/boards/${board}/cards?key=${key}&token=${token}`, {
        next: { revalidate: revalidateSeconds },
    })
    return await a.json()
}

async function hentTrelloLister(board: string | undefined): Promise<TrelloList[]> {
    if (!board || !token || !key) {
        throw Error('Missing trello envs ')
    }
    const a = await fetch(`https://api.trello.com/1/boards/${board}/lists?key=${key}&token=${token}`, {
        next: { revalidate: revalidateSeconds },
    })
    return await a.json()
}

export function urlFriendly(str: string): string {
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replaceAll('?', '')
        .replaceAll('æ', 'a')
        .replaceAll('ø', 'o')
        .replaceAll('å', 'a')
}

export async function hentTrelloKort(board: string | undefined): Promise<ListMedCards[]> {
    const kort = await hentTrellokort(board)
    const lister = await hentTrelloLister(board)
    const listerMedKort = lister.map((liste) => {
        return {
            ...liste,
            url: urlFriendly(liste.name),
            cards: kort
                .filter((k) => k.idList === liste.id)
                .map((k) => {
                    return {
                        ...k,
                        url: urlFriendly(k.name),
                    }
                }),
        }
    })
    return listerMedKort
}
