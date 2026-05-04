import HomeFooter from "@/components/blocks/HomeFooter"
import React, { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen pb-24 md:pb-0">
            {children}
            <HomeFooter className="w-full max-w-2xl px-4 sm:px-6" />
        </div>
    )
}
