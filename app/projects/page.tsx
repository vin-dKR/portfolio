"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { projectsData } from "@/constant/ProjectsData";
import Project from "@/components/reusable/projects/Project";
import GitHubContribution from "@/components/reusable/projects/GithubContribution";
import HomeFooter from "@/components/blocks/HomeFooter";

const contributions: GithubContributionTypes[] = [
    {
        repo: "polarsource/polar",
        title: "Make button text visible on the main project page",
        prNumber: "8739",
        state: "merged",
        date: "2026-01-09",
        url: "https://github.com/polarsource/polar/pull/8739",
    },
    {
        repo: "polarsource/polar",
        title: "Hide navigation on the Customer Portal sign-in page",
        prNumber: "7005",
        state: "merged",
        date: "2025-09-25",
        url: "https://github.com/polarsource/polar/pull/7005",
    },
    {
        repo: "polarsource/polar",
        title: "Fix benefit file uploads failing at 2 GB",
        prNumber: "6981",
        state: "open",
        date: "2025-09-24",
        url: "https://github.com/polarsource/polar/pull/6981",
    },
];

export default function ProjectsPage() {
    return (
        <main id="main-content" className="page-frame projects-page">
            <header>
                <div className="page-heading"><h1 className="page-title">Projects</h1></div>
                <p className="projects-page-lead">Client platforms. <em>Independent builds.</em></p>
                <p className="page-intro">Selected work in commerce, education, electric mobility, and agriculture.</p>
            </header>
            <Tabs defaultValue="projects" className="projects-tabs">
                <TabsList aria-label="Projects and contributions" className="projects-tab-list">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="contributions">Open source</TabsTrigger>
                </TabsList>
                <TabsContent value="projects" className="projects-tab-panel projects-product-grid">
                    {projectsData.map((project, index) => <Project key={project.name} {...project} featured={index === 0} />)}
                </TabsContent>
                <TabsContent value="contributions" className="projects-tab-panel">
                    {contributions.map((contribution) => <GitHubContribution key={contribution.url} {...contribution} />)}
                </TabsContent>
            </Tabs>
            <HomeFooter className="mt-12" />
        </main>
    );
}
