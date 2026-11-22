import React from "react";
import HomeHeader from "./HomeHeader";
import HomeBio from "./Bio";
import BentoGrid from "./BentoGrid";

type Props = {
    blogPreviews?: BlogPostFrontmatter[]
}

const HomePage = ({ blogPreviews = [] }: Props) => {
    return (
        <div>
            <HomeHeader />
            <HomeBio />
            <BentoGrid blogPreviews={blogPreviews} />
        </div>
    )
}

export default HomePage;
