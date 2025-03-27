import React from 'react'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blogs'

export default async function BlogListPage() {
    const posts = await getBlogPosts()

    if (!posts) return <div className='size-14 mt-40'>No Blogs yet..</div>

    return (
        <div className="container md:w-1/3 w-full px-4 pt-28 py-8">
            <h1 className="text-3xl font-bold mb-8 dark:text-white text-black">blogs</h1>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <Link 
                        key={post.frontmatter.slug} 
                        href={`/posts/${post.frontmatter.slug}`}
                        className="block"
                    >
                        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-2xl font-semibold mb-2 dark:text-white/80 text-black">
                                {post.frontmatter.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {post.frontmatter.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {new Date(post.frontmatter.date).toLocaleDateString()}
                                </span>
                                <span className="text-sm text-gray-500">
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
