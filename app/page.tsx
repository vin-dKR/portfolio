import React from "react"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"

export default function Home() {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen relative">
            <div className="flex items-center w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 px-3 sm:px-4 md:px-0 pt-12 sm:pt-16 pb-8 sm:pb-12 mx-auto">
                <HomePage />
            </div>

            <div className="flex items-center w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 px-3 sm:px-4 md:px-0 pt-8 sm:pt-12 pb-8 sm:pb-12 mx-auto">
                <HomeFooter />
            </div>
        </div>
    )
}
