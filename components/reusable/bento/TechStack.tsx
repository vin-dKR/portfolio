"use client";

import { useId, useState } from "react";
import { Braces, ChevronDown, Database, Layers, PanelsTopLeft, Server } from "lucide-react";
import { techStacks } from "@/constant/TechStack";
import BentoCard from "./BentoCard";

const stackOverview = [
    {
        title: "Languages",
        icon: Braces,
        techs: ["TypeScript", "JavaScript", "Rust"],
        accent: "text-indigo-700 dark:text-indigo-300",
    },
    {
        title: "Frontend",
        icon: PanelsTopLeft,
        techs: ["React", "Next.js", "Tailwind CSS"],
        accent: "text-sky-700 dark:text-sky-300",
    },
    {
        title: "Backend",
        icon: Server,
        techs: ["Node.js", "Bun", "WebSocket"],
        accent: "text-blue-700 dark:text-blue-300",
    },
    {
        title: "Data",
        icon: Database,
        techs: ["PostgreSQL", "Redis", "Prisma"],
        accent: "text-violet-700 dark:text-violet-300",
    },
];

const highlighted = new Set(stackOverview.flatMap(({ techs }) => techs));
const remainingStack = Object.entries(techStacks).map(([category, { techs }]) => ({
    category,
    techs: techs.filter((tech) => !highlighted.has(tech)),
}));
const extraCount = remainingStack.reduce((count, { techs }) => count + techs.length, 0);

export default function TechStackCard() {
    const panelId = useId();
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <BentoCard className="bento-tech col-span-8 flex flex-col px-3 py-3 sm:px-4 sm:py-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <Layers aria-hidden="true" className="size-4 text-(--bento-accent)" />
                    Tech stack
                </h3>

                <dl className="grid flex-1 divide-y divide-(--bento-rule)">
                    {stackOverview.map(({ title, icon: Icon, techs, accent }) => (
                        <div
                            key={title}
                            className="grid min-w-0 content-center gap-1.5 py-2.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:items-center sm:gap-2"
                        >
                            <dt className="flex min-w-0 items-center gap-1.5 text-xs font-semibold">
                                <Icon aria-hidden="true" className={`size-3.5 shrink-0 ${accent}`} />
                                {title}
                            </dt>
                            <dd className="min-w-0">
                                <ul className="flex flex-wrap gap-1">
                                    {techs.map((tech) => (
                                        <li key={tech} className="site-chip">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                    ))}
                </dl>

                <button
                    type="button"
                    className="bento-tool-toggle"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setExpanded((value) => !value)}
                >
                    <span>{expanded ? "Close toolkit" : "More tools"}</span>
                    <span className="bento-tool-count">+{extraCount}</span>
                    <ChevronDown aria-hidden="true" size={14} />
                </button>
            </BentoCard>

            <div
                id={panelId}
                className="bento-tool-drawer col-span-12"
                data-open={expanded}
                aria-hidden={!expanded}
                inert={!expanded}
            >
                <div className="bento-tool-clip">
                    <div className="bento-tool-content">
                        <div className="bento-tool-heading">
                            <h3>More of my toolkit</h3>
                            <span>{extraCount} tools across {remainingStack.length} areas</span>
                        </div>
                        <dl className="bento-tool-groups">
                            {remainingStack.map(({ category, techs }) => (
                                <div key={category}>
                                    <dt>{category}</dt>
                                    <dd>
                                        <ul>
                                            {techs.map((tech) => <li key={tech} className="site-chip">{tech}</li>)}
                                        </ul>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
}
