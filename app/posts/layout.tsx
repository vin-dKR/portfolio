import Navbar from "@/components/blocks/Navbar"
import React, { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen font-lenia">
            <Navbar />
            {children}
        </div>
    )
}
