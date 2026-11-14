import { Layers } from "lucide-react";
import { techStacks } from "@/constant/TechStack";
import BentoCard from "./BentoCard";

export default function TechStackCard() {
    return (
        <BentoCard className="col-span-9 sm:col-span-5">
            <div className="mb-4 flex items-center gap-2">
                <Layers aria-hidden="true" className="size-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Tech Stack</h3>
            </div>

            <dl className="space-y-4">
                {Object.entries(techStacks).map(([category, { color, techs }]) => (
                    <div key={category} className="border-l-2 pl-2.5" style={{ borderColor: color }}>
                        <dt className="mb-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">{category}</dt>
                        <dd className="flex flex-wrap gap-1.5">
                            {techs.map((tech) => (
                                <span key={tech} className="rounded-full border border-zinc-950/8 bg-zinc-950/3 px-2 py-1 text-xs text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                                    {tech}
                                </span>
                            ))}
                        </dd>
                    </div>
                ))}
            </dl>
        </BentoCard>
    );
}
