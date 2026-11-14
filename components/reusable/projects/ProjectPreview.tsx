"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRight } from "lucide-react"

const ProjectModal = dynamic(() => import("./ProjectModal"))

export default function ProjectPreview({ project }: { project: ProjectsData }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button type="button" className="text-link text-link--muted cursor-pointer" onClick={() => setOpen(true)} aria-label={`View ${project.name} preview`}>
                Video preview <ArrowUpRight aria-hidden="true" size={15} />
            </button>
            {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
        </>
    )
}
