"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircuitBoard, Code2, GraduationCap, Leaf, Orbit, Sprout, Zap } from "lucide-react";
import { projectsData } from "@/constant/ProjectsData";
import BentoCard from "./BentoCard";

const ProjectModal = dynamic(() => import("../projects/ProjectModal"));

const projectArtwork: Record<string, {
    icon: typeof Zap;
    color: string;
    image?: string;
}> = {
    "Trio EV": { icon: Zap, color: "bg-cyan-500/12 text-cyan-700 dark:text-cyan-300" },
    Atari: { icon: Sprout, color: "bg-lime-500/13 text-lime-700 dark:text-lime-300" },
    Pagz: { icon: Orbit, color: "bg-orange-500/12 text-orange-700 dark:text-orange-300", image: "/images/project-icons/pagz.webp" },
    "Libly Space": { icon: Orbit, color: "bg-violet-500/12 text-violet-700 dark:text-violet-300", image: "/images/project-icons/libly.webp" },
    Eduents: { icon: GraduationCap, color: "bg-blue-500/12 text-blue-700 dark:text-blue-300" },
    "Hellium AI": { icon: CircuitBoard, color: "bg-fuchsia-500/12 text-fuchsia-700 dark:text-fuchsia-300" },
    "Vin UI": { icon: Code2, color: "bg-indigo-500/12 text-indigo-700 dark:text-indigo-300" },
    theorangeleaf: { icon: Leaf, color: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300" },
};

const defaultArtwork = { icon: Orbit, color: "bg-zinc-500/12 text-zinc-700 dark:text-zinc-300" };

export default function ProjectsCard() {
    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>(null);

    return (
        <>
            <BentoCard className="col-span-5 sm:col-span-4">
                <div className="mb-3 flex items-center justify-between gap-1.5">
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                        <Code2 aria-hidden="true" className="size-4 shrink-0 text-violet-600 dark:text-violet-400" />
                        <h3 className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-100">Recent Projects</h3>
                    </div>
                    <Link href="/projects" prefetch={false} aria-label="View all projects" className="rounded p-1 text-zinc-500 hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-400 dark:hover:text-violet-300">
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                </div>

                <ul className="space-y-0.5">
                    {projectsData.slice(0, 9).map((project) => {
                        const { icon: Icon, color, image } = projectArtwork[project.name] ?? defaultArtwork;

                        return (
                            <li key={project.name}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(project)}
                                    className="group flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-lg px-1.5 text-left hover:bg-zinc-950/4 focus-visible:outline-2 focus-visible:outline-violet-500 sm:gap-2.5 dark:hover:bg-white/6"
                                >
                                    <span aria-hidden="true" className={`grid size-7 shrink-0 place-items-center rounded-md ${color}`}>
                                        {image ? <Image src={image} alt="" width={18} height={18} unoptimized /> : <Icon className="size-4" />}
                                    </span>
                                    <span className="flex-1 truncate text-xs font-medium text-zinc-800 sm:text-sm dark:text-zinc-100">
                                        {project.name}
                                    </span>
                                    <ArrowUpRight aria-hidden="true" className="hidden size-3.5 shrink-0 text-zinc-500 motion-safe:transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block dark:text-zinc-400" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </BentoCard>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </>
    );
}
