"use client"

import React from "react";
import HomeHeader from "./HomeHeader";
import HomeBio from "./Bio";
import BentoGrid from "./BentoGrid";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center w-full">
            <HomeHeader />
            <HomeBio />
            <BentoGrid />        
        </div>
    )
}

export default HomePage;
