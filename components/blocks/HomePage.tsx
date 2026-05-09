"use client"

import React from "react";
import HomeHeader from "./HomeHeader";
import HomeBio from "./Bio";
import BentoGrid from "./BentoGrid";

type Props = {
    blogPreviews?: BlogPostFrontmatter[]
}

const HomePage = ({ blogPreviews = [] }: Props) => {
    return (
        <div className="flex flex-col items-center w-full">
            <HomeHeader />
            <HomeBio />
            <BentoGrid blogPreviews={blogPreviews} />
        </div>
    )
}

export default HomePage;
