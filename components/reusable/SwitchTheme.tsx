"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

type ThemeReveal = {
    destination: Theme;
    target: Theme;
    buttonBounds?: DOMRectReadOnly;
    transition?: ViewTransition;
    animation?: Animation;
};

const revealLayer = "::view-transition-new(root)";
const revealFrames: Keyframe[] = [
    { maskSize: "0px auto", easing: "cubic-bezier(.22,.8,.38,1)" },
    { maskSize: "75vmax auto", offset: 0.3, easing: "ease-in" },
    { maskSize: "225vmax auto", offset: 0.62, easing: "ease-in" },
    { maskSize: "1250vmax auto" },
];

function paintTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
}

function containsClick(bounds: DOMRectReadOnly | undefined, { clientX, clientY }: MouseEvent) {
    return bounds && clientX >= bounds.left && clientX <= bounds.right && clientY >= bounds.top && clientY <= bounds.bottom;
}

export default function SwitchTheme() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [requestedTheme, setRequestedTheme] = useState<Theme | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const activeReveal = useRef<ThemeReveal | null>(null);

    const toggleTheme = useCallback(() => {
        const root = document.documentElement;
        const current = activeReveal.current;
        const theme = current?.target ?? (root.classList.contains("dark") ? "dark" : "light");
        const next = theme === "dark" ? "light" : "dark";

        if (current) {
            current.target = next;
            setRequestedTheme(next);
            current.animation?.updatePlaybackRate(next === current.destination ? 1 : -1);
            return;
        }

        if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            paintTheme(next);
            setTheme(next);
            return;
        }

        const reveal: ThemeReveal = {
            destination: next,
            target: next,
            buttonBounds: buttonRef.current?.getBoundingClientRect(),
        };
        activeReveal.current = reveal;
        setRequestedTheme(next);
        root.classList.add("theme-revealing");

        const transition = document.startViewTransition(() => {
            if (activeReveal.current === reveal) paintTheme(reveal.destination);
        });
        reveal.transition = transition;

        const finish = () => {
            if (activeReveal.current !== reveal) return;
            activeReveal.current = null;
            paintTheme(reveal.target);
            setTheme(reveal.target);
            setRequestedTheme(null);
            transition.skipTransition();
            reveal.animation?.cancel();
            root.classList.remove("theme-revealing");
        };

        void transition.ready.then(() => {
            if (activeReveal.current !== reveal) return;
            if (reveal.target !== reveal.destination) {
                finish();
                return;
            }

            try {
                // The incoming theme stays behind the mask even when the animation reverses.
                reveal.animation = root.animate(revealFrames, {
                    duration: 710,
                    fill: "both",
                    pseudoElement: revealLayer,
                });
                if (!(reveal.animation.effect instanceof KeyframeEffect) || reveal.animation.effect.pseudoElement !== revealLayer) {
                    finish();
                    return;
                }
                reveal.animation.onfinish = finish;
            } catch {
                finish();
            }
        }, finish);

        void transition.finished.then(finish, finish);
    }, [setTheme]);

    useEffect(() => {
        setMounted(true);
        return () => {
            const reveal = activeReveal.current;
            activeReveal.current = null;
            reveal?.transition?.skipTransition();
            reveal?.animation?.cancel();
            document.documentElement.classList.remove("theme-revealing");
        };
    }, []);

    useEffect(() => {
        function handleCapturedClick(event: MouseEvent) {
            const button = buttonRef.current;
            const root = document.documentElement;
            const reveal = activeReveal.current;
            if (!reveal || !button || event.detail === 0 ||
                (event.target !== root && event.target !== document.body)) return;

            // The photographed navbar may still show its old size after scrolling.
            if (containsClick(reveal.buttonBounds, event) || containsClick(button.getBoundingClientRect(), event)) {
                toggleTheme();
            }
        }

        document.addEventListener("click", handleCapturedClick, true);
        return () => document.removeEventListener("click", handleCapturedClick, true);
    }, [toggleTheme]);

    return (
        <button
            ref={buttonRef}
            type="button"
            aria-label="Dark theme"
            aria-pressed={mounted ? (requestedTheme ?? resolvedTheme) === "dark" : undefined}
            onClick={toggleTheme}
            className="portfolio-theme-toggle"
        >
            <Moon aria-hidden="true" className="portfolio-theme-moon" />
            <Sun aria-hidden="true" className="portfolio-theme-sun" />
        </button>
    );
}
