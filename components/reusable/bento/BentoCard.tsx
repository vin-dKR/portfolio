import React from "react";
import { motion } from "framer-motion";

const BentoCard = ({ children, className, hoverable = true }: BentoCardProps) => {

    return (
        <motion.div
            className={`relative font-lenia overflow-hidden rounded-xl border border-black/10 bg-white p-4 dark:border-white/8 dark:bg-white/2 backdrop-blur-lg z-0 inset-shadow-sm  ${hoverable ? "transition-all duration-300 hover:scale-[0.98] hover:shadow-xl" : ""
                } ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
}

export default BentoCard
