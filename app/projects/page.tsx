import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import CaseWork from "@/components/portfolio/CaseWork"
import Project from "@/components/reusable/projects/Project"
import { featuredWork, polarContributions } from "@/constant/Portfolio"
import { projectsData } from "@/constant/ProjectsData"

export const metadata: Metadata = {
    title: "Selected Work | Vinod KR",
    description: "Full-stack projects by Vinod KR, from product decisions and interface design to production systems.",
}

const featuredUrls: ReadonlySet<string> = new Set(featuredWork.map(({ url }) => url))

export default function ProjectsPage() {
    return (
        <main id="main-content" className="site-container page-shell">
            <header className="page-intro">
                <p className="eyebrow">Portfolio</p>
                <h1 className="page-heading">Selected work</h1>
                <p className="page-lede">What I built, the decisions behind it, and the systems that went live.</p>
            </header>
            <CaseWork previews />

            <section className="home-section" aria-labelledby="more-projects">
                <div className="section-heading"><h2 id="more-projects">More projects</h2></div>
                <div className="project-archive">
                    {projectsData.filter((project) => !featuredUrls.has(project.liveOn ?? "")).map((project) => <Project key={project.name} {...project} />)}
                </div>
            </section>

            <section className="home-section" aria-labelledby="contributions">
                <div className="section-heading"><h2 id="contributions">Open-source contributions</h2></div>
                <ul className="site-panel project-contributions">
                    {polarContributions.map((entry) => (
                        <li key={entry.id}>
                            <a href={entry.url} target="_blank" rel="noreferrer">
                                <span>{entry.title}</span>
                                <small>Polar #{entry.id} <ArrowUpRight aria-hidden="true" size={14} /></small>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}
