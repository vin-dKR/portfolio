"use client";

import HomeFooter from "@/components/blocks/HomeFooter";
import FounderCard from "@/components/freelance/FounderCard";
import Pricing from "@/components/freelance/pricing/Pricing";
import ProjectShowOff from "@/components/freelance/ProjectShowOff";
import WhatIDo from "@/components/freelance/WhatIDo";
import HowWeRoll from "@/components/freelance/whyUs/HowWeRoll";
import WhyVinneticMedia from "@/components/freelance/whyUs/WhyVinneticMedia";

const Freelance = () => {

    return (
        <div className="relative w-full flex flex-col gap-6 items-center dark:bg-purple-500/5 bg-white min-h-screen">
            <WhatIDo />
            <ProjectShowOff />
            <Pricing />
            <WhyVinneticMedia />
            <HowWeRoll />
            <FounderCard />
            <HomeFooter borderColor="bg-purple-500/20" />
        </div>
    );
};

export default Freelance;
