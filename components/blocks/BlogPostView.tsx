import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { MDXComponents } from './MDXComponents'

type BlogPostViewProps = {
    post: BlogPost
}

export default function BlogPostView({ post }: BlogPostViewProps) {
    return (
        <article className="w-full max-w-2xl px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-24 md:pb-8 mx-auto font-lenia">
            <header className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800 dark:text-white break-words">
                    {post.frontmatter.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                    <span>
                        Published on {new Date(post.frontmatter.date).toLocaleDateString()}
                    </span>
                    <span>{post.frontmatter.readingTime} min read</span>
                </div>
            </header>

            <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-gray-800 dark:text-gray-300 prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-transparent prose-pre:rounded-2xl prose-img:rounded-2xl prose-img:mx-auto">
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug],
                        },
                    }}
                />
            </div>
        </article>
    )
}
