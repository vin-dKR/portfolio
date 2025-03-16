import React from "react";
import BentoCard from "./BentoCard";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Youtube } from "lucide-react";
import { socialMedia } from "@/constant/SocialMedia";
import Image from "next/image";

const SocialLinksCard = () => {

    const getSocialIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'github':
                return <Image src="/images/github.svg" width={30} height={40} alt="github icon" className="dark:invert" />
            case 'twitter':
                return <Image src="/images/xcom.svg" width={30} height={40} alt="x.com icon" />
            case 'linkedin':
                return <Image src="/images/linkedin.svg" width={30} height={40} alt="linkedin icon" />
            case 'discord':
                return <Image src="/images/discord.svg" width={30} height={40} alt="discord icon" />
            case 'youtube':
                return <Image src="/images/youtube.svg" width={30} height={40} alt="youtube icon" />
            default:
                return <ExternalLink className="w-5 h-5" />;
        }
    };

    return (
        <BentoCard className="col-span-3 row-span-1 group/social h-full">
            <div className="flex items-center space-x-2 mb-3">
                <ExternalLink className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <h3 className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Connect
                </h3>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 mt-2">
                {socialMedia.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 hover:scale-95 transition-all duration-200 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700"
                        whileHover={{ 
                            rotate: [-5, 0, 5, 0], 
                            transition: { duration: 0.5 },
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                        initial={{ y: 20, opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                    >
                        <div className="flex flex-col items-center justify-center gap-2">
                            {getSocialIcon(social.name)}
                            <p className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300">{social.name}</p>
                        </div>
                    </motion.a>
                ))}
            </div>

            <div className="absolute bottom-2 right-2 opacity-50 group-hover/social:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4" />
            </div>
        </BentoCard>
    );
};

export default SocialLinksCard
