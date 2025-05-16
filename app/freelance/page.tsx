"use client";

import Pricing from "@/components/freelance/pricing/Pricing";
import ProjectShowOff from "@/components/freelance/ProjectShowOff";
import WhatIDo from "@/components/freelance/WhatIDo";

const Freelance = () => {

    return (
        <div className="relative w-full flex flex-col gap-6 items-center dark:bg-purple-500/5 bg-white min-h-screen">
            <WhatIDo />
            <ProjectShowOff />
            <Pricing />
        </div>
    );
};

export default Freelance;
