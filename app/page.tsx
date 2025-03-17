import React from "react"
import Navbar from "@/components/Navbar"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"

export default function Home() {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen">
            <div className="flex items-center w-full px-4 md:px-0 md:w-1/3 pt-16 pb-12">
                <Navbar />
                <HomePage />
            </div>
            <HomeFooter />
        </div>
    )
}
