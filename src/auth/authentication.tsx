import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateAzureToken } from '@navikt/next-auth-wonderwall'
import { redirect } from 'next/navigation'

import { isLocalOrDemo } from '@/utlis/env'

export async function verifyUserLoggedIn(): Promise<void> {
    logger.info('Getting headers')
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return
    }

    const redirectPath = requestHeaders.get('x-path')
    logger.info(`Redirect path is ${redirectPath}`)
    if (!redirectPath == null) {
        logger.warn("Missing 'x-path' header, is middleware middlewaring?")
    }
    logger.info(`Redirect path is ${redirectPath}`)

    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        logger.info('Found no token, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateAzureToken(bearerToken)
    if (validationResult !== 'valid') {
        if (validationResult.errorType !== 'EXPIRED') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
        }
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }
}
