// app/posts/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blogs'
import BlogPostView from '@/components/blocks/BlogPostView'

type BlogPostPageProps = {
  params: { slug: string }
}

export async function generateMetadata({ 
  params 
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostView post={post} />
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post: any) => ({
    slug: post.frontmatter.slug
  }))
}

export const dynamicParams = false
