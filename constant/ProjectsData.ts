export const projectsData: ProjectsData[] = [
    { 
        name: "Plash",
        desc: "Clone of Splash",
        img: "/images/hellium.png",
        timeline: "Nov 23 - Feb 24",
        techStacks: ["react", "express", "node", "shadcn"],
        sourceCode: "https://github.com/vin-dKR/plash-frontend",
        liveOn: "https:vercel.com/plash",
    },
    {
        name: "Hellium AI",
        desc: "marketing ai",
        img: "/images/hellium.png",
        timeline: "Dec 24 - Jan 25",
        techStacks: ["next js", "shadcn", "typescript", "prisma", "clerk"],
        sourceCode: "https://github.com/vin-dKR/hellium",
        liveOn: "https://hellium.vercel.app/"
    }
]


export const getTechColor = (tech: string) => {
    const seed = tech.charCodeAt(0) + tech.length;
    const randomSeed = Math.sin(seed) * 10000;
    const hue = Math.floor((randomSeed - Math.floor(randomSeed)) * 360);
    return `hsl(${hue}, 40%, 75%)`;
};

export const getTextColor = (backgroundColor: string) => {
    // Extract HSL values - this is a simple approximation
    const match = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return "text-gray-800";

    const lightness = parseInt(match[3]);
    // Use dark text on light backgrounds and vice versa
    return lightness > 60 ? "text-gray-800" : "text-gray-100";
};
