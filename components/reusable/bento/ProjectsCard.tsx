"use client"

import React, { useState } from "react"
import BentoCard from "./BentoCard"
import { motion } from "framer-motion"
import { Code, ArrowUpRight } from "lucide-react"
import { projectsData } from "@/constant/ProjectsData"
import ProjectModal from "../projects/ProjectModal"
import Link from "next/link"

const palettes = [
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-fuchsia-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-sky-500 to-indigo-600",
    "from-lime-500 to-green-600",
    "from-purple-500 to-pink-600",
    "from-yellow-500 to-amber-600",
]

const getFavicon = (url?: string) => {
    if (!url) return null
    try {
        const host = new URL(url).host
        return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
    } catch {
        return null
    }
}

// stack name (lowercase) -> simpleicons slug
const stackToSlug: Record<string, string> = {
    "next js": "nextdotjs",
    "nextjs": "nextdotjs",
    "next.js": "nextdotjs",
    "react": "react",
    "react js": "react",
    "react native": "react",
    "vue": "vuedotjs",
    "svelte": "svelte",
    "angular": "angular",
    "node js": "nodedotjs",
    "nodejs": "nodedotjs",
    "node.js": "nodedotjs",
    "typescript": "typescript",
    "javascript": "javascript",
    "python": "python",
    "go": "go",
    "rust": "rust",
    "tailwind css": "tailwindcss",
    "tailwind": "tailwindcss",
    "shadcn": "shadcnui",
    "prisma": "prisma",
    "postgresql": "postgresql",
    "postgres": "postgresql",
    "mongodb": "mongodb",
    "mysql": "mysql",
    "redis": "redis",
    "supabase": "supabase",
    "firebase": "firebase",
    "vercel": "vercel",
    "express": "express",
    "expressjs": "express",
    "fastapi": "fastapi",
    "flask": "flask",
    "django": "django",
    "tanstack": "reactquery",
    "react query": "reactquery",
    "zustand": "zustand",
    "clerk": "clerk",
    "stripe": "stripe",
    "openai": "openai",
    "puppeteer": "puppeteer",
    "solidity": "solidity",
    "ethereum": "ethereum",
    "docker": "docker",
    "kubernetes": "kubernetes",
    "graphql": "graphql",
}

const getStackIcon = (techStacks?: string[]) => {
    if (!techStacks || techStacks.length === 0) return null
    for (const t of techStacks) {
        const slug = stackToSlug[t.toLowerCase().trim()]
        if (slug) return `https://cdn.simpleicons.org/${slug}`
    }
    return null
}

const ProjectRow = ({
    p,
    index,
    onClick,
}: {
    p: ProjectsData
    index: number
    onClick: () => void
}) => {
    const [faviconErr, setFaviconErr] = useState(false)
    const [stackErr, setStackErr] = useState(false)
    const grad = palettes[index % palettes.length]
    const initial = p.name.charAt(0).toUpperCase()
    const favicon = getFavicon(p.liveOn)
    const stackIcon = getStackIcon(p.techStacks)

    return (
        <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.04 * index }}
            onClick={onClick}
            className="group/row relative flex items-center gap-3 cursor-pointer rounded-lg pl-3 pr-2 py-1.5 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
        >
            {/* accent rail - grows on hover */}
            <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[3px] bg-gradient-to-b ${grad} rounded-r-full transition-all duration-300 group-hover/row:h-3/4`}
            />

            {/* favicon -> stack icon -> gradient initial */}
            <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-black/5 dark:bg-white/8 border border-black/5 dark:border-white/10 overflow-hidden">
                {favicon && !faviconErr ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={favicon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        onError={() => setFaviconErr(true)}
                    />
                ) : stackIcon && !stackErr ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={stackIcon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        onError={() => setStackErr(true)}
                    />
                ) : (
                    <div
                        className={`w-full h-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${grad}`}
                    >
                        {initial}
                    </div>
                )}
            </div>

            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100 flex-1 truncate">
                {p.name}
            </span>

            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover/row:text-zinc-900 dark:group-hover/row:text-white group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-all shrink-0" />
        </motion.div>
    )
}

const ProjectsCard = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectsData | null>(null)

    return (
        <>
            <BentoCard className="relative col-span-5 sm:col-span-4 row-span-1 group/projects h-full relative overflow-hidden">
                <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/15 blur-3xl opacity-60" />

                <div className="relative">
                    <div className="flex items-center space-x-2 mb-4">
                        <Code className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                            Recent Projects
                        </h3>
                    </div>

                    <div className="space-y-0.5">
                        {projectsData.slice(0, 9).map((p, i) => (
                            <ProjectRow
                                key={i}
                                p={p}
                                index={i}
                                onClick={() => {
                                    setSelectedProject(p)
                                    setShowModal(true)
                                }}
                            />
                        ))}
                    </div>

                </div>
                <div className="absolute bottom-2 right-2 opacity-50 group-hover/projects:opacity-100 transition-opacity duration-300">
                    <Link href="/projects" rel="noopener noreferrer">
                        <ArrowUpRight className="w-4 h-4 text-black dark:text-white" />
                    </Link>
                </div>
            </BentoCard>
            {showModal && selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}

export default ProjectsCard
