"use client"
import Navbar from "@/components/blocks/Navbar";
import React, { useState } from "react";
import { projectsData } from "@/constant/ProjectsData";
import Project from "@/components/reusable/projects/Project";
import { Tabs } from "@/components/ui/tabs"
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GitPullRequest } from "lucide-react";
import GitHubContribution from "@/components/reusable/projects/GithubContribution";

const ProjectsPage = () => {
    const [activeTab, setActiveTab] = useState("projects");
    const githubContributions: GithubContributionTypes[] = [
        {
            repo: "polarsource/polar",
            title: "Fix for issue #6864: hide navigation on Customer Portal sign-in page",
            prNumber: "9732dfb",
            state: "merged",
            date: "2025-09-25",
            url: "https://github.com/polarsource/polar/pull/7005"
        },
        {
            repo: "polarsource/polar",
            title: "Fix for issue #6780 : benefits: file upload of 2 GB fails #6981",
            prNumber: "4ad0941",
            state: "open",
            date: "2025-09-24",
            url: "https://github.com/polarsource/polar/pull/6981"
        },
    ];

    return (
        <div className="flex min-h-screen flex-col items-center dark:bg-purple-500/5 bg-white font-lenia">
            {/* Main container with responsive padding */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Navbar */}
                <div className="w-full mb-8 sm:mb-12">
                    <Navbar />
                </div>

                {/* Tabs Section */}
                <div className="w-full">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        {/* Responsive Tabs List */}
                        <TabsList className="flex w-full max-w-md rounded-lg mb-6 sm:mb-8 p-1 gap-4 sm:gap-6">
                            <TabsTrigger
                                value="projects"
                                className="flex-1 sm:flex-none text-gray-400 dark:text-gray-200/70 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50"
                            >
                                Projects
                            </TabsTrigger>
                            <div className="hidden sm:flex items-center">
                                <span className="text-black dark:text-white">|</span>
                            </div>
                            <TabsTrigger
                                value="contributions"
                                className="flex-1 sm:flex-none text-gray-400 dark:text-gray-200/70 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50"
                            >
                                Contributions
                            </TabsTrigger>
                        </TabsList>

                        {/* Tabs Content */}
                        <TabsContent value="projects" className="space-y-6 sm:space-y-8">
                            {projectsData.map((project, index) => (
                                <Project
                                    key={index}
                                    {...project}
                                />
                            ))}
                        </TabsContent>

                        <TabsContent value="contributions">
                            {/* Contributions Header */}
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-gray-100">
                                    GitHub Contributions
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                    A list of my pull requests to open-source projects.
                                </p>
                            </div>

                            {/* Contributions List */}
                            {githubContributions.length > 0 ? (
                                <div className="space-y-4 sm:space-y-6">
                                    {githubContributions.map((contribution, index) => (
                                        <GitHubContribution
                                            key={index}
                                            {...contribution}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Card className="w-full">
                                    <CardContent className="p-4 sm:p-6 text-center">
                                        <GitPullRequest className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-3 sm:mb-4" />
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                            No contributions to display yet.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProjectsPage
