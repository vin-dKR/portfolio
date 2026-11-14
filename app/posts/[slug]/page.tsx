import type { Metadata } from "next"
import { cache } from "react"
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blogs'
import BlogPostView from '@/components/blocks/BlogPostView'

const getArticle = cache(getBlogPostBySlug)

type ArticleParams = {
    params: Promise<{ slug: string }>
}

export const dynamic = "force-static"

export async function generateMetadata({ params }: ArticleParams): Promise<Metadata> {
    const { slug } = await params
    const post = await getArticle(slug)

    return post ? {
        title: `${post.frontmatter.title} | Vinod KR`,
        description: post.frontmatter.description,
    } : {}
}

export default async function BlogPostPage({
    params,
}: ArticleParams) {
    const { slug } = await params
    const post = await getArticle(slug)

    if (!post) {
        notFound()
    }

    return <BlogPostView post={post} />
}

export async function generateStaticParams() {
    const posts = await getBlogPosts()
    return posts.map((post) => ({
        slug: post.frontmatter.slug
    }))
}

export const dynamicParams = false
