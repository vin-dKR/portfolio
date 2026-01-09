import { getTechIconSvg } from "@/constant/ProjectsData";
import { GithubIcon, Globe } from "lucide-react";

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm bg-black/20 dark:bg-black/40 pt-16"
            onClick={onClose}
        >
            <div
                className="relative bg-color-1 dark:bg-color-1 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] border border-black/4 dark:border-white/4 font-lenia overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mac-style header */}
                <div className="px-4 py-3 dark:bg-white/2 bg-black/10 border-b border-black/4 dark:border-white/4 flex items-center sticky top-0 z-10 backdrop-blur-sm">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>

                    <div className="flex-grow text-center font-medium text-gray-800 dark:text-white text-sm sm:text-base">
                        {project.name}
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Project content */}
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-60px)]">
                    {/* Video */}
                    <div className="relative mb-6 rounded-lg overflow-hidden border border-white/5 dark:border-white/5">
                        <div className="relative p-1 overflow-hidden border border-white/5 rounded-lg bg-white/10 shadow-xl">
                            <div className="flex flex-row w-full justify-between items-center">
                                <div className="absolute flex space-x-2 z-10">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                                <div className="mx-auto bg-black/70 dark:bg-black/30 text-white dark:text-gray-200 w-1/3 text-center text-[10px] px-4 rounded-sm mb-1 z-10 relative">{project.name}</div>
                            </div>
                            <video
                                src={project.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-20 dark:opacity-60 pt-8"></div>
                        </div>
                    </div>

                    {/* Project details */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">{project.name}</h2>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                                    </svg>
                                    {project.timeline}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">{project.desc}</p>
                        </div>

                        {/* Tech stack */}
                        <div>
                            <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStacks.map((tech, index) => {
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

                        {/* Key features */}
                        {project.features && (
                            <div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                                    {project.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Challenges */}
                        {project.challenges && (
                            <div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Challenges & Solutions</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{project.challenges}</p>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                            {project.sourceCode && (
                                <a
                                    href={project.sourceCode}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-black/40 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 text-gray-200 dark:text-gray-300 hover:bg-gray-700/50 dark:hover:bg-gray-600/40 transition-colors text-sm font-medium"
                                >
                                    <GithubIcon className="w-4 h-4" />
                                    Source Code
                                </a>
                            )}

                            {project.liveOn && (
                                <a
                                    href={project.liveOn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-black/40 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 text-gray-200 dark:text-gray-300 hover:bg-gray-700/50 dark:hover:bg-gray-600/40 transition-colors text-sm font-medium"
                                >
                                    <Globe className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
