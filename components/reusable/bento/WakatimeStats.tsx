"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { ArrowUpRight, Clock, RefreshCw } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { getWakatimeStats } from "@/actions/wakatime"
import type { WakatimeStats as WakatimeStatsData } from "@/lib/wakatimeClient"
import BentoCard from "./BentoCard"
import { Flow } from "@/components/ui/Flow"
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
    const highlightId = useId()
    const reduceMotion = useReducedMotion()
    const cardContent = useRef<HTMLDivElement>(null)
    const refreshInProgress = useRef(false)
    const [stats, setStats] = useState<WakatimeStatsData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
    const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null)
    const [focusedLanguage, setFocusedLanguage] = useState<string | null>(null)
    const [refreshMessage, setRefreshMessage] = useState("")
    const [refreshTurns, setRefreshTurns] = useState(0)

    const refreshStats = useCallback(async (announce = false) => {
        if (refreshInProgress.current) return
        refreshInProgress.current = true
        setIsLoading(true)
        setHasError(false)
        if (announce) {
            setRefreshMessage("Refreshing coding stats.")
            setRefreshTurns((turns) => turns + 1)
        }

        try {
            const data = await getWakatimeStats()
            if (data) {
                setStats(data)
                if (announce) setRefreshMessage("Coding stats refreshed.")
            } else {
                setHasError(true)
                if (announce) setRefreshMessage("Coding stats could not refresh. Try again.")
            }
        } catch {
            setHasError(true)
            if (announce) setRefreshMessage("Coding stats could not refresh. Try again.")
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
    const committedLanguage = languages.find(({ name }) => name === selectedLanguage) ?? languages[0]
    const inspectedLanguage = hoveredLanguage ?? focusedLanguage
    const currentLanguage = languages.find(({ name }) => name === inspectedLanguage) ?? committedLanguage
    let cursor = 0
    const segments = languages.map(({ name, percentage }) => {
        const start = cursor
        const share = Math.min(100 - cursor, Math.max(0, percentage))
        cursor += share
        return { name, start, share }
    })

    function selectLanguage(name: string) {
        setSelectedLanguage(name)
        setFocusedLanguage(null)
    }

    return (
        <BentoCard className="bento-activity activity-rich col-span-12 sm:col-span-6">
            <div ref={cardContent} className="wakatime-card-content" aria-busy={isLoading}>
                <div className="activity-header mb-2">
                    <h3><Clock aria-hidden="true" size={16} /> <span className="activity-gradient-title">Coding time</span></h3>
                    <div className="flex shrink-0 items-center gap-0.5">
                        <button type="button" className="wakatime-refresh" data-refreshing={isLoading} onClick={() => { void refreshStats(true) }} disabled={isLoading} aria-label="Refresh coding stats" title={isLoading ? "Refreshing stats…" : "Refresh coding stats"}>
                            <motion.span
                                aria-hidden="true"
                                className="wakatime-refresh-glyph"
                                initial={false}
                                animate={{ rotate: refreshTurns * 360 }}
                                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 24 }}
                            >
                                <RefreshCw aria-hidden="true" size={14} />
                            </motion.span>
                        </button>
                        <a className="wakatime-profile" href={profileUrl} target="_blank" rel="noreferrer" aria-label="View WakaTime profile">
                            <ArrowUpRight aria-hidden="true" size={15} />
                        </a>
                    </div>
                </div>

                <span role="status" className="sr-only">{refreshMessage}</span>

                {stats ? (
                    <>
                        <dl className="activity-figures activity-inset">
                            <div><dt>{stats.rangeLabel}</dt><dd><Flow value={stats.totalHours} format={hoursFormatter.format} /> <small>hrs</small></dd></div>
                            {stats.dailyAverageHours !== null && (
                                <div><dt>Daily avg.</dt><dd><Flow value={stats.dailyAverageHours} format={hoursFormatter.format} /> <small>hrs</small></dd></div>
                            )}
                        </dl>

                        {languages.length > 0 ? (
                            <>
                                <div className="wakatime-chart-heading">
                                    <p className="activity-section-label">Coding time by language</p>
                                    <span className="wakatime-chart-hint">{isLoading ? "Refreshing…" : hasError ? "Showing saved stats" : "Select a language"}</span>
                                </div>
                                <div className="wakatime-chart">
                                    <div className="wakatime-ring" data-inspecting={Boolean(inspectedLanguage)}>
                                        <svg className="wakatime-ring-svg" viewBox="0 0 132 132" aria-hidden="true">
                                            <circle className="wakatime-ring-track" cx="66" cy="66" r="60" />
                                            {segments.map(({ name, start, share }) => share > 0 && (
                                                <circle
                                                    key={name}
                                                    aria-hidden="true"
                                                    className="wakatime-arc"
                                                    cx="66" cy="66" r="60"
                                                    pathLength="100"
                                                    stroke={colorFor(name)}
                                                    strokeDasharray={`${share} ${100 - share}`}
                                                    strokeDashoffset={-start}
                                                    transform="rotate(-180 66 66)"
                                                    data-active={currentLanguage.name === name}
                                                    data-language={name}
                                                    onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredLanguage(name) }}
                                                    onPointerMove={(event) => { if (event.pointerType !== "touch" && hoveredLanguage !== name) setHoveredLanguage(name) }}
                                                    onPointerLeave={() => setHoveredLanguage(null)}
                                                    onClick={() => selectLanguage(name)}
                                                />
                                            ))}
                                        </svg>
                                        <div className="wakatime-ring-center" aria-hidden="true">
                                            <strong><Flow value={currentLanguage.percentage} /> <small>%</small></strong>
                                            <span key={currentLanguage.name} className="wakatime-language-label">{currentLanguage.name}</span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="wakatime-mix" aria-label="Coding languages and share of time">
                                    {languages.map(({ name, percentage }) => (
                                        <li key={name}>
                                            <button
                                                type="button"
                                                aria-pressed={committedLanguage.name === name}
                                                data-active={currentLanguage.name === name}
                                                onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredLanguage(name) }}
                                                onPointerMove={(event) => { if (event.pointerType !== "touch" && hoveredLanguage !== name) setHoveredLanguage(name) }}
                                                onPointerLeave={() => setHoveredLanguage(null)}
                                                onFocus={() => { setHoveredLanguage(null); setFocusedLanguage(name) }}
                                                onBlur={() => setFocusedLanguage(null)}
                                                onClick={() => selectLanguage(name)}
                                            >
                                                <span className="wakatime-dot" aria-hidden="true" style={{ backgroundColor: colorFor(name) }} />
                                                <span>{name}</span><small><Flow value={percentage} />%</small>
                                                {currentLanguage.name === name && (
                                                    <motion.span
                                                        aria-hidden="true"
                                                        className="wakatime-row-highlight"
                                                        layoutId={`${highlightId}-language`}
                                                        initial={false}
                                                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 42 }}
                                                    />
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <p className="wakatime-total wakatime-card-foot"><span><Flow value={stats.languageCount} /> languages tracked</span><span>{stats.rangeLabel}</span></p>
                            </>
                        ) : <p className="activity-empty">No language data for this period.</p>}
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
