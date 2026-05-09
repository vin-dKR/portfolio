"use client"

import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import BentoCard from "./BentoCard"
import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen } from "lucide-react"
import Link from "next/link"

type Props = {
    posts: BlogPostFrontmatter[]
    className?: string
}

const BlogRow = ({ p, i }: { p: BlogPostFrontmatter; i: number }) => {
    const ref = useRef<HTMLAnchorElement | null>(null)
    const [hover, setHover] = useState(false)
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
    const [mounted, setMounted] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const showTooltip = () => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const tipW = 288 // w-72
        const margin = 12
        // Always left of the row, clamp to 8px from viewport edge
        const left = Math.max(8, r.left - tipW - margin)
        setPos({ top: r.top + window.scrollY, left })
        setHover(true)
    }

    const onEnter = () => {
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(showTooltip, 200)
    }

    const onLeave = () => {
        if (timer.current) clearTimeout(timer.current)
        // grace period - lets cursor travel onto tooltip
        timer.current = setTimeout(() => setHover(false), 150)
    }

    const onTipEnter = () => {
        if (timer.current) clearTimeout(timer.current)
    }
    const onTipLeave = () => {
        if (timer.current) clearTimeout(timer.current)
        setHover(false)
    }

    return (
        <motion.div
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.05 * i }}
        >
            <Link
                ref={ref}
                href={`/posts/${p.slug}`}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                onFocus={onEnter}
                onBlur={onLeave}
                className="block rounded-md px-1.5 py-1 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
            >
                <p className="text-[11px] font-medium text-zinc-800 dark:text-zinc-100 line-clamp-2 leading-snug">
                    {p.title}
                </p>
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                    {p.readingTime} min
                </span>
            </Link>

            {mounted && hover && pos &&
                createPortal(
                    <div
                        className="absolute z-[100]"
                        style={{ top: pos.top, left: pos.left }}
                        onMouseEnter={onTipEnter}
                        onMouseLeave={onTipLeave}
                    >
                        <Link
                            href={`/posts/${p.slug}`}
                            className="block w-72 max-w-[20rem] rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-2xl px-3 py-2 animate-in fade-in zoom-in-95 duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                                {p.title}
                            </p>
                            {p.description && (
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-3 leading-snug">
                                    {p.description}
                                </p>
                            )}
                            <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                                <span>{new Date(p.date).toLocaleDateString()}</span>
                                <span>·</span>
                                <span>{p.readingTime} min read</span>
                            </div>
                        </Link>
                    </div>,
                    document.body
                )}
        </motion.div>
    )
}

const BlogPreviewCard = ({ posts, className }: Props) => {
    return (
        <BentoCard className={`group/blog relative ${className || ""}`}>
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-tr from-violet-500/15 to-pink-500/10 blur-3xl opacity-60" />

            <div className="relative h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
                            Recent Blogs
                        </h3>
                    </div>
                    <Link
                        href="/posts"
                        className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="space-y-1 flex-1">
                    {posts.length === 0 ? (
                        <p className="text-xs text-zinc-500">No posts yet</p>
                    ) : (
                        posts.map((p, i) => <BlogRow key={p.slug} p={p} i={i} />)
                    )}
                </div>
            </div>
        </BentoCard>
    )
}

export default BlogPreviewCard
