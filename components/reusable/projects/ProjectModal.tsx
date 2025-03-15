
import Image from "next/image";
import Link from "next/link";
import { getTextColor, getTechColor } from "@/constant/ProjectsData";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  console.log(project.img)
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mac-style header */}
        <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-t-lg flex items-center border-b border-gray-200 dark:border-gray-600">
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

            {/* Key features - assuming these could be added to your project data model */}
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

            {/* Challenges - assuming these could be added to your project data model */}
            {project.challenges && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Challenges & Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.challenges}</p>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 pt-4">
              {project.sourceCode && (
                <Link 
                  href={project.sourceCode}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Source Code
                </Link>
              )}
              
              {project.liveOn && (
                <Link 
                  href={project.liveOn}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                  </svg>
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal
