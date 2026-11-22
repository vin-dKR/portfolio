"use client";

import { useState } from "react";
import { Root as Tabs, List as TabList, Trigger as Tab, Content as TabPanel } from "@radix-ui/react-tabs";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBentoProject } from "@/constant/BentoProjects";

const work = [
    { name: "Trio EV", category: "EV fleet & charging", hostname: "trioev.com" },
    { name: "Pagz", category: "Custom printing & commerce", hostname: "pagz.in" },
    { name: "Eduents", category: "Education & assessment", hostname: "eduents.com" },
];

export default function ProjectShowOff() {
    const [selected, setSelected] = useState("0");

    return (
        <section id="freelance-work" className="freelance-section freelance-work" aria-labelledby="client-work-heading">
            <header className="freelance-section-header">
                <h2 id="client-work-heading">Ideas turned into <em>real things.</em></h2>
                <Link className="site-link" href="/projects" prefetch={false}>All projects <ArrowUpRight aria-hidden="true" size={14} /></Link>
            </header>
            <Tabs value={selected} onValueChange={setSelected} className="freelance-work-gallery">
                {work.map((item, index) => {
                    const project = getBentoProject(item.name);
                    return (
                        <TabPanel key={item.name} value={String(index)} className="freelance-work-panel">
                            {selected === String(index) && project.screen && project.story && (
                                <article className="freelance-work-product">
                                    <Link className="freelance-work-screen" href={`/posts/${project.story.slug}`} prefetch={false} aria-label={`Read the ${item.name} case study`}>
                                        <Image src={project.screen.src} alt={project.screen.alt} fill sizes="(max-width: 767px) 92vw, 680px" unoptimized />
                                        <span className="freelance-work-open" aria-hidden="true"><ArrowUpRight size={19} /></span>
                                    </Link>
                                    <div className="freelance-work-caption">
                                        <div><p>{item.category}</p><h3>{item.name}</h3></div>
                                        <p>{project.summary}</p>
                                        <Link href={`/posts/${project.story.slug}`} prefetch={false} className="site-link">Read case study <ArrowRight aria-hidden="true" size={15} /></Link>
                                    </div>
                                </article>
                            )}
                        </TabPanel>
                    );
                })}
                <TabList className="freelance-work-picker" aria-label="Client projects">
                    {work.map((item, index) => {
                        const project = getBentoProject(item.name);
                        return (
                            <Tab key={item.name} value={String(index)} className="freelance-work-choice">
                                {project.screen && <span className="freelance-work-thumbnail"><Image src={project.screen.src} alt="" fill sizes="96px" unoptimized /></span>}
                                <span>{item.name}<small>{item.hostname}</small></span>
                            </Tab>
                        );
                    })}
                </TabList>
            </Tabs>
        </section>
    );
}
