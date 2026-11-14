import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { featuredWork } from "@/constant/Portfolio"
import { projectsData } from "@/constant/ProjectsData"
import ProjectPreview from "@/components/reusable/projects/ProjectPreview"

export default function CaseWork({ previews = false }: { previews?: boolean }) {
    return (
        <div className="case-grid">
            {featuredWork.map((project) => {
                const preview = previews ? projectsData.find(({ liveOn, video }) => liveOn === project.url && video) : undefined
                return (
                    <article key={project.slug} className="case-card site-panel" data-accent={project.accent}>
                        <div className="case-figure">
                            <div className="case-figure-head">
                                <span>{project.name}</span>
                                <span>{project.category}</span>
                            </div>
                            <div className="case-diagram">
                                {project.proof.map((label) => <span key={label}>{label}</span>)}
                            </div>
                        </div>
                        <div className="case-content">
                            <h3>{project.title}</h3>
                            <p>{project.summary}</p>
                            <p className="case-contribution">{project.contribution}</p>
                            <div className="case-links">
                                <Link prefetch={false} href={`/posts/${project.slug}`} className="text-link" aria-label={`Read ${project.name} case study`}>
                                    Read case study <ArrowRight aria-hidden="true" size={15} />
                                </Link>
                                <a className="text-link text-link--muted" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
                                    Live site <ArrowUpRight aria-hidden="true" size={15} />
                                </a>
                                {preview && <ProjectPreview project={preview} />}
                            </div>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
