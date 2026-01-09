'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { MDXComponents as MDXComponentsType } from 'mdx/types'
import { cn } from '@/lib/utils'

// Image component with lightbox
const ImageWithLightbox = ({ src, alt, width, height, className }: ImageProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])
    
    if (!src) return null
    
    const modalContent = isOpen && mounted ? createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-black/80"
            onClick={() => setIsOpen(false)}
        >
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-1.5 sm:p-2"
                    aria-label="Close image"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <Image
                    src={src}
                    alt={alt || ''}
                    width={width || 1200}
                    height={height || 900}
                    className="max-w-full max-h-full object-contain rounded-lg px-2"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>,
        document.body
    ) : null
    
    return (
        <>
            <span className="block my-3 sm:my-4">
                <Image
                    src={src}
                    alt={alt || ''}
                    width={width || 800}
                    height={height || 600}
                    className={cn(
                        "rounded-lg shadow-md object-cover cursor-pointer hover:opacity-90 transition-opacity w-full h-auto",
                        className
                    )}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                    onClick={() => setIsOpen(true)}
                />
            </span>
            {modalContent}
        </>
    )
}

export function MDXComponents(): MDXComponentsType {
    return {
        // Headings with optional IDs for anchor links
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

        // Paragraph with improved typography
        p: ({ children }: { children: React.ReactNode }) => (
            <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">
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

        // Image with Next.js Image component and lightbox
        img: ImageWithLightbox,

        pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
            return (
                <pre
                    className={cn(
                        "mb-3 sm:mb-4 mt-4 sm:mt-6 p-3 sm:p-4 overflow-x-auto rounded-lg",
                        "border border-black/10 dark:border-white/10",
                        "bg-black/5 dark:bg-white/5",
                        "text-xs sm:text-sm text-gray-800 dark:text-gray-200",
                        "shadow-sm",
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
                            "font-mono text-xs sm:text-sm",
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
                        "rounded bg-zinc-600/10 px-1.5 sm:px-2.5 py-0.5 font-mono text-xs sm:text-sm text-black dark:bg-white/20 dark:text-white break-words",
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
            <li className="mb-1 sm:mb-2 break-words">
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
                    pl-3 sm:pl-4 
                    py-2 
                    my-3 sm:my-4 
                    italic 
                    text-sm sm:text-base
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
                    my-4 sm:my-6 
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
