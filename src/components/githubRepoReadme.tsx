import React, { ReactElement } from 'react'

import { MarkdownAksel } from '@/components/markdownAksel'

export async function GithubRepoReadme({ repo }: { repo: string }): Promise<ReactElement> {
    const readmeFromGithubRaw = `https://raw.githubusercontent.com/navikt/${repo}/master/README.md`

    const readmeResponse = await fetch(readmeFromGithubRaw, {
        next: { revalidate: 10 },
    })

    const readme = await readmeResponse.text()

    return <>{readme && <MarkdownAksel md={readme} />}</>
}
