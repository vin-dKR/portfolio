"use client"

import React, {useState, useEffect} from "react";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const HomeBio = () => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const { resolvedTheme } = useTheme()

    if (!mounted) return <div className="size-14" />

    return (
        <div className="px-2 text-lg text-gray-700">
            I’m a React.js & Next.js developer who loves turning ideas into interactive, user-friendly web experiences. My journey started with Clothing GO, a startup I co-founded to connect rural vendors to the digital world. While the venture didn’t take off, it fueled my passion for building scalable solutions that make a real impact.
            <br/>
            <br/>
            Now, as an intern at HCL Tech, I specialize in React.js, Next.js, and TypeScript, crafting high-performance applications with clean, efficient code. Whether it's frontend magic, seamless user experiences, or backend optimization, I’m all about solving real-world problems through technology.
            <br/>
            <br/>
            <div className="flex items-center space-x-4 relative">
                <Terminal className={`w-4 h-4 ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Let’s build something amazing together! ✨
                </motion.span>
            </div>
        </div>
    )
}

export default HomeBio;
