import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
    return (
        <header className="relative flex w-full items-center justify-between gap-4 pt-16 pb-6 md:pt-20">
            <div>
                <h1 className="text-[clamp(2.65rem,8vw,3.5rem)] font-bold leading-none tracking-tight text-zinc-950 dark:text-zinc-50">
                    Vinod KR
                </h1>
                <p className="mt-2 flex items-center gap-2 text-lg text-zinc-600 dark:text-zinc-400">
                    Full Stack Dev
                    <Sparkles aria-hidden="true" className="size-4 text-violet-600 dark:text-violet-400" />
                </p>
            </div>

            <Link
                href="/work"
                prefetch={false}
                aria-label="View work and experience"
                className="group relative shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
            >
                <Image
                    src="/images/profile-192.webp"
                    alt="Vinod KR"
                    width={72}
                    height={72}
                    priority
                    unoptimized
                    className="size-16 rounded-full object-cover ring-1 ring-violet-500/25 sm:size-[72px]"
                />
                <span className="absolute -right-1 -bottom-1 rounded-full border border-violet-500/20 bg-white p-0.5 text-violet-700 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 dark:bg-zinc-900 dark:text-violet-300">
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
            </Link>
        </header>
    );
}
