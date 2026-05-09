import React from "react"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"
import { getBlogPosts } from "@/lib/blogs"

export default async function Home() {
    const posts = await getBlogPosts()
    const previews = posts.slice(0, 4).map((p) => p.frontmatter)

    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen relative">
            <div className="flex items-center w-full max-w-2xl px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12 mx-auto">
                <HomePage blogPreviews={previews} />
            </div>

            <div className="flex items-center w-full max-w-2xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24 md:pb-12 mx-auto">
                <HomeFooter />
            </div>
        </div>
    )
}
