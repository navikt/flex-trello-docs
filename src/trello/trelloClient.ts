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
    mapper: string[]
    urlMapper: string[]
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
        .replaceAll('æ', 'a')
        .replaceAll('ø', 'o')
        .replaceAll('å', 'a')
        .replace(/[^a-zA-Z0-9-]/g, '')
}

export async function hentTrelloKort(board: string | undefined): Promise<ListMedCards[]> {
    const kort = await hentTrellokort(board)
    const lister = await hentTrelloLister(board)
    const listerMedKort = lister.map((liste, i) => {
        return {
            ...liste,
            url: urlFriendly(liste.name),
            cards: kort
                .filter((k) => k.idList === liste.id)
                .map((k, j) => {
                    const splittetNavn = k.name.split('/').map((s) => s.trim())
                    const siste = splittetNavn.pop() || ''

                    const mapper = [] as string[]
                    if (i > 0) {
                        mapper.push(liste.name)
                    }
                    mapper.push(...splittetNavn)

                    function url(): string {
                        if (i == 0 && j == 0) {
                            return '/'
                        }
                        return '/' + [...mapper, siste].map((m) => urlFriendly(m)).join('/')
                    }

                    return {
                        ...k,
                        name: siste,
                        url: url(),
                        mapper: mapper,
                        urlMapper: mapper.map((m) => urlFriendly(m)),
                    }
                }),
        }
    })
    return listerMedKort
}
