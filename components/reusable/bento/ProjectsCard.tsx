"use client";

import { useId, useState, type CSSProperties, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircuitBoard, Code2, GraduationCap, Leaf, Orbit, Sprout, Zap } from "lucide-react";
import { projectsData } from "@/constant/ProjectsData";
import BentoCard from "./BentoCard";

const ProjectModal = dynamic(() => import("../projects/ProjectModal"));

type ProjectArtwork = {
    icon: typeof Zap;
    hue: number;
    image?: string;
    article?: string;
    detail?: string;
    trace: readonly [string, string, string];
};

const projectArtwork: Record<string, ProjectArtwork> = {
    "Trio EV": {
        icon: Zap, hue: 200, article: "building-trio-ev-platform",
        detail: "I built the content system and bulk sales tools for an EV fleet and charging business.",
        trace: ["Fleet site", "Incoming leads", "Sales console"],
    },
    Atari: {
        icon: Sprout, hue: 143, article: "building-atari-kvk-platform",
        detail: "A configuration-driven UI runs 180+ form modules and feeds 40+ report templates for the KVK network.",
        trace: ["Form modules", "Role checks", "Reports"],
    },
    Pagz: {
        icon: Orbit, hue: 29, image: "/images/project-icons/pagz.webp", article: "building-pagz-print-on-demand",
        detail: "I built the storefront, pricing API, and order admin for a print shop moving its orders online.",
        trace: ["File upload", "Print pricing", "Orders"],
    },
    "Libly Space": {
        icon: Orbit, hue: 261, image: "/images/project-icons/libly.webp",
        trace: ["Library catalog", "Web app", "Library staff"],
    },
    Eduents: {
        icon: GraduationCap, hue: 219, article: "building-eduents-edtech-platform",
        detail: "I built the Next.js core and WebSocket service, and integrated the Python tools built by my teammate.",
        trace: ["Exam editor", "Live edits", "PDF output"],
    },
    "Hellium AI": {
        icon: CircuitBoard, hue: 301,
        trace: ["Marketing", "AI tools", "Web app"],
    },
    "Vin UI": {
        icon: Code2, hue: 249, detail: "A UI component library for Next.js projects.",
        trace: ["Components", "Next.js", "Interfaces"],
    },
    theorangeleaf: {
        icon: Leaf, hue: 153, detail: "A web app for The Orange Leaf restaurant.",
        trace: ["Restaurant", "Web app", "Diners"],
    },
};

const defaultArtwork: ProjectArtwork = { icon: Orbit, hue: 256, trace: ["Project", "Build", "Web app"] };

export default function ProjectsCard() {
    const id = useId();
    const [index, setIndex] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);
    const project = projectsData[index];
    const artwork = projectArtwork[project.name] ?? defaultArtwork;
    const Icon = artwork.icon;

    const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, from: number) => {
        const columns = window.matchMedia("(min-width: 640px)").matches ? 1 : 2;
        const keys: Record<string, number> = {
            ArrowUp: (from + projectsData.length - columns) % projectsData.length,
            ArrowDown: (from + columns) % projectsData.length,
            ArrowLeft: (from + projectsData.length - 1) % projectsData.length,
            ArrowRight: (from + 1) % projectsData.length,
            Home: 0,
            End: projectsData.length - 1,
        };
        const next = keys[event.key];
        if (next === undefined) return;
        event.preventDefault();
        setIndex(next);
        document.getElementById(`${id}-${next}`)?.focus();
    };

    return (
        <div className="col-span-9 grid min-w-0 gap-3 sm:col-span-7 sm:grid-cols-[3fr_4fr] sm:gap-4">
            <BentoCard className="project-picker" hoverable={false}>
                <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 id={`${id}-label`} className="flex items-center gap-2 text-sm font-medium">
                        <Code2 aria-hidden="true" className="size-4 text-violet-600 dark:text-violet-400" />
                        Recent projects
                    </h3>
                    <Link href="/projects" prefetch={false} aria-label="View all projects" className="rounded p-1 text-zinc-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-400 dark:hover:text-violet-300">
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                </div>

                <div role="tablist" aria-labelledby={`${id}-label`} aria-orientation="vertical" className="grid grid-cols-2 gap-0.5 sm:grid-cols-1">
                    {projectsData.map((item, position) => {
                        const { icon: ItemIcon, hue, image } = projectArtwork[item.name] ?? defaultArtwork;
                        const active = index === position;

                        return (
                            <button
                                key={item.name}
                                type="button"
                                role="tab"
                                id={`${id}-${position}`}
                                aria-selected={active}
                                aria-controls={`${id}-project`}
                                tabIndex={active ? 0 : -1}
                                onClick={() => setIndex(position)}
                                onKeyDown={(event) => handleKeys(event, position)}
                                className="project-tab"
                                style={{ "--signal-hue": hue } as CSSProperties}
                            >
                                <span aria-hidden="true" className="project-tab-icon">
                                    {image ? <Image src={image} alt="" width={17} height={17} unoptimized /> : <ItemIcon className="size-4" />}
                                </span>
                                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                                <ArrowRight aria-hidden="true" className="project-tab-arrow hidden size-3.5 shrink-0 sm:block" />
                            </button>
                        );
                    })}
                </div>
            </BentoCard>

            <BentoCard className="project-signal" hoverable={false}>
                <section
                    role="tabpanel"
                    id={`${id}-project`}
                    aria-labelledby={`${id}-${index}`}
                    tabIndex={0}
                    className="project-signal-panel"
                    style={{ "--signal-hue": artwork.hue } as CSSProperties}
                >
                    <div key={project.name} className="project-signal-content">
                        <div className="project-signal-plot">
                            <Icon aria-hidden="true" className="project-signal-watermark" />
                            <div className="project-signal-trace">
                                {artwork.trace.map((node) => (
                                    <span key={node}><i aria-hidden="true" />{node}</span>
                                ))}
                            </div>
                        </div>
                        <div className="project-signal-copy">
                            <h3>{project.name}</h3>
                            <p>{artwork.detail ?? project.desc}</p>
                            <div className="project-signal-links">
                                {artwork.article && (
                                    <Link href={`/posts/${artwork.article}`} prefetch={false}>Case study <ArrowRight aria-hidden="true" size={14} /></Link>
                                )}
                                {(!artwork.article || project.video) && (
                                    <button type="button" onClick={() => setPreviewOpen(true)}>
                                        {artwork.article ? "Video preview" : "Project details"} <ArrowRight aria-hidden="true" size={14} />
                                    </button>
                                )}
                                {project.liveOn && (
                                    <a href={project.liveOn} target="_blank" rel="noreferrer">Live site <ArrowUpRight aria-hidden="true" size={14} /></a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </BentoCard>

            {previewOpen && <ProjectModal project={project} onClose={() => setPreviewOpen(false)} />}
        </div>
    );
}
