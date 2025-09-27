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
    const githubContributions = [
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
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen font-lenia">
            <div className="flex items-center w-full px-4 md:px-0 md:w-1/2 pt-16 pb-12">
                <Navbar />

                <Tabs value={activeTab} onValueChange={setActiveTab} className="relative mt-10 w-full">
                    <TabsList className="flex w-fit rounded-lg align-left items-center mb-8 p-1 gap-6 text-2xl">
                        <TabsTrigger
                            value="projects"
                            className="text-gray-400 dark:text-gray-200/70 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-lg px-2 md:px-3 py-4 text-xs md:text-2xl font-medium transition-all cursor-pointer"
                        >Projects</TabsTrigger>
                        <span className="text-black dark:text-white"> | </span>
                        <TabsTrigger
                            value="contributions"
                            className="text-gray-400 dark:text-gray-200/70 data-[state=active]:text-black dark:data-[state=active]:text-white rounded-lg px-2 md:px-3 py-4 text-xs md:text-2xl font-medium transition-all cursor-pointer"
                        >Contributions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects" className="space-y-8">
                        {projectsData.map((project, index) => (
                            <Project
                                key={index}
                                {...project}
                            />
                        ))}
                    </TabsContent>

                    <TabsContent value="contributions">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                                GitHub Contributions
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                A list of my pull requests to open-source projects.
                            </p>
                        </div>

                        {githubContributions.length > 0 ? (
                            githubContributions.map((contribution, index) => (
                                <GitHubContribution
                                    key={index}
                                    {...contribution}
                                />
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <GitPullRequest className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-300">
                                        No contributions to display yet.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default ProjectsPage
