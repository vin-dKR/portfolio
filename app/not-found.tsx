import React from "react"
import Link from "next/link"
import Navbar from "@/components/blocks/Navbar"
import HomeFooter from "@/components/blocks/HomeFooter"

export default function Page() {
    return (
        <div className="dark:bg-purple-500/5 bg-white h-screen content flex flex-1 flex-col items-center justify-center">
            <Navbar />

            <div className="m-auto">
                <h1 className="mb-3 font-extrabold text-3xl text-gray-800 sm:mb-4 sm:text-4xl dark:text-gray-100">
                    Oops
                </h1>
                <p className="mb-6 text-center text-gray-700 text-lg sm:text-xl dark:text-gray-300">
                    The page you are looking for doesn’t exist.
                </p>
                <Link
                    className="focusable flex w-full flex-none cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 font-medium text-white shadow-gray-800/10 shadow-lg transition selection:bg-white/30 hover:bg-gray-800/80 hover:shadow-gray-800/5 sm:w-auto dark:bg-gray-200 dark:text-gray-900 dark:shadow-gray-200/10 dark:hover:bg-gray-200/80 dark:hover:shadow-gray-200/5 dark:selection:bg-gray-900/30"
                    href="/"
                >
                    Return to home page
                </Link>
            </div>

            <HomeFooter />
        </div>
    )
}
