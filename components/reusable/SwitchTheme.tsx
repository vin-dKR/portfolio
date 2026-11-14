"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SwitchTheme() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.add("theme-motion");
        setTheme(root.classList.contains("dark") ? "light" : "dark");
    };

    return (
        <button
            type="button"
            aria-label="Dark theme"
            aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
            onClick={toggleTheme}
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-black/5 text-zinc-700 hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-white/8 dark:text-zinc-100 dark:hover:bg-white/14 motion-safe:transition-colors"
        >
            <Moon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-[18px] dark:scale-75 dark:rotate-45 dark:opacity-0 motion-safe:transition-[opacity,rotate,scale] motion-safe:duration-200"
            />
            <Sun
                aria-hidden="true"
                className="col-start-1 row-start-1 size-[18px] scale-75 -rotate-45 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100 motion-safe:transition-[opacity,rotate,scale] motion-safe:duration-200"
            />
        </button>
    );
}
