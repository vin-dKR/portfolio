import React from "react";
import BentoCard from "./BentoCard";
import { ArrowUpRight } from "lucide-react";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

const TechStackCard = ({ techStacks }: TechStackCardProps) => {
  return (
    <BentoCard className="col-span-5 group/stack h-full">
      <div className="flex items-center space-x-2 mb-3">
        <Layers className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        <h3 className="text-sm font-medium bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Tech Stack
        </h3>
      </div>

      <div className="flex h-full flex-col space-y-4 px-2">
        {Object.entries(techStacks).map(([category, { color, techs }], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 * categoryIndex }}
            className="relative"
          >
            <div 
              className={`absolute -left-2 top-[8px] transform -translate-y-1/2 w-1 h-6 rounded-full`} 
              style={{ background: color }}
            />
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 pl-1 font-medium">{category}</p>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * categoryIndex + (techIndex * 0.1) }}
                  className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-2 right-2 opacity-50 group-hover/stack:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </BentoCard>
  );
};

export default TechStackCard
