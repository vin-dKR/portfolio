"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, Clock, RefreshCw } from "lucide-react"
import { getWakatimeStats } from "@/actions/wakatime"
import type { WakatimeStats as WakatimeStatsData } from "@/lib/wakatimeClient"

const profileUrl = "https://wakatime.com/@fb861e4c-0eee-42a3-8d54-a65ccab34573"
const hoursFormatter = new Intl.NumberFormat("en", { maximumFractionDigits: 1 })

const WakatimeStats = () => {
    const cardContent = useRef<HTMLElement>(null)
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
        <article ref={cardContent} className="site-panel activity-card" aria-busy={isLoading}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="activity-title"><Clock aria-hidden="true" size={18} /> WakaTime</h3>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={refreshStats} disabled={isLoading} aria-label="Refresh coding stats" className="activity-refresh">
                        <RefreshCw aria-hidden="true" size={15} className={isLoading ? "motion-safe:animate-spin" : undefined} />
                    </button>
                    <a href={profileUrl} target="_blank" rel="noreferrer" className="text-link text-link--muted">
                        Profile <ArrowUpRight aria-hidden="true" size={15} />
                    </a>
                </div>
            </div>
            {stats ? (
                <>
                    <dl className="activity-numbers">
                        <div><dt>{stats.rangeLabel}</dt><dd>{hoursFormatter.format(stats.totalHours)}<small> hrs</small></dd></div>
                        {stats.dailyAverageHours !== null && <div><dt>Daily average</dt><dd>{hoursFormatter.format(stats.dailyAverageHours)}<small> hrs</small></dd></div>}
                        <div><dt>Languages</dt><dd>{stats.languageCount}</dd></div>
                    </dl>
                    {stats.languages.length ? (
                        <ul className="activity-language-list" aria-label="Top languages by coding time">
                            {stats.languages.map(({ name, percentage }) => (
                                <li key={name}>
                                    <span>{name}</span><span>{percentage}%</span>
                                    <div className="activity-language-bar" aria-hidden="true"><div style={{ width: `${percentage}%` }} /></div>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="activity-summary">No language data for this period.</p>}
                    {hasError && <p role="status" className="activity-summary mt-3">Refresh unavailable. Showing the last loaded stats.</p>}
                </>
            ) : (
                <p className="activity-empty" role="status">{hasError ? "Coding stats are temporarily unavailable." : "Loading coding activity…"}</p>
            )}
        </article>
    )
}

export default WakatimeStats
