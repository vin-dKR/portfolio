import {
    siClerk,
    siFramer,
    siJavascript,
    siMdx,
    siMongodb,
    siNextdotjs,
    siNodedotjs,
    siPostgresql,
    siPrisma,
    siPuppeteer,
    siReact,
    siReactquery,
    siRust,
    siShadcnui,
    siTailwindcss,
    siTypescript,
    siZod,
    type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
    clerk: siClerk,
    framer: siFramer,
    javascript: siJavascript,
    mdx: siMdx,
    mongodb: siMongodb,
    nextjs: siNextdotjs,
    nodejs: siNodedotjs,
    postgresql: siPostgresql,
    prisma: siPrisma,
    puppeteer: siPuppeteer,
    react: siReact,
    rust: siRust,
    shadcn: siShadcnui,
    tailwind: siTailwindcss,
    tailwindcss: siTailwindcss,
    tanstack: siReactquery,
    typescript: siTypescript,
    zod: siZod,
};

export default function TechIcon({ name }: { name: string }) {
    const icon = icons[name.toLowerCase().replace(/[\s.]+/g, "")];

    return icon ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 fill-current text-zinc-100">
            <path d={icon.path} />
        </svg>
    ) : (
        <span aria-hidden="true" className="grid size-4 shrink-0 place-items-center rounded bg-black/30 text-[9px] font-bold uppercase text-white">
            {name.charAt(0)}
        </span>
    );
}
