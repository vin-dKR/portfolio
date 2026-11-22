"use client"

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react"
import { ArrowUpRight, BookMarked, CircleDot, GitPullRequest, Github, Loader2, Star, UserPlus, Users } from "lucide-react"
import Image from "next/image"
import { GithubProvider } from "@/context/GithubContext"
import { useGithubData } from "@/hooks/github"
import BentoCard from "./BentoCard"
import { Flow } from "@/components/ui/Flow"
import "./ActivityCards.css"

const metrics = [
    { key: "followers", label: "Followers", Icon: Users },
    { key: "following", label: "Following", Icon: UserPlus },
    { key: "stars", label: "Stars", Icon: Star },
    { key: "prs", label: "PRs", Icon: GitPullRequest },
    { key: "issues", label: "Issues", Icon: CircleDot },
    { key: "publicRepos", label: "Repos", Icon: BookMarked },
] as const

const number = new Intl.NumberFormat("en-US")
const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
})

type Contribution = GithubStatsProps["contributions"][number]

function ContributionHistory({ days, total }: { days: Contribution[]; total: number }) {
    const input = useRef<HTMLInputElement>(null)
    const [selected, setSelected] = useState<number | null>(null)
    const [inspecting, setInspecting] = useState(false)
    const latest = days.length - 1
    const index = Math.min(selected ?? latest, latest)
    const current = days[index]
    const padding = (7 - days.length % 7) % 7
    const weeks = (padding + days.length) / 7
    const parsedDate = new Date(`${current.date}T00:00:00Z`)
    const dayLabel = Number.isNaN(parsedDate.getTime()) ? current.date : date.format(parsedDate)
    const valueText = `${dayLabel} · ${number.format(current.count)} ${current.count === 1 ? "contribution" : "contributions"}`

    function selectDay(next: number) {
        setSelected(Math.min(latest, Math.max(0, next)))
    }

    function handleClick(event: MouseEvent<HTMLDivElement>) {
        const grid = event.currentTarget
        const { left, top, width, height } = grid.getBoundingClientRect()
        const column = Math.min(weeks - 1, Math.floor((event.clientX - left) / width * weeks))
        const row = Math.min(6, Math.floor((event.clientY - top) / height * 7))
        selectDay(column * 7 + row - padding)
        input.current?.focus({ preventScroll: true })
    }

    return (
        <div className="github-history">
            <div className="mb-1 flex items-center justify-between gap-2">
                <p className="github-history-caption truncate">
                    {inspecting ? (
                        <>{dayLabel} · <Flow value={current.count} format={number.format} /> {current.count === 1 ? "contribution" : "contributions"}</>
                    ) : (
                        <><Flow value={total} format={number.format} /> contributions · past year</>
                    )}
                </p>
                <div aria-hidden="true" className="github-history-key">
                    {[0, 1, 2, 3, 4].map((level) => <span key={level} data-level={level} />)}
                </div>
            </div>
            <div
                onClick={handleClick}
                className="github-history-grid"
                style={{ "--calendar-weeks": weeks } as CSSProperties}
            >
                <input
                    ref={input}
                    type="range"
                    min={1}
                    max={days.length}
                    value={index + 1}
                    aria-label="GitHub contributions by day"
                    aria-valuetext={valueText}
                    onChange={(event) => selectDay(Number(event.target.value) - 1)}
                    onFocus={() => setInspecting(true)}
                    onBlur={() => setInspecting(false)}
                    className="github-history-input"
                />
                {Array.from({ length: padding }, (_, i) => <span key={i} aria-hidden="true" />)}
                {days.map((day, i) => (
                    <span
                        key={day.date}
                        aria-hidden="true"
                        data-level={day.level}
                        data-selected={inspecting && index === i ? "true" : undefined}
                        title={`${day.date}: ${day.count}`}
                    />
                ))}
            </div>
        </div>
    )
}

function GithubStats({ username }: { username: string }) {
    const card = useRef<HTMLDivElement>(null)
    const [isNearViewport, setIsNearViewport] = useState(false)
    const stats = useGithubData(isNearViewport ? username : "")

    useEffect(() => {
        const target = card.current
        if (!target) return

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            setIsNearViewport(true)
            observer.disconnect()
        }, { rootMargin: "160px" })
        observer.observe(target)
        return () => observer.disconnect()
    }, [])

    const handle = stats.username || username
    const days = stats.contributions.slice(-182)

    return (
        <BentoCard className="bento-activity activity-rich col-span-12 sm:col-span-6">
            <div ref={card} className="github-card-content" aria-busy={stats.loading}>
                <div className="activity-header mb-2">
                    <h3><Github aria-hidden="true" size={16} /> <span className="activity-gradient-title">GitHub</span></h3>
                    <a href={`https://github.com/${handle}`} target="_blank" rel="noreferrer" aria-label="View GitHub profile">
                        <ArrowUpRight aria-hidden="true" size={15} />
                    </a>
                </div>

                {stats.error ? (
                    <p className="activity-empty">GitHub activity is temporarily unavailable.</p>
                ) : !stats.username ? (
                    <div role="status" className="activity-empty" aria-label="Loading GitHub activity">
                        <Loader2 aria-hidden="true" size={19} className="motion-safe:animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="mb-3 flex items-center gap-3">
                            {stats.avatar ? (
                                <Image src={stats.avatar} width={40} height={40} alt="" unoptimized
                                    className="size-10 shrink-0 rounded-full ring-2 ring-violet-400/30" />
                            ) : (
                                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-violet-500/15">
                                    <Github aria-hidden="true" size={19} />
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">@{handle}</p>
                                {stats.bio && <p className="line-clamp-2 text-[11px] leading-snug text-[var(--bento-muted)]">{stats.bio}</p>}
                            </div>
                        </div>

                        <dl className="mb-3 grid grid-cols-3 gap-1.5">
                            {metrics.map(({ key, label, Icon }) => (
                                <div key={key} className="activity-inset flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5">
                                    <dt className="order-last text-[9px] tracking-wide uppercase text-[var(--bento-muted)]">{label}</dt>
                                    <Icon aria-hidden="true" size={12} className="text-[var(--bento-accent)]" />
                                    <dd className="font-mono text-sm leading-none font-semibold"><Flow value={stats[key]} format={number.format} /></dd>
                                </div>
                            ))}
                        </dl>

                        {stats.topLanguages.length > 0 && (
                            <div className="mb-3">
                                <p className="activity-section-label mb-1">Top languages</p>
                                <div className="mb-1 flex h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/5" aria-hidden="true">
                                    {stats.topLanguages.map(({ name, color, percentage }) => (
                                        <span key={name} style={{ flexBasis: `${percentage}%`, backgroundColor: color }} />
                                    ))}
                                </div>
                                <ul className="activity-language-key" aria-label="GitHub repository languages">
                                    {stats.topLanguages.map(({ name, color, percentage }) => (
                                        <li key={name}>
                                            <span aria-hidden="true" style={{ backgroundColor: color }} />
                                            {name}<span className="sr-only"> {percentage}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {stats.topRepo && (
                            <a className="activity-inset activity-top-repo mb-3 block rounded-xl px-2.5 py-2"
                                href={stats.topRepo.url} target="_blank" rel="noreferrer">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-[11px] font-semibold">{stats.topRepo.name}</span>
                                    <span className="flex shrink-0 items-center gap-1 text-[10px] text-[var(--bento-muted)]">
                                        <Star aria-hidden="true" size={12} /> <Flow value={stats.topRepo.stars} format={number.format} />
                                    </span>
                                </div>
                                {stats.topRepo.description && <p className="line-clamp-1 text-[10px] text-[var(--bento-muted)]">{stats.topRepo.description}</p>}
                            </a>
                        )}

                        {days.length > 0 && <ContributionHistory days={days} total={stats.totalContributions} />}
                    </>
                )}
            </div>
        </BentoCard>
    )
}

export default function GithubStatsCard({ username }: { username: string }) {
    return <GithubProvider><GithubStats username={username} /></GithubProvider>
}
