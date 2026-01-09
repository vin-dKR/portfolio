"use client"

import { useTheme } from "next-themes";
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from "react";

const SwitchTheme = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="size-14"></div>

    const switchTheme = () => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
        const html = document.documentElement
        // Set background immediately to prevent flash
        if (newTheme === 'dark') {
            html.style.backgroundColor = '#0a0a0a'
        } else {
            html.style.backgroundColor = '#ffffff'
        }
        setTheme(newTheme)
        console.log(resolvedTheme)
    }

    const toggleTheme = () => {
        if (!document.startViewTransition) {
            switchTheme()
        } else {
            document.startViewTransition(switchTheme)
        }
    }

    return (
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors z-[100]"
        >
          {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    )
}

export default SwitchTheme;
