import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectVariant from "@/components/design/ProjectVariants";
import TechStackVariant from "@/components/design/TechStackVariants";
import WakatimeStats from "@/components/reusable/bento/WakatimeStats";
import HomeFooter from "@/components/blocks/HomeFooter";
import "@/components/blocks/Bento.css";
import "./DesignVariants.css";

export const metadata: Metadata = {
    title: "Design options | Vinod KR",
    robots: { index: false, follow: false },
};

const projectOptions = [
    { id: "cover", number: "01", name: "Cover", description: "A large preview with a compact thumbnail rail." },
    { id: "split", number: "02", name: "Split", description: "A quiet project index beside the selected product." },
    { id: "gallery", number: "03", name: "Gallery", description: "Four featured products together, with the rest in an archive." },
    { id: "stack", number: "04", name: "Stack", description: "A tactile card stack with simple previous and next controls." },
] as const;

const techOptions = [
    { id: "rows", number: "A", name: "Logo rows", description: "Monochrome brand marks, organised by discipline." },
    { id: "wall", number: "B", name: "Logo wall", description: "An open grid of recognisable, coloured tool marks." },
    { id: "groups", number: "C", name: "Grouped logos", description: "Compact logo groups by discipline." },
] as const;

type SearchParams = Promise<{ project?: string; tech?: string }>;

export default async function DesignOptions({ searchParams }: { searchParams: SearchParams }) {
    const search = await searchParams;
    const selectedProject = projectOptions.find((option) => option.id === search.project);
    const selectedTech = selectedProject ? undefined : techOptions.find((option) => option.id === search.tech);
    const selectedOption = selectedProject ?? selectedTech;
    const isSingle = Boolean(selectedProject || selectedTech);
    const projects = selectedProject ? [selectedProject] : selectedTech ? [] : projectOptions;
    const technologies = selectedTech ? [selectedTech] : selectedProject ? [] : techOptions;

    return (
        <main id="main-content" className={`design-board ${isSingle ? "design-board-single" : ""} ${selectedTech ? "design-board-single-tech" : ""}`}>
            <header className="design-board-intro">
                <Link href={isSingle ? "/design" : "/#bento"} prefetch={false} className="design-back-link">
                    <ArrowLeft aria-hidden="true" size={14} /> {isSingle ? "Compare all options" : "Back to portfolio"}
                </Link>
                <h1>{isSingle ? `${selectedProject?.name ?? selectedTech?.name}` : "Design options"}</h1>
                <p>{selectedOption?.description ?? "Choose a project layout and a tech-stack layout. Every option is interactive and uses the real projects and tools."}</p>
                {!isSingle && (
                    <nav aria-label="Design comparisons" className="design-section-links">
                        <a href="#project-options">Projects <span>01–04</span></a>
                        <a href="#technology-options">Tech stack <span>A–C</span></a>
                        <a href="#coding-time-polish">Coding time</a>
                    </nav>
                )}
            </header>

            {projects.length > 0 && (
                <section id="project-options" aria-labelledby="project-options-heading" className="design-comparison-section">
                    {!isSingle && <h2 id="project-options-heading">Selected projects <span>Four directions</span></h2>}
                    {isSingle && <h2 id="project-options-heading" className="sr-only">Selected project layout</h2>}
                    <div className="design-project-grid">
                        {projects.map((option) => (
                            <article key={option.id} className="design-option" aria-labelledby={`project-option-${option.id}`}>
                                <header className={isSingle ? "sr-only" : "design-option-heading"}>
                                    <div>
                                        <h3 id={`project-option-${option.id}`}><span>{option.number}</span> {option.name}</h3>
                                        <p>{option.description}</p>
                                    </div>
                                    {!isSingle && <Link href={`/design?project=${option.id}`} prefetch={false} aria-label={`View ${option.name} at full size`}>Full size <ArrowUpRight aria-hidden="true" size={13} /></Link>}
                                </header>
                                <div className="design-option-canvas"><ProjectVariant variant={option.id} /></div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {technologies.length > 0 && (
                <section id="technology-options" aria-labelledby="technology-options-heading" className="design-comparison-section">
                    {!isSingle && <h2 id="technology-options-heading">Tech stack <span>Logo-led options</span></h2>}
                    {isSingle && <h2 id="technology-options-heading" className="sr-only">Tech-stack layout</h2>}
                    <div className="design-tech-grid">
                        {technologies.map((option) => (
                            <article key={option.id} className="design-option" aria-labelledby={`tech-option-${option.id}`}>
                                <header className={isSingle ? "sr-only" : "design-option-heading"}>
                                    <div>
                                        <h3 id={`tech-option-${option.id}`}><span>{option.number}</span> {option.name}</h3>
                                        <p>{option.description}</p>
                                    </div>
                                    {!isSingle && <Link href={`/design?tech=${option.id}`} prefetch={false} aria-label={`View ${option.name} at full size`}>Full size <ArrowUpRight aria-hidden="true" size={13} /></Link>}
                                </header>
                                <div className="design-option-canvas"><TechStackVariant variant={option.id} /></div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {!isSingle && (
                <section id="coding-time-polish" aria-labelledby="coding-time-heading" className="design-comparison-section design-micro-section">
                    <div>
                        <h2 id="coding-time-heading">Coding time <span>Interaction polish</span></h2>
                        <p>Try a language or a ring segment. Hover and focus preview it; clicking keeps the selection.</p>
                    </div>
                    <div className="design-micro-card"><WakatimeStats /></div>
                </section>
            )}
            <HomeFooter />
        </main>
    );
}
