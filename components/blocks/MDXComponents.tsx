import type { ReactNode, HTMLAttributes } from "react";
import Link from "next/link";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { cn } from "@/lib/utils";
import { ImageWithLightbox, VideoWithLightbox } from "./BlogLightbox";

export const MDXComponents: MDXComponentsType = {
    h1: ({ children, id }: HeadingProps) => <h1 id={id}>{children}</h1>,
    h2: ({ children, id }: HeadingProps) => <h2 id={id}>{children}</h2>,
    h3: ({ children, id }: HeadingProps) => <h3 id={id}>{children}</h3>,
    h4: ({ children, id }: HeadingProps) => <h4 id={id}>{children}</h4>,
    p: ({ children }: { children: ReactNode }) => <p>{children}</p>,

    a: ({ href = "#", children, className }: LinkProps) => {
        if (href.startsWith("#")) return <a href={href} className={className}>{children}</a>;
        const external = /^https?:\/\//.test(href);

        return (
            <Link href={href} prefetch={false} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={className}>
                {children}
            </Link>
        );
    },

    img: ImageWithLightbox,
    video: VideoWithLightbox,
    Video: VideoWithLightbox,
    pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => <pre className={cn("article-code-block", className)} {...props} />,
    code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => <code className={className} {...props} />,
    ul: ({ children }: { children: ReactNode }) => <ul>{children}</ul>,
    ol: ({ children }: { children: ReactNode }) => <ol>{children}</ol>,
    li: ({ children }: { children: ReactNode }) => <li>{children}</li>,
    blockquote: ({ children }: { children: ReactNode }) => <blockquote>{children}</blockquote>,
    hr: () => <hr />,
    table: ({ children }: { children: ReactNode }) => <div className="article-table"><table>{children}</table></div>,
    thead: ({ children }: { children: ReactNode }) => <thead>{children}</thead>,
    tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
    tr: ({ children }: { children: ReactNode }) => <tr>{children}</tr>,
    th: ({ children }: { children: ReactNode }) => <th>{children}</th>,
    td: ({ children }: { children: ReactNode }) => <td>{children}</td>,
    strong: ({ children }: { children: ReactNode }) => <strong>{children}</strong>,
    em: ({ children }: { children: ReactNode }) => <em>{children}</em>,
};

export type MDXComponentProps = { components?: MDXComponentsType };
