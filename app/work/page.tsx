"use client"

import Navbar from "@/components/Navbar"
import Timeline from "@/components/ui/Timeline"
import Head from "next/head"
import Link from "next/link"
import React from "react"

const Page = () => {
    const timelineData: TimelineEntry[] = [
  {
    title: 'Clothing GO',
    content: 'Co-Founder & CTO',
    date: 'July 2022 - Dec 2023',
    image: '/images/clothinggo.jpg',
    summaryPoints: ['Website Development & Management ', 'UI/UX Design', 'Business Strategy & Digital Presence'],
  },
  {
    title: 'HCL Tech',
    content: 'Intern',
    image: '/images/hcltech.jpg',
    date: 'Sep 2024 - Feb 2025',
    summaryPoints: ['Financial Systems Support', 'Incident Handling & Support', 'System Monitoring & Maintenance'],
  },
];

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
                        <h1 className="text-4xl font-bold text-white">my work</h1>
                        <Link href="/resume" className="inline-block rounded rounded-lg border border-dashed border-white px-4 py-2 text-white hover:bg-white/10 transition">
                            View Resume <span className="ml-1">→</span>
                        </Link>
                    </div>

                    <p className="text-lg text-white/90 mb-6">
                        Exploring new technologies and creating engaging web experiences, while
                        continuously learning and growing as a developer.
                    </p>

                    <p className="text-base text-white/80 mb-8">
                        Here&apos;s a snapshot of my journey so far.
                    </p>

                    <div className="h-px w-full bg-white/20 my-10"></div>

                    {/* Previous Work Experience */}
    <Timeline
          data={timelineData}
          gradientColors={['#10b981', '#3b82f6']}
          styleClass="rounded-lg shadow-sm"
        />

                    <div className="h-px w-full bg-white/20 my-10"></div>

                    <p className="text-white/90 mb-8">
                        I&apos;m constantly learning and experimenting with new technologies. Stay tuned for
                        more exciting projects and experiences coming soon...
                    </p>

                    <div className="font-mono text-white/50 mt-8">
                        <span>→ cd ..</span>
                    </div>
                </main>
            </div>
        </>
    )
}


export default Page
