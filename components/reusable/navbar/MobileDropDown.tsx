import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/constant/NavItems';
import { menuIconVariants, dropdownVariants, itemVariants } from '@/constant/AnimationData';

const MobileDropdown = ({ isOpen, setIsOpen }: MobileDropdownProps) => {
    return (
        <div className="relative md:hidden mt-2">
            <motion.button 
                className="z-[60] relative"
                onClick={() => setIsOpen(!isOpen)}
                variants={menuIconVariants}
                animate={isOpen ? "open" : "closed"}
            >
                <motion.div
                    className="relative z-10"
                    animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </motion.div>
                {isOpen && (
                    <motion.div
                        className="absolute inset-0 bg-white/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 2 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute right-0 top-12 w-48 "
                    >
                        <div className="backdrop-blur-xl bg-black rounded-xl p-2 border border-white/10 shadow-lg">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    custom={i}
                                    variants={itemVariants}
                                    className="relative overflow-hidden rounded-md"
                                >
                                    <motion.a
                                        href={item.href}
                                        className="block px-4 py-2 text-white relative z-10"
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.a>
                                    <motion.div
                                        className="absolute inset-0 bg-white/10"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileDropdown;
