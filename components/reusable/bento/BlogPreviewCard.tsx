import { ArrowUpRight, BookOpen } from "lucide-react";
import Image from "next/image";
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

export default function BlogPreviewCard({ posts, className = "" }: BlogPreviewProps) {
    const [featured, ...rest] = posts;
    const published = featured ? new Date(featured.date) : undefined;
    const hasDate = published && Number.isFinite(published.getTime());

    return (
        <BentoCard className={`col-span-12 sm:col-span-5 ${className}`}>
            <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    <BookOpen aria-hidden="true" className="size-4 text-violet-700 dark:text-violet-300" />
                    Writing
                </h3>
                <Link
                    href="/posts"
                    prefetch={false}
                    aria-label="View all writing"
                    className="flex min-h-7 items-center gap-1 rounded-md px-1 text-xs font-medium text-zinc-600 transition-colors hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-400 dark:hover:text-indigo-300"
                >
                    All posts
                    <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                </Link>
            </header>

            {featured ? (
                <>
                    <Link
                        href={`/posts/${featured.slug}`}
                        prefetch={false}
                        className="group/post block overflow-hidden rounded-xl border border-indigo-950/10 bg-indigo-950/3 transition-colors hover:border-indigo-500/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-indigo-300/15 dark:bg-indigo-200/5 dark:hover:border-indigo-300/40"
                    >
                        <div className="relative h-16 overflow-hidden bg-zinc-900">
                            <Image
                                src="/images/batman-card.webp"
                                alt=""
                                fill
                                sizes="(max-width: 639px) 100vw, 256px"
                                unoptimized
                                className="object-cover object-[center_28%] opacity-85 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/post:scale-105"
                            />
                            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-indigo-950/65 via-transparent to-violet-950/55" />
                        </div>

                        <div className="p-2.5">
                            <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                                {hasDate && <time dateTime={published.toISOString().slice(0, 10)}>{shortDate.format(published)}</time>}
                                {featured.readingTime != null && (
                                    <span>{hasDate && <span aria-hidden="true">· </span>}{featured.readingTime} min read</span>
                                )}
                            </div>
                            <h4 className="text-sm leading-snug font-semibold text-zinc-900 group-hover/post:text-indigo-700 dark:text-zinc-100 dark:group-hover/post:text-indigo-300">
                                {featured.title}
                            </h4>
                        </div>
                    </Link>

                    {rest.length > 0 && (
                        <ul className="mt-1.5 divide-y divide-zinc-950/8 dark:divide-white/10">
                            {rest.slice(0, 2).map((post) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        prefetch={false}
                                        className="group/row flex min-h-9 items-center justify-between gap-2 rounded-sm py-1.5 text-xs leading-snug text-zinc-700 transition-colors hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-300 dark:hover:text-indigo-300"
                                    >
                                        <span>{post.title}</span>
                                        <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 text-zinc-500 group-hover/row:text-current dark:text-zinc-400" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">No posts yet.</p>
            )}
        </BentoCard>
    );
}
