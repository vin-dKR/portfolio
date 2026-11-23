"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react";
import { projectsData } from "@/constant/ProjectsData";
import { getBentoProject } from "@/constant/BentoProjects";
import "./ProjectStack.css";

const ProjectGallery = dynamic(() => import("@/components/reusable/bento/ProjectGallery"));
const ProjectModal = dynamic(() => import("./ProjectModal"));
const wrap = (index: number) => (index + projectsData.length) % projectsData.length;
type OpenProject = (project: ProjectsData) => void;

function StackDigit({ value }: { value: number }) {
    const [seen, setSeen] = useState({ current: value, previous: null as number | null, direction: 1 });
    if (seen.current !== value) {
        setSeen({ current: value, previous: seen.current, direction: value > seen.current ? 1 : -1 });
    }

    return (
        <span className="ps-digit-roll" style={{ "--digit-direction": seen.direction } as CSSProperties}>
            {seen.previous !== null && (
                <span
                    key={`out-${seen.previous}`}
                    className="ps-digit-out"
                    aria-hidden="true"
                    onAnimationEnd={() => setSeen((current) => current.current === value ? { ...current, previous: null } : current)}
                >{seen.previous}</span>
            )}
            <span key={seen.current} className={seen.previous !== null ? "ps-digit-in" : undefined}>{seen.current}</span>
        </span>
    );
}

function Preview({ project }: { project: ProjectsData }) {
    const [failed, setFailed] = useState(false);
    const artwork = getBentoProject(project.name);
    const Icon = artwork.icon;

    return (
        <span className="ps-preview">
            {artwork.screen && !failed ? (
                <Image
                    src={artwork.screen.src}
                    alt={artwork.screen.alt}
                    fill
                    sizes="(max-width: 639px) 90vw, 640px"
                    unoptimized
                    onError={() => setFailed(true)}
                />
            ) : artwork.story ? (
                <span className="ps-system">
                    {artwork.story.steps.map((step) => (
                        <span className="ps-system-step" key={step.title}>
                            <span className="ps-system-pin" aria-hidden="true" />
                            <span><strong>{step.title}</strong><small>{step.detail}</small></span>
                        </span>
                    ))}
                </span>
            ) : (
                <span className="ps-preview-fallback"><Icon aria-hidden="true" size={32} strokeWidth={1.3} /><span>{project.name}</span></span>
            )}
        </span>
    );
}

function Visual({ project, onOpen, passive = false }: { project: ProjectsData; onOpen: OpenProject; passive?: boolean }) {
    const screen = getBentoProject(project.name).screen;
    if (passive) return <div className="ps-image-trigger"><Preview project={project} /></div>;

    return (
        <button
            type="button"
            className="ps-image-trigger"
            aria-label={screen ? `Enlarge ${project.name} screenshots` : `Explore ${project.name} architecture`}
            aria-haspopup="dialog"
            onClick={() => onOpen(project)}
        >
            <Preview project={project} />
            <span className="ps-enlarge" aria-hidden="true">{screen ? <Maximize2 size={15} /> : <ArrowUpRight size={16} />}</span>
        </button>
    );
}

function Actions({ project, onDetails }: { project: ProjectsData; onDetails: OpenProject }) {
    const artwork = getBentoProject(project.name);
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;

    return (
        <div className="ps-actions">
            {artwork.story && <Link href={`/posts/${artwork.story.slug}`} prefetch={false}>Case study <ArrowRight aria-hidden="true" size={13} /></Link>}
            {project.video && (
                <button type="button" onClick={() => onDetails(project)} aria-haspopup="dialog">
                    Watch demo <Play aria-hidden="true" size={12} />
                </button>
            )}
            {!artwork.story && !project.video && (
                <button type="button" onClick={() => onDetails(project)} aria-haspopup="dialog">Project details <ArrowRight aria-hidden="true" size={13} /></button>
            )}
            {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight aria-hidden="true" size={12} /></a>}
            {project.sourceCode && <a href={project.sourceCode} target="_blank" rel="noreferrer">Source <ArrowUpRight aria-hidden="true" size={12} /></a>}
        </div>
    );
}

export default function ProjectStack() {
    const [index, setIndex] = useState(0);
    const [gallery, setGallery] = useState<ProjectsData | null>(null);
    const [details, setDetails] = useState<ProjectsData | null>(null);
    const project = projectsData[index];
    const artwork = getBentoProject(project.name);
    const galleryArtwork = gallery ? getBentoProject(gallery.name) : null;
    const move = (direction: number) => setIndex((current) => wrap(current + direction));

    function browseWithKeys(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
    }

    function open(project: ProjectsData) {
        if (getBentoProject(project.name).screen) setGallery(project);
        else setDetails(project);
    }

    return (
        <div className="project-stack">
            <div className="ps-stack">
                <div className="ps-stack-deck">
                    {[-1, 0, 1].map((offset) => {
                        const item = projectsData[wrap(index + offset)];
                        return (
                            <div key={item.name} className="ps-stack-sheet" data-position={offset === 0 ? "current" : offset === -1 ? "previous" : "next"} aria-hidden={offset !== 0 ? true : undefined}>
                                <Visual project={item} onOpen={open} passive={offset !== 0} />
                            </div>
                        );
                    })}
                </div>
                <div className="ps-stack-controls" onKeyDown={browseWithKeys}>
                    <button className="ps-arrow" type="button" onClick={() => move(-1)} aria-label="Previous project"><ChevronLeft aria-hidden="true" size={19} /></button>
                    <div className="ps-stack-title"><h3>{project.name}</h3><span className="ps-stack-position" aria-hidden="true"><StackDigit value={index + 1} /> / {projectsData.length}</span></div>
                    <button className="ps-arrow" type="button" onClick={() => move(1)} aria-label="Next project"><ChevronRight aria-hidden="true" size={19} /></button>
                </div>
                <p className="ps-stack-summary" key={project.name}>{artwork.summary ?? project.desc}</p>
                <Actions project={project} onDetails={setDetails} />
                <span className="ps-sr-only" role="status">{project.name}, project {index + 1} of {projectsData.length}</span>
            </div>
            {gallery && galleryArtwork?.screen && (
                <ProjectGallery title={gallery.name} screens={[galleryArtwork.screen, ...(galleryArtwork.additionalScreens ?? [])]} onClose={() => setGallery(null)} />
            )}
            {details && <ProjectModal project={details} onClose={() => setDetails(null)} />}
        </div>
    );
}
