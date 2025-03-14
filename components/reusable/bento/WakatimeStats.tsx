import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import BentoCard from "./BentoCard";

const WakatimeStats = ({ wakaTimeStats }: WakaTimeStatsProps) => {
  return (
    <BentoCard className="col-span-2 group/wakatime h-full">
      <div className="flex items-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        <h3 className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Coding Time
        </h3>
      </div>
      
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center"
        >
          <span className="text-5xl font-bold bg-gradient-to-b from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {wakaTimeStats.totalHours}
          </span>
          <span className="ml-1 text-xl font-medium text-blue-400 dark:text-blue-300">hrs</span>
        </motion.div>
      </div>
      
      <div className="mt-4 space-y-3">
        {wakaTimeStats.languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{lang.name}</span>
              <span className="text-zinc-500 dark:text-zinc-400">{lang.percentage}%</span>
            </div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${lang.percentage}%` }}
                transition={{ delay: index * 0.2 + 0.2, duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-2 right-2 opacity-50 group-hover/wakatime:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </BentoCard>
  );
};

export default WakatimeStats;
