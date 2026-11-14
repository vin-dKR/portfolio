import { Braces, ChevronDown, Database, Layers, PanelsTopLeft, Server } from "lucide-react";
import { techStacks } from "@/constant/TechStack";
import BentoCard from "./BentoCard";

const stackOverview = [
    {
        title: "Languages",
        icon: Braces,
        techs: ["TypeScript", "JavaScript", "Rust"],
        accent: "text-indigo-600 dark:text-indigo-300",
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

export default function TechStackCard() {
    return (
        <BentoCard className="col-span-12 sm:col-span-7">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Layers aria-hidden="true" className="size-4 text-violet-700 dark:text-violet-300" />
                Tech stack
            </h3>

            <dl className="grid grid-cols-2 gap-2">
                {stackOverview.map(({ title, icon: Icon, techs, accent }) => (
                    <div
                        key={title}
                        className="min-w-0 rounded-xl border border-indigo-950/8 bg-indigo-950/3 px-2.5 py-3 sm:px-3 dark:border-indigo-300/10 dark:bg-indigo-200/5"
                    >
                        <dt className="mb-2 flex min-w-0 items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            <Icon aria-hidden="true" className={`size-3.5 shrink-0 ${accent}`} />
                            {title}
                        </dt>
                        <dd>
                            <ul className="space-y-0.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {techs.map((tech) => <li key={tech}>{tech}</li>)}
                            </ul>
                        </dd>
                    </div>
                ))}
            </dl>

            <details className="group/stack mt-3 rounded-lg border border-indigo-950/8 dark:border-indigo-300/10">
                <summary className="flex min-h-9 cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-500/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500 dark:text-indigo-300 [&::-webkit-details-marker]:hidden">
                    More tools
                    <ChevronDown aria-hidden="true" className="size-3.5 motion-safe:transition-transform group-open/stack:rotate-180" />
                </summary>
                <dl className="grid gap-x-3 gap-y-3 border-t border-indigo-950/8 p-2.5 sm:grid-cols-2 dark:border-indigo-300/10">
                    {remainingStack.map(({ category, techs }) => (
                        <div key={category}>
                            <dt className="mb-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">{category}</dt>
                            <dd className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{techs.join(" · ")}</dd>
                        </div>
                    ))}
                </dl>
            </details>
        </BentoCard>
    );
}
