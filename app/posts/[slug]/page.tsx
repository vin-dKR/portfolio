import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blogs'
import BlogPostView from '@/components/blocks/BlogPostView'

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

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
