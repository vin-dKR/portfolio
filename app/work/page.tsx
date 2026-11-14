import type { Metadata } from "next"
import Link from "next/link"
import Timeline from "@/components/ui/Timeline"
import { timelineData } from "@/constant/Work"

export const metadata: Metadata = {
    title: "Experiences | Vinod KR",
    description: "My work experience in engineering, startups, and freelance web development.",
}

export default function WorkPage() {
    return (
        <main className="w-full max-w-2xl px-4 sm:px-6 mt-16 sm:mt-20 md:mt-24 pt-8 sm:pt-12 pb-24 md:pb-12 sm:pb-16 mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-white text-black">experiences</h1>
                <a
                    href="https://drive.google.com/file/d/1bbKx8tkUMtvuAI33hiT6nKX84IwDWawt/view?usp=sharing"
                    target="_blank"
                    rel="noopener"
                    className="text-sm sm:text-base text-black inline-flex items-center gap-1.5 rounded-lg border border-dashed border-black/40 dark:border-white/40 px-3 sm:px-4 py-2 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition w-fit"
                >
                    View Resume <span aria-hidden="true">↗</span>
                </a>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/90 mb-4 sm:mb-6">
                Exploring new technologies and creating engaging web experiences, while
                continuously learning and growing as a developer.
            </p>

            <p className="text-xs sm:text-sm md:text-base text-black/50 dark:text-white/80">
                Here&apos;s a snapshot of my journey so far.
            </p>

            <div className="h-px w-full bg-black/15 dark:bg-white/20 mt-6 sm:mt-8 md:mt-10" />

            <Timeline data={timelineData} gradientColors={['#10b981', '#3b82f6']} />

            <div className="h-px w-full bg-black/15 dark:bg-white/20 mb-6 sm:mb-8 md:mb-10" />

            <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/90 mb-6 sm:mb-8">
                I&apos;m always exploring new technologies and pushing boundaries to create innovative solutions. Exciting projects and experiences are on the way—stay tuned! 🚀
            </p>

            <Link href="/" className="font-mono text-sm sm:text-base font-bold text-black dark:text-white">
                → cd ..
            </Link>
        </main>
    )
}
