const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
});

export default function PostMeta({ post }: { post: BlogPostFrontmatter }) {
    const date = new Date(post.date);

    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
            <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
            {post.readingTime != null && (
                <>
                    <span aria-hidden="true" className="size-1 rounded-full bg-current" />
                    <span>{post.readingTime} min read</span>
                </>
            )}
        </div>
    );
}
