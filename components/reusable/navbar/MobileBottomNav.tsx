"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constant/NavItems';

// Custom SVG Icons
const ProjectsIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7C3 5.89543 3.89543 5 5 5H9L11 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 5V9H15V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const WorkIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BlogIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 19.5C4 18.6716 4.67157 18 5.5 18H18.5C19.3284 18 20 18.6716 20 19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" fill="currentColor"/>
        <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 12H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const FreelanceIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12C8 10.8954 8.89543 10 10 10H14C15.1046 10 16 10.8954 16 12V16C16 17.1046 15.1046 18 14 18H10C8.89543 18 8 17.1046 8 16V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12C3 9.79086 4.79086 8 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12C21 9.79086 19.2091 8 17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
    </svg>
);

const iconMap = {
    'Projects': ProjectsIcon,
    'Work': WorkIcon,
    'Blog': BlogIcon,
    'Freelance': FreelanceIcon,
};

const MobileBottomNav = () => {
    const pathname = usePathname();

    return (
        <nav aria-label="Mobile navigation" className="pointer-events-none fixed inset-x-0 bottom-0 z-[99] flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
            <div className="theme-surface pointer-events-auto grid w-full max-w-sm grid-cols-4 gap-1 rounded-3xl border border-zinc-950/10 bg-white/90 p-1.5 shadow-xl backdrop-blur-md dark:border-white/12 dark:bg-zinc-950/90">
                {NAV_ITEMS.map(({ name, href }) => {
                    const Icon = iconMap[name as keyof typeof iconMap];
                    const isActive = pathname === href || pathname.startsWith(href + "/");

                    return (
                        <Link
                            key={name}
                            href={href}
                            prefetch={false}
                            aria-current={isActive ? "page" : undefined}
                            className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-[1.125rem] px-1 py-2 transition-colors hover:bg-violet-500/5 focus-visible:outline-2 focus-visible:outline-violet-500 aria-[current=page]:bg-violet-500/10"
                        >
                            <Icon
                                aria-hidden="true"
                                className={`size-5 transition-colors ${
                                    isActive
                                        ? 'text-violet-700 dark:text-violet-300'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                            />
                            <span
                                className={`text-[10px] font-medium transition-colors relative z-10 ${
                                    isActive
                                        ? 'text-violet-700 dark:text-violet-300'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                {name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileBottomNav;

