import React from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import BentoCard from "./BentoCard";

const SpotifyStats = ({ currentTrack }: BentoGridProps) => {
    return (
        <BentoCard className="">
            <div className="flex items-center space-x-2 mb-4">
                <Music className="w-5 h-5" />
                <h3 className="text-sm font-medium">Now Playing</h3>
            </div>
            {currentTrack ? (
                <div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg blur group-hover:blur-xl transition-all duration-300" />
                            <img
                                src={currentTrack.albumArt}
                                alt={currentTrack.name}
                                className="w-full h-32 object-cover rounded-lg mb-2 relative"
                        />
                    </motion.div>
                    <p className="text-sm font-medium truncate">{currentTrack.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                        {currentTrack.artist}
                    </p>
                </div>
            ) : (
                <div className="flex items-center justify-center h-32">
                    <p className="text-sm text-gray-400">Not playing</p>
                </div>
            )}
        </BentoCard>
    )
}

export default SpotifyStats;
