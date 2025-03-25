import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/constant/NavItems';
import { menuIconVariants } from '@/constant/AnimationData';
import { usePathname } from 'next/navigation';
import NeonUnderline from '@/components/ui/NeonUnderline';

const MobileDropdown = ({ isOpen, setIsOpen }: MobileDropdownProps) => {
    const path = usePathname()

    return (
        <div className="relative md:hidden mt-2">
            <motion.button 
                className="relative z-[100]"
                onClick={() => setIsOpen(!isOpen)}
                variants={menuIconVariants}
                animate={isOpen ? "open" : "closed"}
            >
                <motion.div
                    className="relative"
                    animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </motion.div>
                {isOpen && (
                    <motion.div
                        className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 2 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </motion.button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <div className="fixed w-full top-16 right-0 z-50">
                        <motion.nav
                            initial={{
                                y: '-100%',
                                backdropFilter: 'blur(0px)',
                            }}
                            animate={{
                                y: 0,
                                backdropFilter: 'blur(100px)',
                            }}
                            exit={{
                                y: '-100%',
                                backdropFilter: 'blur(0px)',
                                transition: { delay: 0.3, duration: 0.7 },
                            }}
                            transition={{ duration: 0.4 }}
                            style={{ originY: 0 }}
                            className="w-full rounded-b-2xl md:hidden "
                        >       
                            <div className="flex flex-col items-center space-x-100">
                                {NAV_ITEMS.map(({ name, href }, index) => (
                                    <motion.div
                                        className='mb-2 text-lg text-black dark:text-white'
                                        key={name + href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.1,
                                                delay: 0.2 + 0.1 * (index + 1),
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                            transition: {
                                                duration: 0.15,
                                                delay: 0.05 + 0.1 * index,
                                            },
                                        }}
                                    >
                                        <Link
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={`opacity-100 transition-all ${
                                                path === href ? 'opacity-100' : 'hover:opacity-100'
                                            }`}
                                        >
                                            <NeonUnderline width='100%' >
                                                {name}
                                            </NeonUnderline>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.nav>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileDropdown;
