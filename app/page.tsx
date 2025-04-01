import React from "react"
import Navbar from "@/components/blocks/Navbar"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"

export default function Home() {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen relative">
            <div className="pointer-events-none absolute inset-0 h-24 w-full before:absolute before:bottom-[-50%] before:left-1/2 before:z-0 before:h-4/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:opacity-50 dark:before:opacity-20 before:[filter:blur(calc(4*1rem))]" />
            <div className="flex items-center w-full px-4 md:px-0 md:w-1/3 pt-16 pb-12">
                <Navbar />
                <HomePage />
            </div>
            <HomeFooter />
        </div>
    )
}
