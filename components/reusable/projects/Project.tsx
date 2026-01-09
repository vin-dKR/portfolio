"use client"

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import { getTechIconSvg } from "@/constant/ProjectsData";
import { GithubIcon, Globe } from "lucide-react";

const Project = (props: ProjectsData) => {
    const { name, desc, timeline, techStacks, video, sourceCode, liveOn } = props;
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={`flex flex-col gap-0 font-lenia items-stretch dark:bg-white/2 bg-black/10 border border-black/4 dark:border-white/4 rounded-xl shadow-lg hover:shadow-xl overflow-hidden`}>
                {/* Project Image with Mac-style frame */}
                <div className="w-full p-4 sm:p-6 relative">
                    <div
                        className="relative p-1 overflow-hidden border border-white/5 rounded-lg bg-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl group cursor-pointer transform hover:-translate-y-1"
                        onClick={handleCardClick}
                    >
                        <div className="flex flex-row w-full justify-between items-center ">
                            {/* Mac-style header */}

                            <div className="absolute flex space-x-2 z-10">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>

                            <div className="mx-auto bg-black/70 dark:bg-black/30 text-white dark:text-gray-200 w-1/3 text-center text-[10px] px-4 rounded-sm mb-1 z-10 relative">{name}</div>
                        </div>
                        <div className="relative rounded-lg">
                            <video
                                src={video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-20 dark:opacity-60 pt-8"></div>
                    </div>
                </div>

                {/* Project Details */}
                <div
                    className="w-full space-y-2 sm:space-y-3 p-4 sm:p-6 transition-all cursor-pointer flex flex-col"
                    onClick={handleCardClick}
                >
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
                                const iconSvg = getTechIconSvg(tech);

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-black/40 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 cursor-default transition-all hover:bg-gray-700/50 dark:hover:bg-gray-600/40"
                                    >
                                        {iconSvg ? (
                                            <div 
                                                className="w-4 h-4 flex-shrink-0 flex items-center justify-center fill-white dark:fill-white"
                                                dangerouslySetInnerHTML={{ __html: iconSvg }}
                                            />
                                        ) : (
                                            <div className="w-5 h-5 rounded bg-black/40 dark:bg-white/10 flex items-center justify-center text-[8px] font-bold text-white">
                                                {tech.charAt(0).toUpperCase()}
                                            </div>
                                        )}
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
                                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/40 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 hover:bg-black/50 dark:hover:bg-black/20 transition-colors text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300"
                                >
                                    <GithubIcon className="w-3 h-3 sm:w-4 sm:h-4 fill-white dark:fill-white" />
                                    <span>Source Code</span>
                                </a>
                            )}

                            {liveOn && (
                                <a
                                    href={liveOn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/40 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 hover:bg-black/50 dark:hover:bg-black/20 transition-colors text-xs sm:text-sm font-medium text-gray-200 dark:text-gray-300"
                                >
                                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 fill-white dark:fill-white" />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                        <span 
                            className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
                            onClick={handleCardClick}
                        >
                            View Details
                            <span className="font-ltserif">→</span>
                        </span>
                    </div>
                </div>
                {showModal && <ProjectModal project={props} onClose={handleCloseModal} />}
            </div>
        </>
    );
};

export default Project;
