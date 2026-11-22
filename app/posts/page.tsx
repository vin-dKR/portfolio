import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HomeFooter from "@/components/blocks/HomeFooter";
import { getBlogPosts } from "@/lib/blogs";
import "./Writing.css";

const published = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function BlogListPage() {
    const posts = await getBlogPosts();

    return (
        <main id="main-content" className="page-frame">
            <header>
                <div className="page-heading"><h1 className="page-title">Writing</h1></div>
                <p className="page-intro">The decisions, problems, and implementation details behind my projects.</p>
            </header>
            <div className="writing-list">
                {posts.map(({ frontmatter: post }) => (
                    <article key={post.slug}>
                        <Link href={`/posts/${post.slug}`} prefetch={false} className="writing-entry">
                            <div className="writing-entry-meta">
                                <time dateTime={new Date(post.date).toISOString().slice(0, 10)}>{published.format(new Date(post.date))}</time>
                                <span>{post.readingTime} min read</span>
                            </div>
                            <h2>{post.title}<ArrowUpRight aria-hidden="true" size={17} /></h2>
                            <p>{post.description}</p>
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
