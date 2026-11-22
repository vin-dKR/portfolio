"use client";

import { useId } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectStack from "../projects/ProjectStack";

export default function ProjectsCard() {
    const id = useId();

    return (
        <section className="project-showcase col-span-12" aria-labelledby={`${id}-label`}>
            <div className="showcase-heading">
                <h3 id={`${id}-label`}>Selected projects</h3>
                <Link href="/projects" prefetch={false}>All projects <ArrowUpRight aria-hidden="true" size={14} /></Link>
            </div>
            <ProjectStack />
        </section>
    );
}
