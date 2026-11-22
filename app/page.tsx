import React from "react"
import HomePage from "@/components/blocks/HomePage"
import HomeFooter from "@/components/blocks/HomeFooter"
import { getBlogPosts } from "@/lib/blogs"

export default async function Home() {
    const posts = await getBlogPosts()
    const previews = posts.slice(0, 4).map((p) => p.frontmatter)

    return (
        <main id="main-content" className="page-frame home-frame">
            <HomePage blogPreviews={previews} />
            <HomeFooter />
        </main>
    )
}
