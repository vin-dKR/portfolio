import React from 'react'
import Link from 'next/link'
import { MDXComponents as MDXComponentsType } from 'mdx/types'
import { cn } from '@/lib/utils'
import { ImageWithLightbox, VideoWithLightbox } from './BlogLightbox'

export const MDXComponents: MDXComponentsType = {
    h1: ({ children, id }: HeadingProps) => (
        <h1
            id={id}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white break-words"
        >
            {children}
        </h1>
    ),
    h2: ({ children, id }: HeadingProps) => (
        <h2
            id={id}
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 mt-4 sm:mt-6 text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2 break-words"
        >
            {children}
        </h2>
    ),
    h3: ({ children, id }: HeadingProps) => (
        <h3
            id={id}
            className="text-lg sm:text-xl md:text-2xl font-medium mb-2 mt-3 sm:mt-4 text-gray-700 dark:text-gray-300 break-words"
        >
            {children}
        </h3>
    ),
    h4: ({ children, id }: HeadingProps) => (
        <h4
            id={id}
            className="text-base sm:text-lg md:text-xl font-medium mb-2 mt-2 sm:mt-3 text-gray-600 dark:text-gray-400 break-words"
        >
            {children}
        </h4>
    ),

    p: ({ children }: { children: React.ReactNode }) => (
        <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">
            {children}
        </p>
    ),

    a: ({ href, children, className }: LinkProps) => {
        const isHash = (href || '').startsWith('#')
        const isExternal = /^https?:\/\//.test(href || '')
        const linkClass = `text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200 ${className || ''}`

        if (isHash) {
            return (
                <a href={href} className={linkClass}>
                    {children}
                </a>
            )
        }
        return (
            <Link
                href={href || '#'}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={linkClass}
            >
                {children}
            </Link>
        )
    },

    img: ImageWithLightbox,
    video: VideoWithLightbox,

    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className={cn(
                "mb-3 sm:mb-4 mt-4 sm:mt-6 p-3 sm:p-4 overflow-auto rounded-2xl",
                "border border-black/10 dark:border-white/10",
                "bg-black/5 dark:bg-white/5",
                "text-xs sm:text-sm text-gray-800 dark:text-gray-200",
                "shadow-sm",
                className
            )}
            {...props}
        />
    ),
    code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
        const isCodeBlock = typeof children === 'string' && children.includes('\n')

        if (isCodeBlock) {
            return (
                <code
                    className={cn("font-mono text-xs sm:text-sm", className)}
                    {...props}
                >
                    {children}
                </code>
            )
        }

        return (
            <code
                className={cn(
                    "rounded bg-zinc-600/10 px-1.5 sm:px-2.5 py-0.5 font-mono text-xs sm:text-sm text-black dark:bg-white/20 dark:text-white break-words",
                    className
                )}
                {...props}
            >
                {children}
            </code>
        )
    },

    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc list-inside mb-3 sm:mb-4 pl-3 sm:pl-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1">
            {children}
        </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal list-inside mb-3 sm:mb-4 pl-3 sm:pl-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-1">
            {children}
        </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="mb-1 sm:mb-2 break-words">{children}</li>
    ),

    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 sm:pl-4 py-2 my-3 sm:my-4 italic text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {children}
        </blockquote>
    ),

    hr: () => (
        <hr className="my-4 sm:my-6 border-t border-gray-300 dark:border-gray-700" />
    ),

    table: ({ children }: { children: React.ReactNode }) => (
        <div className="my-4 sm:my-6 overflow-auto rounded-2xl border border-gray-400 dark:border-gray-600">
            <table className="w-full text-sm sm:text-base border-separate border-spacing-0 table-auto">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-gray-100">
            {children}
        </thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
        <tbody>{children}</tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            {children}
        </tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b border-r last:border-r-0 border-gray-400 dark:border-gray-600 align-top break-words whitespace-normal">
            {children}
        </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-700 dark:text-gray-300 border-b border-r last:border-r-0 border-gray-400 dark:border-gray-600 align-top break-words whitespace-normal [tr:last-child_&]:border-b-0">
            {children}
        </td>
    ),

    strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-bold text-gray-900 dark:text-white">
            {children}
        </strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),
}

export type MDXComponentProps = {
    components?: MDXComponentsType
}
