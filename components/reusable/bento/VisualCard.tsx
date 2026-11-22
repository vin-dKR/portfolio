"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useThemeReveal } from "@/context/ThemeReveal";

export default function VisualCard() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { isDark, toggleTheme } = useThemeReveal(buttonRef);

    return (
        <button
            ref={buttonRef}
            type="button"
            aria-label="Try the Batman theme transition"
            aria-pressed={isDark}
            onClick={toggleTheme}
            data-theme-trigger="batman"
            className="bento-bat-art col-span-4"
        >
            <Image
                src="/images/batman-card.webp"
                alt="Batman overlooking Gotham beneath the Bat-Signal"
                fill
                sizes="(max-width: 639px) 92vw, 210px"
                unoptimized
                className="bat-art-image object-cover object-center"
            />
            <span className="bat-art-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
            <span className="bat-art-action" aria-hidden="true">Switch theme</span>
        </button>
    );
}
