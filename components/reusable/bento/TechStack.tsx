"use client";

import { useId, useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { techStacks } from "@/constant/TechStack";
import TechBrandLogo from "@/components/reusable/TechBrandLogo";
import BentoCard from "./BentoCard";
import "./TechStack.css";

type Tool = { name: string; category: string };

const stackOverview = [
    { title: "Languages", category: "Languages", techs: ["TypeScript", "JavaScript", "Rust"] },
    { title: "Frontend", category: "Frontend", techs: ["React", "Next.js", "Tailwind CSS"] },
    { title: "Backend", category: "Backend & Realtime", techs: ["Node.js", "Bun", "WebSocket"] },
    { title: "Data", category: "Data & State", techs: ["PostgreSQL", "Redis", "Prisma"] },
];
const highlighted = new Set(stackOverview.flatMap(({ techs }) => techs));
const remainingStack = Object.entries(techStacks).map(([category, { techs }]) => ({
    category,
    techs: techs.filter((tech) => !highlighted.has(tech)),
}));
const extraCount = remainingStack.reduce((count, { techs }) => count + techs.length, 0);

export default function TechStackCard() {
    const panelId = useId();
    const readoutId = useId();
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState<Tool>({ name: "TypeScript", category: "Languages" });
    const [hovered, setHovered] = useState<Tool | null>(null);
    const [focused, setFocused] = useState<Tool | null>(null);
    const displayed = hovered ?? focused ?? selected;

    function logoButton(tool: Tool, labelled = false) {
        return (
            <button
                key={tool.name}
                type="button"
                className={`home-tech-tool${labelled ? " home-tech-tool-labelled" : ""}`}
                aria-label={`${tool.name}, ${tool.category}`}
                aria-pressed={selected.name === tool.name}
                aria-controls={readoutId}
                title={tool.name}
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(tool); }}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => { setFocused(tool); setHovered(null); }}
                onBlur={() => setFocused(null)}
                onClick={() => setSelected(tool)}
            >
                <TechBrandLogo name={tool.name} className="home-tech-brand" />
                {labelled && <span aria-hidden="true" className="home-tech-tool-name">{tool.name}</span>}
            </button>
        );
    }

    return (
        <>
            <BentoCard className="bento-tech home-tech-stack col-span-8">
                <h3 className="home-tech-heading"><Layers aria-hidden="true" size={16} strokeWidth={1.5} />Tech stack</h3>
                <div className="home-tech-quadrants">
                    {stackOverview.map(({ title, category, techs }) => (
                        <section className="home-tech-group" key={category} aria-label={category}>
                            <h4>{title}</h4>
                            <div className="home-tech-logos">{techs.map((name) => logoButton({ name, category }))}</div>
                        </section>
                    ))}
                </div>
                <div id={readoutId} className="home-tech-readout">
                    <span className="home-tech-readout-name">{displayed.name}</span>
                    <span className="home-tech-readout-category">{displayed.category}</span>
                </div>
                <button
                    type="button"
                    className="bento-tool-toggle home-tech-toggle"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => { setExpanded((value) => !value); setHovered(null); setFocused(null); }}
                >
                    <span>{expanded ? "Close toolkit" : "More tools"}</span>
                    <span className="bento-tool-count">+{extraCount}</span>
                    <ChevronDown aria-hidden="true" size={14} />
                </button>
            </BentoCard>
            <div
                id={panelId}
                className="bento-tool-drawer home-tech-drawer col-span-12"
                data-open={expanded}
                aria-hidden={!expanded}
                inert={!expanded}
            >
                <div className="bento-tool-clip">
                    <div className="bento-tool-content">
                        <dl className="home-tech-extra-groups">
                            {remainingStack.map(({ category, techs }) => (
                                <div className="home-tech-extra-group" key={category}>
                                    <dt>{category}</dt>
                                    <dd><div className="home-tech-extra-logos">{techs.map((name) => logoButton({ name, category }, true))}</div></dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
}
