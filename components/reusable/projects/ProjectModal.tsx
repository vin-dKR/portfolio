import Image from "next/image";
import { getTextColor, getTechColor } from "@/constant/ProjectsData";
import { GithubIcon, Globe } from "lucide-react";
import SpotlightButton from "@/components/ui/SpotLightBtn";

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-8 backdrop-blur-sm bg-opacity-50 pt-16"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-slate-950 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] border-4 border-black/20 dark:border-white/30"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute inset-0 opacity-80 dark:opacity-30 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/noise.svg')] bg-[length:200px] mix-blend-overlay" />
                </div>

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-[200px] w-[400px] opacity-50 dark:opacity-70 mix-blend-screen 
                    [background:radial-gradient(ellipse_at_bottom_right,_rgba(255,0,0,0.4),_rgba(255,154,0,0.4),_rgba(208,222,33,0.4),_rgba(79,220,74,0.4),_rgba(63,218,216,0.4),_rgba(47,201,226,0.4),_rgba(28,127,238,0.4),_rgba(95,21,242,0.4),_rgba(186,12,248,0.4),_rgba(251,7,217,0.4),_transparent_80%)] 
                    [filter:blur(40px)] z-0" />

                {/* Mac-style header */}
                <div className="px-4 py-3 bg-gray-100 dark:bg-zinc-950 border-b-2 border-black/20 dark:border-white/40 rounded-t-2xl flex items-center sticky top-0 z-10">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    <div className="flex-grow text-center font-medium text-gray-700 dark:text-gray-200">
                        {project.name}
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Project content */}
                <div className="p-6">
                    <div className="pointer-events-none fixed bottom-0 right-0 h-[150px] w-[300px] opacity-50 mix-blend-screen [background:radial-gradient(ellipse_at_bottom_right,_rgba(255,0,0,0.4),_rgba(255,154,0,0.4),_rgba(208,222,33,0.4),_rgba(79,220,74,0.4),_rgba(63,218,216,0.4),_rgba(47,201,226,0.4),_rgba(28,127,238,0.4),_rgba(95,21,242,0.4),_rgba(186,12,248,0.4),_rgba(251,7,217,0.4),_transparent_80%)] [filter:blur(30px)] z-0" />
                    {/* Image */}
                    <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={project.img}
                            alt={project.name}
                            width={800}
                            height={450}
                            className="w-full object-cover"
                        />
                    </div>

                    {/* Project details */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{project.name}</h2>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                                    </svg>
                                    {project.timeline}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">{project.desc}</p>
                        </div>

                        {/* Tech stack */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStacks.map((tech, index) => {
                                    const backgroundColor = getTechColor(tech);
                                    const textColor = getTextColor(backgroundColor);

                                    return (
                                        <span
                                            key={index}
                                            className={`px-4 py-2 text-sm rounded-full font-medium ${textColor} cursor-default transition-all hover:shadow-md`}
                                            style={{ backgroundColor }}
                                        >
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Key features */}
                        {project.features && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Features</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                                    {project.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Challenges */}
                        {project.challenges && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Challenges & Solutions</h3>
                                <p className="text-gray-600 dark:text-gray-300">{project.challenges}</p>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex gap-4 pt-4">
                            {project.sourceCode && (
                                <SpotlightButton href={project.sourceCode} className="border border-2 border-md border-black/30 dark:border-white/30">
                                    <GithubIcon className="w-4 h-4 inline-flex mr-2" /> {' '} Source Code
                                </SpotlightButton>
                            )}

                            {project.liveOn && (
                                <SpotlightButton href={project.liveOn} className="border border-2 border-md border-black/30 dark:border-white/30">
                                    <Globe className="w-4 h-4 inline-flex mr-2" /> {' '} Live Here
                                </SpotlightButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
