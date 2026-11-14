import { ReactNode, CSSProperties } from 'react';

export { }

declare global {
    interface GithubStatsProps {
        followers: number;
        username: string;
        publicRepos: number;
        contributions: Array<{ date: string; count: number; level: number }>;
        totalContributions: number;
        error: string | null
    }
    interface MobileDropdownProps {
        isOpen: boolean;
        setIsOpen: (value: boolean) => void;
    }

    interface SocialMediaProps {
        name: string,
        url: string,
        icon?: ReactNode
    }

    interface ProjectsData {
        name: string
        desc: string
        timeline: string
        techStacks: string[]
        sourceCode: string
        liveOn: string
        video: string
        features?: string[]
        challenges?: string

    }

    interface ProjectModalProps {
        project: ProjectsData,
        onClose: () => void
    }

    interface TimelineEntry {
        title: string;
        content: string;
        date?: string;
        image?: ImageItem[];
        summaryPoints?: string[];
    }

    interface TimelineProps {
        data: TimelineEntry[];
        styleClass?: string;
        entriesGap?: string;
        entryGap?: string;
        titleGap?: string;
        pathWidth?: string;
        titleMaxWidth?: string;
        pathColor?: string;
        gradientColors?: [string, string];
    }

    interface ImageItem {
        id: number;
        src: string;
        alt: string;
    }

    interface CarouselProps {
        images: ImageItem[];
    }

    interface BlogPostFrontmatter {
        title: string
        date: string
        description: string
        tags?: string[]
        slug: string
        readingTime?: number
    }

    interface BlogPost {
        frontmatter: BlogPostFrontmatter
        content: string
    }


    // Type definitions for MDX component props
    interface HeadingProps {
        children: ReactNode
        id?: string
    }

    interface LinkProps {
        href: string
        children: ReactNode
        className?: string
    }

    interface ImageProps {
        src: string
        alt: string
        width?: number
        height?: number
        className?: string
    }

    interface CodeProps {
        children: ReactNode
        className?: string
    }

    interface BlogPostPageProps {
        params: { slug: string }
    }

    interface NeonColor {
        middle: string;
        side: string;
    }

    interface NeonUnderlineProps {
        children: ReactNode;
        colors?: NeonColor[];
        width?: string | number;
        className?: string;
        style?: CSSProperties;
        alwaysOn?: boolean;
        cycleSpeed?: number;
    }


    interface Service {
        id: number;
        title: string;
        serviceName: string;
        description: string;
        deliveryTime: string;
        urgentDelivery: string;
        price: number | string | null;
        requirements: string[];
        deliverables: string[];
        includes?: string[];
    }

    interface Testimonial {
        id: number;
        text: string;
    }

    interface Testimonials {
        title: string;
        items: Testimonial[];
    }
    interface HowWeRollStep {
        id: number;
        text: string;
    }

    interface HowWeRoll {
        title: string;
        steps: HowWeRollStep[];
    }
    interface ProjectData {
        name: string;
        desc: string;
        video: string;
        timeline: string;
        techStacks: string[];
        sourceCode: string;
        liveOn: string;
    }

    interface ProjectCardProps extends ProjectData {
        isActive: boolean;
    }

    interface GithubContributionTypes {
        repo: string
        title: string
        prNumber: string
        state: string
        date: string
        url: string
    }
}
