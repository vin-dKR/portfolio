"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type VideoHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import Image, { type ImageProps } from "next/image";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

function MediaDialog({ title, children, onClose }: {
    title: string;
    children: ReactNode;
    onClose: () => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.showModal();
        return () => dialog.close();
    }, []);

    function close() {
        dialogRef.current?.close();
        onClose();
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            className="article-media-dialog"
            onCancel={(event) => {
                event.preventDefault();
                close();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) close();
            }}
        >
            <div className="article-media-dialog-frame">
                <header>
                    <h2 id={titleId}>{title}</h2>
                    <button type="button" onClick={close} aria-label="Close media preview">
                        <X aria-hidden="true" size={19} />
                    </button>
                </header>
                <div className="article-media-dialog-body">{children}</div>
            </div>
        </dialog>,
        document.body,
    );
}

export function VideoWithLightbox({ src, className, ...rest }: VideoHTMLAttributes<HTMLVideoElement>) {
    const [isOpen, setIsOpen] = useState(false);
    const inlineVideo = useRef<HTMLVideoElement>(null);
    if (!src && !rest.children) return null;

    function expand() {
        inlineVideo.current?.pause();
        setIsOpen(true);
    }

    return (
        <>
            <span className="article-media-frame">
                <video
                    {...rest}
                    ref={inlineVideo}
                    src={src}
                    controls
                    playsInline
                    preload="none"
                    autoPlay={false}
                    aria-label={rest["aria-label"] ?? "Project video"}
                    className={cn("article-inline-video", className)}
                />
                <button
                    type="button"
                    className="article-video-expand"
                    aria-haspopup="dialog"
                    onClick={expand}
                >
                    <Maximize2 aria-hidden="true" size={14} />
                    Expand video
                </button>
            </span>
            {isOpen && (
                <MediaDialog title="Video preview" onClose={() => setIsOpen(false)}>
                    <video
                        {...rest}
                        src={src}
                        controls
                        playsInline
                        preload="none"
                        autoPlay={false}
                        aria-label={rest["aria-label"] ?? "Expanded project video"}
                        className={cn("article-dialog-video", className)}
                    />
                </MediaDialog>
            )}
        </>
    );
}

type ImageWithLightboxProps = Omit<ImageProps, "src" | "alt"> & {
    src?: string;
    alt?: string;
};

export function ImageWithLightbox({ src, alt = "", width, height, className, ...rest }: ImageWithLightboxProps) {
    const frame = useRef<HTMLSpanElement>(null);
    const [canEnlarge, setCanEnlarge] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setCanEnlarge(!frame.current?.closest("a"));
    }, []);

    if (!src) return null;

    const preview = (
        <Image
            {...rest}
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 600}
            className={cn("article-inline-image", className)}
        />
    );

    return (
        <>
            <span ref={frame} className="article-media-frame">
                {canEnlarge ? (
                    <button
                        type="button"
                        className="article-image-open"
                        aria-label={`Enlarge ${alt || "image"}`}
                        aria-haspopup="dialog"
                        onClick={(event) => {
                            if (!event.defaultPrevented) setIsOpen(true);
                        }}
                    >
                        {preview}
                        <span className="article-image-expand-icon" aria-hidden="true"><Maximize2 size={16} /></span>
                    </button>
                ) : preview}
            </span>
            {isOpen && (
                <MediaDialog title={alt || "Image preview"} onClose={() => setIsOpen(false)}>
                    <Image
                        {...rest}
                        src={src}
                        alt={alt}
                        width={width ?? 1200}
                        height={height ?? 900}
                        className={cn("article-dialog-image", className)}
                    />
                </MediaDialog>
            )}
        </>
    );
}
