import { projectsData } from "@/constant/ProjectsData";
import { getBentoProject } from "@/constant/BentoProjects";

export function getPostArtwork(post: BlogPost) {
    const project = projectsData.find((item) => getBentoProject(item.name).story?.slug === post.frontmatter.slug);
    const artwork = project ? getBentoProject(project.name) : undefined;
    const markdownImage = post.content.match(/!\[([^\]]*)\]\(([^)\s]+)\)/);

    return {
        screen: artwork?.screen ?? (markdownImage ? { src: markdownImage[2], alt: markdownImage[1] } : undefined),
        steps: artwork?.story?.steps,
    };
}
