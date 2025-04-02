"use client"

import React, { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import { getTechColor, getTextColor } from "@/constant/ProjectsData";

const Project = (props: ProjectsData) => {
    const { name, desc, img, timeline, techStacks } = props;
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={`flex flex-col lg:flex-row gap-0 items-center dark:bg-gray-950 bg-white rounded-xl shadow-lg hover:shadow-xl`}>
                {/* Project Image with Mac-style frame */}
                <div className="w-[90%] lg:w-4/5 m-4 relative">
                    <div
                        className="relative overflow-hidden border rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl group cursor-pointer transform hover:-translate-y-1"
                        onClick={handleCardClick}
                    >
                        {/* Mac-style header */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-slate-950 flex items-center px-3 z-10">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative pt-8">
                            <Image
                                src={img}
                                alt={name}
                                width={700}
                                height={450}
                                className="w-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 pt-8"></div>
                    </div>
                </div>

                {/* Project Details */}
                <div
                    className="w-full lg:w-3/5 space-y-4 p-6  transition-all cursor-pointer"
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
                                const textColor = getTextColor(backgroundColor);

                                return (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 text-xs rounded-full font-medium ${textColor} cursor-default transition-all hover:shadow-md relative`}
                                        style={{
                                            backgroundColor,
                                            backdropFilter: 'blur(10px)',
                                            WebkitBackdropFilter: 'blur(10px)',
                                            boxShadow: `0 0 5px 2px ${backgroundColor}, 0 0 21px 5px ${backgroundColor}`, // Neon light shadow
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
                            View Details →
                        </span>
                    </div>
                </div>
                {showModal && <ProjectModal project={props} onClose={handleCloseModal} />}
            </div>
        </>
    );
};

export default Project;
