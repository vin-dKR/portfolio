import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, RefreshCw } from "lucide-react";
import BentoCard from "./BentoCard";
import { useWakatime } from "@/context/WakatimeContext";
import Image from "next/image";
import Link from "next/link";

const WakatimeStats = () => {
    const {wakatimeStats, isLoading, errors, refreshStats} = useWakatime()
    console.log(wakatimeStats)

    useEffect(() => {
        refreshStats()

        const intervalId = setInterval(() => {
            refreshStats()
        }, 3600000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <BentoCard className="col-span-2 group/wakatime h-full">
            <div className="absolute -right-4 top-[30px] w-[40px] opacity-4 group-hover/wakatime:opacity-1 transition-opacity duration-500 dark:invert">
                <Image
                    src='/images/wakatime-logo.png'
                    width={100}
                    height={100}
                    alt="logo"
                />
            </div>

            <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <h3 className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Coding Time
                </h3>
                <button 
                    onClick={() => refreshStats()} 
                    className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    disabled={isLoading}
                    title="Refresh stats"
                >
                    <RefreshCw className={`w-3 h-3 text-black dark:text-white ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>


            {errors ? (
                <div className="flex justify-center items-center h-40 text-red-500 text-sm">
                    <p>Couldn't load WakaTime data</p>
                </div>
            ) : (
                <>
                    <Link 
                        href="https://wakatime.com/@fb861e4c-0eee-42a3-8d54-a65ccab34573"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 block"
                    >
                        <div className="flex justify-center items-center relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="flex items-center"
                            >
                                <span className="text-4xl font-bold bg-gradient-to-b from-blue-400 to-purple-600 bg-clip-text text-transparent">
                                    {wakatimeStats.totalHours}
                                </span>
                                <span className="ml-1 text-xl font-medium text-blue-400 dark:text-blue-300">hrs</span>
                            </motion.div>

                            <span className="absolute -bottom-2 text-xs text-zinc-400 dark:text-zinc-500">
                                last 30 days
                            </span>
                        </div>
                    </Link>

                    <div className="mt-4 space-y-3">
                        {wakatimeStats.languages.map((lang, index) => (
                            <motion.div
                                key={lang.name}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "100%", opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-black dark:text-white font-medium">{lang.name}</span>
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

                        {wakatimeStats.languages.length === 0 && !isLoading && (
                            <div className="text-center text-sm text-zinc-500 py-4">
                                No coding activity data available
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="absolute bottom-2 right-2 opacity-50 group-hover/wakatime:opacity-100 transition-opacity duration-300">
                <Link 
                    href="https://wakatime.com/@fb861e4c-0eee-42a3-8d54-a65ccab34573"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ArrowUpRight className="w-4 h-4 text-black dark:text-white" />
                </Link>
            </div>
        </BentoCard>
    );
};

export default WakatimeStats;
