"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fontStorageKey, isTypeface, typefaces, type TypefaceId } from "@/constant/Typography";

interface TypographyState {
    font: TypefaceId;
    pending: TypefaceId | null;
    error: string | null;
    selectFont: (font: TypefaceId) => Promise<boolean>;
}

const TypographyContext = createContext<TypographyState | null>(null);

export function TypographyProvider({ children }: { children: ReactNode }) {
    const [font, setFont] = useState<TypefaceId>("lenia");
    const [pending, setPending] = useState<TypefaceId | null>(null);
    const [error, setError] = useState<string | null>(null);
    const request = useRef(0);
    const transition = useRef<ViewTransition | null>(null);

    useEffect(() => {
        const saved = document.documentElement.dataset.font;
        if (isTypeface(saved)) setFont(saved);
        return () => {
            // This ref is a request counter; invalidate pending font loads on unmount.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            request.current++;
            transition.current?.skipTransition();
            document.documentElement.classList.remove("font-changing");
        };
    }, []);

    const selectFont = useCallback(async (next: TypefaceId) => {
        const selected = typefaces.find(({ id }) => id === next);
        if (!selected) return false;
        const version = ++request.current;
        setPending(next);
        setError(null);

        try {
            const family = selected.family.split(",")[0];
            await Promise.all([400, 600].map((weight) => document.fonts.load(`${weight} 16px ${family}`)));
            if (version !== request.current) return false;

            const root = document.documentElement;
            const apply = () => {
                root.dataset.font = next;
                setFont(next);
                try { localStorage.setItem(fontStorageKey, next); } catch { /* The choice still works for this visit. */ }
            };
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            transition.current?.skipTransition();

            if (document.startViewTransition && !reduceMotion && !root.classList.contains("theme-revealing")) {
                root.classList.add("font-changing");
                try {
                    const active = document.startViewTransition(apply);
                    transition.current = active;
                    void active.ready.catch(() => {});
                    void active.finished.catch(() => {}).finally(() => {
                        if (transition.current !== active) return;
                        transition.current = null;
                        root.classList.remove("font-changing");
                    });
                } catch {
                    root.classList.remove("font-changing");
                    apply();
                }
            } else {
                apply();
            }
            return true;
        } catch {
            if (version === request.current) setError("This typeface couldn’t load. Try again.");
            return false;
        } finally {
            if (version === request.current) setPending(null);
        }
    }, []);

    const value = useMemo(() => ({ font, pending, error, selectFont }), [font, pending, error, selectFont]);
    return <TypographyContext.Provider value={value}>{children}</TypographyContext.Provider>;
}

export function useTypography() {
    const value = useContext(TypographyContext);
    if (!value) throw new Error("Typography controls must be inside TypographyProvider.");
    return value;
}
