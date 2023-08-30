import type { MDXComponents } from 'mdx/types'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function mine(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => <h3 className="text-red-500">{children}</h3>,
        h3: ({ children }) => <h5 className="text-red-500">{children}</h5>,
        ...components,
    }
}
