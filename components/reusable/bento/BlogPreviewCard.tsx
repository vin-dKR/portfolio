import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import BentoCard from "./BentoCard";

const dateFormatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

export default function BlogPreviewCard({ posts }: { posts: BlogPostFrontmatter[] }) {
    return (
        <BentoCard className="bento-writing col-span-12">
            <header className="bento-writing-heading">
                <h3 className="section-heading"><BookOpen aria-hidden="true" size={16} /> Writing</h3>
                <Link href="/posts" prefetch={false} className="site-link">
                    All posts <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
            </header>
            {posts.length > 0 ? (
                <ul>
                    {posts.slice(0, 3).map((post, index) => {
                        const date = new Date(post.date);
                        const validDate = Number.isFinite(date.getTime());
                        return (
                            <li key={post.slug}>
                                <Link href={`/posts/${post.slug}`} prefetch={false} className="bento-writing-post">
                                    <div>
                                        <h4>{post.title}</h4>
                                        {index === 0 && post.description && <p>{post.description}</p>}
                                        <span className="bento-writing-meta">
                                            {validDate && <time dateTime={date.toISOString().slice(0, 10)}>{dateFormatter.format(date)}</time>}
                                            {post.readingTime != null && <span>{post.readingTime} min read</span>}
                                        </span>
                                    </div>
                                    <ArrowUpRight aria-hidden="true" size={15} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : <p className="text-sm text-(--site-muted)">No posts published yet.</p>}
        </BentoCard>
    );
}
