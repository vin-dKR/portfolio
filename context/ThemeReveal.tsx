"use client";

import { useTheme } from "next-themes";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";

type Theme = "light" | "dark";

type ThemeReveal = {
    destination: Theme;
    target: Theme;
    triggerBounds: DOMRectReadOnly[];
    transition?: ViewTransition;
    animation?: Animation;
};

type ThemeRevealContextValue = {
    isDark: boolean | undefined;
    toggleTheme: () => void;
    registerTrigger: (trigger: HTMLButtonElement) => () => void;
};

const ThemeRevealContext = createContext<ThemeRevealContextValue | null>(null);
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

function containsClick(bounds: DOMRectReadOnly, { clientX, clientY }: MouseEvent) {
    return clientX >= bounds.left && clientX <= bounds.right && clientY >= bounds.top && clientY <= bounds.bottom;
}

export function ThemeRevealProvider({ children }: { children: ReactNode }) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [requestedTheme, setRequestedTheme] = useState<Theme | null>(null);
    const triggers = useRef(new Set<HTMLButtonElement>());
    const activeReveal = useRef<ThemeReveal | null>(null);

    const registerTrigger = useCallback((trigger: HTMLButtonElement) => {
        triggers.current.add(trigger);
        return () => { triggers.current.delete(trigger); };
    }, []);

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
            triggerBounds: Array.from(triggers.current, (trigger) => trigger.getBoundingClientRect()),
        };
        activeReveal.current = reveal;
        setRequestedTheme(next);
        root.classList.add("theme-revealing");

        const finish = () => {
            if (activeReveal.current !== reveal) return;
            activeReveal.current = null;
            paintTheme(reveal.target);
            setTheme(reveal.target);
            setRequestedTheme(null);
            reveal.transition?.skipTransition();
            reveal.animation?.cancel();
            root.classList.remove("theme-revealing");
        };

        try {
            reveal.transition = document.startViewTransition(() => {
                if (activeReveal.current === reveal) paintTheme(reveal.destination);
            });
        } catch {
            finish();
            return;
        }

        void reveal.transition.ready.then(() => {
            if (activeReveal.current !== reveal) return;
            if (reveal.target !== reveal.destination) {
                finish();
                return;
            }

            try {
                // Keep the incoming theme behind the same mask when it reverses.
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

        void reveal.transition.finished.then(finish, finish);
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
            const root = document.documentElement;
            const reveal = activeReveal.current;
            if (!reveal || event.detail === 0 || (event.target !== root && event.target !== document.body)) return;

            // Snapshots can keep showing a trigger's earlier position or navbar width.
            const bounds = [
                ...reveal.triggerBounds,
                ...Array.from(triggers.current, (trigger) => trigger.getBoundingClientRect()),
            ];
            if (bounds.some((rectangle) => containsClick(rectangle, event))) toggleTheme();
        }

        document.addEventListener("click", handleCapturedClick, true);
        return () => document.removeEventListener("click", handleCapturedClick, true);
    }, [toggleTheme]);

    const value = useMemo(() => ({
        isDark: mounted ? (requestedTheme ?? resolvedTheme) === "dark" : undefined,
        toggleTheme,
        registerTrigger,
    }), [mounted, requestedTheme, resolvedTheme, toggleTheme, registerTrigger]);

    return <ThemeRevealContext.Provider value={value}>{children}</ThemeRevealContext.Provider>;
}

export function useThemeReveal(triggerRef: RefObject<HTMLButtonElement | null>) {
    const context = useContext(ThemeRevealContext);
    if (!context) throw new Error("Theme controls must be rendered inside ThemeProvider.");
    const { registerTrigger } = context;

    useEffect(() => {
        const trigger = triggerRef.current;
        if (trigger) return registerTrigger(trigger);
    }, [registerTrigger, triggerRef]);

    return { isDark: context.isDark, toggleTheme: context.toggleTheme };
}
