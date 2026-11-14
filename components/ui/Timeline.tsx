"use client"

import { useEffect, useId, useRef } from "react"
import ImageCarousel from "./ImageCarousel"
import "./Timeline.css"

export default function Timeline({ data }: Pick<TimelineProps, "data">) {
    const timelineRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<SVGPathElement>(null)
    const gradientRef = useRef<SVGLinearGradientElement>(null)
    const progressRef = useRef<SVGRectElement>(null)
    const pathId = useId()
    const gradientId = useId()
    const clipId = useId()

    useEffect(() => {
        const timeline = timelineRef.current
        const track = trackRef.current
        const gradient = gradientRef.current
        const progress = progressRef.current
        if (!timeline || !track || !gradient || !progress) return

        const entries = Array.from(timeline.querySelectorAll<HTMLElement>(".om-timeline-entry"))
        const dots = entries.map((entry) => entry.querySelector<HTMLElement>(".om-timeline-dot")!)
        let frame = 0
        let height = 0

        const paint = () => {
            frame = 0
            const top = timeline.getBoundingClientRect().top
            const viewport = window.innerHeight
            const remainingScroll = Math.max(0, document.documentElement.scrollHeight - window.scrollY - viewport)
            const visibleY = viewport - Math.min(viewport * 0.12, remainingScroll) - top

            // The leading edge follows viewport height so a wide turn can't delay the next entry.
            progress.setAttribute("height", String(Math.min(height, Math.max(0, visibleY))))
        }

        const trace = () => {
            const bounds = timeline.getBoundingClientRect()
            height = bounds.height
            const anchors = entries.map((entry, index) => {
                const marker = dots[index].getBoundingClientRect()
                const row = entry.getBoundingClientRect()

                return {
                    x: marker.left + marker.width / 2 - bounds.left,
                    y: marker.top + marker.height / 2 - bounds.top,
                    rowStart: row.top - bounds.top,
                    rowEnd: row.bottom - bounds.top,
                }
            })

            if (!anchors.length) return

            let path = `M ${anchors[0].x} 0`
            anchors.forEach((anchor, index) => {
                const next = anchors[index + 1]
                if (!next) {
                    path += ` L ${anchor.x} ${height - 1}`
                    return
                }

                const turnStart = anchor.rowEnd + 6
                const turnEnd = next.rowStart - 6
                const middle = (turnStart + turnEnd) / 2

                path += ` L ${anchor.x} ${turnStart} C ${anchor.x} ${middle} ${next.x} ${middle} ${next.x} ${turnEnd} L ${next.x} ${next.y}`
            })

            track.setAttribute("d", path)
            gradient.setAttribute("y2", String(height))
            if (frame) window.cancelAnimationFrame(frame)
            paint()
        }

        const schedulePaint = () => {
            if (!frame) frame = window.requestAnimationFrame(paint)
        }

        const resize = new ResizeObserver(trace)
        resize.observe(timeline)
        entries.forEach((entry) => resize.observe(entry))
        window.addEventListener("scroll", schedulePaint, { passive: true })
        window.addEventListener("resize", trace)
        trace()

        return () => {
            resize.disconnect()
            window.removeEventListener("scroll", schedulePaint)
            window.removeEventListener("resize", trace)
            window.cancelAnimationFrame(frame)
        }
    }, [data])

    return (
        <div ref={timelineRef} className="om-timeline">
            <svg className="om-timeline-svg" aria-hidden="true" focusable="false">
                <defs>
                    <linearGradient id={gradientId} ref={gradientRef} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
                        <stop className="om-timeline-copper" offset="0%" />
                        <stop className="om-timeline-dusk" offset="45%" />
                        <stop className="om-timeline-tide" offset="82%" />
                        <stop className="om-timeline-tide" offset="100%" />
                    </linearGradient>
                    <clipPath id={clipId}>
                        <rect ref={progressRef} width="100%" height="0" />
                    </clipPath>
                    <path id={pathId} ref={trackRef} />
                </defs>
                <g stroke={`url(#${gradientId})`}>
                    <use href={`#${pathId}`} className="om-timeline-track" />
                    <g className="om-timeline-progress" clipPath={`url(#${clipId})`}>
                        <use href={`#${pathId}`} className="om-timeline-glow" />
                        <use href={`#${pathId}`} className="om-timeline-fill" />
                    </g>
                </g>
            </svg>

            <ol className="om-timeline-entries" aria-label="Career timeline">
                {data.map((item) => (
                    <li key={item.title} className="om-timeline-entry">
                        <span className="om-timeline-dot" aria-hidden="true" />
                        <article className="site-panel om-timeline-card">
                            <div className="om-timeline-copy">
                                {item.date && <p className="eyebrow om-timeline-date">{item.date}</p>}
                                <h2 className="om-timeline-title">{item.title}</h2>
                                <p className="om-timeline-role">{item.content}</p>
                                {item.summaryPoints && (
                                    <ul className="om-timeline-responsibilities">
                                        {item.summaryPoints.map((point) => <li key={point}>{point}</li>)}
                                    </ul>
                                )}
                            </div>
                            {!!item.image?.length && <ImageCarousel images={item.image} label={item.title} />}
                        </article>
                    </li>
                ))}
            </ol>
        </div>
    )
}
