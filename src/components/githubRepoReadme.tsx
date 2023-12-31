import React, { ReactElement } from 'react'
import Link from 'next/link'

import { MarkdownAksel } from '@/components/markdownAksel'
import { AkselLink, EditIcon } from '@/components/clientAksel'

export async function GithubRepoReadme({ repo }: { repo: string }): Promise<ReactElement> {
    const readmeFromGithubRaw = `https://raw.githubusercontent.com/navikt/${repo}/master/README.md`
    const edit = `https://github.com/navikt/${repo}/edit/master/README.md`

    const readmeResponse = await fetch(readmeFromGithubRaw, {
        next: { revalidate: 10 },
    })

    const readme = await readmeResponse.text()

    return (
        <>
            {readme && <MarkdownAksel md={readme} />}
            <AkselLink as={Link} className="text-gray-500" target="_blank" underline={false} href={edit}>
                Rediger på GitHub <EditIcon className="inline" title="a11y-title" fontSize="1.5rem" />
            </AkselLink>
        </>
    )
}
