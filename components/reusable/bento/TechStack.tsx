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
    return (
        <BentoCard className="col-span-8 flex flex-col px-3 py-3 sm:px-4 sm:py-4">
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
                                    <li key={tech} className="rounded-md border border-(--bento-rule) bg-(--bento-inset) px-1.5 py-0.5 text-[11px] leading-tight text-(--bento-ink) sm:px-2">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                ))}
            </dl>

            <details className="group/stack mt-2 rounded-lg border border-(--bento-rule) bg-(--bento-inset)">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-(--bento-accent) transition-colors hover:bg-violet-500/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500 [&::-webkit-details-marker]:hidden">
                    <span>More tools</span>
                    <span className="ml-auto text-[10px] font-medium tabular-nums text-(--bento-muted)">+{extraCount}</span>
                    <ChevronDown aria-hidden="true" className="size-3.5 shrink-0 motion-safe:transition-transform group-open/stack:rotate-180" />
                </summary>
                <dl className="grid gap-x-4 gap-y-3 border-t border-(--bento-rule) p-2.5 sm:grid-cols-2">
                    {remainingStack.map(({ category, techs }) => (
                        <div key={category}>
                            <dt className="mb-0.5 text-xs font-semibold">{category}</dt>
                            <dd className="text-xs leading-relaxed text-(--bento-muted)">{techs.join(" · ")}</dd>
                        </div>
                    ))}
                </dl>
            </details>
        </BentoCard>
    );
}
