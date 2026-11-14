import { Sparkle } from "lucide-react";
import VisualCard from "../reusable/bento/VisualCard";
import GithubStats from "../reusable/bento/GithubStats";
import WakatimeStats from "../reusable/bento/WakatimeStats";
import SocialLinksCard from "../reusable/bento/SocialLinks";
import ProjectsCard from "../reusable/bento/ProjectsCard";
import SpotifyStats from "../reusable/bento/SpotifyStats";
import TechStackCard from "../reusable/bento/TechStack";
import BlogPreviewCard from "../reusable/bento/BlogPreviewCard";

type Props = {
    blogPreviews?: BlogPostFrontmatter[];
};

export default function BentoGrid({ blogPreviews = [] }: Props) {
    return (
        <section aria-labelledby="bento-heading" className="mt-10 w-full">
            <div className="group mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="bento-mark relative grid size-9 shrink-0 place-items-center rounded-xl border border-violet-500/20 bg-violet-500/8 text-violet-700 dark:text-violet-300">
                    <Sparkle className="size-4 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:rotate-90" />
                    <span className="absolute top-1.5 right-1.5 size-1 rounded-full bg-cyan-500 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-x-5 motion-safe:group-hover:translate-y-5" />
                </span>
                <h2 id="bento-heading" className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Bento
                </h2>
                <span aria-hidden="true" className="h-px grow bg-gradient-to-r from-violet-500/25 to-transparent" />
            </div>

            <div className="grid grid-cols-9 gap-3 sm:grid-cols-7 sm:gap-4">
                <div className="col-span-9 grid min-w-0 grid-cols-3 gap-3 sm:col-span-2 sm:flex sm:flex-col sm:gap-4">
                    <VisualCard />
                    <BlogPreviewCard posts={blogPreviews} className="col-span-2 sm:shrink-0" />
                </div>
                <TechStackCard />
                <GithubStats username="vin-dKR" />
                <ProjectsCard />
                <WakatimeStats />
                <SocialLinksCard />
                <SpotifyStats />
            </div>
        </section>
    );
}
