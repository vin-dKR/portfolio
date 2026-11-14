import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
    return (
        <header className="relative flex w-full items-center justify-between gap-4 pt-16 pb-6 md:pt-20">
            <div>
                <h1 className="bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-[clamp(2.65rem,8vw,3.5rem)] font-bold leading-none tracking-tight text-transparent dark:from-white dark:to-zinc-400">
                    Vinod KR
                </h1>
                <p className="mt-2 flex items-center gap-2 text-xl text-zinc-600 dark:text-zinc-400">
                    <span className="profile-sparkles">
                        Full Stack Dev
                        <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                </p>
            </div>

            <Link
                href="/work"
                prefetch={false}
                aria-label="View work and experience"
                className="group relative isolate shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
            >
                <span aria-hidden="true" className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-br from-purple-500 to-sky-400 opacity-50 blur-md motion-safe:transition-opacity group-hover:opacity-80" />
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
