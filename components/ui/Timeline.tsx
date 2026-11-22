"use client"

import { useEffect, useId, useRef, type CSSProperties } from "react"
import { twMerge } from "tailwind-merge"
import ImageCarousel from "./ImageCarousel"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import "./Timeline.css"

export default function Timeline({
    data,
    styleClass,
    entriesGap = "4.5rem",
    entryGap = "0.875rem",
    titleGap = "0.2rem",
    pathWidth = "2px",
    titleMaxWidth = "20rem",
    pathColor,
    gradientColors = ["#3b82f6", "#7f00ff"],
}: TimelineProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const entriesRef = useRef<(HTMLLIElement | null)[]>([])
    const dotsRef = useRef<(HTMLSpanElement | null)[]>([])
    const trackRef = useRef<SVGPathElement>(null)
    const gradientRef = useRef<SVGLinearGradientElement>(null)
    const progressRef = useRef<SVGRectElement>(null)
    const gradientId = useId()
    const pathId = useId()
    const clipId = useId()

    useEffect(() => {
        const wrapper = wrapperRef.current
        const track = trackRef.current
        const gradient = gradientRef.current
        const progress = progressRef.current
        if (!wrapper || !track || !gradient || !progress) return

        let scrollFrame = 0
        let height = 0

        const updateProgress = () => {
            scrollFrame = 0
            const { top } = wrapper.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const remainingScroll = Math.max(0, document.documentElement.scrollHeight - window.scrollY - viewportHeight)
            const visibleY = viewportHeight - Math.min(viewportHeight * 0.12, remainingScroll) - top

            // Track the viewport rather than the curved path length, so wide turns cannot delay the color.
            progress.setAttribute("height", String(Math.min(height, Math.max(0, visibleY))))
        }

        const updatePath = () => {
            const bounds = wrapper.getBoundingClientRect()
            height = bounds.height
            const anchors = entriesRef.current.flatMap((entry, index) => {
                const dot = dotsRef.current[index]
                if (!entry || !dot) return []
                const marker = dot.getBoundingClientRect()
                return [{
                    x: marker.left + marker.width / 2 - bounds.left,
                    y: marker.top + marker.height / 2 - bounds.top,
                    bottom: entry.getBoundingClientRect().bottom - bounds.top,
                }]
            })
            if (!anchors.length) return

            let path = `M ${anchors[0].x},0`
            anchors.forEach((anchor, index) => {
                const next = anchors[index + 1]
                if (!next) {
                    path += ` L ${anchor.x},${height - 1}`
                    return
                }

                const turnStart = Math.max(anchor.y, Math.min(anchor.bottom + 12, next.y - 24))
                const middle = (turnStart + next.y) / 2
                path += ` L ${anchor.x},${turnStart} C ${anchor.x},${middle} ${next.x},${middle} ${next.x},${next.y}`
            })

            track.setAttribute("d", path)
            gradient.setAttribute("y2", String(height))
            if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
            updateProgress()
        }

        const scheduleProgress = () => {
            if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress)
        }

        const observer = new ResizeObserver(updatePath)
        observer.observe(wrapper)
        entriesRef.current.forEach((entry) => {
            if (entry) observer.observe(entry)
        })
        window.addEventListener("scroll", scheduleProgress, { passive: true })
        window.addEventListener("resize", updatePath)
        updatePath()

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", scheduleProgress)
            window.removeEventListener("resize", updatePath)
            window.cancelAnimationFrame(scrollFrame)
        }
    }, [data])

    const customStyles = {
        "--timeline-entries-gap": entriesGap,
        "--timeline-entry-gap": entryGap,
        "--timeline-title-gap": titleGap,
        "--timeline-path-width": pathWidth,
        "--timeline-title-max-width": titleMaxWidth,
        "--timeline-path-color": pathColor,
    } as CSSProperties

    return (
        <div ref={wrapperRef} className={twMerge("om-timeline", styleClass)} style={customStyles}>
            <svg className="om-timeline-svg" aria-hidden="true" focusable="false">
                <defs>
                    <linearGradient id={gradientId} ref={gradientRef} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={gradientColors[1]} />
                        <stop offset="38%" stopColor={gradientColors[1]} />
                        <stop offset="90%" stopColor={gradientColors[0]} />
                        <stop offset="100%" stopColor={gradientColors[0]} />
                    </linearGradient>
                    <clipPath id={clipId}>
                        <rect ref={progressRef} width="100%" height="0" />
                    </clipPath>
                    <path id={pathId} ref={trackRef} />
                </defs>
                <g stroke={`url(#${gradientId})`}>
                    <use href={`#${pathId}`} className="om-timeline-path" />
                    <use href={`#${pathId}`} className="om-timeline-fill" clipPath={`url(#${clipId})`} />
                </g>
            </svg>

            <ol className="om-timeline-entries" aria-label="Career timeline">
                {data.map((item, index) => (
                    <li key={item.title} ref={(element) => { entriesRef.current[index] = element }} className="om-timeline-entry">
                        <span ref={(element) => { dotsRef.current[index] = element }} className="om-timeline-dot" aria-hidden="true" />
                        <div className="om-timeline-entry-heading">
                            <h2>{item.title}</h2>
                            {item.date && <p>{item.date}</p>}
                        </div>
                        <div className="om-timeline-card">
                            {item.image && <div className="om-timeline-photo"><ImageCarousel images={item.image} /></div>}
                            <div className="om-timeline-story">
                                <p className="om-timeline-role">{item.content}</p>
                                {item.summaryPoints && (
                                    <ul>
                                        {item.summaryPoints.map((point) => <li key={point} className="om-timeline-point">{point}</li>)}
                                    </ul>
                                )}
                                {item.title === "Freelancer" && (
                                    <Link href="/projects" prefetch={false} className="site-link">
                                        Explore client work <ArrowUpRight aria-hidden="true" size={14} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
