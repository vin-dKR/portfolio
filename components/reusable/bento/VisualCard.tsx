import React from "react";
import BentoCard from "./BentoCard";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const VisualCard = ({ visibleOn = "desktop" }) => {

    const visibilityClass =
        visibleOn === "mobile"
            ? "block sm:hidden col-span-3"
            : "hidden sm:block"

    return (
        <BentoCard className={`${visibilityClass} sm:col-span-2 p-0 overflow-hidden group/visual`}>
            <motion.div
                initial={{ filter: "blur(10px)", scale: 1.5 }}
                animate={{ filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 size-full"
            >
                <Image
                    src="/images/batman-v.jpg"
                    alt="Visual element"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-700 group-hover/visual:scale-150"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/visual:opacity-100 transition-opacity duration-300" />

            <motion.a
                href="/playground"
                className="absolute right-3 top-3 rounded-full border border-white bg-black/50 p-1.5 backdrop-blur-sm opacity-60 transition-all duration-300 hover:scale-90 hover:opacity-100 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                whileHover={{ rotate: [0, 15, -15, 0], transition: { duration: 0.5 } }}
            >
                <ArrowUpRight className="size-4 text-white" />
            </motion.a>
        </BentoCard>
    )
}

export default VisualCard
