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

const ProjectCard: React.FC<ProjectCardProps> = ({
    name,
    desc,
    img,
    timeline,
    techStacks,
    sourceCode,
    liveOn,
    isActive,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
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
            ref={cardRef}
            className="
                relative rounded-xl overflow-hidden
                backdrop-blur-sm bg-red-400
                p-4 w-[250px] sm:w-[500px] flex-shrink-0
                transition-opacity duration-300
                select-none z-0
            "
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            whileHover={{
                y: -10,
                scale: 1.05,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
            }}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Project Image */}
            <div className="relative w-full sm:h-40 rounded-lg overflow-hidden">
                <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 250px, 300px"
                />
            </div>

            {/* Content */}
            <div className="mt-3">
                {/* Name */}
                <h3 className="font-lenia font-bold text-base sm:text-lg text-gray-800 dark:text-white">
                    {name}
                </h3>

                {/* Description */}
                <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {desc}
                </p>

                {/* Timeline */}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {timeline}
                </p>

                {/* Tech Stacks */}
                <div className="mt-2 flex flex-wrap gap-1">
                    {techStacks.map((tech) => (
                        <span
                            key={tech}
                            className="
                                inline-block px-1.5 py-0.5 text-xs
                                bg-purple-500/20 text-purple-800 dark:text-purple-300
                                rounded-full
                            "
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="mt-3 flex gap-2">
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
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
