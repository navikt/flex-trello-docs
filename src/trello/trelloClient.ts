interface TrelloList {
    id: string,
    name: string,
}

interface TrelloCard {
    name: string,
    desc: string,
    idList: string,
}
interface ListMedCards extends TrelloList {
    cards: TrelloCard[]
}
export async function hentTrelloKort() {



    const lister = [
        {
            "id": "64ecc959a96d559c088517e1",
            "name": "teknisk",
            "closed": false,
            "idBoard": "64ecc94f8e6953971bf8211a",
            "pos": 65535,
            "subscribed": false,
            "softLimit": null,
            "status": null
        },
        {
            "id": "64ecc95c24b33a18a23e0a70",
            "name": "ADR",
            "closed": false,
            "idBoard": "64ecc94f8e6953971bf8211a",
            "pos": 131071,
            "subscribed": false,
            "softLimit": null,
            "status": null
        },
        {
            "id": "64ecc975f9d8ac673948c065",
            "name": "prossess",
            "closed": false,
            "idBoard": "64ecc94f8e6953971bf8211a",
            "pos": 196607,
            "subscribed": false,
            "softLimit": null,
            "status": null
        }
    ]

    const kort = [
        {
            "id": "64ecc99710b707f3a5c74cc5",
            "badges": {
                "attachmentsByType": {
                    "trello": {
                        "board": 0,
                        "card": 0
                    }
                },
                "location": false,
                "votes": 0,
                "viewingMemberVoted": false,
                "subscribed": false,
                "fogbugz": "",
                "checkItems": 0,
                "checkItemsChecked": 0,
                "checkItemsEarliestDue": null,
                "comments": 0,
                "attachments": 0,
                "description": false,
                "due": null,
                "dueComplete": false,
                "start": null
            },
            "checkItemStates": [],
            "closed": false,
            "dueComplete": false,
            "dateLastActivity": "2023-08-28T16:21:43.625Z",
            "desc": "",
            "descData": {
                "emoji": {}
            },
            "due": null,
            "dueReminder": null,
            "email": null,
            "idBoard": "64ecc94f8e6953971bf8211a",
            "idChecklists": [],
            "idList": "64ecc959a96d559c088517e1",
            "idMembers": [],
            "idMembersVoted": [],
            "idShort": 2,
            "idAttachmentCover": null,
            "labels": [],
            "idLabels": [],
            "manualCoverAttachment": false,
            "name": "gcp",
            "pos": 65535,
            "shortLink": "1pzZqwla",
            "shortUrl": "https://trello.com/c/1pzZqwla",
            "start": null,
            "subscribed": false,
            "url": "https://trello.com/c/1pzZqwla/2-gcp",
            "cover": {
                "idAttachment": null,
                "color": null,
                "idUploadedBackground": null,
                "size": "normal",
                "brightness": "dark",
                "idPlugin": null
            },
            "isTemplate": false,
            "cardRole": null
        },
        {
            "id": "64ecc99eb916c9fd796b7a64",
            "badges": {
                "attachmentsByType": {
                    "trello": {
                        "board": 0,
                        "card": 0
                    }
                },
                "location": false,
                "votes": 0,
                "viewingMemberVoted": false,
                "subscribed": false,
                "fogbugz": "",
                "checkItems": 0,
                "checkItemsChecked": 0,
                "checkItemsEarliestDue": null,
                "comments": 0,
                "attachments": 0,
                "description": true,
                "due": null,
                "dueComplete": false,
                "start": null
            },
            "checkItemStates": [],
            "closed": false,
            "dueComplete": false,
            "dateLastActivity": "2023-08-28T16:22:09.137Z",
            "desc": "# stor tittel",
            "descData": {
                "emoji": {}
            },
            "due": null,
            "dueReminder": null,
            "email": null,
            "idBoard": "64ecc94f8e6953971bf8211a",
            "idChecklists": [],
            "idList": "64ecc959a96d559c088517e1",
            "idMembers": [],
            "idMembersVoted": [],
            "idShort": 3,
            "idAttachmentCover": null,
            "labels": [],
            "idLabels": [],
            "manualCoverAttachment": false,
            "name": "prodansvar",
            "pos": 131071,
            "shortLink": "18DtXPGt",
            "shortUrl": "https://trello.com/c/18DtXPGt",
            "start": null,
            "subscribed": false,
            "url": "https://trello.com/c/18DtXPGt/3-prodansvar",
            "cover": {
                "idAttachment": null,
                "color": null,
                "idUploadedBackground": null,
                "size": "normal",
                "brightness": "dark",
                "idPlugin": null
            },
            "isTemplate": false,
            "cardRole": null
        },
        {
            "id": "64ecc978bd5a1f3eaf86ac6d",
            "badges": {
                "attachmentsByType": {
                    "trello": {
                        "board": 0,
                        "card": 0
                    }
                },
                "location": false,
                "votes": 0,
                "viewingMemberVoted": false,
                "subscribed": false,
                "fogbugz": "",
                "checkItems": 0,
                "checkItemsChecked": 0,
                "checkItemsEarliestDue": null,
                "comments": 0,
                "attachments": 0,
                "description": true,
                "due": null,
                "dueComplete": false,
                "start": null
            },
            "checkItemStates": [],
            "closed": false,
            "dueComplete": false,
            "dateLastActivity": "2023-08-28T16:21:34.618Z",
            "desc": "**Vi har trello**\n\ndette er _italic_\n\n### heading 3",
            "descData": {
                "emoji": {}
            },
            "due": null,
            "dueReminder": null,
            "email": null,
            "idBoard": "64ecc94f8e6953971bf8211a",
            "idChecklists": [],
            "idList": "64ecc975f9d8ac673948c065",
            "idMembers": [],
            "idMembersVoted": [],
            "idShort": 1,
            "idAttachmentCover": null,
            "labels": [],
            "idLabels": [],
            "manualCoverAttachment": false,
            "name": "trello",
            "pos": 65535,
            "shortLink": "tf2hDX3b",
            "shortUrl": "https://trello.com/c/tf2hDX3b",
            "start": null,
            "subscribed": false,
            "url": "https://trello.com/c/tf2hDX3b/1-trello",
            "cover": {
                "idAttachment": null,
                "color": null,
                "idUploadedBackground": null,
                "size": "normal",
                "brightness": "dark",
                "idPlugin": null
            },
            "isTemplate": false,
            "cardRole": null
        }
    ]

    return lister.map(liste => {
        return {...liste, cards: kort.filter(k => k.idList === liste.id)}
    })

}