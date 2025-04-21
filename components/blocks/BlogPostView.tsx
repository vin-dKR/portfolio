'use client'

import { MDXRemote } from 'next-mdx-remote'
import { useMemo } from 'react'
import { MDXComponents } from './MDXComponents'


type BlogPostViewProps = {
    post: BlogPost
}

export default function BlogPostView({ post }: BlogPostViewProps) {
    // Memoize the content to prevent unnecessary re-renders
    const memoizedContent = useMemo(() => post.content, [post.content])

    return (
        <article className="container mx-auto px-4 py-8 mt-28 w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 p-4 md:p-6 lg:p-8 mx-auto my-4">
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
                    components={MDXComponents}
                />
            </div>
        </article>
    )
}
