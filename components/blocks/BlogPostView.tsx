import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import PostMeta from "@/app/posts/PostMeta";
import { MDXComponents } from "./MDXComponents";
import styles from "@/app/posts/article.module.css";

export default function BlogPostView({ post }: { post: BlogPost }) {
    const { frontmatter, content } = post;

    return (
        <main id="main-content" className="site-container page-shell">
            <article className="mx-auto max-w-[48rem]">
                <header className="mb-9 border-b border-[var(--line)] pb-6 sm:mb-12 sm:pb-8">
                    <Link href="/posts" prefetch={false} className="mb-6 inline-flex min-h-10 items-center gap-2 rounded text-sm font-medium text-[var(--accent)] hover:underline">
                        <ArrowLeft aria-hidden="true" className="size-4" />
                        All writing
                    </Link>
                    <h1 className={`page-heading mb-4 text-balance break-words ${styles.heading}`}>
                        {frontmatter.title}
                    </h1>
                    {frontmatter.description && (
                        <p className="mb-5 max-w-prose text-base leading-relaxed text-[var(--muted)] sm:text-lg">{frontmatter.description}</p>
                    )}
                    <PostMeta post={frontmatter} />
                </header>

                <div className={`prose ${styles.copy}`}>
                    <MDXRemote
                        source={content}
                        components={MDXComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [rehypeSlug],
                            },
                        }}
                    />
                </div>

                <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                    <Link href="/posts" prefetch={false} className="site-button">
                        <ArrowLeft aria-hidden="true" className="size-4" /> More writing
                    </Link>
                    <Link href="/projects" prefetch={false} className="site-button">
                        Explore projects <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                </footer>
            </article>
        </main>
    );
}
