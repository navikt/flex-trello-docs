import { logger } from '@navikt/next-logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request): Promise<Response> {
    logger.info('Next.js server: received pre stop request, waiting for 10s before starting shutdown')
    // eslint-disable-next-line
    console.log('Next.js server: received pre stop request console, waiting for 10s before starting shutdown')
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, 10_000)
    })
    logger.info('Next.js server: starting shutdown')
    return new Response('ready for shutdown', { status: 200 })
}
