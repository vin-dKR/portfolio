import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export {}

declare global {
    interface GithubStatsProps {
        followers: number;
        following: number;
        stars: number;
        issues: number;
        prs: number;
        username: string;
        avatar: string;
        bio: string
        loading: boolean
        error: string | null
    }
    interface WakaTimeStatsProps {
        wakaTimeStats: {
            totalHours: number;
            languages: Array<{
                name: string;
                percentage: number;
            }>
        }
    }
    interface SpotifyStatsProps {
        currentTrack: {
            name: string;
            artist: string;
            albumArt: string;
        } | null;
    }

    interface BentoGridProps {
        techStacks: TechStackCardProps['techStacks'];
    }
    interface BentoCardProps {
        children: React.ReactNode;
        className?: string;
        hoverable?: boolean;
    }

    interface MobileDropdownProps {
        isOpen: boolean;
        setIsOpen: (value: boolean) => void;
    }

    interface TechStackCardProps {
        techStacks: {
            [category: string]: {
                color: string;
                techs: string[];
            }
        }
    }

    interface SocialMediaProps {
        name: string,
        url: string,
        icon?: React.ReactNode
    }

    interface ProjectsData {
        name: string
        desc: string
        img: string
        timeline: string
        techStacks: string[]
        sourceCode: string
        liveOn: string
        features?: string[]
        challenges?: string

    }

    interface ProjectModalProps {
        project: ProjectsData,
        onClose: () => void
    }

    interface WakatimeLangType {
        name: string
        percentage: number
    }

    interface WakatimeStatsType {
        totalHours: number
        languages: WakatimeLangType[]
    }

    interface WakatimeContextType {
        wakatimeStats: WakatimeStatsType
        isLoading: boolean
        errors: string | null
        refreshStats: () => Promise<void>
    }

    interface WakatimeProviderProps {
        children: React.ReactNode,
        initialState?: WakatimeStatsType
    }


    interface CurrentTrackType {
      name: string;
      artist: string;
      albumArt: string;
      isPlaying: boolean;
      spotifyUrl: string;
      lastPlayed?: string
    }

    interface SpotifyContextType {
        currentTrack: CurrentTrack;
        isLoading: boolean;
        error: string | null;
        refreshTrack: () => Promise<void>;
    }

    interface SpotifyTokenResponse {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
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
        content: MDXRemoteSerializeResult
    }
}
