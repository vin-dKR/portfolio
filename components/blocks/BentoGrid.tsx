import { motion } from "framer-motion";
import VisualCard from "../reusable/bento/VisualCard";
import GithubStats from "../reusable/bento/GithubStats";
import WakatimeStats from "../reusable/bento/WakatimeStats";
import SocialLinksCard from "../reusable/bento/SocialLinks";
import ProjectsCard from "../reusable/bento/ProjectsCard";
import SpotifyStats from "../reusable/bento/SpotifyStats";
import TechStackCard from "../reusable/bento/TechStack";
import Planet3D from "../reusable/bento/Planet3D";
import BlogPreviewCard from "../reusable/bento/BlogPreviewCard";

type Props = {
    blogPreviews?: BlogPostFrontmatter[]
}

const BentoGrid = ({ blogPreviews = [] }: Props) => {
    return (
        <div className="w-full px-2">
            <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="mt-8">
                    <div className="flex items-center gap-2 mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                            className="relative"
                        >
                            <Planet3D />
                        </motion.div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                            Bento
                        </h2>
                    </div>

                    <div className="grid grid-cols-9 sm:grid-cols-7 gap-4">
                        {/* Left column: visual top half + blogs bottom half */}
                        <div className="hidden sm:flex flex-col gap-4 sm:col-span-2">
                            <VisualCard visibleOn="dektop" />
                            <BlogPreviewCard posts={blogPreviews} className="flex-1" />
                        </div>
                        <TechStackCard />
                        <GithubStats username="vin-dKR" />
                        <ProjectsCard />
                        <WakatimeStats />
                        <SocialLinksCard />
                        <SpotifyStats />
                        <VisualCard visibleOn="mobile"/>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default BentoGrid;
