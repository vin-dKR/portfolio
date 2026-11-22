"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Root as Tabs, List as TabList, Trigger as Tab, Content as TabPanel } from "@radix-ui/react-tabs";
import { ArrowRight, ArrowUpRight, ChevronDown, Maximize2, Play } from "lucide-react";
import ProjectStack from "@/components/reusable/projects/ProjectStack";
import { projectsData } from "@/constant/ProjectsData";
import { getBentoProject } from "@/constant/BentoProjects";
import "./ProjectVariants.css";

const ProjectGallery = dynamic(() => import("@/components/reusable/bento/ProjectGallery"));
const ProjectModal = dynamic(() => import("@/components/reusable/projects/ProjectModal"));

const featuredNames = ["Trio EV", "Pagz", "Eduents", "Vin UI"];
const featuredProjects = projectsData.filter((project) => featuredNames.includes(project.name));
const otherProjects = projectsData.filter((project) => !featuredNames.includes(project.name));

type Variant = "cover" | "split" | "gallery" | "stack";
type OpenProject = (project: ProjectsData) => void;

function Preview({ project, compact = false }: { project: ProjectsData; compact?: boolean }) {
    const [failed, setFailed] = useState(false);
    const artwork = getBentoProject(project.name);
    const Icon = artwork.icon;

    return (
        <span className={`pv-preview ${compact ? "pv-preview-compact" : ""}`}>
            {artwork.screen && !failed ? (
                <Image
                    src={artwork.screen.src}
                    alt={compact ? "" : artwork.screen.alt}
                    fill
                    sizes={compact ? "80px" : "(max-width: 639px) 90vw, 640px"}
                    unoptimized
                    onError={() => setFailed(true)}
                />
            ) : compact ? (
                <span className="pv-preview-mark"><Icon aria-hidden="true" size={19} strokeWidth={1.5} /></span>
            ) : artwork.story ? (
                <span className="pv-system">
                    {artwork.story.steps.map((step) => (
                        <span className="pv-system-step" key={step.title}>
                            <span className="pv-system-pin" aria-hidden="true" />
                            <span><strong>{step.title}</strong><small>{step.detail}</small></span>
                        </span>
                    ))}
                </span>
            ) : (
                <span className="pv-preview-fallback"><Icon aria-hidden="true" size={32} strokeWidth={1.3} /><span>{project.name}</span></span>
            )}
        </span>
    );
}

function Visual({ project, onOpen, passive = false }: { project: ProjectsData; onOpen: OpenProject; passive?: boolean }) {
    const screen = getBentoProject(project.name).screen;
    if (passive) return <div className="pv-image-trigger"><Preview project={project} /></div>;

    return (
        <button
            type="button"
            className="pv-image-trigger"
            aria-label={screen ? `Enlarge ${project.name} screenshots` : `Explore ${project.name} architecture`}
            aria-haspopup="dialog"
            onClick={() => onOpen(project)}
        >
            <Preview project={project} />
            <span className="pv-enlarge" aria-hidden="true">{screen ? <Maximize2 size={15} /> : <ArrowUpRight size={16} />}</span>
        </button>
    );
}

function Actions({ project, onDetails }: { project: ProjectsData; onDetails: OpenProject }) {
    const artwork = getBentoProject(project.name);
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;

    return (
        <div className="pv-actions">
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

function Caption({ project, onDetails }: { project: ProjectsData; onDetails: OpenProject }) {
    const artwork = getBentoProject(project.name);
    return (
        <div className="pv-caption">
            <div className="pv-caption-heading"><h3>{project.name}</h3><Actions project={project} onDetails={onDetails} /></div>
            <p>{artwork.summary ?? project.desc}</p>
        </div>
    );
}

function GalleryTile({ project, onOpen, onDetails }: { project: ProjectsData; onOpen: OpenProject; onDetails: OpenProject }) {
    return (
        <article className="pv-gallery-tile">
            <Visual project={project} onOpen={onOpen} />
            <h3>{project.name}</h3>
            <Actions project={project} onDetails={onDetails} />
        </article>
    );
}

export default function ProjectVariant({ variant }: { variant: Variant }) {
    const [index, setIndex] = useState(0);
    const [gallery, setGallery] = useState<ProjectsData | null>(null);
    const [details, setDetails] = useState<ProjectsData | null>(null);
    const rail = useRef<HTMLDivElement>(null);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const project = projectsData[index];
    const galleryArtwork = gallery ? getBentoProject(gallery.name) : null;

    function select(next: number) {
        setIndex(next);
        if (variant !== "cover") return;
        const button = tabs.current[next];
        const list = rail.current;
        if (!button || !list) return;
        const item = button.getBoundingClientRect();
        const bounds = list.getBoundingClientRect();
        const left = item.left - bounds.left - 3;
        const right = item.right - bounds.right + 3;
        if (left < 0 || right > 0) {
            list.scrollBy({ left: left < 0 ? left : right, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }
    }

    function open(project: ProjectsData) {
        if (getBentoProject(project.name).screen) setGallery(project);
        else setDetails(project);
    }

    return (
        <div className={`project-variant project-variant-${variant}`}>
            {variant === "cover" && (
                <Tabs className="pv-cover" value={String(index)} onValueChange={(value) => select(Number(value))}>
                    <TabList className="pv-thumbnails" aria-label="Choose a project by its preview" ref={rail}>
                        {projectsData.map((item, position) => (
                            <Tab className="pv-thumbnail" key={item.name} value={String(position)} ref={(button) => { tabs.current[position] = button; }}>
                                <span className="pv-thumbnail-image"><Preview project={item} compact /></span>
                                <span className="pv-thumbnail-name">{item.name}</span>
                            </Tab>
                        ))}
                    </TabList>
                    {projectsData.map((item, position) => (
                        <TabPanel className="pv-cover-panel" key={item.name} value={String(position)}>
                            {index === position && <Visual project={item} onOpen={open} />}
                        </TabPanel>
                    ))}
                    <Caption key={project.name} project={project} onDetails={setDetails} />
                </Tabs>
            )}

            {variant === "split" && (
                <Tabs className="pv-split" orientation="vertical" value={String(index)} onValueChange={(value) => select(Number(value))}>
                    <TabList className="pv-project-index" aria-label="Choose a project">
                        {projectsData.map((item, position) => (
                            <Tab className="pv-index-item" key={item.name} value={String(position)}>{item.name}</Tab>
                        ))}
                    </TabList>
                    {projectsData.map((item, position) => (
                        <TabPanel className="pv-split-panel" key={item.name} value={String(position)}>
                            {index === position && <><Visual project={item} onOpen={open} /><Caption project={item} onDetails={setDetails} /></>}
                        </TabPanel>
                    ))}
                </Tabs>
            )}

            {variant === "gallery" && (
                <div className="pv-gallery">
                    <div className="pv-product-grid">
                        {featuredProjects.map((item) => <GalleryTile key={item.name} project={item} onOpen={open} onDetails={setDetails} />)}
                    </div>
                    <details className="pv-gallery-more">
                        <summary>More projects <span>{otherProjects.length}</span><ChevronDown aria-hidden="true" size={15} /></summary>
                        <div className="pv-product-grid">
                            {otherProjects.map((item) => <GalleryTile key={item.name} project={item} onOpen={open} onDetails={setDetails} />)}
                        </div>
                    </details>
                </div>
            )}

            {variant === "stack" && <ProjectStack />}

            {gallery && galleryArtwork?.screen && (
                <ProjectGallery title={gallery.name} screens={[galleryArtwork.screen, ...(galleryArtwork.additionalScreens ?? [])]} onClose={() => setGallery(null)} />
            )}
            {details && <ProjectModal project={details} onClose={() => setDetails(null)} />}
        </div>
    );
}
