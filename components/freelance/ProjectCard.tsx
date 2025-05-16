import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface ProjectData {
    name: string;
    desc: string;
    img: string;
    timeline: string;
    techStacks: string[];
    sourceCode: string;
    liveOn: string;
}

interface ProjectCardProps extends ProjectData {
    isActive: boolean;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ name, desc, img, techStacks, sourceCode, liveOn, isActive }, ref) => {
        const cardInnerRef = useRef<HTMLDivElement>(null);
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
        const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

        const imageX = useTransform(x, [-0.5, 0.5], [5, -5]);
        const imageY = useTransform(y, [-0.5, 0.5], [5, -5]);
        const imageScale = useTransform(x, [-0.5, 0.5], [1.02, 0.98]);


        const contentX = useTransform(x, [-0.5, 0.5], [-3, 3]);
        const contentY = useTransform(y, [-0.5, 0.5], [-3, 3]);
        const contentSkewX = useTransform(x, [-0.5, 0.5], [2, -2]);

        const button1X = useTransform(x, [-0.5, 0.5], [-1, 1]);
        const button1Y = useTransform(y, [-0.5, 0.5], [-1, 1]);
        const button2X = useTransform(x, [-0.5, 0.5], [1, -1]);
        const button2Y = useTransform(y, [-0.5, 0.5], [1, -1]);
        const techStackScale = useTransform(y, [-0.5, 0.5], [1.02, 0.98]);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardInnerRef.current) return;
            const rect = cardInnerRef.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = (e.clientX - rect.left - centerX) / centerX;
            const mouseY = (e.clientY - rect.top - centerY) / centerY;
            x.set(mouseX);
            y.set(mouseY);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        return (
            <motion.div
                ref={ref}
                className="
                    relative rounded-xl overflow-hidden
                    backdrop-blur-sm bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/20
                    p-4 w-[400px] md:w-[500px] flex-shrink-0
                    transition-opacity duration-300
                    select-none z-0
                "
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                whileHover={{
                    y: -10,
                    scale: 1.05,
                    rotateZ: 1,
                    transition: { type: 'spring', duration: 0.5, stiffness: 200, damping: 20 },
                }}
                style={{ rotateX, rotateY, perspective: '1000px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Project Image */}
                <div className="relative w-full rounded-lg overflow-hidden">
                    <Image
                        src={img}
                        alt={name}
                        className="object-cover"
                        height={500}
                        width={500}
                    />
                </div>

                {/* Content */}
                <motion.div
                    className="mt-3"
                    style={{ x: contentX, y: contentY, skewX: contentSkewX }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                >
                    {/* Name */}
                    <motion.h3
                        className="font-lenia font-bold text-base sm:text-lg text-gray-800 dark:text-white"
                        style={{ x: button1X, y: button1Y }}
                        whileHover={{
                            scale: 1,
                            rotate: -1,
                            transition: { type: 'spring', stiffness: 100 }
                        }}
                    >
                        {name}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                        style={{ x: button1X, y: button1Y }}
                        whileHover={{
                            scale: 1,
                            rotate: -1,
                            transition: { type: 'spring', stiffness: 100 }
                        }}

                    >
                        {desc}
                    </motion.p>

                    {/* Tech Stacks */}
                    <div className="mt-2 flex flex-wrap gap-1">
                        {techStacks.map((tech) => (
                            <motion.span
                                key={tech}
                                className="
                                    inline-block px-1.5 py-0.5 text-xs
                                    bg-purple-500/20 text-purple-800 dark:text-purple-300
                                    rounded-full
                                "
                                style={{ scale: techStackScale }}
                                whileHover={{
                                    y: -2,
                                    rotate: Math.random() > 0.5 ? 2 : -2,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-3 flex gap-2">
                        <motion.div
                            style={{ x: button1X, y: button1Y }}
                            whileHover={{
                                scale: 1.05,
                                rotate: -1,
                                transition: { type: 'spring', stiffness: 300 }
                            }}
                        >
                            <Link
                                href={sourceCode}
                                target="_blank"
                                className="
                                inline-flex items-center px-2 py-1
                                bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm
                                border border-white/30 dark:border-gray-800/30
                                rounded-md text-xs text-gray-800 dark:text-white
                                hover:bg-white/30 dark:hover:bg-gray-900/30
                                transition-colors duration-200
                            "
                            >
                                Source
                            </Link>
                        </motion.div>
                        <motion.div
                            style={{ x: button2X, y: button2Y }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 1,
                                transition: { type: 'spring', stiffness: 300 }
                            }}
                        >
                            <Link
                                href={liveOn}
                                target="_blank"
                                className="
                                inline-flex items-center px-2 py-1
                                bg-gradient-to-r from-purple-500 to-purple-700
                                text-white rounded-md text-xs
                                hover:from-purple-600 hover:to-purple-800
                                transition-colors duration-200
                            "
                            >
                                Live
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        );
    }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
