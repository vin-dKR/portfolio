"use client";
import { projectsData } from "@/constant/ProjectsData";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Button from "./Button";
import { motion } from "framer-motion";

const ProjectShowOff = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 500; // Approximate card width (sm:w-[300px])
    const totalCards = projectsData.length;

    // Infinite scroll: Normalize index for looping
    const scrollLeft = () => {
        setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    };

    const scrollRight = () => {
        setCurrentIndex((prev) => (prev + 1) % totalCards);
    };

    // Reset animation for seamless loop
    useEffect(() => {
        if (currentIndex < 0) {
            setCurrentIndex(totalCards - 1);
        } else if (currentIndex >= totalCards) {
            setCurrentIndex(0);
        }
    }, [currentIndex, totalCards]);

    const widthh = -currentIndex * (cardWidth + 16)
    console.log(widthh, currentIndex, cardWidth)




    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <div className="w-full mt-16 sm:mt-20 lg:mt-[120px]">
                <div className="w-full py-6 sm:py-8 md:py-10 rounded-3xl  text-black dark:text-white">
                    {/* Header */}
                    <div className="text-center">
                        <div className="text-3xl sm:text-4xl font-lenia">
                            Project
                        </div>
                        <div className="text-2xl sm:text-3xl font-instrui">
                            Show Off
                        </div>
                    </div>

                    {/* Swipeable Projects */}
                    <div className="relative mt-8 w-full overflow-hidden">
                        {/* Focus Overlay */}
                        {/*
                        <div
                            className="absolute bg-gradient-to-r from-[#120D16] from-60% to-transparent w-[50%] h-[500px] pointer-events-none z-50"
                        />

                        <div
                            className="absolute right-0 bg-gradient-to-r from-transparent to-60% to-[#120D16] w-[50%] h-[500px] pointer-events-none z-50"
                        />
                        */}


                        {/* Swipeable Container */}
                        {/* Swipeable Container */}
                        <motion.div
                            className="
                                flex flex-row gap-4 px-4 py-8
                                select-none justify-center w-full
                            "
                            initial={{ x: 200 }}
                            animate={{ x: -currentIndex * 500 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            {projectsData.concat(projectsData).map((p, index) => (
                                <ProjectCard
                                    key={`${p.name}-${index}`}
                                    {...p}
                                    isActive={index % totalCards === currentIndex}
                                />
                            ))}
                        </motion.div>

                        {/* Prev/Next Buttons */}
                        <div className="relative flex justify-center gap-2 sm:gap-4 mt-4 z-20">
                            <Button
                                maxWidth="80px sm:100px"
                                label="Prev"
                                onClick={scrollLeft}
                            />
                            <Button
                                maxWidth="80px sm:100px"
                                label="Next"
                                onClick={scrollRight}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectShowOff;
