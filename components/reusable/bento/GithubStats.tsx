"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    ArrowUpRight,
    Github,
    Loader2,
    Users,
    Star,
    GitPullRequest,
    CircleDot,
    UserPlus,
    BookMarked,
} from "lucide-react"
import BentoCard from "./BentoCard"
import { useGithubData } from "@/hooks/github"
import Link from "next/link"
import Image from "next/image"

interface GithubStatsProps {
    username: string
}

const intensityClass = (n: number) =>
    [
        "bg-zinc-200/60 dark:bg-white/5",
        "bg-violet-300/40 dark:bg-violet-500/20",
        "bg-violet-400/60 dark:bg-violet-500/40",
        "bg-violet-500/80 dark:bg-violet-400/70",
        "bg-fuchsia-500 dark:bg-fuchsia-400",
    ][n] || "bg-zinc-200"

const GithubStats = ({ username }: GithubStatsProps) => {
    const stats = useGithubData(username)

    const stat = [
        { key: "followers", label: "Followers", Icon: Users },
        { key: "following", label: "Following", Icon: UserPlus },
        { key: "stars", label: "Stars", Icon: Star },
        { key: "prs", label: "PRs", Icon: GitPullRequest },
        { key: "issues", label: "Issues", Icon: CircleDot },
        { key: "publicRepos", label: "Repos", Icon: BookMarked },
    ] as const

    // Real contributions - take last 182 days, pad to multiple of 7
    const contribs = stats.contributions || []
    const slice = contribs.slice(-182)
    while (slice.length % 7 !== 0) slice.unshift({ date: '', count: 0, level: 0 })

    return (
        <BentoCard className="col-span-4 sm:col-span-1 md:col-span-3 row-span-1 group/github relative overflow-hidden">
            {/* gradient halo */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-fuchsia-500/15 to-cyan-500/10 blur-3xl opacity-50" />

            <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <Github className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium bg-gradient-to-r from-zinc-700 via-violet-500 to-fuchsia-500 dark:from-zinc-200 dark:via-violet-300 dark:to-fuchsia-300 bg-clip-text text-transparent">
                            GitHub
                        </h3>
                    </div>
                </div>

                {stats.loading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
                    </div>
                ) : stats.error ? (
                    <div className="text-xs text-red-500 mt-4">Error: {stats.error}</div>
                ) : (
                    <>
                        {/* Profile row */}
                        <div className="flex items-center gap-3 mb-3">
                            {stats.avatar ? (
                                <Image
                                    src={stats.avatar}
                                    alt={stats.username || username}
                                    width={48}
                                    height={48}
                                    unoptimized
                                    className="w-10 h-10 rounded-full ring-2 ring-violet-400/30 dark:ring-violet-300/30 shrink-0"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 shrink-0" />
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                        @{stats.username || username}
                                    </span>
                                </div>
                                {stats.bio && (
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
                                        {stats.bio}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                            {stat.map((item, index) => {
                                const value = stats[item.key as keyof typeof stats] ?? 0
                                const Icon = item.Icon
                                return (
                                    <motion.div
                                        key={item.key}
                                        initial={{ y: 6, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.04 }}
                                        className="flex flex-col items-center justify-center rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-sm py-1.5"
                                    >
                                        <Icon className="w-3 h-3 text-violet-600 dark:text-violet-300 mb-0.5" />
                                        <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                                            {String(value)}
                                        </span>
                                        <span className="text-[9px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            {item.label}
                                        </span>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Top languages bar */}
                        {stats.topLanguages && stats.topLanguages.length > 0 && (
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Top Languages
                                    </span>
                                </div>
                                <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                                    {stats.topLanguages.map((l) => (
                                        <div
                                            key={l.name}
                                            style={{ width: `${l.percentage}%`, background: l.color }}
                                            title={`${l.name} ${l.percentage}%`}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                                    {stats.topLanguages.slice(0, 4).map((l) => (
                                        <div
                                            key={l.name}
                                            className="flex items-center gap-1 text-[10px] text-zinc-600 dark:text-zinc-400"
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ background: l.color }}
                                            />
                                            <span>{l.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Top repo */}
                        {stats.topRepo && (
                            <Link
                                href={stats.topRepo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mb-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.07] transition-colors px-2.5 py-2"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                        {stats.topRepo.name}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                                        <Star className="w-3 h-3" />
                                        {stats.topRepo.stars}
                                    </span>
                                </div>
                                {stats.topRepo.description && (
                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                                        {stats.topRepo.description}
                                    </p>
                                )}
                            </Link>
                        )}

                        {/* Real contribution heatmap (last 6 months) */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    {stats.totalContributions > 0
                                        ? `${stats.totalContributions} contributions · last year`
                                        : 'Activity'}
                                </span>
                                <div className="flex items-center gap-0.5">
                                    {[0, 1, 2, 3, 4].map((n) => (
                                        <div
                                            key={n}
                                            className={`w-1.5 h-1.5 rounded-[2px] ${intensityClass(n)}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-flow-col grid-rows-7 gap-[2px]">
                                {slice.map((c, i) => (
                                    <div
                                        key={i}
                                        title={c.date ? `${c.date}: ${c.count}` : undefined}
                                        className={`w-[6px] h-[6px] rounded-[1.5px] ${intensityClass(c.level)}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 right-0 opacity-50 group-hover/github:opacity-100 transition-opacity duration-300">
                    <Link
                        href={`https://github.com/${stats.username || username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ArrowUpRight className="w-4 h-4 text-black dark:text-white" />
                    </Link>
                </div>
            </div>
        </BentoCard>
    )
}

export default GithubStats
