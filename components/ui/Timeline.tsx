"use client"

import { useEffect, useId, useRef, type CSSProperties } from "react"
import { twMerge } from "tailwind-merge"
import ImageCarousel from "./ImageCarousel"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import "./Timeline.css"

type Point = { x: number; y: number }
type Anchor = Point & { top: number; bottom: number }

function threadPath(anchors: Anchor[], height: number) {
    const turns = anchors.slice(0, -1).map((anchor, index) => ({
        x: (anchor.x + anchors[index + 1].x) / 2,
        y: (anchor.bottom + anchors[index + 1].top) / 2,
    }))
    const handles = anchors.map((anchor, index) => Math.max(0, Math.min(
        anchor.y - (turns[index - 1]?.y ?? 0),
        (turns[index]?.y ?? height) - anchor.y,
    )))
    const first = anchors[0]
    let path = `M ${first.x},0 C ${first.x},${first.y / 3} ${first.x},${first.y - handles[0]} ${first.x},${first.y}`

    turns.forEach((middle, index) => {
        const anchor = anchors[index]
        const next = anchors[index + 1]
        const horizontal = (next.x - anchor.x) / 4
        // Both halves share a horizontal derivative here; their node ends share vertical derivatives.
        path += ` C ${anchor.x},${anchor.y + handles[index]} ${middle.x - horizontal},${middle.y} ${middle.x},${middle.y}`
        path += ` C ${middle.x + horizontal},${middle.y} ${next.x},${next.y - handles[index + 1]} ${next.x},${next.y}`
    })

    const last = anchors[anchors.length - 1]
    return `${path} C ${last.x},${last.y + handles[handles.length - 1]} ${last.x},${height - (height - last.y) / 3} ${last.x},${height}`
}

export default function Timeline({
    data,
    styleClass,
    entriesGap = "8rem",
    entryGap = "1.1rem",
    titleGap = "0.35rem",
    pathWidth = "1.5px",
    titleMaxWidth = "20rem",
    pathColor,
    gradientColors = ["#429b87", "#8370ae"],
}: TimelineProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const entriesRef = useRef<(HTMLLIElement | null)[]>([])
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const dotsRef = useRef<(HTMLSpanElement | null)[]>([])
    const stopsRef = useRef<(SVGStopElement | null)[]>([])
    const svgRef = useRef<SVGSVGElement>(null)
    const trackRef = useRef<SVGPathElement>(null)
    const gradientRef = useRef<SVGLinearGradientElement>(null)
    const progressRef = useRef<SVGRectElement>(null)
    const gradientId = useId()
    const pathId = useId()
    const clipId = useId()
    const colors = [gradientColors[1] ?? "#8370ae", "#5c83b7", gradientColors[0] ?? "#429b87"]

    useEffect(() => {
        const wrapper = wrapperRef.current
        const svg = svgRef.current
        const track = trackRef.current
        const gradient = gradientRef.current
        const progress = progressRef.current
        if (!wrapper || !svg || !track || !gradient || !progress) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        let measureFrame = 0
        let scrollFrame = 0
        let height = 0
        let anchors: Anchor[] = []
        let disposed = false

        const updateProgress = () => {
            scrollFrame = 0
            const { top } = wrapper.getBoundingClientRect()
            const viewport = window.innerHeight
            const remaining = Math.max(0, document.documentElement.scrollHeight - window.scrollY - viewport)
            const reveal = reduceMotion.matches ? height : Math.min(height, Math.max(0, viewport - Math.min(viewport * .18, remaining) - top))
            progress.setAttribute("height", String(reveal))

            anchors.forEach((anchor, index) => {
                const entry = entriesRef.current[index]
                if (!entry) return
                entry.dataset.passed = String(reduceMotion.matches || reveal >= anchor.y)
                if (reduceMotion.matches || anchor.top + top < viewport * .94) entry.dataset.visible = "true"
            })
        }

        const measure = () => {
            measureFrame = 0
            const bounds = wrapper.getBoundingClientRect()
            height = bounds.height
            anchors = data.flatMap((_, index) => {
                const card = cardsRef.current[index]
                const dot = dotsRef.current[index]
                if (!card || !dot) return []
                const surface = card.getBoundingClientRect()
                const marker = dot.getBoundingClientRect()
                return [{
                    x: marker.left + marker.width / 2 - bounds.left,
                    y: marker.top + marker.height / 2 - bounds.top,
                    top: surface.top - bounds.top,
                    bottom: surface.bottom - bounds.top,
                }]
            })
            if (!anchors.length || !height) return

            anchors.forEach((anchor, index) => {
                stopsRef.current[index]?.setAttribute("offset", `${anchor.y / height * 100}%`)
            })
            track.setAttribute("d", threadPath(anchors, height))
            svg.setAttribute("viewBox", `0 0 ${bounds.width} ${height}`)
            gradient.setAttribute("y2", String(height))
            progress.setAttribute("width", String(bounds.width))
            updateProgress()
            wrapper.dataset.enhanced = "true"
        }

        const scheduleMeasure = () => {
            if (!measureFrame) measureFrame = window.requestAnimationFrame(measure)
        }
        const scheduleProgress = () => {
            if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress)
        }
        const observer = new ResizeObserver(scheduleMeasure)
        observer.observe(wrapper)
        cardsRef.current.forEach((card) => { if (card) observer.observe(card) })
        dotsRef.current.forEach((dot) => { if (dot) observer.observe(dot) })
        window.addEventListener("scroll", scheduleProgress, { passive: true })
        window.addEventListener("resize", scheduleMeasure)
        reduceMotion.addEventListener("change", scheduleProgress)
        document.fonts.addEventListener("loadingdone", scheduleMeasure)
        void document.fonts.ready.then(() => { if (!disposed) scheduleMeasure() })
        measure()

        return () => {
            disposed = true
            observer.disconnect()
            window.removeEventListener("scroll", scheduleProgress)
            window.removeEventListener("resize", scheduleMeasure)
            reduceMotion.removeEventListener("change", scheduleProgress)
            document.fonts.removeEventListener("loadingdone", scheduleMeasure)
            window.cancelAnimationFrame(measureFrame)
            window.cancelAnimationFrame(scrollFrame)
            delete wrapper.dataset.enhanced
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
            <svg ref={svgRef} className="om-timeline-svg" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <defs>
                    <linearGradient id={gradientId} ref={gradientRef} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
                        {data.map((item, index) => <stop key={item.title} ref={(element) => { stopsRef.current[index] = element }} offset={`${index / Math.max(1, data.length - 1) * 100}%`} stopColor={colors[Math.min(index, colors.length - 1)]} />)}
                    </linearGradient>
                    <clipPath id={clipId}><rect ref={progressRef} width="100%" height="0" /></clipPath>
                    <path id={pathId} ref={trackRef} className="om-timeline-geometry" />
                </defs>
                <g stroke={`url(#${gradientId})`}>
                    <use href={`#${pathId}`} className="om-timeline-path" />
                    <use href={`#${pathId}`} className="om-timeline-fill" clipPath={`url(#${clipId})`} />
                </g>
            </svg>

            <ol className="om-timeline-entries" aria-label="Career timeline">
                {data.map((item, index) => (
                    <li key={item.title} ref={(element) => { entriesRef.current[index] = element }} className="om-timeline-entry" style={{ "--timeline-node-color": colors[Math.min(index, colors.length - 1)] } as CSSProperties}>
                        <span ref={(element) => { dotsRef.current[index] = element }} className="om-timeline-dot" aria-hidden="true" />
                        <div ref={(element) => { cardsRef.current[index] = element }} className="om-timeline-card">
                            <div className="om-timeline-card-inner">
                                {item.image && <div className="om-timeline-photo"><ImageCarousel images={item.image} /></div>}
                                <div className="om-timeline-story">
                                    <header className="om-timeline-entry-heading">
                                        <h2>{item.title}</h2>
                                        {item.date && <p>{item.date}</p>}
                                    </header>
                                    <p className="om-timeline-role">{item.content}</p>
                                    {item.summaryPoints && (
                                        <ul>{item.summaryPoints.map((point) => <li key={point} className="om-timeline-point">{point}</li>)}</ul>
                                    )}
                                    {item.title === "Freelancer" && <Link href="/projects" prefetch={false} className="site-link">Explore client work <ArrowUpRight aria-hidden="true" size={14} /></Link>}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
