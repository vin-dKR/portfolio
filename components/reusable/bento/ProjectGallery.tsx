"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Flow } from "@/components/ui/Flow";
import type { ProjectScreen } from "@/constant/BentoProjects";

type Props = {
    title: string;
    screens: readonly ProjectScreen[];
    onClose: () => void;
};

export default function ProjectGallery({ title, screens, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [index, setIndex] = useState(0);
    const [failed, setFailed] = useState<string | null>(null);
    const screen = screens[index];

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.showModal();
        return () => dialog.close();
    }, []);

    const close = () => {
        dialogRef.current?.close();
        onClose();
    };

    const move = (delta: number) => setIndex((current) => (current + delta + screens.length) % screens.length);

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            className="showcase-gallery"
            onCancel={(event) => { event.preventDefault(); close(); }}
            onClick={(event) => { if (event.target === event.currentTarget) close(); }}
            onKeyDown={(event) => {
                if (screens.length < 2 || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
            }}
        >
            <div className="showcase-gallery-frame">
                <header>
                    <h2 id={titleId}>{title} screenshots</h2>
                    <button type="button" onClick={close} aria-label="Close screenshot gallery"><X aria-hidden="true" size={19} /></button>
                </header>

                <div className="showcase-gallery-stage">
                    {failed === screen.src ? (
                        <p role="status">This screenshot couldn’t be loaded.</p>
                    ) : (
                        <Image
                            key={screen.src}
                            src={screen.src}
                            alt={screen.alt}
                            fill
                            sizes="(max-width: 768px) 96vw, 860px"
                            unoptimized
                            onError={() => setFailed(screen.src)}
                        />
                    )}
                </div>

                <footer>
                    <p aria-live="polite">{screen.label ?? screen.alt}</p>
                    {screens.length > 1 && (
                        <div className="showcase-gallery-nav">
                            <button type="button" onClick={() => move(-1)} aria-label="Previous screenshot"><ChevronLeft aria-hidden="true" size={19} /></button>
                            <span aria-label={`Screenshot ${index + 1} of ${screens.length}`}><Flow value={index + 1} /> / {screens.length}</span>
                            <button type="button" onClick={() => move(1)} aria-label="Next screenshot"><ChevronRight aria-hidden="true" size={19} /></button>
                        </div>
                    )}
                </footer>
            </div>
        </dialog>
    );
}
