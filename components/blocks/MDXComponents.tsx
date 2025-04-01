import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXComponents as MDXComponentsType } from 'mdx/types'


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

    // Code block with syntax highlighting class
        code: ({ children, className }: CodeProps) => (
            <code 
                className={`
                    bg-gray-100 dark:bg-gray-800 
                    text-sm 
                    px-2 
                    py-1 
                    rounded 
                    font-mono
                    ${className || ''}
                `}
            >
                {children}
            </code>
        ),

    // Pre block for code blocks
        pre: ({ children, className }: CodeProps) => (
            <pre 
                className={`
                    bg-gray-100 dark:bg-gray-800 
                    p-4 
                    mb-4
                    rounded-lg 
                    overflow-x-auto 
                    text-sm 
                    ${className || ''}
                `}
            >
                {children}
            </pre>
        ),

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
