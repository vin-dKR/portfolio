import React from "react";
import BentoCard from "./BentoCard";
import { motion } from "framer-motion";
import { Code, ArrowUpRight } from "lucide-react";
const ProjectsCard = () => {
  return (
    <BentoCard className="col-span-4 row-span-1 group/projects h-full">
      <div className="flex items-center space-x-2 mb-3">
        <Code className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        <h3 className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Recent Projects
        </h3>
      </div>
      
      <div className="space-y-2">
        {[1, 2].map((_, index) => (
          <motion.a
            key={index}
            href="#"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index }}
            className="flex items-center justify-between p-2 rounded rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs">
                P{index + 1}
              </div>
              <span className="text-sm text-zinc-700 dark:text-zinc-100">Project {index + 1}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </motion.a>
        ))}
      </div>
      
      <div className="absolute bottom-2 right-2 opacity-50 group-hover/projects:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </BentoCard>
  );
};

export default ProjectsCard
