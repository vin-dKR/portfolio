"use client";

import { useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Maximize2, Play } from "lucide-react";
import { getBentoProject } from "@/constant/BentoProjects";
import "./Projects.css";

const ProjectModal = dynamic(() => import("./ProjectModal"));

type Props = ProjectsData & { featured?: boolean };

export default function Project({ featured = false, ...project }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const artwork = getBentoProject(project.name);
    const screen = imageFailed ? undefined : artwork.screen;
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;
    const hostname = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const Icon = artwork.icon;

    return (
        <>
            <article
                className={`project-list-entry project-plate ${featured ? "project-plate-featured" : ""}`}
                style={{ "--plate-hue": artwork.hue } as CSSProperties}
            >
                <button
                    type="button"
                    className="project-list-media"
                    aria-label={`Open ${project.name} project`}
                    aria-haspopup="dialog"
                    onClick={() => setShowModal(true)}
                >
                    <span className="project-plate-chrome">
                        <span className="project-window-dots" aria-hidden="true"><i /><i /><i /></span>
                        <span className="project-plate-address">{hostname || "How it works"}</span>
                        <Maximize2 aria-hidden="true" size={12} />
                    </span>
                    <span className="project-plate-stage">
                        {screen ? (
                            <Image
                                src={screen.src}
                                alt={screen.alt}
                                fill
                                sizes={featured ? "(max-width: 767px) 90vw, 648px" : "(max-width: 639px) 90vw, 320px"}
                                unoptimized
                                className="project-plate-screen"
                                onError={() => setImageFailed(true)}
                            />
                        ) : (
                            <span className="project-list-process">
                                {artwork.story ? artwork.story.steps.map((step) => (
                                    <span key={step.title}>
                                        <span className="project-process-node" aria-hidden="true" />
                                        <span><strong>{step.title}</strong><small>{step.detail}</small></span>
                                    </span>
                                )) : <Icon aria-hidden="true" size={36} />}
                            </span>
                        )}
                        <span className="project-media-open" aria-hidden="true"><ArrowUpRight size={16} /></span>
                    </span>
                </button>

                <div className="project-list-copy">
                    <div className="project-list-title">
                        <h2>{project.name}</h2>
                        <span>{project.timeline}</span>
                    </div>
                    <p>{artwork.summary ?? project.desc}</p>
                    <ul className="project-list-tech" aria-label={`${project.name} technologies`}>
                        {project.techStacks.map((tech) => <li key={tech}>{tech}</li>)}
                    </ul>
                    <div className="project-list-links">
                        {artwork.story ? (
                            <Link href={`/posts/${artwork.story.slug}`} prefetch={false}>
                                Read case study <ArrowRight aria-hidden="true" size={14} />
                            </Link>
                        ) : (
                            <button type="button" onClick={() => setShowModal(true)} aria-haspopup="dialog">
                                {project.video ? "Watch walkthrough" : "Project notes"}
                                {project.video ? <Play aria-hidden="true" size={13} /> : <ArrowRight aria-hidden="true" size={14} />}
                            </button>
                        )}
                        {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight aria-hidden="true" size={13} /></a>}
                        {project.sourceCode && <a href={project.sourceCode} target="_blank" rel="noreferrer">Source <ArrowUpRight aria-hidden="true" size={13} /></a>}
                    </div>
                </div>
            </article>
            {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
        </>
    );
}
