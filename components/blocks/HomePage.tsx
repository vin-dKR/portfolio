"use client"

import React from "react";
import HomeHeader from "./HomeHeader";
import HomeBio from "./Bio";
import BentoGrid from "./BentoGrid";

const mockData: BentoGridProps = {
    githubStats: {
        followers: 2,
        following: 21,
        stars: 34,
        issues: 2,
        prs: 0,
    },
    wakaTimeStats: {
        totalHours: 23,
        languages: [
            { name: 'TypeScript', percentage: 45 },
            { name: 'JavaScript', percentage: 30 },
            { name: 'Python', percentage: 15 },
        ],
    },
    currentTrack: null,
};

const HomePage = () => {
    return (
        <div className="flex flex-col items-center w-full">
            <HomeHeader />
            <HomeBio />
            <BentoGrid {...mockData} />        
        </div>
    )
}

export default HomePage;
