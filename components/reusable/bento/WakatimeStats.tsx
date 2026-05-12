"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, RefreshCw, Zap } from "lucide-react"
import BentoCard from "./BentoCard"
import { useWakatime } from "@/context/WakatimeContext"
import Link from "next/link"

const langColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Java: "#b07219",
    "C++": "#f34b7d",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    JSON: "#ad7c5b",
    Markdown: "#083fa1",
    Solidity: "#AA6746",
    SQL: "#dad8d8",
    YAML: "#cb171e",
    TSX: "#3178c6",
    JSX: "#f1e05a",
}

const colorFor = (name: string) => langColors[name] || "#a1a1aa"

const WakatimeStats = () => {
    const { wakatimeStats, isLoading, errors, refreshStats } = useWakatime()

    useEffect(() => {
        refreshStats()
        const id = setInterval(refreshStats, 3600000)
        return () => clearInterval(id)
    }, [refreshStats])

    const avgPerDay = wakatimeStats.totalHours > 0
        ? Math.round((wakatimeStats.totalHours / 7) * 10) / 10
        : 0

    return (
        <BentoCard className="relative col-span-4 sm:col-span-2 group/wakatime h-full relative overflow-hidden">
            {/* gradient halo */}
            <div className="pointer-events-none absolute -top-20 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/15 blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-purple-500/15 to-pink-500/10 blur-3xl opacity-50" />

            <div className="relative">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2 items-center">
                        <Clock className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            Coding Time
                        </h3>
                    </div>
                    <button
                        onClick={() => refreshStats()}
                        disabled={isLoading}
                        title="Refresh stats"
                        className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                </div>

                {errors ? (
                    <div className="flex justify-center items-center h-32 text-red-500 text-xs">
                        Couldn&apos;t load WakaTime data
                    </div>
                ) : (
                    <>
                        {/* Big hours card */}
                        <Link
                            href="https://wakatime.com/@fb861e4c-0eee-42a3-8d54-a65ccab34573"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-sm px-3 py-2.5 mb-3"
                        >
                            <div className="flex items-end justify-between gap-2">
                                <div className="min-w-0">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 120 }}
                                        className="flex items-baseline"
                                    >
                                        <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-blue-400 to-purple-600 bg-clip-text text-transparent leading-none">
                                            {wakatimeStats.totalHours}
                                        </span>
                                        <span className="ml-1 text-xs sm:text-sm font-medium text-blue-500 dark:text-blue-300">hrs</span>
                                    </motion.div>
                                    <p className="text-[9px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        last 7 days
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-0.5 shrink-0">
                                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-300">
                                        ~{avgPerDay}h/day
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] font-mono text-purple-600 dark:text-purple-300">
                                        <Zap className="w-3 h-3 fill-current" />
                                        {wakatimeStats.languages.length} langs
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Per-language bars with real lang colors */}
                        <div className="space-y-1.5">
                            {wakatimeStats.languages.slice(0, 5).map((lang, index) => {
                                const c = colorFor(lang.name)
                                return (
                                    <motion.div
                                        key={lang.name}
                                        initial={{ x: -8, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className="flex justify-between text-[10px] mb-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{ background: c }}
                                                />
                                                <span className="text-zinc-800 dark:text-zinc-200 font-medium">{lang.name}</span>
                                            </div>
                                            <span className="text-zinc-500 dark:text-zinc-400 font-mono">{lang.percentage}%</span>
                                        </div>
                                        <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${lang.percentage}%` }}
                                                transition={{ delay: index * 0.05 + 0.1, duration: 0.8 }}
                                                className="h-full rounded-full"
                                                style={{ background: c }}
                                            />
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {wakatimeStats.languages.length === 0 && !isLoading && (
                                <div className="text-center text-xs text-zinc-500 py-4">
                                    No coding activity yet
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>
            <div className="absolute bottom-2 right-2 opacity-50 group-hover/wakatime:opacity-100 transition-opacity duration-300">
                <Link
                    href="https://wakatime.com/@fb861e4c-0eee-42a3-8d54-a65ccab34573"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ArrowUpRight className="w-4 h-4 text-black dark:text-white" />
                </Link>
            </div>
        </BentoCard>
    )
}

export default WakatimeStats
