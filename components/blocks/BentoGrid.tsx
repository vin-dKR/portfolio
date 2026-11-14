import "./Bento.css";
import VisualCard from "../reusable/bento/VisualCard";
import GithubStats from "../reusable/bento/GithubStats";
import WakatimeStats from "../reusable/bento/WakatimeStats";
import SocialLinksCard from "../reusable/bento/SocialLinks";
import ProjectsCard from "../reusable/bento/ProjectsCard";
import TechStackCard from "../reusable/bento/TechStack";
import BlogPreviewCard from "../reusable/bento/BlogPreviewCard";

export default function BentoGrid({ blogPreviews = [] }: { blogPreviews?: BlogPostFrontmatter[] }) {
    return (
        <section id="bento" aria-labelledby="bento-heading" className="mt-10 w-full">
            <div className="bento-heading group mb-5 flex items-center gap-3">
                <span className="bento-orbit" aria-hidden="true"><i /></span>
                <h2 id="bento-heading" className="bg-gradient-to-r from-violet-700 to-blue-600 bg-clip-text text-xl font-semibold tracking-tight text-transparent dark:from-violet-300 dark:to-sky-300">
                    Bento
                </h2>
                <span aria-hidden="true" className="h-px grow bg-gradient-to-r from-violet-500/25 to-transparent" />
            </div>

            <div className="grid grid-cols-9 gap-3 sm:grid-cols-7 sm:gap-4">
                <ProjectsCard />
                <div className="col-span-9 grid min-w-0 grid-cols-3 gap-3 sm:col-span-2 sm:flex sm:flex-col sm:gap-4">
                    <VisualCard />
                    <BlogPreviewCard posts={blogPreviews} className="col-span-2 sm:shrink-0" />
                </div>
                <TechStackCard />
                <GithubStats username="vin-dKR" />
                <WakatimeStats />
                <SocialLinksCard />
            </div>
        </section>
    );
}
