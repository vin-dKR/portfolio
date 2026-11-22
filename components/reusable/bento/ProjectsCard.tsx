"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Root as Tabs, List as TabList, Trigger as Tab, Content as TabPanel } from "@radix-ui/react-tabs";
import { ArrowRight, ArrowUpRight, Maximize2, Play } from "lucide-react";
import { getBentoProject } from "@/constant/BentoProjects";
import { projectsData } from "@/constant/ProjectsData";

const ProjectModal = dynamic(() => import("../projects/ProjectModal"));
const ProjectGallery = dynamic(() => import("./ProjectGallery"));

export default function ProjectsCard() {
    const id = useId();
    const tabList = useRef<HTMLDivElement>(null);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const [index, setIndex] = useState(0);
    const [failedScreen, setFailedScreen] = useState<string | null>(null);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [openProject, setOpenProject] = useState<ProjectsData | null>(null);
    const project = projectsData[index];
    const artwork = getBentoProject(project.name);
    const Icon = artwork.icon;
    const screen = artwork.screen?.src === failedScreen ? undefined : artwork.screen;
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;

    function selectProject(next: number) {
        setIndex(next);
        const button = buttons.current[next];
        if (!button) return;

        const list = tabList.current;
        if (!list) return;
        const tab = button.getBoundingClientRect();
        const rail = list.getBoundingClientRect();
        const left = tab.left - rail.left - 8;
        const right = tab.right - rail.right + 8;

        if (left < 0 || right > 0) {
            list.scrollBy({ left: left < 0 ? left : right, behavior: "instant" });
        }
    }

    return (
        <section className="project-showcase col-span-12" aria-labelledby={`${id}-label`}>
            <div className="showcase-heading">
                <h3 id={`${id}-label`}>
                    Selected projects
                </h3>
                <Link href="/projects" prefetch={false}>
                    All projects <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
            </div>

            <Tabs
                className="showcase-layout"
                value={String(index)}
                onValueChange={(value) => selectProject(Number(value))}
                orientation="horizontal"
            >
                <TabList ref={tabList} aria-labelledby={`${id}-label`} className="showcase-index">
                    {projectsData.map((item, position) => (
                        <Tab
                            key={item.name}
                            value={String(position)}
                            ref={(button) => { buttons.current[position] = button; }}
                            className="showcase-project"
                        >
                            {item.name}
                        </Tab>
                    ))}
                </TabList>

                {projectsData.map((item, position) => (
                    <TabPanel key={item.name} value={String(position)} className="showcase-content">
                        {index === position && (
                            <section className="showcase-panel" style={{ "--project-hue": artwork.hue } as CSSProperties}>
                                <div className="showcase-stage">
                                    <div key={project.name} className="showcase-visual" data-kind={screen ? "screen" : artwork.story ? "story" : "fallback"}>
                                        {!screen && artwork.story ? (
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
                                                    sizes="(max-width: 767px) 92vw, 648px"
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
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="showcase-copy">
                                    <div className="showcase-caption-heading">
                                        <h3>{project.name}</h3>
                                        <div className="showcase-links">
                                            {artwork.story ? (
                                                <Link className="showcase-case-link" href={`/posts/${artwork.story.slug}`} prefetch={false}>
                                                    Case study <ArrowRight aria-hidden="true" size={14} />
                                                </Link>
                                            ) : (
                                                <button type="button" onClick={() => setOpenProject(project)} aria-haspopup="dialog">
                                                    {project.video ? <>Watch demo <Play aria-hidden="true" size={13} /></> : <>Project details <ArrowRight aria-hidden="true" size={14} /></>}
                                                </button>
                                            )}
                                            {project.video && artwork.story && (
                                                <button type="button" onClick={() => setOpenProject(project)} aria-haspopup="dialog">
                                                    Video <Play aria-hidden="true" size={13} />
                                                </button>
                                            )}
                                            {liveUrl && (
                                                <a href={liveUrl} target="_blank" rel="noreferrer">
                                                    Live site <ArrowUpRight aria-hidden="true" size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p>{artwork.summary ?? project.desc}</p>
                                </div>
                            </section>
                        )}
                    </TabPanel>
                ))}
            </Tabs>

            {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
            {galleryOpen && screen && (
                <ProjectGallery
                    title={project.name}
                    screens={[screen, ...(artwork.additionalScreens ?? [])]}
                    onClose={() => setGalleryOpen(false)}
                />
            )}
        </section>
    );
}
