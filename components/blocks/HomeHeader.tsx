"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { SparklesText } from "@/components/ui/sparkles-text"

const HomeHeader = () => {

    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="size-14" />

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mx-auto pt-16 md:pt-20 pb-6"
        >
            <header className="relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl"
                />
                <div className="relative space-y-2 ">
                    <div className="flex items-center justify-between">
                        <div className="font-lenia">
                            <motion.h1
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className={`text-5xl font-bold ${resolvedTheme === 'dark' ? 'bg-gradient-to-r from-white to-gray-500' : 'bg-gradient-to-r from-black to-gray-700'} bg-clip-text text-transparent`}
                            >
                                Vinod KR
                            </motion.h1>
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className={`text-xl m-0 ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'} flex items-center space-x-2`}
                                style={{ marginTop: "0" }}
                            >
                                <SparklesText className="text-xl font-light font-lenia ml-2" text="Full Stack Dev" />
                                <ArrowRight className="w-4 h-4" />
                            </motion.h2>
                        </div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r z-0 from-purple-500 to-blue-500 rounded-full blur group-hover:blur-xl transition-all duration-300" />
                            <Image
                                src="/images/dp.jpeg"
                                alt="profile pic"
                                width={400}
                                height={400}
                                className="w-16 h-16 rounded-full z-0 object-cover relative border-2 border-white/10"
                            />
                        </motion.div>
                    </div>
                </div>
            </header>
        </motion.div>
    )
}

export default HomeHeader;
