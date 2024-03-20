import { BigQuery, BigQueryOptions } from '@google-cloud/bigquery'

export async function hentFlexjarFeedbacks(): Promise<Feedback[]> {
    const options: BigQueryOptions = {}
    if (process.env.GOOGLE_CLOUD_PROJECT) {
        options.projectId = process.env.GOOGLE_CLOUD_PROJECT
    }
    const bigquery = new BigQuery(options)
    const bqTabell = '`flex-prod-af40.flex_dataset.flexjar_infoskjerm_view`'
    const query = `SELECT feedback,
                          svar
                   FROM ${bqTabell}`

    const [job] = await bigquery.createQueryJob({
        query: query,
        location: 'europe-north1',
    })

    const [rows] = await job.getQueryResults()
    return mapResponse(rows)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapResponse(rows: any[]): Feedback[] {
    return rows.map((row) => {
        const newVar: Feedback = {
            feedback: row.feedback,
            svar: row.svar,
        }
        return newVar
    })
}

interface Feedback {
    feedback: string
    svar: string
}
