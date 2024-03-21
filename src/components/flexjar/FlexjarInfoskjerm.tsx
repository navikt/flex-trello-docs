'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { Feedback } from '@/bigquery/flexjarFetching'

export function FlexjarInfoskjerm({ feedbacks }: { feedbacks: Feedback[] }): ReactElement {
    const [currentFeedback, setCurrentFeedback] = useState<Feedback>(feedbacks[0])

    useEffect(() => {
        if (feedbacks.length > 0) {
            const interval = setInterval(() => {
                const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)]
                setCurrentFeedback(randomFeedback)
            }, 10000)
            return () => clearInterval(interval)
        }
    }, [feedbacks])
    if (!currentFeedback) {
        return <div>Det er ingen tilbakemeldinger</div>
    }

    return (
        <>
            <div className="w-100 max-w-90 flex h-screen flex-col justify-center align-middle bg-red-100 py-10 text-center leading-none text-white">
                <BodyShort className="text-6xl mb-10">{hentEmoji(currentFeedback)}</BodyShort>
                <BodyShort className={calculateFontSize(currentFeedback)}>{currentFeedback.feedback}</BodyShort>
                <BodyShort className="text-1xl mt-20">{'💪 Flexjar ' + datoFormattering(currentFeedback)}</BodyShort>
            </div>
        </>
    )
}

function hentEmoji(feedback: Feedback): string {
    switch (feedback.svar) {
        case '1':
            return '😡 '
        case '2':
        case 'NEI':
            return '🙁 '
        case '3':
            return '😐 '
        case '4':
        case 'JA':
            return '🙂 '
        case '5':
            return '😍 '
        default:
            return ''
    }
}

function calculateFontSize(fe: Feedback): string {
    const text = fe.feedback
    if (text.length > 100) {
        return 'text-4xl'
    } else if (text.length > 50) {
        return 'text-5xl'
    } else {
        return 'text-6xl'
    }
}

function datoFormattering(feed: Feedback): string {
    const dato = new Date(feed.opprettet)
    return dato.toLocaleDateString('nb-NO')
}
