import { ArrowUpRight, BookOpen, CircuitBoard, Code2, Github, Leaf, PanelsTopLeft } from "lucide-react"
import ProjectPreview from "./ProjectPreview"

const projectIcons = { "Libly Space": BookOpen, "Hellium AI": CircuitBoard, "Vin UI": PanelsTopLeft, theorangeleaf: Leaf } as const

export default function Project(props: ProjectsData) {
    const { name, desc, timeline, techStacks, video, sourceCode, liveOn } = props
    const Icon = projectIcons[name as keyof typeof projectIcons] ?? Code2

    return (
        <article className="site-panel archive-card">
            <div className="flex items-start justify-between gap-3">
                <h3><Icon aria-hidden="true" size={19} /> {name}</h3>
                <span className="eyebrow text-right">{timeline}</span>
            </div>
            <p>{desc}</p>
            <ul className="archive-stack" aria-label="Technologies">
                {techStacks.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
            <div className="case-links">
                {liveOn && <a href={liveOn} target="_blank" rel="noreferrer" className="text-link">Live site <ArrowUpRight aria-hidden="true" size={15} /></a>}
                {sourceCode && <a href={sourceCode} target="_blank" rel="noreferrer" className="text-link text-link--muted"><Github aria-hidden="true" size={15} /> Source</a>}
                {video && <ProjectPreview project={props} />}
            </div>
        </article>
    )
}
