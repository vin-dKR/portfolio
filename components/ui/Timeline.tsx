import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import "./Timeline.css";

const sanitizeHtml = (html: string) => {
    return { __html: html };
};

const Timeline: React.FC<TimelineProps> = ({
    data,
    styleClass,
    entriesGap,
    entryGap,
    titleGap,
    pathWidth,
    titleMaxWidth,
    pathColor = '#e2e8f0',
    gradientColors = ['#3b82f6', '#7f00ff'],
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const entriesRefs = useRef<(HTMLDivElement | null)[]>(Array(data.length).fill(null))
    const timelineSvgRef = useRef<SVGSVGElement>(null);
    const timelinePathRef = useRef<SVGPathElement>(null);
    const timelineGradientPathRef = useRef<SVGPathElement>(null);
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [scrollableParent, setScrollableParent] = useState<HTMLElement | Window>(window);

    const customStyles: React.CSSProperties = {
        '--om-timeline-entries-gap': entriesGap || '5rem',
        '--om-timeline-entry-gap': entryGap || '4rem',
        '--om-timeline-entry-title-gap': titleGap || '2rem',
        '--om-timeline-path-width': pathWidth || '2px',
        '--om-timeline-entry-title-max-width': titleMaxWidth || '25rem',
        '--om-timeline-path-color': pathColor,
        '--om-timeline-gradient-start': gradientColors[0],
        '--om-timeline-gradient-end': gradientColors[1],
    } as React.CSSProperties;

    useEffect(() => {
        const determineScrollContext = () => {
            let parent = wrapperRef.current?.parentElement;

            while (parent && parent !== document.body) {
                const overflowY = window.getComputedStyle(parent).overflowY;
                if (overflowY === 'auto' || overflowY === 'scroll') {
                    setScrollableParent(parent);
                    break;
                }
                parent = parent.parentElement;
            }
        };

        determineScrollContext();
        setHeight();

        const handleScroll = () => updateTimelineLine();
        const handleResize = () => setHeight();

        scrollableParent.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            scrollableParent.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [scrollableParent, data]);

    const setHeight = () => {
        if (!wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        updateSvgPathAndCircles(rect);
        updateTimelineLine();
    };

    const updateTimelineLine = () => {
        if (!wrapperRef.current || !timelineGradientPathRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const scrollHeight =
            scrollableParent === window
                ? window.innerHeight
                    : (scrollableParent as HTMLElement).clientHeight;

        const scrollTop =
            scrollableParent === window
                ? window.scrollY
                    : (scrollableParent as HTMLElement).scrollTop;

        const topPosition = scrollTop - (rect.top + window.scrollY) + 160;
        const totalHeight = rect.height + 320;

        let progress = topPosition / (totalHeight - scrollHeight);
        progress = Math.max(0, Math.min(1, progress));

        const length = timelineGradientPathRef.current.getTotalLength();
        timelineGradientPathRef.current.style.strokeDasharray = `${length}`;
        timelineGradientPathRef.current.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    const updateSvgPathAndCircles = (wrapperRect: DOMRect) => {
        if (!timelineSvgRef.current || !timelinePathRef.current || !timelineGradientPathRef.current) return;

        const { path, circlePositions } = calculateSvgPathAndCircles(wrapperRect);
        timelineSvgRef.current.setAttribute('width', `${wrapperRect.width}`);
        timelineSvgRef.current.setAttribute('height', `${wrapperRect.height}`);
        timelinePathRef.current.setAttribute('d', path);
        timelineGradientPathRef.current.setAttribute('d', path);

        console.log('Circle Positions:', circlePositions);
        console.log('Circle Refs:', circleRefs.current);

        circleRefs.current.forEach((circle, index) => {
            if (circle && circlePositions[index]) {
                const { x, y } = circlePositions[index];
                circle.style.left = `${x - 20}px`; // Center circle
                circle.style.top = `${y - 20}px`; // Center circle relative to entry
            }
        });
    };

    const calculateSvgPathAndCircles = (wrapperRect: DOMRect): { path: string; circlePositions: { x: number; y: number }[] } => {
        const entries = entriesRefs.current.filter(Boolean) as HTMLDivElement[];
        if (entries.length === 0) return { path: '', circlePositions: [] };

        let path = '';
        const circlePositions: { x: number; y: number }[] = [];
        const isMobile = window.innerWidth <= 1000;
        const curveExtension = isMobile ? 200 : 500;
        const padding = 80;

        entries.forEach((entry, i) => {
            const entryRect = entry.getBoundingClientRect();
            const startX = i % 2 === 0 ? padding : wrapperRect.width - padding;
            const endX = i % 2 === 0 ? wrapperRect.width - padding : padding;
            const startY = entryRect.top - wrapperRect.top + 20;
            const endY = entryRect.bottom - wrapperRect.top;

            circlePositions.push({ x: startX, y: startY });

            if (i === 0) {
                path += `M${startX},${startY - 160}`;
            }

            const extendedY = endY + 10;
            path += ` L${startX},${extendedY}`;

            if (i < entries.length - 1) {
                const nextEntryRect = entries[i + 1].getBoundingClientRect();
                const nextStartY = nextEntryRect.top - wrapperRect.top + 60;
                const controlPointY1 = extendedY + curveExtension;
                const controlPointY2 = nextStartY - curveExtension;
                path += ` C${startX},${controlPointY1} ${endX},${controlPointY2} ${endX},${nextStartY}`;
            } else {
                path += ` L${startX},${endY + 160}`;
            }
        });

        return { path, circlePositions };
    };

    return (
        <div
            ref={wrapperRef}
            className={twMerge('om-timeline w-full relative switch', styleClass)}
            style={customStyles}
        >
            <div className="om-timeline-entries relative flex flex-col gap-[--om-timeline-entries-gap] py-40 max-w-full">
                {data.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            if (el !== null) {
                                entriesRefs.current[index] = el;
                            }
                        }}
                        className={twMerge(
                            'om-timeline-entry flex items-end pt-5 gap-[--om-timeline-entry-gap]',
                            index % 2 !== 0 ? 'right-side flex-row-reverse justify-end' : 'left-side justify-start'
                        )}
                    >
                        <div
                            className={twMerge(
                            'om-timeline-entry-header sticky top-40 z-40 flex items-center gap-[--om-timeline-entry-title-gap] relative',
                                index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row mr-32 md:mr-0'
                            )}
                        >
                            <div
                                ref={(el) => {
                                    if (el !== null) {
                                        circleRefs.current[index] = el
                                    }
                                }}
                                className="om-timeline-circle h-10 w-10 rounded-full bg-black flex items-center justify-center flex-shrink-0"
                                style={{ position: 'sticky', top: '5rem', right: '60px' }} // Match header sticky
                            >
                                <div className="om-timeline-inner-circle h-4 w-4 rounded-full bg-gray-800 border border-gray-600"></div>
                            </div>
                            <div className={index % 2 !== 0 ? 'mr-12 text-right' : 'md:ml-12 text-left'}>
                                <div
                                    className="om-timeline-entry-title text-lg font-semibold"
                                    dangerouslySetInnerHTML={sanitizeHtml(item.title)}
                                />
                                    {item.date && <div className="text-sm text-gray-500">{item.date}</div>}
                                </div>
                            </div>

                            <div 
                                className={twMerge(
                                    'om-timeline-entry-content flex-1 max-w-full',
                                    index % 2 !== 0 ? "text-right flex flex-col items-end " : ""
                                                   )}>
                                {item.image && (
                                    <img src={item.image} alt={item.title} className="w-[150px] md:w-[250px] max-w-xs mb-4 rounded-lg" />
                                )}
                                <div dangerouslySetInnerHTML={sanitizeHtml(item.content)} />
                                {item.summaryPoints && (
                                    <ul className="list-disc ml-5 mt-2">
                                        {item.summaryPoints.map((point, i) => (
                                            <li key={i} className="text-sm md:text-md text-gray-700">{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="om-timeline-line-wrapper absolute top-0 w-full h-full pointer-events-none">
                        <svg
                            ref={timelineSvgRef}
                            className="om-timeline-svg absolute"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 1 }} />
                                <stop offset="10%" style={{ stopColor: gradientColors[1], stopOpacity: 1 }} />
                                <stop offset="90%" style={{ stopColor: gradientColors[0], stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="gradientBg" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 1 }} />
                                <stop offset="10%" style={{ stopColor: pathColor, stopOpacity: 1 }} />
                                <stop offset="90%" style={{ stopColor: pathColor, stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path ref={timelinePathRef} className="om-timeline-path" />
                            <path ref={timelineGradientPathRef} className="om-timeline-gradient-path" />
                        </svg>
                    </div>
                </div>
            </div>
    )
}

export default Timeline
