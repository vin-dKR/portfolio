"use client"

import { useEffect, useId, useRef, type CSSProperties } from "react"
import { twMerge } from "tailwind-merge"
import ImageCarousel from "./ImageCarousel"
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
    const fillRef = useRef<SVGPathElement>(null)
    const gradientId = useId()

    useEffect(() => {
        const wrapper = wrapperRef.current
        const track = trackRef.current
        const fill = fillRef.current
        if (!wrapper || !track || !fill) return

        let scrollFrame = 0

        const updateProgress = () => {
            scrollFrame = 0
            const { top, height } = wrapper.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const progress = Math.min(1, Math.max(0, (viewportHeight - top) / (height + viewportHeight * 0.2)))
            fill.style.strokeDashoffset = String(1 - progress)
        }

        const updatePath = () => {
            const bounds = wrapper.getBoundingClientRect()
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
                    path += ` L ${anchor.x},${bounds.height}`
                    return
                }

                const turnStart = Math.max(anchor.y, Math.min(anchor.bottom + 12, next.y - 24))
                const middle = (turnStart + next.y) / 2
                path += ` L ${anchor.x},${turnStart} C ${anchor.x},${middle} ${next.x},${middle} ${next.x},${next.y}`
            })

            track.setAttribute("d", path)
            fill.setAttribute("d", path)
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
        window.addEventListener("resize", updateProgress)
        updatePath()

        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", scheduleProgress)
            window.removeEventListener("resize", updateProgress)
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
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={gradientColors[1]} stopOpacity="0" />
                        <stop offset="12%" stopColor={gradientColors[1]} />
                        <stop offset="92%" stopColor={gradientColors[0]} />
                        <stop offset="100%" stopColor={gradientColors[0]} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path ref={trackRef} className="om-timeline-path" />
                <path
                    ref={fillRef}
                    className="om-timeline-fill"
                    pathLength={1}
                    stroke={`url(#${gradientId})`}
                />
            </svg>

            <ol className="om-timeline-entries">
                {data.map((item, index) => (
                    <li key={item.title} ref={(element) => { entriesRef.current[index] = element }} className="om-timeline-entry">
                        <span ref={(element) => { dotsRef.current[index] = element }} className="om-timeline-dot" aria-hidden="true" />
                        <div className="om-timeline-entry-heading">
                            <h2 className="text-lg font-semibold text-black dark:text-white">{item.title}</h2>
                            {item.date && <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.date}</p>}
                        </div>
                        {item.image && <ImageCarousel images={item.image} />}
                        <div>
                            <p className="text-sm font-semibold text-black dark:text-white">{item.content}</p>
                            {item.summaryPoints && (
                                <ul className="mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    {item.summaryPoints.map((point) => <li key={point}>{point}</li>)}
                                </ul>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
