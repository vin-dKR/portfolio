import TechIcon from "./TechIcon";
import { GithubIcon, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !project) return;

        dialog.showModal();
        return () => dialog.close();
    }, [project]);

    const close = () => {
        dialogRef.current?.close();
        onClose();
    };

    if (!project) return null;

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onCancel={(event) => {
                event.preventDefault();
                close();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) close();
            }}
            className="m-auto w-[calc(100%-2rem)] max-w-3xl max-h-[85dvh] overflow-hidden rounded-2xl border border-zinc-950/10 bg-white font-lenia shadow-2xl backdrop:bg-zinc-950/55 dark:border-white/10 dark:bg-zinc-900"
        >
            <div className="max-h-[85dvh] overflow-y-auto overscroll-contain">
                {/* Mac-style header */}
                <div className="sticky top-0 z-10 flex items-center border-b border-zinc-950/10 bg-white/95 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/95">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>

                    <div className="flex-grow text-center font-medium text-gray-800 dark:text-white text-sm sm:text-base">
                        {project.name}
                    </div>

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close project details"
                        className="cursor-pointer rounded p-1 text-zinc-600 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Project content */}
                <div className="p-4 sm:p-6">
                    {project.video && (
                        <div className="mb-6 overflow-hidden rounded-xl bg-zinc-950">
                            {videoError ? (
                                <p className="p-5 text-sm text-zinc-300">Project preview unavailable.</p>
                            ) : (
                                <video
                                    src={project.video}
                                    controls
                                    playsInline
                                    preload="none"
                                    aria-label={`${project.name} video preview`}
                                    className="aspect-video w-full object-contain"
                                    onError={() => setVideoError(true)}
                                />
                            )}
                        </div>
                    )}

                    {/* Project details */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h2 id={titleId} className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">{project.name}</h2>
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
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-600/50 dark:border-gray-500/30 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all text-sm font-semibold text-white shadow-md hover:shadow-lg"
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
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-lg border border-blue-500/30 dark:border-blue-400/30 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-400 dark:hover:to-blue-500 transition-all text-sm font-semibold text-white shadow-md hover:shadow-lg"
                                >
                                    <Globe className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default ProjectModal
