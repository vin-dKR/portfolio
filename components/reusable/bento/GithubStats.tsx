import React from "react"
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import BentoCard from "./BentoCard";

const GithubStats = ({ githubStats }: BentoGridProps) => {
    console.log(githubStats, "------")
    return (
        <BentoCard className="">
            <div className="flex items-center space-x-2 mb-4">
                <Github className="w-5 h-5" />
                <h3 className="text-sm font-medium">GitHub Stats</h3>
            </div>
            <div className="space-y-2">
                {Object.entries(githubStats).map(([key, value]) => (
                    <motion.div
                        key={key}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: Math.random() * 0.5 }}
                        className="flex justify-between items-center"
                    >
                            <span className="text-sm capitalize">{key}:</span>
                            <span className="text-sm font-mono">{value}</span>
                    </motion.div>
                ))}
            </div>
        </BentoCard>
    )
}

export default GithubStats;
