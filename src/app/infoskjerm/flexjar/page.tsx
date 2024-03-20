import { ReactElement } from 'react'

import { hentFlexjarFeedbacks } from '@/bigquery/flexjarFetching'

export default async function Docs(): Promise<ReactElement> {
    const list = await hentFlexjarFeedbacks()

    return (
        <>
            {list.map((feedback, index) => (
                <h2 key={index}>{feedback.feedback}</h2>
            ))}
        </>
    )
}
