import Navbar from "@/components/blocks/Navbar";
import React from "react";
import { projectsData } from "@/constant/ProjectsData";
import Project from "@/components/reusable/projects/Project";

const ProjectsPage = () => {
    return (
        <div className="flex flex-col items-center dark:bg-purple-500/5 bg-white min-h-screen">
            <div className="flex items-center w-full px-4 md:px-0 md:w-1/2 pt-16 pb-12">
                <Navbar />

                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                        projects
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
                        Explore some of my recent work. Each project represents a unique challenge and opportunity to create something meaningful.
                    </p>

                    <div className="space-y-16">
                        {projectsData.map((project, index) => (
                            <Project
                                key={index}
                                name={project.name}
                                desc={project.desc}
                                img={project.img}
                                timeline={project.timeline}
                                techStacks={project.techStacks}
                                sourceCode={project.sourceCode}
                                liveOn={project.liveOn}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsPage
