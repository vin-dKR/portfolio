import React from "react"
import { Separator } from "@radix-ui/react-separator"
import { Github } from "lucide-react"

function getLatestCommit() {
    const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
    const label = sha ? sha.slice(0, 7) : '🌍'
    return label
}

const HomeFooter = () => {
    const commit = getLatestCommit()
    const year = String(new Date().getFullYear())

    return (
        <div className="w-[88%] sm:w-1/3 mb-[12px]">
            <Separator className="h-[0.5px] bg-emerald-900/60 w-full" />
            <div className="flex items-center py-3 text-sm font-semibold text-[#4B4B4B]">
                <time className="hidden sm:inline" dateTime={String(year)}>
                    {year}{' '}
                </time>{' '}

                ©<p>Vinod KR</p>
                <a
                    className="link ml-auto inline-flex items-center gap-1.5"
                    href="https://github.com/vin-dKR/portfolio"
                    rel="noreferrer"
                    target="_blank"
                >
                    <Github className="size-5 dark:invert" />
                    <span>
                        <span className="bg-gradient-to-l from-gray-600 to-gray-300 bg-clip-text text-transparent">
                            vin-dKR
                        </span>
                        <span className="text-gray-350 dark:text-gray-450 hidden underline decoration-2 underline-offset-2 sm:inline">
                            #{commit}
                        </span>
                    </span>
                </a>
            </div>
        </div>
    )
}

export default HomeFooter
