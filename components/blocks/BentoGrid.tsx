import React from "react";
import { motion } from "framer-motion";
import GithubStats from "../reusable/bento/GithubStats";
import WakatimeStats from "../reusable/bento/WakatimeStats";
import SpotifyStats from "../reusable/bento/SpotifyStats";

const mockData: BentoGridProps = {
    githubStats: {
        followers: 2,
        following: 21,
        stars: 34,
        issues: 2,
        prs: 0,
    },
    wakaTimeStats: {
        totalHours: 23,
        languages: [
            { name: 'TypeScript', percentage: 45 },
            { name: 'JavaScript', percentage: 30 },
            { name: 'Python', percentage: 15 },
        ],
    },
    currentTrack: null,
};


const BentoGrid = () => {
    return (
        <div className="w-full px-2">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
                <div className="mt-20">
                    <div className="grid grid-cols-2 w-full md:grid-cols-3 gap-4">
                            <GithubStats {...mockData} />
                            <WakatimeStats {...mockData} />
                            <SpotifyStats {...mockData} />
                    </div>
                </div>
            </motion.section>
        </div>
    )
}

export default BentoGrid;
