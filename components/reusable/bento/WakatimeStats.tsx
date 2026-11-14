"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, Clock, RefreshCw, Zap } from "lucide-react"
import { getWakatimeStats } from "@/actions/wakatime"
import type { WakatimeStats as WakatimeStatsData } from "@/lib/wakatimeClient"
import BentoCard from "./BentoCard"

const profileUrl = "https://wakatime.com/@fb861e4c-0eee-42a3-8d54-a65ccab34573"
const hoursFormatter = new Intl.NumberFormat("en", { maximumFractionDigits: 1 })

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
    const cardContent = useRef<HTMLDivElement>(null)
    const refreshInProgress = useRef(false)
    const [stats, setStats] = useState<WakatimeStatsData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const refreshStats = useCallback(async () => {
        if (refreshInProgress.current) return
        refreshInProgress.current = true
        setIsLoading(true)
        setHasError(false)

        try {
            const data = await getWakatimeStats()
            if (data) setStats(data)
            else setHasError(true)
        } catch {
            setHasError(true)
        } finally {
            refreshInProgress.current = false
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const target = cardContent.current
        if (!target) return

        let timer: ReturnType<typeof setInterval> | undefined
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            void refreshStats()
            timer = setInterval(refreshStats, 3600000)
        }, { rootMargin: "160px" })

        observer.observe(target)
        return () => {
            observer.disconnect()
            clearInterval(timer)
        }
    }, [refreshStats])

    return (
        <BentoCard className="col-span-4 sm:col-span-3 h-full">
            <div className="pointer-events-none absolute -top-20 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/15 blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-gradient-to-tr from-purple-500/15 to-pink-500/10 blur-3xl opacity-50" />

            <div className="relative" ref={cardContent} aria-busy={isLoading}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <div className="flex gap-2 items-center">
                        <Clock aria-hidden="true" className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            Coding Time
                        </h3>
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5 text-zinc-600 dark:text-zinc-300">
                        <button
                            type="button"
                            onClick={refreshStats}
                            disabled={isLoading}
                            aria-label="Refresh coding stats"
                            className="grid size-8 place-items-center rounded-md hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-60"
                        >
                            <RefreshCw aria-hidden="true" className={`size-3.5 ${isLoading ? "motion-safe:animate-spin" : ""}`} />
                        </button>
                        <a
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View WakaTime profile"
                            className="grid size-8 place-items-center rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                        >
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                        </a>
                    </div>
                </div>

                {stats ? (
                    <>
                        <div className="rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-2.5 mb-3">
                            <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
                                <div className="min-w-0">
                                    <div className="flex items-baseline">
                                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums leading-none">
                                            {hoursFormatter.format(stats.totalHours)}
                                        </span>
                                        <span className="ml-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300">hrs</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                                        {stats.rangeLabel}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-0.5 shrink-0">
                                    {stats.dailyAverageHours !== null && (
                                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-300">
                                            {hoursFormatter.format(stats.dailyAverageHours)}h/day
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 text-[10px] font-mono text-purple-600 dark:text-purple-300">
                                        <Zap aria-hidden="true" className="w-3 h-3 fill-current" />
                                        {stats.languageCount} langs
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            {stats.languages.map((lang) => {
                                const c = colorFor(lang.name)
                                return (
                                    <div key={lang.name}>
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
                                        <div aria-hidden="true" className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{ background: c, width: `${lang.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                            {stats.languages.length === 0 && (
                                <div className="text-center text-xs text-zinc-600 dark:text-zinc-400 py-4">
                                    {stats.totalHours === 0 ? "No coding activity yet" : "No language data available"}
                                </div>
                            )}
                        </div>
                        {hasError && (
                            <p role="status" className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                                Refresh unavailable. Showing the last loaded stats.
                            </p>
                        )}
                    </>
                ) : (
                    <p className="grid min-h-40 place-items-center text-center text-xs text-zinc-600 dark:text-zinc-400" role="status">
                        {hasError ? "Coding stats are temporarily unavailable." : "Loading coding activity…"}
                    </p>
                )}
            </div>
        </BentoCard>
    )
}

export default WakatimeStats
