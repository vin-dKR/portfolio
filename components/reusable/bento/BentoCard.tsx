import React from "react";
import { motion } from "framer-motion";

const BentoCard = ({ children, className, hoverable = true }: BentoCardProps) => {
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-zinc-300 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/30 backdrop-blur-sm z-0 inset-shadow-sm inset-shadow-indigo-500 ${
        hoverable ? "transition-all duration-300 hover:scale-[0.98] hover:shadow-xl" : ""
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
