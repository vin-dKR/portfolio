export const projectsData: ProjectsData[] = [
    {
        name: "Hellium AI",
        desc: "marketing ai",
        img: "/images/projects/hellium.png",
        timeline: "Dec 24 - Jan 25",
        techStacks: ["next js", "shadcn", "typescript", "prisma", "clerk"],
        sourceCode: "https://github.com/vin-dKR/hellium",
        liveOn: "https://hellium.vercel.app/"
    },
    {
        name: "Vin UI",
        desc: "NextJS UI library",
        img: "/images/projects/plash.jpg",
        timeline: "Mar 25 - Apr 25",
        techStacks: ["next js", "rust", "tailwind css", "framer", "mdx"],
        sourceCode: "https://github.com/vin-dKR/vin-ui",
        liveOn: "https://vin-ui.vercel.app/",
    },
    {
        name: "theorangeleaf",
        desc: "a restaurant app",
        img: "/images/projects/mediyum.jpg",
        timeline: "Apr 25 - Apr 25",
        techStacks: ["next js", "tailwind", "framer"],
        sourceCode: "https://github.com/vin-dKR/hack-restaurant",
        liveOn: "https://theorangeleaf.vercel.app/",
    },
    {
        name: "Boogle Docs",
        desc: "Clone of google docs",
        img: "/images/projects/boogle-docs.jpg",
        timeline: "Aug 24 - Aug 24",
        techStacks: ["nextjs", "clerk", "live-blocks", "tailwindcss"],
        sourceCode: "https://github.com/vin-dKR/google-docs",
        liveOn: "https://google-docs-xi-eight.vercel.app",
    },
    {
        name: "Tesla Frontend",
        desc: "Tesla Cars Web design",
        img: "/images/projects/tesla.jpg",
        timeline: "Nov 22 - Dec 22",
        techStacks: ["react", "material-ui", "styled-component"],
        sourceCode: "https://github.com/vin-dKR/tesla-frontend",
        liveOn: "https://tesla-frontend-omega.vercel.app/",
    },

]


export const getTechColor = (tech: string) => {
    const seed = tech.charCodeAt(0) + tech.length;
    const randomSeed = Math.sin(seed) * 10000;
    const hue = Math.floor((randomSeed - Math.floor(randomSeed)) * 360);
    return `hsl(${hue}, 60%, 45%)`;
};

export const getTextColor = (backgroundColor: string) => {
    // Extract HSL values - this is a simple approximation
    const match = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return "text-gray-800";

    const lightness = parseInt(match[3]);
    // Use dark text on light backgrounds and vice versa
    return lightness > 60 ? "text-gray-800" : "text-gray-100";
};
