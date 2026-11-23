import type { CSSProperties } from "react";
import { BrainCircuit, Cloud, Database, Network, SlidersHorizontal, UsersRound, Wrench, type LucideIcon } from "lucide-react";
import {
    siBun,
    siClerk,
    siCss,
    siDocker,
    siExpress,
    siFirebase,
    siFramer,
    siGooglegemini,
    siHono,
    siHostinger,
    siHtml5,
    siJavascript,
    siKonva,
    siMariadb,
    siMdx,
    siMongodb,
    siNextdotjs,
    siNodedotjs,
    siPostgresql,
    siPrisma,
    siPuppeteer,
    siRailway,
    siRazorpay,
    siReact,
    siReactquery,
    siRedis,
    siRust,
    siShadcnui,
    siSolidity,
    siSupabase,
    siTailwindcss,
    siTypescript,
    siVercel,
    siVite,
    siZod,
    type SimpleIcon,
} from "simple-icons";

const logos: Record<string, SimpleIcon> = {
    TypeScript: siTypescript,
    JavaScript: siJavascript,
    Rust: siRust,
    Solidity: siSolidity,
    HTML: siHtml5,
    CSS: siCss,
    React: siReact,
    "Next.js": siNextdotjs,
    Vite: siVite,
    "Tailwind CSS": siTailwindcss,
    ShadCN: siShadcnui,
    "Framer Motion": siFramer,
    MDX: siMdx,
    Konva: siKonva,
    "Node.js": siNodedotjs,
    Bun: siBun,
    Express: siExpress,
    Hono: siHono,
    Puppeteer: siPuppeteer,
    PostgreSQL: siPostgresql,
    MongoDB: siMongodb,
    MariaDB: siMariadb,
    Redis: siRedis,
    Firebase: siFirebase,
    Prisma: siPrisma,
    "TanStack Query": siReactquery,
    Zod: siZod,
    Clerk: siClerk,
    Supabase: siSupabase,
    Razorpay: siRazorpay,
    Gemini: siGooglegemini,
    Vercel: siVercel,
    Hostinger: siHostinger,
    Railway: siRailway,
    Docker: siDocker,
};

// Generic technology symbols are explicit fallbacks, not invented brand marks.
const symbols: Record<string, LucideIcon> = {
    SQL: Database,
    WebSocket: Network,
    Liveblocks: UsersRound,
    Zustand: SlidersHorizontal,
    OpenAI: BrainCircuit,
    AWS: Cloud,
};

function brandStyle(hex: string): CSSProperties {
    const channels = hex.match(/../g)!.map((channel) => parseInt(channel, 16) / 255);
    const luminance = channels.reduce((sum, value, index) => {
        const linear = value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
        return sum + linear * [.2126, .7152, .0722][index];
    }, 0);
    return {
        "--tech-brand-color": `#${hex}`,
        "--tech-brand-dark-color": luminance < .12 ? `color-mix(in srgb, #${hex} 55%, var(--site-ink))` : `#${hex}`,
    } as CSSProperties;
}

export default function TechBrandLogo({ name, colored = false, className = "" }: { name: string; colored?: boolean; className?: string }) {
    const logo = logos[name];
    if (!logo) {
        const Symbol = symbols[name] ?? Wrench;
        return <Symbol className={`tech-brand-logo ${className}`} aria-hidden="true" strokeWidth={1.5} data-brand-kind="symbol" />;
    }

    // Black/white identity marks follow the current theme; chromatic marks retain
    // their published brand hue with a small contrast adjustment on light surfaces.
    const isNeutral = /^(000000|FFFFFF|181717|171717|111111|010101)$/i.test(logo.hex);
    const style = colored && !isNeutral ? brandStyle(logo.hex) : undefined;

    return (
        <svg
            className={`tech-brand-logo ${className}`}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            data-colored={colored && !isNeutral}
            data-brand-kind="logo"
            style={style}
        >
            <path d={logo.path} />
        </svg>
    );
}
