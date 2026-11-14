"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, LoaderCircle } from "lucide-react"
import { GithubProvider } from "@/context/GithubContext"
import { useGithubData } from "@/hooks/github"

function GithubActivity({ username }: { username: string }) {
    const card = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(false)
    const stats = useGithubData(visible ? username : "")

    useEffect(() => {
        const element = card.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            setVisible(true)
            observer.disconnect()
        }, { rootMargin: "160px" })
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    const history = stats.contributions.slice(-140)
    const padding = (7 - history.length % 7) % 7
    const days = [...Array.from({ length: padding }, () => ({ date: "", count: 0, level: 0 })), ...history]

    return (
        <article ref={card} className="site-panel activity-card">
            <div className="flex items-center justify-between gap-3">
                <h3 className="activity-title"><Github aria-hidden="true" size={18} /> GitHub</h3>
                <a href={`https://github.com/${username}`} className="text-link text-link--muted" target="_blank" rel="noreferrer">
                    @{username} <ArrowUpRight aria-hidden="true" size={15} />
                </a>
            </div>

            {stats.error ? (
                <p className="activity-empty" role="status">GitHub stats are temporarily unavailable.</p>
            ) : !stats.username ? (
                <p className="activity-empty gap-2" role="status"><LoaderCircle aria-hidden="true" size={15} className="motion-safe:animate-spin" /> Loading GitHub activity…</p>
            ) : (
                <>
                    <dl className="activity-numbers">
                        <div><dt>Public repos</dt><dd>{stats.publicRepos}</dd></div>
                        <div><dt>Followers</dt><dd>{stats.followers}</dd></div>
                        {stats.contributions.length > 0 && <div><dt>Contributions in the last year</dt><dd>{stats.totalContributions.toLocaleString("en-US")}</dd></div>}
                    </dl>
                    {days.length > 0 && (
                        <div className="activity-heatmap" style={{ gridTemplateColumns: `repeat(${days.length / 7}, minmax(0, 1fr))` }} role="img" aria-label="GitHub contribution activity over the most recent 20 weeks">
                            {days.map(({ date, count, level }, index) => (
                                <span key={date || index} data-level={level} title={date ? `${date}: ${count} contributions` : undefined} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </article>
    )
}

export default function GithubStats({ username }: { username: string }) {
    return <GithubProvider><GithubActivity username={username} /></GithubProvider>
}
