'use client'

import React, { ReactElement, useEffect, useState } from 'react'

import { Heading } from '@/components/clientAksel'
import { MarkdownAksel } from '@/components/markdownAksel'

export function GithubRepoReadme({ repo }: { repo: string }): ReactElement {
    const readmeFromGithubRaw = `https://raw.githubusercontent.com/navikt/${repo}/master/README.md`

    const [readme, setReadme] = useState<string | undefined>(undefined)
    useEffect(() => {
        fetch(readmeFromGithubRaw)
            .then((r) => r.text())
            .then((r) => setReadme(r))
    })

    return (
        <>
            <Heading size="large" spacing>
                {repo}
            </Heading>
            {readme && <MarkdownAksel md={readme} />}
        </>
    )
}
