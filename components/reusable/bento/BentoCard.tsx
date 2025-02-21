import React from "react";
import { motion } from "framer-motion";

const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className: string }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative group ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 relative">
            {children}
        </div>
    </motion.div>
);

export default BentoCard;
