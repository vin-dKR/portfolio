import HomeFooter from "@/components/blocks/HomeFooter"
import React, { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen pb-24 md:pb-0">
            {children}
            <HomeFooter className="w-full xs:w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 px-3 sm:px-4 md:px-0" />
        </div>
    )
}
