import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blogs";
import PostMeta from "./PostMeta";

export const metadata: Metadata = {
    title: "Writing | Vinod KR",
    description: "Case studies and technical notes on building web products.",
};

export default async function WritingPage() {
    const [latest, ...archive] = (await getBlogPosts()).map(({ frontmatter }) => frontmatter);

    return (
        <main id="main-content" className="site-container page-shell">
            <header className="mb-10 max-w-3xl sm:mb-14">
                <h1 className="page-heading">Writing</h1>
                <p className="page-lede">Case studies on what I built, the trade-offs I made, and what changed along the way.</p>
            </header>

            {latest ? (
                <>
                    <section aria-label="Latest article">
                        <Link
                            href={`/posts/${latest.slug}`}
                            prefetch={false}
                            className="site-panel group grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:p-9"
                        >
                            <div>
                                <p className="eyebrow mb-4 flex items-center gap-2">
                                    <BookOpen aria-hidden="true" className="size-4" />
                                    Latest article
                                </p>
                                <h2 className="mb-3 max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-tight tracking-tight sm:text-4xl">
                                    {latest.title}
                                </h2>
                                <p className="mb-5 max-w-2xl leading-relaxed text-[var(--muted)]">{latest.description}</p>
                                <PostMeta post={latest} />
                            </div>
                            <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--accent)] motion-safe:transition-transform motion-safe:group-hover:-translate-y-1 sm:size-14">
                                <ArrowUpRight className="size-5" />
                            </span>
                        </Link>
                    </section>

                    {archive.length > 0 && (
                        <section aria-labelledby="writing-archive" className="mt-12 sm:mt-16">
                            <h2 id="writing-archive" className="eyebrow mb-3">Archive</h2>
                            <ul className="border-t border-[var(--line)]">
                                {archive.map((post) => (
                                    <li key={post.slug} className="border-b border-[var(--line)]">
                                        <Link
                                            href={`/posts/${post.slug}`}
                                            prefetch={false}
                                            className="group grid min-w-0 grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 rounded-lg py-5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-x-8 sm:py-6"
                                        >
                                            <div className="min-w-0">
                                                <h3 className="text-base font-semibold leading-snug transition-colors group-hover:text-[var(--accent)] sm:text-lg">{post.title}</h3>
                                                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{post.description}</p>
                                            </div>
                                            <div className="row-start-2 sm:col-start-2 sm:row-start-1"><PostMeta post={post} /></div>
                                            <ArrowUpRight aria-hidden="true" className="col-start-2 row-start-1 mt-0.5 size-5 text-[var(--accent)] sm:col-start-3" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </>
            ) : (
                <p className="text-[var(--muted)]">No articles yet.</p>
            )}
        </main>
    );
}

export const dynamic = "force-static";
