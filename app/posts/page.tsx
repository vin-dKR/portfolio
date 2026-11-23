import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import HomeFooter from "@/components/blocks/HomeFooter";
import { getBlogPosts } from "@/lib/blogs";
import { getPostArtwork } from "./artwork";
import "./Writing.css";

const published = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function ArticleVisual({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
    const artwork = getPostArtwork(post);
    return (
        <div className="writing-visual">
            {artwork.screen ? (
                <Image
                    src={artwork.screen.src}
                    alt={artwork.screen.alt}
                    fill
                    sizes={featured ? "(max-width: 639px) 90vw, 648px" : "(max-width: 639px) 90vw, 312px"}
                    unoptimized={artwork.screen.src.startsWith("/")}
                    className={post.frontmatter.slug === "cross-component-in-recoil" ? "writing-diagram" : "writing-screen"}
                />
            ) : artwork.steps ? (
                <ol className="writing-build-map" aria-label="Topics in this article">
                    {artwork.steps.map((step) => <li key={step.title}><span aria-hidden="true" /><strong>{step.title}</strong></li>)}
                </ol>
            ) : null}
        </div>
    );
}

export default async function BlogListPage() {
    const posts = await getBlogPosts();
    const [featured, ...rest] = posts;

    return (
        <main id="main-content" className="page-frame writing-page">
            <header>
                <div className="page-heading"><h1 className="page-title">Writing</h1></div>
                <p className="page-intro">The decisions, problems, and implementation details behind my projects.</p>
            </header>

            {featured && (
                <article className="writing-feature">
                    <Link href={`/posts/${featured.frontmatter.slug}`} prefetch={false} className="writing-feature-link">
                        <ArticleVisual post={featured} featured />
                        <div className="writing-feature-copy">
                            <div className="writing-entry-meta">
                                <time dateTime={new Date(featured.frontmatter.date).toISOString().slice(0, 10)}>{published.format(new Date(featured.frontmatter.date))}</time>
                                <span>{featured.frontmatter.readingTime} min read</span>
                            </div>
                            <h2>{featured.frontmatter.title}<ArrowUpRight aria-hidden="true" size={20} /></h2>
                            <p>{featured.frontmatter.description}</p>
                            <span className="writing-read">Read the story <ArrowUpRight aria-hidden="true" size={14} /></span>
                        </div>
                    </Link>
                </article>
            )}

            <div className="writing-list">
                {rest.map((post) => (
                    <article key={post.frontmatter.slug}>
                        <Link href={`/posts/${post.frontmatter.slug}`} prefetch={false} className="writing-entry">
                            <ArticleVisual post={post} />
                            <div className="writing-entry-copy">
                                <div className="writing-entry-meta">
                                    <time dateTime={new Date(post.frontmatter.date).toISOString().slice(0, 10)}>{published.format(new Date(post.frontmatter.date))}</time>
                                    <span>{post.frontmatter.readingTime} min read</span>
                                </div>
                                <h2>{post.frontmatter.title}<ArrowUpRight aria-hidden="true" size={16} /></h2>
                                <p>{post.frontmatter.description}</p>
                            </div>
                        </Link>
                    </article>
                ))}
                {posts.length === 0 && <p className="writing-empty">I&apos;m working on my next write-up. In the meantime, explore my <Link href="/projects">projects</Link>.</p>}
            </div>
            <HomeFooter />
        </main>
    );
}

export const dynamic = "force-static";
