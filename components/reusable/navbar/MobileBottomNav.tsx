"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constant/NavItems';
import { FolderKanban, Briefcase, BookOpen, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
    'Projects': FolderKanban,
    'Work': Briefcase,
    'Blog': BookOpen,
    'Freelance': Handshake,
};

const MobileBottomNav = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[99] md:hidden flex items-end justify-center pb-4 px-4 pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="flex items-center justify-around bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 px-2 py-2 min-h-[64px] max-w-[90%] pointer-events-auto safe-area-inset-bottom"
                style={{
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset'
                }}
            >
                {NAV_ITEMS.map(({ name, href }) => {
                    const Icon = iconMap[name as keyof typeof iconMap];
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={name}
                            href={href}
                            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all relative flex-1 min-w-0"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-2xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <Icon
                                    className={`w-6 h-6 transition-colors relative z-10 ${
                                        isActive
                                            ? 'text-black dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                />
                            </motion.div>
                            <span
                                className={`text-[10px] font-medium transition-colors relative z-10 ${
                                    isActive
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                {name}
                            </span>
                        </Link>
                    );
                })}
            </motion.div>
        </nav>
    );
};

export default MobileBottomNav;

