'use client'

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Music } from "lucide-react";
import BentoCard from "./BentoCard";
import { useSpotify } from "@/context/SpotifyContext";

const SpotifyStats = () => {
    const { currentTrack, isLoading, error, refreshTrack } = useSpotify();

    return (
        <BentoCard className="col-span-2 group/spotify h-full">
            <div className="flex items-center space-x-2 mb-3">
                <Music className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <h3 className="text-sm font-medium bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    {currentTrack?.isPlaying ? "Now Playing" : "Last Played"}
                </h3>
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
                <div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg blur group-hover:blur-xl transition-all duration-300" />
                        <img
                            src={currentTrack.albumArt}
                            alt={currentTrack.name}
                            className={`w-full h-32 object-cover rounded-lg mb-2 relative transition-all duration-300 ${!currentTrack.isPlaying ? "grayscale" : ""}`}
                        />
                    </motion.div>
                    <p className="text-sm font-medium truncate mt-2 text-gray-900 dark:text-gray-100">{currentTrack.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                        {currentTrack.artist}
                    </p>

                    <div className="mt-2 flex items-center">
                        {currentTrack.isPlaying ? (
                            <div className="flex items-center">
                                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="text-xs text-green-600">Now playing</span>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="h-2 w-2 bg-gray-400 rounded-full mr-2"></span>
                                <span className="text-xs text-gray-600">Last played</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-40 space-y-3">
                    <motion.div
                        animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5] 
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 4 
                        }}
                        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-20"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 blur-md opacity-40" />
                        <div className="absolute inset-3 rounded-full bg-zinc-100 dark:bg-zinc-900" />
                    </motion.div>
                    <p className="text-sm text-gray-400">
                        {error ? "Connection error" : "Not playing"}
                    </p>
                </div>
            )}

            <div 
                className="absolute bottom-2 right-2 opacity-50 group-hover/spotify:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => currentTrack?.spotifyUrl ? window.open(currentTrack.spotifyUrl, '_blank') : refreshTrack()}
            >
                <ArrowUpRight className="w-4 h-4" />
            </div>
        </BentoCard>
    )
}

export default SpotifyStats
