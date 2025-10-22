"use client"

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import { getTechColor } from "@/constant/ProjectsData";

const Project = (props: ProjectsData) => {
    const { name, desc, timeline, techStacks, video } = props;
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={`flex flex-col lg:flex-row gap-0 font-lenia items-center dark:bg-white/2 bg-black/10 border border-black/4 dark:border-white/4 rounded-xl shadow-lg hover:shadow-xl`}>
                {/* Project Image with Mac-style frame */}
                <div className="w-[90%] lg:w-4/5 m-8 lg:m-4 relative">
                    <div
                        className="relative p-1 overflow-hidden border border-white/5 rounded-lg bg-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl group cursor-pointer transform hover:-translate-y-1"
                        onClick={handleCardClick}
                    >
                        <div className="flex flex-row w-full justify-between items-center ">
                            {/* Mac-style header */}

                            <div className="absolute flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>

                            <div className="mx-auto bg-black/30 w-1/3 text-center text-[10px] px-4 rounded-sm mb-1">{name}</div>
                        </div>
                        <div className="relative rounded-lg ">
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
                    className="w-full lg:w-3/5 space-y-2 p-6  transition-all cursor-pointer"
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
                                const backgroundColor = getTechColor(tech);

                                return (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 text-xs rounded-full font-medium text-white cursor-default transition-all hover:shadow-md relative`}
                                        style={{
                                            backgroundColor,
                                        }}
                                    >
                                        {tech}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className="pt-2 text-right">
                        <span className="text-sm text-blue-600 dark:text-blue-400">
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
