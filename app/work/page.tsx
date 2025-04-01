import Navbar from "@/components/blocks/Navbar"
import Timeline from "@/components/ui/Timeline"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { timelineData } from "@/constant/Work"

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = () => {
    return (
        <>
            <Navbar />

            <div className="max-w-2xl mt-20 px-4 pt-12 pb-24">
                <Head>
                    <title>My Work | Portfolio</title>
                    <meta name="description" content="Portfolio of my development work and projects" />
                </Head>

                <main>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold dark:text-white text-black">experiences</h1>
                        <Link target="_blank" href="https://www.canva.com/design/DAFjdV8aOwE/UOJYSzPOslikrzUs7Gd6WQ/view?utm_content=DAFjdV8aOwE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h74344188b3" className="text-black inline-block rounded rounded-lg border border-dashed border-black dark:border-white px-4 py-2 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition">
                            View Resume <span className="ml-1">→</span>
                        </Link>
                    </div>

                    <p className="text-lg text-black/60 dark:text-white/90 mb-6">
                        Exploring new technologies and creating engaging web experiences, while
                        continuously learning and growing as a developer.
                    </p>

                    <p className="text-base text-black/50 dark:text-white/80 mb-8">
                        Here&apos;s a snapshot of my journey so far.
                    </p>

                    <div className="h-px w-full bg-black/70 dark:bg-white/20 my-10"></div>

                    {/* Previous Work Experience */}
                    <Timeline
                        data={timelineData}
                        gradientColors={['#10b981', '#3b82f6']}
                        styleClass="rounded-lg shadow-sm"
                    />

                    <div className="h-px w-full bg-black/70 dark:bg-white/20 my-10"></div>

                    <p className="text-black/60 dark:text-white/90 mb-8">
                        I&apos;m always exploring new technologies and pushing boundaries to create innovative solutions. Exciting projects and experiences are on the way—stay tuned! 🚀
                    </p>

                    <div className="font-mono bold text-black dark:text-white mt-8">
                        <Link href="/" >
                            → cd ..
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}


export default Page
