import "./Bento.css";
import ActivityCards from "../reusable/bento/ActivityCards";
import SocialLinksCard from "../reusable/bento/SocialLinks";
import ProjectsCard from "../reusable/bento/ProjectsCard";
import TechStackCard from "../reusable/bento/TechStack";
import VisualCard from "../reusable/bento/VisualCard";
import BlogPreviewCard from "../reusable/bento/BlogPreviewCard";

export default function BentoGrid({ blogPreviews = [] }: { blogPreviews?: BlogPostFrontmatter[] }) {
    return (
        <section id="bento" aria-labelledby="bento-heading" className="bento-shell">
            <div className="bento-heading">
                <h2 id="bento-heading" className="section-heading">Bento</h2>
            </div>
            <div className="bento-grid">
                <ProjectsCard />
                <VisualCard />
                <TechStackCard />
                <ActivityCards />
                <BlogPreviewCard posts={blogPreviews} />
                <SocialLinksCard />
            </div>
        </section>
    );
}
