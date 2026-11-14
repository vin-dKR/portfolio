"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const batShape = "M0 46C21 20 56 9 96 12c-4 10-2 22 13 28l4-16 5 10h4l5-10 4 16c15-6 17-18 13-28 40-3 75 8 96 34-34-8-54 1-56 23-16-11-33-3-35 13-12-6-21 2-29 16-8-14-17-22-29-16-2-16-19-24-35-13C54 47 34 38 0 46Z";
const batFlight: Keyframe[] = [
    { transform: "scale(0.28)", opacity: 0, offset: 0, easing: "cubic-bezier(0.2, 0.75, 0.3, 1)" },
    { transform: "scale(0.8)", opacity: 0.94, offset: 0.22, easing: "ease-in" },
    { transform: "scale(1.25)", opacity: 0.82, offset: 0.56, easing: "cubic-bezier(0.65, 0, 0.84, 0.48)" },
    { transform: "scale(8)", opacity: 0, offset: 1 },
];

export default function SwitchTheme() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const gradientId = useId();
    const silhouette = useRef<SVGSVGElement>(null);
    const flight = useRef<Animation | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            flight.current?.cancel();
            document.documentElement.classList.remove("theme-in-motion");
        };
    }, []);

    function toggleTheme() {
        const root = document.documentElement;
        const nextTheme = root.classList.contains("dark") ? "light" : "dark";
        const bat = silhouette.current;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!reducedMotion && bat?.animate) {
            const active = flight.current;
            root.classList.add("theme-in-motion");
            if (active && active.playState === "running") {
                active.reverse();
            } else {
                bat.dataset.destination = nextTheme;
                const animation = bat.animate(batFlight, { duration: 590 });
                flight.current = animation;
                animation.onfinish = () => {
                    if (flight.current === animation) {
                        flight.current = null;
                        root.classList.remove("theme-in-motion");
                    }
                };
            }
        } else {
            flight.current?.cancel();
            flight.current = null;
            root.classList.remove("theme-in-motion");
        }

        root.classList.toggle("dark", nextTheme === "dark");
        root.classList.toggle("light", nextTheme === "light");
        setTheme(nextTheme);
    }

    return (
        <>
            <button
                type="button"
                aria-label="Dark theme"
                aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
                onClick={toggleTheme}
                className="portfolio-theme-toggle"
            >
                <Moon aria-hidden="true" className="portfolio-theme-moon" />
                <Sun aria-hidden="true" className="portfolio-theme-sun" />
            </button>
            {mounted && createPortal(
                <div className="portfolio-theme-flight" aria-hidden="true">
                    <svg ref={silhouette} className="portfolio-theme-bat" viewBox="0 0 240 104" focusable="false">
                        <defs>
                            <linearGradient id={gradientId} x1="15%" y1="0%" x2="85%" y2="100%">
                                <stop stopColor="var(--bat-tip)" />
                                <stop offset="100%" stopColor="var(--bat-core)" />
                            </linearGradient>
                        </defs>
                        <path d={batShape} fill={`url(#${gradientId})`} stroke="var(--bat-edge)" strokeWidth="0.55" />
                    </svg>
                </div>,
                document.body,
            )}
        </>
    );
}
