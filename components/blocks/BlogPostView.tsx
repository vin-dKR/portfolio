'use client'

import { MDXRemote } from 'next-mdx-remote'
import { useMemo } from 'react'

// Custom MDX components (client-side)
const mdxComponents = {
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    p: (props: any) => <p className="mb-4" {...props} />
}

type BlogPostViewProps = {
    post: BlogPost
}

export default function BlogPostView({ post }: BlogPostViewProps) {
    // Memoize the content to prevent unnecessary re-renders
    const memoizedContent = useMemo(() => post.content, [post.content])

    return (
        <article className="container mx-auto px-4 py-8 mt-28 w-full md:w-1/3">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-black/80 dark:text-white/80">
                    {post.frontmatter.title}
                </h1>
                <div className="flex justify-between text-gray-600">
                    <span>
                        Published on {new Date(post.frontmatter.date).toLocaleDateString()}
                    </span>
                    <span>{post.frontmatter.readingTime} min read</span>
                </div>
            </header>

            <div className="prose max-w-none text-gray-900 dark:text-gray-300">
                <MDXRemote 
                    {...memoizedContent} 
                    components={mdxComponents} 
                />
            </div>
        </article>
    )
}
