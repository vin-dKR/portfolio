import React from "react";
import BentoCard from "./BentoCard";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Youtube } from "lucide-react";

interface SocialLinksCardProps {
  socials: Array<{
    name: string;
    url: string;
    icon?: React.ReactNode;
  }>
}

const SocialLinksCard = ({ socials }: SocialLinksCardProps) => {
  // Map social networks to their icons/representations
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
      case 'twitter':
        return <span className="text-blue-400 text-xl">𝕏</span>;
      case 'linkedin':
        return <span className="text-blue-600 text-xl">in</span>;
      case 'discord':
        return <span className="text-indigo-500 text-lg font-bold">D</span>;
      case 'youtube':
        return <span className="text-red-600 text-lg">▶</span>;
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
        {socials.map((social, index) => (
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
              {social.icon || getSocialIcon(social.name)}
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
