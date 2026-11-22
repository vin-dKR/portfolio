"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { getBentoProject } from "@/constant/BentoProjects";
import "./Projects.css";

const ProjectModal = dynamic(() => import("./ProjectModal"));

export default function Project(project: ProjectsData) {
    const [showModal, setShowModal] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const artwork = getBentoProject(project.name);
    const screen = imageFailed ? undefined : artwork.screen;
    const liveUrl = artwork.siteUnavailable ? "" : project.liveOn;
    const Icon = artwork.icon;

    return (
        <>
            <article className="project-list-entry">
                <button
                    type="button"
                    className="project-list-media"
                    aria-label={`Open ${project.name} project`}
                    aria-haspopup="dialog"
                    onClick={() => setShowModal(true)}
                >
                    {screen ? (
                        <Image
                            src={screen.src}
                            alt={screen.alt}
                            fill
                            sizes="(max-width: 639px) 90vw, 224px"
                            unoptimized
                            className="object-cover object-top"
                            onError={() => setImageFailed(true)}
                        />
                    ) : (
                        <div className="project-list-process">
                            <Icon aria-hidden="true" size={24} />
                            {artwork.story && <span>{artwork.story.steps.map((step) => step.title).join(" → ")}</span>}
                        </div>
                    )}
                    <span className="project-media-open" aria-hidden="true"><ArrowUpRight size={15} /></span>
                </button>

                <div className="project-list-copy">
                    <div className="project-list-title"><h2>{project.name}</h2><span>{project.timeline}</span></div>
                    <p>{artwork.summary ?? project.desc}</p>
                    <ul className="project-list-tech" aria-label={`${project.name} technologies`}>
                        {project.techStacks.map((tech) => <li key={tech}>{tech}</li>)}
                    </ul>
                    <div className="project-list-links">
                        {artwork.story ? (
                            <Link href={`/posts/${artwork.story.slug}`} prefetch={false}>Read case study <ArrowRight aria-hidden="true" size={14} /></Link>
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
