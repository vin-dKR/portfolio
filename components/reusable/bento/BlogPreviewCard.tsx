import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import BentoCard from "./BentoCard";

type BlogPreviewProps = {
    posts: BlogPostFrontmatter[];
    className?: string;
};

const shortDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

function PublishedDate({ date }: { date: string }) {
    const published = new Date(date);

    if (!Number.isFinite(published.getTime())) return null;

    return <time dateTime={published.toISOString().slice(0, 10)}>{shortDate.format(published)}</time>;
}

export default function BlogPreviewCard({ posts, className = "" }: BlogPreviewProps) {
    const [featured, ...rest] = posts;
    const recentPosts = rest.slice(0, 2);

    return (
        <BentoCard className={`col-span-12 ${className}`}>
            <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <BookOpen aria-hidden="true" className="size-4 text-(--bento-accent)" />
                    Writing
                </h3>
                <Link
                    href="/posts"
                    prefetch={false}
                    aria-label="View all writing"
                    className="flex min-h-8 items-center gap-1 rounded-md px-1 text-xs font-medium text-(--bento-muted) transition-colors hover:text-(--bento-accent) focus-visible:outline-2 focus-visible:outline-violet-500"
                >
                    All posts
                    <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                </Link>
            </header>

            {featured ? (
                <div className={`grid gap-3 ${recentPosts.length ? "sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]" : ""}`}>
                    <Link
                        href={`/posts/${featured.slug}`}
                        prefetch={false}
                        className="group/post relative flex min-w-0 flex-col items-start overflow-hidden rounded-xl border border-(--bento-rule) bg-(--bento-inset) p-3.5 transition-colors hover:border-violet-500/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 sm:p-4"
                    >
                        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-[repeating-linear-gradient(135deg,transparent_0_8px,currentColor_9px_10px)] text-(--bento-accent) mask-[linear-gradient(to_right,transparent,black)] opacity-10" />
                        <span className="relative mb-2 flex w-full items-center justify-between gap-2 text-[10px] font-semibold tracking-[0.14em] text-(--bento-accent) uppercase">
                            Latest article
                            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover/post:translate-x-0.5 motion-safe:group-hover/post:-translate-y-0.5" />
                        </span>
                        <h4 className="relative text-[15px] leading-snug font-semibold tracking-tight group-hover/post:text-(--bento-accent) sm:text-base">
                            {featured.title}
                        </h4>
                        {featured.description && (
                            <p className="relative mt-1.5 text-xs leading-relaxed text-(--bento-muted)">
                                {featured.description}
                            </p>
                        )}
                        <span className="relative mt-auto flex flex-wrap items-center gap-x-2 pt-3 text-[11px] text-(--bento-muted)">
                            <PublishedDate date={featured.date} />
                            {featured.readingTime != null && (
                                <span className="rounded bg-(--bento-card) px-1.5 py-0.5">{featured.readingTime} min read</span>
                            )}
                        </span>
                    </Link>

                    {recentPosts.length > 0 && (
                        <ul aria-label="More writing" className="grid auto-rows-fr divide-y divide-(--bento-rule) px-0.5 sm:px-0">
                            {recentPosts.map((post) => (
                                <li key={post.slug} className="min-w-0">
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        prefetch={false}
                                        className="group/row flex h-full min-h-14 items-center justify-between gap-2.5 px-1 py-2.5 text-(--bento-ink) transition-colors hover:text-(--bento-accent) focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-violet-500"
                                    >
                                        <span className="min-w-0">
                                            <span className="mb-1 block text-[11px] text-(--bento-muted)"><PublishedDate date={post.date} /></span>
                                            <span className="block text-xs leading-snug font-semibold">{post.title}</span>
                                        </span>
                                        <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 text-(--bento-muted) group-hover/row:text-(--bento-accent)" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                <p className="text-xs text-(--bento-muted)">No posts yet.</p>
            )}
        </BentoCard>
    );
}
