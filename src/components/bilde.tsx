'use client'

import { Alert } from '@navikt/ds-react'
import React, { useState, useEffect } from 'react'

export function Bilde(
    props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
): React.ReactElement {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!loaded) {
                setError(true)
            }
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [loaded])

    const handleLoad = (): void => {
        setLoaded(true)
    }

    const handleError = (): void => {
        setError(true)
    }

    const handleClick = (): void => {
        if (props.src) {
            window.open(props.src, '_blank')
        }
    }

    if (error) {
        return (
            <Alert variant="error" className="w-2/3">
                Feil ved lasting av bilde. Du er nødt til å være pålogget trello i samme browser for å kunne se bilder.
            </Alert>
        )
    }

    // eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text
    return <img className="cursor-pointer" onLoad={handleLoad} onError={handleError} onClick={handleClick} {...props} />
}
