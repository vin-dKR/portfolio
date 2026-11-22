"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Check, ChevronDown, Loader2, Type, X } from "lucide-react";
import { typefaces, type TypefaceId } from "@/constant/Typography";
import { useTypography } from "@/context/TypographyProvider";

export default function FontSelector() {
    const id = useId();
    const trigger = useRef<HTMLButtonElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const menuSession = useRef(0);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ left: 0, bottom: 0 });
    const { font, pending, error, selectFont } = useTypography();
    const selected = typefaces.find(({ id }) => id === font)!;

    const place = useCallback(() => {
        const bounds = trigger.current?.getBoundingClientRect();
        if (!bounds) return;
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) {
            panel.current?.hidePopover();
            return;
        }
        const width = Math.min(304, window.innerWidth - 24);
        const height = Math.min(panel.current?.scrollHeight || 308, window.innerHeight - 24);
        const above = bounds.top - height - 10;
        const top = above >= 12 ? above : Math.min(window.innerHeight - height - 12, bounds.bottom + 10);
        setPosition({
            left: Math.min(window.innerWidth - width - 12, Math.max(12, bounds.left + bounds.width / 2 - width / 2)),
            bottom: Math.max(12, window.innerHeight - top - height),
        });
    }, []);

    useEffect(() => {
        if (!open) return;
        place();
        window.addEventListener("resize", place);
        window.addEventListener("scroll", place, { passive: true });
        return () => {
            window.removeEventListener("resize", place);
            window.removeEventListener("scroll", place);
        };
    }, [open, place]);

    const close = () => {
        panel.current?.hidePopover();
        trigger.current?.focus({ preventScroll: true });
    };

    async function choose(next: TypefaceId) {
        const session = menuSession.current;
        if (await selectFont(next) && session === menuSession.current && panel.current?.matches(":popover-open")) close();
    }

    return (
        <div className="font-selector">
            <button
                ref={trigger}
                type="button"
                popoverTarget={id}
                onClick={place}
                className="font-selector-trigger"
                aria-expanded={open}
                aria-label={`Select website typeface. Current font ${selected.name}`}
                title="Change the typeface across every page"
            >
                <Type aria-hidden="true" size={14} />
                <span>Typeface</span>
                <span className="font-selector-value">{selected.name}</span>
                <ChevronDown aria-hidden="true" size={12} />
            </button>
            <div
                ref={panel}
                id={id}
                popover="auto"
                className="font-selector-panel"
                style={{ "--font-menu-left": `${position.left}px`, "--font-menu-bottom": `${position.bottom}px` } as CSSProperties}
                onBeforeToggle={() => { menuSession.current++; }}
                onToggle={(event) => setOpen(event.currentTarget.matches(":popover-open"))}
            >
                <header>
                    <h2>Set the type</h2>
                    <button type="button" onClick={close} aria-label="Close font selector"><X aria-hidden="true" size={16} /></button>
                </header>
                <fieldset aria-label="Website typeface">
                    {typefaces.map((choice) => (
                        <label key={choice.id} className="font-option" data-selected={font === choice.id}>
                            <input
                                type="radio"
                                name={`${id}-typeface`}
                                value={choice.id}
                                checked={font === choice.id}
                                onChange={() => { void choose(choice.id); }}
                            />
                            <span aria-hidden="true" className="font-option-sample" style={{ fontFamily: choice.family }}>Aa</span>
                            <span className="font-option-label"><span>{choice.name}</span><small>{choice.description}</small></span>
                            {pending === choice.id ? <Loader2 aria-hidden="true" className="motion-safe:animate-spin" size={14} /> : font === choice.id && <Check aria-hidden="true" size={15} />}
                        </label>
                    ))}
                </fieldset>
                {error && <p role="status" className="font-selector-error">{error}</p>}
            </div>
        </div>
    );
}
