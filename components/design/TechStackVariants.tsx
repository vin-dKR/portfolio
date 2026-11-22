"use client";

import { useId, useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { techStacks } from "@/constant/TechStack";
import TechBrandLogo from "./TechBrandLogo";
import "./TechStackVariants.css";

type Variant = "rows" | "wall" | "groups";
type Tool = { name: string; category: string };

const overview = [
    { label: "Languages", category: "Languages", names: ["TypeScript", "JavaScript", "Rust"] },
    { label: "Frontend", category: "Frontend", names: ["React", "Next.js", "Tailwind CSS"] },
    { label: "Backend", category: "Backend & Realtime", names: ["Node.js", "Bun", "WebSocket"] },
    { label: "Data", category: "Data & State", names: ["PostgreSQL", "Redis", "Prisma"] },
];
const allTools: Tool[] = Object.entries(techStacks).flatMap(([category, { techs }]) => techs.map((name) => ({ name, category })));
const primaryNames = new Set(overview.flatMap(({ names }) => names));
const primaryTools = overview.flatMap(({ names, category }) => names.map((name) => ({ name, category })));
const remainingGroups = Object.entries(techStacks).map(([category, { techs }]) => ({
    category,
    tools: techs.filter((name) => !primaryNames.has(name)).map((name) => ({ name, category })),
}));
const remainingCount = allTools.length - primaryNames.size;

export default function TechStackVariant({ variant }: { variant: Variant }) {
    const headingId = useId();
    const readoutId = useId();
    const [selected, setSelected] = useState<Tool>(primaryTools[0]);
    const [hovered, setHovered] = useState<Tool | null>(null);
    const [focused, setFocused] = useState<Tool | null>(null);
    const displayed = hovered ?? focused ?? selected;

    function logoButton(tool: Tool) {
        return (
            <button
                key={tool.name}
                type="button"
                className="ctv-tool"
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
                <TechBrandLogo name={tool.name} colored={variant === "wall"} />
            </button>
        );
    }

    return (
        <section className={`ctv-root ctv-${variant}`} aria-labelledby={headingId}>
            <div className="ctv-card">
                <header className="ctv-heading">
                    <h3 id={headingId}><Layers aria-hidden="true" size={16} strokeWidth={1.5} />Tech stack</h3>
                </header>

                {variant === "rows" && (
                    <dl className="ctv-category-rows">
                        {overview.map(({ label, category, names }) => (
                            <div className="ctv-category-row" key={category}>
                                <dt>{label}</dt>
                                <dd><div className="ctv-logo-cluster">{names.map((name) => logoButton({ name, category }))}</div></dd>
                            </div>
                        ))}
                    </dl>
                )}

                {variant === "wall" && <div className="ctv-logo-wall">{primaryTools.map(logoButton)}</div>}

                {variant === "groups" && (
                    <div className="ctv-category-grid">
                        {overview.map(({ label, category, names }) => (
                            <section className="ctv-category-group" key={category} aria-label={category}>
                                <h4>{label}</h4>
                                <div className="ctv-logo-cluster">{names.map((name) => logoButton({ name, category }))}</div>
                            </section>
                        ))}
                    </div>
                )}

                <div id={readoutId} className="ctv-readout">
                    <span className="ctv-readout-name">{displayed.name}</span>
                    <span className="ctv-readout-category">{displayed.category}</span>
                </div>

                <details className="ctv-more" onToggle={(event) => { if (!event.currentTarget.open) { setHovered(null); setFocused(null); } }}>
                    <summary>
                        <span>More tools</span>
                        <span className="ctv-more-count">+{remainingCount}</span>
                        <ChevronDown aria-hidden="true" size={14} />
                    </summary>
                    <div className="ctv-expanded">
                        {remainingGroups.map(({ category, tools }) => (
                            <section className="ctv-extra-group" key={category} aria-label={category}>
                                <h4>{category}</h4>
                                <div className="ctv-logo-cluster">{tools.map(logoButton)}</div>
                            </section>
                        ))}
                    </div>
                </details>
            </div>
        </section>
    );
}
