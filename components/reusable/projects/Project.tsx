"use client"

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import TechIcon from "./TechIcon";
import { ArrowUpRight, GithubIcon, Globe } from "lucide-react";

const Project = (props: ProjectsData) => {
    const { name, desc, timeline, techStacks, video, sourceCode, liveOn } = props;
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={`flex flex-col gap-0 font-lenia items-stretch dark:bg-white/2 bg-black/10 border border-black/4 dark:border-white/4 rounded-xl shadow-lg hover:shadow-xl overflow-hidden`}>
                <div className="w-full space-y-3 p-4 sm:p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h2>

                    <p className="text-gray-600 dark:text-gray-300">{desc}</p>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            {timeline}
                        </span>
                    </div>

                    <div className="pt-2">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {techStacks.map((tech, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-black/40 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 cursor-default transition-all hover:bg-gray-700/50 dark:hover:bg-gray-600/40"
                                    >
                                        <TechIcon name={tech} />
                                        <span className="text-xs font-medium text-gray-200 dark:text-gray-300">
                                            {tech}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                            {sourceCode && (
                                <a
                                    href={sourceCode}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-600/50 dark:border-gray-500/30 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-lg"
                                >
                                    <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>Source Code</span>
                                </a>
                            )}

                            {liveOn && (
                                <a
                                    href={liveOn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-lg border border-blue-500/30 dark:border-blue-400/30 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-400 dark:hover:to-blue-500 transition-all text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-lg"
                                >
                                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                        <button
                            type="button"
                            className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded text-sm font-medium text-blue-700 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-blue-300"
                            onClick={() => setShowModal(true)}
                            aria-label={`View ${name} details`}
                        >
                            {video ? "Details & preview" : "View details"}
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
            {showModal && <ProjectModal project={props} onClose={handleCloseModal} />}
        </>
    );
};

export default Project;
