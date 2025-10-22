import React from "react"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"

export default function Home() {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen relative">
            <div className="flex items-center md:px-0 pt-16 pb-12 w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 p-4 md:p-8 lg:p-0 mx-auto my-4">
                <HomePage />
            </div>

            <div className="flex items-center md:px-0 pt-16 pb-12 w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 p-4 md:p-8 lg:p-0 mx-auto my-4">
                <HomeFooter />
            </div>
        </div>
    )
}
