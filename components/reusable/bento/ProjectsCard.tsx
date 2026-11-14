"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Code2, LayoutTemplate, ListTree, Maximize2, Play } from "lucide-react";
import { getBentoProject } from "@/constant/BentoProjects";
import { projectsData } from "@/constant/ProjectsData";
import BentoCard from "./BentoCard";

const ProjectModal = dynamic(() => import("../projects/ProjectModal"));
const ProjectGallery = dynamic(() => import("./ProjectGallery"));

type View = "preview" | "build";

export default function ProjectsCard() {
    const id = useId();
    const tabList = useRef<HTMLDivElement>(null);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const [index, setIndex] = useState(0);
    const [vertical, setVertical] = useState(false);
    const [view, setView] = useState<View>("preview");
    const [failedScreen, setFailedScreen] = useState<string | null>(null);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [openProject, setOpenProject] = useState<ProjectsData | null>(null);
    const project = projectsData[index];
    const artwork = getBentoProject(project.name);
    const Icon = artwork.icon;
    const screen = artwork.screen?.src === failedScreen ? undefined : artwork.screen;
    const canPreview = Boolean(screen || project.video || !artwork.story);
    const showBuild = Boolean(artwork.story && (view === "build" || !canPreview));
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;
    const hostname = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

    useEffect(() => {
        const media = window.matchMedia("(min-width: 640px)");
        const update = () => setVertical(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    function selectProject(next: number, moveFocus = false) {
        setIndex(next);
        const button = buttons.current[next];
        if (!button) return;
        if (moveFocus) button.focus({ preventScroll: true });

        const list = tabList.current;
        if (vertical || !list) return;
        const tab = button.getBoundingClientRect();
        const rail = list.getBoundingClientRect();
        const left = tab.left - rail.left - 8;
        const right = tab.right - rail.right + 8;

        if (left < 0 || right > 0) {
            list.scrollBy({ left: left < 0 ? left : right, behavior: "instant" });
        }
    }

    function moveProject(delta: number) {
        const count = projectsData.length;
        selectProject((index + delta + count) % count);
    }

    function handleKeys(event: KeyboardEvent<HTMLButtonElement>, from: number) {
        const count = projectsData.length;
        const keys: Record<string, number> = {
            [vertical ? "ArrowUp" : "ArrowLeft"]: (from + count - 1) % count,
            [vertical ? "ArrowDown" : "ArrowRight"]: (from + 1) % count,
            Home: 0,
            End: count - 1,
        };
        const next = keys[event.key];
        if (next === undefined) return;
        event.preventDefault();
        selectProject(next, true);
    }

    return (
        <BentoCard className="project-showcase col-span-12" hoverable={false}>
            <div className="showcase-heading">
                <h3 id={`${id}-label`}>
                    <Code2 aria-hidden="true" size={17} /> Selected projects
                </h3>
                <Link href="/projects" prefetch={false}>
                    All projects <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
            </div>

            <div className="showcase-layout">
                <div ref={tabList} role="tablist" aria-orientation={vertical ? "vertical" : "horizontal"} aria-labelledby={`${id}-label`} className="showcase-index">
                    {projectsData.map((item, position) => {
                        const itemArt = getBentoProject(item.name);
                        const ItemIcon = itemArt.icon;
                        const selected = index === position;

                        return (
                            <button
                                key={item.name}
                                ref={(button) => { buttons.current[position] = button; }}
                                type="button"
                                role="tab"
                                id={`${id}-${position}`}
                                aria-selected={selected}
                                aria-controls={`${id}-project`}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => selectProject(position)}
                                onKeyDown={(event) => handleKeys(event, position)}
                                className="showcase-project"
                                style={{ "--project-hue": itemArt.hue } as CSSProperties}
                            >
                                <span className="showcase-mark" aria-hidden="true">
                                    {itemArt.mark ? <Image src={itemArt.mark} alt="" width={16} height={16} unoptimized /> : <ItemIcon size={15} />}
                                </span>
                                {item.name}
                            </button>
                        );
                    })}
                </div>

                <section
                    role="tabpanel"
                    id={`${id}-project`}
                    aria-labelledby={`${id}-${index}`}
                    tabIndex={0}
                    className="showcase-panel"
                    style={{ "--project-hue": artwork.hue } as CSSProperties}
                >
                    <div className="showcase-stage">
                        <div className="showcase-toolbar">
                            {artwork.story && canPreview ? (
                                <div className="showcase-view-switch" role="group" aria-label="Project view">
                                    <button type="button" aria-pressed={!showBuild} onClick={() => setView("preview")}>
                                        <LayoutTemplate aria-hidden="true" size={13} /> Preview
                                    </button>
                                    <button type="button" aria-pressed={showBuild} onClick={() => setView("build")}>
                                        <ListTree aria-hidden="true" size={13} /> How it works
                                    </button>
                                </div>
                            ) : (
                                <span className="showcase-view-label">{showBuild ? "How it works" : "Preview"}</span>
                            )}
                            {hostname && <span className="showcase-host">{hostname}</span>}
                        </div>

                        <div key={`${project.name}-${showBuild}`} className="showcase-visual">
                            {showBuild && artwork.story ? (
                                <ol className="showcase-steps">
                                    {artwork.story.steps.map((step) => (
                                        <li key={step.title}>
                                            <span className="showcase-pin" aria-hidden="true" />
                                            <div><h4>{step.title}</h4><p>{step.detail}</p></div>
                                        </li>
                                    ))}
                                </ol>
                            ) : screen ? (
                                <button
                                    type="button"
                                    className="showcase-expand"
                                    aria-label={`Enlarge ${project.name} screenshot`}
                                    aria-haspopup="dialog"
                                    onClick={() => setGalleryOpen(true)}
                                >
                                    <Image
                                        src={screen.src}
                                        alt={screen.alt}
                                        fill
                                        sizes="(max-width: 640px) 95vw, 460px"
                                        unoptimized
                                        fetchPriority="low"
                                        onError={() => setFailedScreen(screen.src)}
                                        className="showcase-screen"
                                    />
                                    <span className="showcase-expand-icon" aria-hidden="true"><Maximize2 size={16} /></span>
                                </button>
                            ) : (
                                <div className="showcase-fallback">
                                    <Icon aria-hidden="true" size={44} strokeWidth={1.4} />
                                    {project.video && (
                                        <button type="button" onClick={() => setOpenProject(project)}>
                                            <Play aria-hidden="true" size={14} /> Watch demo
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="showcase-copy">
                        <div>
                            <h3>{project.name}</h3>
                            <p>{artwork.summary ?? project.desc}</p>
                        </div>
                        <div className="showcase-actions">
                            <div className="showcase-links">
                                {artwork.story ? (
                                    <Link className="showcase-case-link" href={`/posts/${artwork.story.slug}`} prefetch={false}>
                                        Case study <ArrowRight aria-hidden="true" size={14} />
                                    </Link>
                                ) : (
                                    <button type="button" onClick={() => setOpenProject(project)}>
                                        Details <ArrowRight aria-hidden="true" size={14} />
                                    </button>
                                )}
                                {project.video && (screen || showBuild) && (
                                    <button type="button" onClick={() => setOpenProject(project)}>
                                        Video <Play aria-hidden="true" size={13} />
                                    </button>
                                )}
                                {liveUrl && (
                                    <a href={liveUrl} target="_blank" rel="noreferrer">
                                        Live site <ArrowUpRight aria-hidden="true" size={14} />
                                    </a>
                                )}
                            </div>
                            <div className="showcase-cycle" role="group" aria-label="Browse projects">
                                <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project">
                                    <ChevronLeft aria-hidden="true" size={17} />
                                </button>
                                <button type="button" onClick={() => moveProject(1)} aria-label="Next project">
                                    <ChevronRight aria-hidden="true" size={17} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
            {galleryOpen && screen && (
                <ProjectGallery
                    title={project.name}
                    screens={[screen, ...(artwork.additionalScreens ?? [])]}
                    onClose={() => setGalleryOpen(false)}
                />
            )}
        </BentoCard>
    );
}
