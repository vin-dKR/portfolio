import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBentoProject } from "@/constant/BentoProjects";

const clientProjects = ["Trio EV", "Pagz", "Eduents"];

export default function ProjectShowOff() {
    return (
        <section className="freelance-section" aria-labelledby="client-work-heading">
            <div className="freelance-section-header">
                <h2 id="client-work-heading" className="section-heading">Client work</h2>
                <Link className="site-link" href="/projects" prefetch={false}>All projects <ArrowUpRight aria-hidden="true" size={14} /></Link>
            </div>
            <div className="freelance-projects">
                {clientProjects.map((name) => {
                    const project = getBentoProject(name);
                    if (!project.screen || !project.story) return null;

                    return (
                        <Link key={name} className="freelance-project site-card" href={`/posts/${project.story.slug}`} prefetch={false}>
                            <div className="freelance-project-image">
                                <Image src={project.screen.src} alt={project.screen.alt} fill sizes="(max-width: 480px) 90vw, (max-width: 639px) 45vw, 210px" unoptimized />
                            </div>
                            <div className="freelance-project-copy">
                                <h3>{name}<ArrowRight aria-hidden="true" size={14} /></h3>
                                <p>{project.summary}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
