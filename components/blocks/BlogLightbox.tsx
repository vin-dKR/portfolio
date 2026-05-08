'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const VideoWithLightbox = ({ src, className, ...rest }: React.VideoHTMLAttributes<HTMLVideoElement>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
        return () => { document.body.style.overflow = 'unset' }
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
                    aria-label="Close video"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <video
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-full object-contain rounded-2xl px-2"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>,
        document.body
    ) : null

    return (
        <>
            <span className="block my-3 sm:my-4 rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-white/5">
                <video
                    src={src}
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    className={cn(
                        "rounded-2xl cursor-pointer hover:opacity-90 transition-opacity w-full h-auto block",
                        className
                    )}
                    onClick={() => setIsOpen(true)}
                    {...rest}
                />
            </span>
            {modalContent}
        </>
    )
}

type ImageWithLightboxProps = {
    src?: string
    alt?: string
    width?: number
    height?: number
    className?: string
}

export const ImageWithLightbox = ({ src, alt, width, height, className }: ImageWithLightboxProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
        return () => { document.body.style.overflow = 'unset' }
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
                    className="max-w-full max-h-full object-contain rounded-2xl px-2"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>,
        document.body
    ) : null

    return (
        <>
            <span className="block my-3 sm:my-4 rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-white/5">
                <Image
                    src={src}
                    alt={alt || ''}
                    width={width || 800}
                    height={height || 600}
                    className={cn(
                        "rounded-2xl object-cover cursor-pointer hover:opacity-90 transition-opacity w-full h-auto block",
                        className
                    )}
                    onClick={() => setIsOpen(true)}
                />
            </span>
            {modalContent}
        </>
    )
}
