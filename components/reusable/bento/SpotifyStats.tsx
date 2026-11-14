"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Music, RefreshCw, Play } from "lucide-react"
import BentoCard from "./BentoCard"
import { SpotifyProvider, useSpotify } from "@/context/SpotifyContext"
import Image from "next/image"

const Equalizer = () => (
    <div className="flex items-end gap-[2px] h-3">
        {[0.3, 0.6, 0.4, 0.8, 0.5].map((delay, i) => (
            <motion.span
                key={i}
                animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: delay * 0.4, ease: "easeInOut" }}
                style={{ transformOrigin: "bottom" }}
                className="w-[2px] h-full rounded-full bg-green-500"
            />
        ))}
    </div>
)

const SpotifyContent = () => {
    const { currentTrack, isLoading, error, refreshTrack } = useSpotify()

    return (
        <>
            <div className="pointer-events-none absolute -top-16 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-green-500/25 to-emerald-500/15 blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-500/15 to-teal-500/10 blur-3xl opacity-50" />

            <div className="relative">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <Music className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                        <h3 className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            {currentTrack?.isPlaying ? "Now Playing" : "Last Played"}
                        </h3>
                    </div>
                    <button
                        onClick={() => refreshTrack()}
                        aria-label="Refresh"
                        className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                </div>

                {isLoading && !currentTrack ? (
                    <div className="flex justify-center items-center h-40">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full"
                        />
                    </div>
                ) : currentTrack ? (
                    <div className="flex items-center gap-3">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative size-16 shrink-0 overflow-hidden rounded-xl sm:size-20"
                        >
                            {currentTrack.albumArt ? (
                                <Image
                                    src={currentTrack.albumArt}
                                    alt={currentTrack.name}
                                    height={80}
                                    width={80}
                                    unoptimized
                                    className={`w-full h-full object-cover transition-all duration-500 group-hover/spotify:scale-105 ${!currentTrack.isPlaying ? "grayscale-[40%]" : ""}`}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-500/30 to-emerald-500/20 flex items-center justify-center">
                                    <Music className="w-10 h-10 text-white/60" />
                                </div>
                            )}
                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/spotify:opacity-100 transition-opacity" />
                            {/* play badge */}
                            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm opacity-0 group-hover/spotify:opacity-100 transition-opacity">
                                <Play className="w-3 h-3 text-white fill-white" />
                                <span className="text-[9px] font-medium text-white">Open</span>
                            </div>
                        </motion.div>

                        <div className="min-w-0">
                            <div className="flex items-start gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">
                                        {currentTrack.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {currentTrack.artist}
                                    </p>
                                </div>
                                {currentTrack.isPlaying && (
                                    <div className="shrink-0 mt-0.5">
                                        <Equalizer />
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 flex items-center">
                                {currentTrack.isPlaying ? (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                                        </span>
                                        <span className="text-[10px] text-green-700 dark:text-green-300 font-medium">Live</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                                        <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full" />
                                        Recently played
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 space-y-3">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-40"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 blur-md opacity-40" />
                            <div className="absolute inset-3 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                <Music className="w-6 h-6 text-zinc-500" />
                            </div>
                        </motion.div>
                        <p className="text-sm text-gray-500">{error ? "Spotify offline" : "Nothing playing"}</p>
                    </div>
                )}

                {currentTrack?.spotifyUrl && (
                    <a
                        className="absolute right-0 bottom-0 rounded p-1 text-zinc-500 hover:text-green-700 focus-visible:outline-2 focus-visible:outline-green-500 dark:text-zinc-400 dark:hover:text-green-300"
                        href={currentTrack.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open track on Spotify"
                    >
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                )}
            </div>
        </>
    )
}

export default function SpotifyStats() {
    const card = useRef<HTMLDivElement>(null)
    const isNearViewport = useInView(card, { margin: "160px", once: true })

    return (
        <BentoCard className="col-span-9 sm:col-span-7 group/spotify">
            <div ref={card} className="min-h-32">
                {isNearViewport ? (
                    <SpotifyProvider>
                        <SpotifyContent />
                    </SpotifyProvider>
                ) : (
                    <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        <Music aria-hidden="true" className="size-4 text-green-600 dark:text-green-400" />
                        Last Played
                    </h3>
                )}
            </div>
        </BentoCard>
    )
}
