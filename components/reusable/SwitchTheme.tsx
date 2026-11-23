"use client";

import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { useThemeReveal } from "@/context/ThemeReveal";

export default function SwitchTheme() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { isDark, toggleTheme } = useThemeReveal(buttonRef);

    return (
        <button
            ref={buttonRef}
            type="button"
            aria-label="Dark theme"
            aria-pressed={isDark}
            onClick={toggleTheme}
            data-theme-trigger="navbar"
            className="portfolio-theme-toggle"
        >
            <Moon aria-hidden="true" className="portfolio-theme-moon" />
            <Sun aria-hidden="true" className="portfolio-theme-sun" />
        </button>
    );
}
