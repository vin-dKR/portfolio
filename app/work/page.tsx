import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Timeline from "@/components/ui/Timeline";
import HomeFooter from "@/components/blocks/HomeFooter";
import { timelineData } from "@/constant/Work";
import "./Work.css";

export const metadata: Metadata = {
    title: "Experiences | Vinod KR",
    description: "My work experience in engineering, startups, and freelance web development.",
};

export default function WorkPage() {
    return (
        <main id="main-content" className="page-frame work-page">
            <header>
                <div className="page-heading">
                    <h1 className="page-title">Experience</h1>
                    <a
                        href="https://drive.google.com/file/d/1bbKx8tkUMtvuAI33hiT6nKX84IwDWawt/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="site-button"
                    >
                        Read my résumé <ArrowUpRight aria-hidden="true" size={15} />
                    </a>
                </div>
                <p className="work-page-lead">Co-founder, intern, <em>independent developer.</em></p>
                <p className="page-intro">From co-founding Clothing GO to supporting systems at HCLTech and shipping freelance web applications.</p>
            </header>
            <div className="work-story">
                <Timeline data={timelineData} gradientColors={["#429b87", "#8370ae"]} />
            </div>
            <HomeFooter />
        </main>
    );
}
