"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, GitPullRequest, Star } from "lucide-react"
import { GithubProvider } from "@/context/GithubContext"
import { useGithubData } from "@/hooks/github"
import BentoCard from "./BentoCard"

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

    const history = stats.contributions.slice(-168)
    const padding = (7 - history.length % 7) % 7
    const days = [...Array.from({ length: padding }, () => ({ date: "", count: 0, level: 0 })), ...history]

    return (
        <BentoCard className="bento-activity col-span-12 sm:col-span-7">
            <div ref={card} aria-busy={stats.loading}>
                <div className="activity-header">
                    <h3><Github aria-hidden="true" size={16} /> GitHub</h3>
                    <a href={`https://github.com/${stats.username || username}`} target="_blank" rel="noreferrer" aria-label="View GitHub profile">
                        @{username} <ArrowUpRight aria-hidden="true" size={14} />
                    </a>
                </div>

                {stats.error ? (
                    <p className="activity-empty">GitHub activity is temporarily unavailable.</p>
                ) : !stats.username ? (
                    <p role="status" className="activity-empty">Loading GitHub activity…</p>
                ) : (
                    <>
                        <dl className="activity-figures">
                            <div><dt>Repos</dt><dd>{stats.publicRepos}</dd></div>
                            <div><dt>Stars</dt><dd>{stats.stars}</dd></div>
                            <div><dt>PRs</dt><dd>{stats.prs}</dd></div>
                        </dl>

                        {days.length > 0 && (
                            <div className="github-activity">
                                <p>{stats.totalContributions.toLocaleString("en-US")} contributions in the past year</p>
                                <div className="github-heatmap" role="img" aria-label="GitHub contribution frequency over the most recent 24 weeks">
                                    {days.map(({ date, count, level }, index) => (
                                        <span key={date || index} data-level={level} title={date ? `${date}: ${count}` : undefined} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {stats.topRepo && (
                            <a className="activity-repo" href={stats.topRepo.url} target="_blank" rel="noreferrer">
                                <GitPullRequest aria-hidden="true" size={14} />
                                <span>{stats.topRepo.name}</span>
                                <small><Star aria-hidden="true" size={12} /> {stats.topRepo.stars}</small>
                            </a>
                        )}
                    </>
                )}
            </div>
        </BentoCard>
    )
}

export default function GithubStatsCard({ username }: { username: string }) {
    return <GithubProvider><GithubStats username={username} /></GithubProvider>
}
