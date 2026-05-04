import React from "react"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"

export default function Home() {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen relative">
            <div className="flex items-center w-full max-w-2xl px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12 mx-auto">
                <HomePage />
            </div>

            <div className="flex items-center w-full max-w-2xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24 md:pb-12 mx-auto">
                <HomeFooter />
            </div>
        </div>
    )
}
