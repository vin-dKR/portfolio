import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXComponents as MDXComponentsType } from 'mdx/types'
import { cn } from '@/lib/utils'


export function MDXComponents(): MDXComponentsType {
    return {
        // Headings with optional IDs for anchor links
        h1: ({ children, id }: HeadingProps) => (
            <h1
                id={id}
                className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            >
                {children}
            </h1>
        ),
        h2: ({ children, id }: HeadingProps) => (
            <h2
                id={id}
                className="text-3xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200 border-b pb-2"
            >
                {children}
            </h2>
        ),
        h3: ({ children, id }: HeadingProps) => (
            <h3
                id={id}
                className="text-2xl font-medium mb-2 mt-4 text-gray-700 dark:text-gray-300"
            >
                {children}
            </h3>
        ),
        h4: ({ children, id }: HeadingProps) => (
            <h4
                id={id}
                className="text-xl font-medium mb-2 mt-3 text-gray-600 dark:text-gray-400"
            >
                {children}
            </h4>
        ),

        // Paragraph with improved typography
        p: ({ children }: { children: React.ReactNode }) => (
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                {children}
            </p>
        ),

        // Enhanced Link component
        a: ({ href, children, className }: LinkProps) => (
            <Link
                href={href || '#'}
                target='_blank'
                className={`
                    text-blue-600 dark:text-blue-400 
                    hover:underline 
                    transition-colors duration-200
                    ${className || ''}
                `}
            >
                {children}
            </Link>
        ),

        // Image with Next.js Image component
        img: ({ src, alt, width, height, className }: ImageProps) => (
            <Image
                src={src}
                alt={alt}
                width={width || 800}
                height={height || 600}
                className={`
                    rounded-lg 
                    shadow-md 
                    object-cover 
                    ${className || ''}
                `}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
        ),

        pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
            return (
                <pre
                    className={cn(
                        "mb-4 mt-6 p-4 overflow-x-auto rounded-lg border bg-indigo-600/10 text-black dark:bg-indigo-900/5 dark:text-white",
                        className
                    )}
                    {...props}
                />
            );
        },
        code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
            // Check if this is a code block (pre is the parent)
            const isCodeBlock = typeof children === 'string' && children.includes('\n');

            if (isCodeBlock) {
                return (
                    <code
                        className={cn(
                            "font-mono text-sm",
                            className
                        )}
                        {...props}
                    >
                        {children}
                    </code>
                );
            }

            // Inline code
            return (
                <code
                    className={cn(
                        "rounded bg-zinc-600/10 px-2.5 py-0.5 font-mono text-sm text-black dark:bg-white/20 dark:text-white",
                        className
                    )}
                    {...props}
                >
                    {children}
                </code>
            );
        },

        // List styles
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-inside mb-4 pl-4 text-gray-700 dark:text-gray-300">
                {children}
            </ul>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-inside mb-4 pl-4 text-gray-700 dark:text-gray-300">
                {children}
            </ol>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="mb-2">
                {children}
            </li>
        ),

        // Blockquote with styled design
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote
                className="
                    border-l-4 
                    border-gray-300 
                    dark:border-gray-600 
                    pl-4 
                    py-2 
                    my-4 
                    italic 
                    text-gray-600 
                    dark:text-gray-400
                "
            >
                {children}
            </blockquote>
        ),

        // Horizontal rule
        hr: () => (
            <hr
                className="
                    my-6 
                    border-t 
                    border-gray-300 
                    dark:border-gray-700
                "
            />
        ),

        // Strong and emphasis
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold text-gray-900 dark:text-white">
                {children}
            </strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic text-gray-700 dark:text-gray-300">
                {children}
            </em>
        )
    }
}

// Optional: Type for complete MDX Component Props
export type MDXComponentProps = {
    components?: MDXComponentsType
}
