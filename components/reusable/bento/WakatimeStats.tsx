"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, Clock, RefreshCw } from "lucide-react"
import { getWakatimeStats } from "@/actions/wakatime"
import type { WakatimeStats as WakatimeStatsData } from "@/lib/wakatimeClient"
import BentoCard from "./BentoCard"
import "./ActivityCards.css"

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

    const namedLanguages = stats?.languages.filter(({ name }) => name !== "Other") ?? []
    const remainingShare = Math.max(0, 100 - namedLanguages.reduce((sum, language) => sum + language.percentage, 0))
    const languages = stats && stats.languageCount > namedLanguages.length && remainingShare > 0
        ? [...namedLanguages, { name: "Other languages", percentage: remainingShare }]
        : namedLanguages

    return (
        <BentoCard className="bento-activity activity-rich col-span-12 sm:col-span-6">
            <div ref={cardContent} className="wakatime-card-content" aria-busy={isLoading}>
                <div className="activity-header mb-2">
                    <h3><Clock aria-hidden="true" size={16} /> <span className="activity-gradient-title">Coding Time</span></h3>
                    <div className="flex shrink-0 items-center gap-0.5">
                        <button type="button" onClick={refreshStats} disabled={isLoading} aria-label="Refresh coding stats">
                            <RefreshCw aria-hidden="true" size={14} className={isLoading ? "motion-safe:animate-spin" : undefined} />
                        </button>
                        <a href={profileUrl} target="_blank" rel="noreferrer" aria-label="View WakaTime profile">
                            <ArrowUpRight aria-hidden="true" size={15} />
                        </a>
                    </div>
                </div>

                {stats ? (
                    <>
                        <dl className="activity-figures activity-inset">
                            <div><dt>{stats.rangeLabel}</dt><dd>{hoursFormatter.format(stats.totalHours)} <small>hrs</small></dd></div>
                            {stats.dailyAverageHours !== null && (
                                <div><dt>Daily avg.</dt><dd>{hoursFormatter.format(stats.dailyAverageHours)} <small>hrs</small></dd></div>
                            )}
                        </dl>

                        {languages.length > 0 ? (
                            <>
                                <p className="activity-section-label mb-1.5">Coding time by language</p>
                                <div className="wakatime-bar" aria-hidden="true">
                                    {languages.map(({ name, percentage }) => (
                                        <span key={name} style={{ flexBasis: `${Math.min(100, Math.max(0, percentage))}%`, backgroundColor: colorFor(name) }} />
                                    ))}
                                </div>
                                <ul className="wakatime-mix" aria-label="Coding languages and share of time">
                                    {languages.map(({ name, percentage }) => (
                                        <li key={name}>
                                            <span className="wakatime-dot" aria-hidden="true" style={{ backgroundColor: colorFor(name) }} />
                                            <span>{name}</span><small>{percentage}%</small>
                                        </li>
                                    ))}
                                </ul>
                                <p className="wakatime-total">{stats.languageCount} languages tracked</p>
                            </>
                        ) : <p className="activity-empty">No language data for this period.</p>}

                        {hasError && <p role="status" className="wakatime-total">Refresh unavailable. Showing the last loaded stats.</p>}
                    </>
                ) : (
                    <p role="status" className="activity-empty">
                        {hasError ? "Coding stats are temporarily unavailable." : "Loading coding activity…"}
                    </p>
                )}
            </div>
        </BentoCard>
    )
}

export default WakatimeStats
