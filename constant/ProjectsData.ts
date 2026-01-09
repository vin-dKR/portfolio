export const projectsData: ProjectsData[] = [
    {
        name: "Libly Space",
        desc: "Manage Your Library Effortlessly.",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/libly-space-1767913058341.mp4",
        timeline: "Present",
        techStacks: ["next js", "typescript", "node js", "postgresql", "tanstack", "zod", "tailwind css"],
        sourceCode: "",
        liveOn: "https://libly.space"
    },
    {
        name: "Eduents",
        desc: "Seamless Exam Creator & Student Analytics",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/eduents",
        timeline: "May 25 - Present",
        techStacks: ["next js", "shadcn", "typescript", "prisma", "clerk", "puppeteer", "zustand", "mongodb",],
        sourceCode: "",
        liveOn: "https://eduents.com"
    },
    {
        name: "Hellium AI",
        desc: "marketing ai",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/hellium-ai-1750488385543-3kFV380zdSxEOXoHp6VD18HOxa047k.mp4",
        timeline: "Dec 24 - Jan 25",
        techStacks: ["next js", "shadcn", "typescript", "prisma", "clerk"],
        sourceCode: "https://github.com/vin-dKR/hellium",
        liveOn: "https://hellium.vercel.app/"
    },
    {
        name: "Vin UI",
        desc: "NextJS UI library",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/cursorful-video-1750489106351-MEr4MeWGkLrk4UCOUd5HgZgxuqLZVJ.mp4",
        timeline: "Mar 25 - Apr 25",
        techStacks: ["next js", "rust", "tailwind css", "framer", "mdx"],
        sourceCode: "https://github.com/vin-dKR/vin-ui",
        liveOn: "https://vin-ui.vercel.app/",
    },
    {
        name: "theorangeleaf",
        desc: "a restaurant app",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/the-orange-leaf-1750495984840-AT8SAWU0cakcJNYB5iwd6saxEvY31O.mp4",
        timeline: "Apr 25 - Apr 25",
        techStacks: ["next js", "tailwind", "framer"],
        sourceCode: "https://github.com/vin-dKR/hack-restaurant",
        liveOn: "https://theorangeleaf.vercel.app/",
    },
    /*
    {
        name: "Boogle Docs",
        desc: "Clone of google docs",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/hellium-ai-1750488385543-3kFV380zdSxEOXoHp6VD18HOxa047k.mp4",
        timeline: "Aug 24 - Aug 24",
        techStacks: ["nextjs", "clerk", "live-blocks", "tailwindcss"],
        sourceCode: "https://github.com/vin-dKR/google-docs",
        liveOn: "https://google-docs-xi-eight.vercel.app",
    },
    {
        name: "Tesla Frontend",
        desc: "Tesla Cars Web design",
        video: "https://amh7dc2otlwrtz2o.public.blob.vercel-storage.com/hellium-ai-1750488385543-3kFV380zdSxEOXoHp6VD18HOxa047k.mp4",
        timeline: "Nov 22 - Dec 22",
        techStacks: ["react", "material-ui", "styled-component"],
        sourceCode: "https://github.com/vin-dKR/tesla-frontend",
        liveOn: "https://tesla-frontend-omega.vercel.app/",
    },
    */

]


export const getTechColor = (tech: string) => {
    const seed = tech.charCodeAt(0) + tech.length;
    const randomSeed = Math.sin(seed) * 10000;
    const hue = Math.floor((randomSeed - Math.floor(randomSeed)) * 360);
    return `hsl(${hue}, 70%, 50%)`;
};

export const getTechIconSvg = (tech: string): string | null => {
    try {
        const simpleIcons = require('simple-icons');
        const techLower = tech.toLowerCase().replace(/\s+/g, '');
        
        const techMap: { [key: string]: string } = {
            'nextjs': 'nextdotjs',
            'next.js': 'nextdotjs',
            'react': 'react',
            'typescript': 'typescript',
            'javascript': 'javascript',
            'tailwindcss': 'tailwindcss',
            'tailwind': 'tailwindcss',
            'shadcn': 'shadcnui',
            'prisma': 'prisma',
            'clerk': 'clerk',
            'mongodb': 'mongodb',
            'postgresql': 'postgresql',
            'node': 'nodedotjs',
            'express': 'express',
            'rust': 'rust',
            'framer': 'framer',
            'mdx': 'mdx',
            'puppeteer': 'puppeteer',
            'zustand': 'zustand',
            'nodejs': 'nodedotjs',
            'node.js': 'nodedotjs',
            'tanstack': 'tanstackquery',
            'zod': 'zod',
        };
        
        const iconSlug = techMap[techLower];
        if (!iconSlug) return null;
        
        // Convert slug to PascalCase for simple-icons key (e.g., 'nextdotjs' -> 'siNextdotjs')
        const iconKey = 'si' + iconSlug.charAt(0).toUpperCase() + iconSlug.slice(1);
        const icon = (simpleIcons as any)[iconKey];
        
        if (!icon || !icon.svg) return null;
        
        // Return SVG with proper sizing, theme-aware colors, and remove title
        let svg = icon.svg
            .replace('<svg', '<svg width="16" height="16"')
            .replace(/<title>.*?<\/title>/gi, '');
        
        // Replace all fill colors with currentColor for theme support
        svg = svg.replace(/fill="[^"]*"/g, (match: string) => {
            // Only replace if it's a hex color, not currentColor or none
            if (match.includes('currentColor') || match.includes('none')) {
                return match;
            }
            return 'fill="currentColor"';
        });
        
        // Also handle single quotes
        svg = svg.replace(/fill='[^']*'/g, (match: string) => {
            if (match.includes('currentColor') || match.includes('none')) {
                return match;
            }
            return "fill='currentColor'";
        });
        
        return svg;
    } catch (error) {
        console.error('Error loading icon:', error);
        return null;
    }
};

export const getTextColor = (backgroundColor: string) => {
    // Extract HSL values - this is a simple approximation
    const match = backgroundColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return "text-gray-800";

    const lightness = parseInt(match[3]);
    // Use dark text on light backgrounds and vice versa
    return lightness > 60 ? "text-gray-800" : "text-gray-100";
};
