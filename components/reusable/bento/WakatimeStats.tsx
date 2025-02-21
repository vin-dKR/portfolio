import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import BentoCard from "./BentoCard";

const WakatimeStats = ({ wakaTimeStats } : BentoGridProps) => {
    return (
        <BentoCard className="">
            <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="text-sm font-medium">Coding Time</h3>
            </div>
            <motion.p 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold mb-2"
            >
                {wakaTimeStats.totalHours}hrs
            </motion.p>
            <div className="space-y-2">
                {wakaTimeStats.languages.map((lang, index) => (
                    <motion.div
                        key={lang.name}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.2 }}
                        className="relative"
                    >
                    <div className="flex justify-between text-xs mb-1">
                        <span>{lang.name}</span>
                        <span>{lang.percentage}%</span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                            style={{ width: `${lang.percentage}%` }}
                        />
                    </div>
                    </motion.div>
                ))}
            </div>
        </BentoCard>
    )
}

export default WakatimeStats;
