"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { getBentoProject } from "@/constant/BentoProjects";
import "./Projects.css";

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [videoError, setVideoError] = useState(false);
    const artwork = getBentoProject(project.name);
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.showModal();
        return () => dialog.close();
    }, [project]);

    function close() {
        dialogRef.current?.close();
        onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            className="project-dialog"
            onCancel={(event) => { event.preventDefault(); close(); }}
            onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        >
            <div className="project-dialog-scroll">
                <header className="project-dialog-header">
                    <h2 id={titleId}>{project.name}</h2>
                    <button type="button" onClick={close} aria-label="Close project details"><X aria-hidden="true" size={19} /></button>
                </header>

                <div className="project-dialog-body">
                    {project.video ? (
                        <div className="project-dialog-screen">
                            {videoError ? (
                                <p role="status">This video is unavailable. You can still explore the project below.</p>
                            ) : (
                                <video
                                    src={project.video}
                                    poster={artwork.screen?.src}
                                    controls
                                    playsInline
                                    preload="none"
                                    aria-label={`${project.name} video preview`}
                                    onError={() => setVideoError(true)}
                                />
                            )}
                        </div>
                    ) : artwork.screen && (
                        <div className="project-dialog-screen">
                            <Image src={artwork.screen.src} alt={artwork.screen.alt} width={900} height={506} unoptimized />
                        </div>
                    )}

                    <div className="project-dialog-summary">
                        <p className="project-dialog-date">{project.timeline}</p>
                        <p>{project.desc}</p>
                    </div>

                    {artwork.story && (
                        <ol className="project-dialog-steps" aria-label="How the project works">
                            {artwork.story.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.detail}</p></li>)}
                        </ol>
                    )}

                    <section className="project-dialog-section" aria-label="Technologies">
                        <h3>Built with</h3>
                        <ul className="project-dialog-tech">
                            {project.techStacks.map((tech) => <li key={tech} className="site-chip">{tech}</li>)}
                        </ul>
                    </section>
                    {project.features && (
                        <section className="project-dialog-section">
                            <h3>Features</h3>
                            <ul className="project-dialog-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                        </section>
                    )}
                    {project.challenges && <section className="project-dialog-section"><h3>Challenges and solutions</h3><p>{project.challenges}</p></section>}

                    <div className="project-list-links">
                        {artwork.story && <Link href={`/posts/${artwork.story.slug}`} prefetch={false}>Read case study <ArrowRight aria-hidden="true" size={14} /></Link>}
                        {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight aria-hidden="true" size={14} /></a>}
                        {project.sourceCode && <a href={project.sourceCode} target="_blank" rel="noreferrer">Source code <ArrowUpRight aria-hidden="true" size={14} /></a>}
                    </div>
                </div>
            </div>
        </dialog>
    );
}
