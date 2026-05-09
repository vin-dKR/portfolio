"use client"

import React from "react"
import BentoCard from "./BentoCard"
import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink, Mail } from "lucide-react"
import { socialMedia } from "@/constant/SocialMedia"
import Image from "next/image"

const brand: Record<string, { rail: string; handle: string }> = {
    github: { rail: "from-zinc-400 to-zinc-700", handle: "vin-dKR" },
    twitter: { rail: "from-sky-400 to-blue-600", handle: "@always_VinodKr" },
    linkedin: { rail: "from-blue-500 to-blue-700", handle: "vinodkrs" },
    discord: { rail: "from-indigo-400 to-violet-600", handle: "vinodkr_real" },
    youtube: { rail: "from-red-400 to-rose-600", handle: "@vinodkumarmurmu" },
}

const SocialLinksCard = () => {
    const getIcon = (name: string) => {
        const cls = "w-5 h-5"
        switch (name.toLowerCase()) {
            case "github":
                return <Image src="/images/socials/github.svg" width={20} height={20} alt="" className={`${cls} dark:invert`} />
            case "twitter":
                return <Image src="/images/socials/xcom.svg" width={20} height={20} alt="" className={cls} />
            case "linkedin":
                return <Image src="/images/socials/linkedin.svg" width={20} height={20} alt="" className={cls} />
            case "discord":
                return <Image src="/images/socials/discord.svg" width={20} height={20} alt="" className={cls} />
            case "youtube":
                return <Image src="/images/socials/youtube.svg" width={20} height={20} alt="" className={cls} />
            default:
                return <ExternalLink className={cls} />
        }
    }

    return (
        <BentoCard className="col-span-5 sm:col-span-3 row-span-1 group/social h-full relative overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/15 blur-3xl opacity-60" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 w-40 h-40 rounded-full bg-gradient-to-tr from-pink-500/15 to-amber-500/10 blur-3xl opacity-50" />

            <div className="relative h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Connect
                        </h3>
                    </div>
                    <a
                        href="mailto:vinodkumarmurmu62@gmail.com"
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
                    >
                        <Mail className="w-2.5 h-2.5" />
                        Email
                    </a>
                </div>

                <div className="space-y-1 flex-1">
                    {socialMedia.map((s, i) => {
                        const b = brand[s.name.toLowerCase()] || brand.github
                        return (
                            <motion.a
                                key={s.name}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ x: -8, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.05 * i }}
                                className="group/row relative flex items-center gap-2.5 rounded-lg pl-3 pr-2 py-1.5 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                            >
                                {/* accent rail */}
                                <span
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[3px] bg-gradient-to-b ${b.rail} rounded-r-full transition-all duration-300 group-hover/row:h-3/4`}
                                />

                                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-black/5 dark:bg-white/8 border border-black/5 dark:border-white/10 group-hover/row:scale-110 transition-transform">
                                    {getIcon(s.name)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">
                                        {s.name}
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 truncate leading-tight">
                                        {b.handle}
                                    </p>
                                </div>

                                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover/row:text-zinc-900 dark:group-hover/row:text-white group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-all shrink-0" />
                            </motion.a>
                        )
                    })}
                </div>
            </div>
        </BentoCard>
    )
}

export default SocialLinksCard
