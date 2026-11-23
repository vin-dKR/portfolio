import type { Metadata } from "next";
import HomeFooter from "@/components/blocks/HomeFooter";
import FounderCard from "@/components/freelance/FounderCard";
import Pricing from "@/components/freelance/pricing/Pricing";
import ProjectShowOff from "@/components/freelance/ProjectShowOff";
import WhatIDo from "@/components/freelance/WhatIDo";
import HowWeRoll from "@/components/freelance/whyUs/HowWeRoll";
import "@/components/freelance/Freelance.css";

export const metadata: Metadata = {
    title: "Freelance | Vinod KR",
    description: "Web design and full-stack development by Vinod KR, founder of Vinnetic Media. Explore client work, services, and pricing.",
    openGraph: {
        title: "Freelance | Vinod KR",
        description: "Web design and full-stack development by Vinod KR.",
        images: [{ url: "/images/freelance.png", width: 1200, height: 630, alt: "Freelance services by Vinod KR" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Freelance | Vinod KR",
        description: "Web design and full-stack development by Vinod KR.",
        images: ["/images/freelance.png"],
    },
};

export default function Freelance() {
    return (
        <main id="main-content" className="page-frame freelance-page">
            <WhatIDo />
            <ProjectShowOff />
            <Pricing />
            <HowWeRoll />
            <FounderCard />
            <HomeFooter />
        </main>
    );
}
