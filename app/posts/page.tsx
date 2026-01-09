import React from 'react'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blogs'

export default async function BlogListPage() {
    const posts = await getBlogPosts()

    if (!posts) return <div className='size-14 mt-40'>No Blogs yet..</div>

    return (
        <div className="w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 px-3 sm:px-4 md:px-0 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-24 md:pb-8 sm:pb-12 lg:pb-16 mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white">blogs</h1>

            <div className="grid gap-4 sm:gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.frontmatter.slug}
                        href={`/posts/${post.frontmatter.slug}`}
                        className="block"
                    >
                        <div className="dark:bg-white/2 bg-black/10 border border-black/4 dark:border-white/4 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all cursor-pointer">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                                {post.frontmatter.title}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                                {post.frontmatter.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.frontmatter.date).toLocaleDateString()}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {post.frontmatter.readingTime} min read
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const dynamic = 'force-static'
