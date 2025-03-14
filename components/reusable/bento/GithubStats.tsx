import React from "react"
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import BentoCard from "./BentoCard";

const GithubStats = ({ githubStats }: GithubStatsProps) => {
  const statsItems = [
    { key: "followers", label: "Followers" },
    { key: "following", label: "Following" },
    { key: "stars", label: "Stars" },
    { key: "issues", label: "Issues" },
    { key: "prs", label: "PRs" }
  ];

  return (
    <BentoCard className="col-span-1 md:col-span-3 row-span-1 group/github">
      <div className="flex items-center space-x-2 mb-3">
        <Github className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        <h3 className="text-sm font-medium bg-gradient-to-r from-zinc-500 to-amber-700 dark:from-indigo-300 dark:to-zinc-500 bg-clip-text text-transparent">
          GitHub Stats
        </h3>
      </div>
      
      <div className="mt-4 space-y-3">
        {statsItems.map((item, index) => (
          <motion.div
            key={item.key}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className={`githubStats py-2 px-3 ${
                index % 2 === 0 
                  ? 'rounded-r-full -translate-x-2 transition-all duration-300 ease-in group-hover/github:translate-x-0'
                  : 'rounded-l-full translate-x-2 transition-all duration-300 ease-in group-hover/github:translate-x-0'
              } bg-gradient-to-r from-zinc-50 to-green-800 dark:from-green-800 dark:to-zinc-250`}
            >
              <span className="pr-2 text-zinc-700 dark:text-zinc-400 text-xs">
                {item.label}:
              </span>
              <span className="font-mono text-xs text-zinc-900 dark:text-zinc-100">
                {githubStats[item.key]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-2 right-2 opacity-50 group-hover/github:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </BentoCard>
  );
}

export default GithubStats
