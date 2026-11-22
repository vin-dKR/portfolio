import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import HomeFooter from "./HomeFooter";
import { MDXComponents } from "./MDXComponents";
import { ImageWithLightbox } from "./BlogLightbox";
import { getPostArtwork } from "@/app/posts/artwork";
import "./Article.css";

const published = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function BlogPostView({ post }: { post: BlogPost }) {
    const artwork = getPostArtwork(post);
    const cover = !post.content.includes("![") ? artwork.screen : undefined;

    return (
        <main id="main-content" className="page-frame">
            <article>
                <header className="article-heading">
                    <Link href="/posts" prefetch={false} className="site-link"><ArrowLeft aria-hidden="true" size={14} /> All writing</Link>
                    <h1>{post.frontmatter.title}</h1>
                    <p className="article-description">{post.frontmatter.description}</p>
                    <div className="article-meta">
                        <time dateTime={new Date(post.frontmatter.date).toISOString().slice(0, 10)}>{published.format(new Date(post.frontmatter.date))}</time>
                        <span>{post.frontmatter.readingTime} min read</span>
                    </div>
                </header>

                {cover && (
                    <div className="article-cover">
                        <ImageWithLightbox src={cover.src} alt={cover.alt} width={752} height={451} unoptimized />
                    </div>
                )}
                <div className="prose article-content">
                    <MDXRemote
                        source={post.content}
                        components={MDXComponents}
                        options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                    />
                </div>
                <Link href="/posts" prefetch={false} className="site-link mt-8"><ArrowLeft aria-hidden="true" size={14} /> All writing</Link>
            </article>
            <HomeFooter />
        </main>
    );
}
