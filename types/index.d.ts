export {}

declare global {
    interface GithubStatsProps {
        githubStats: {
            following: number;
            followers: number;
            stars: number;
            issues: number;
            prs: number;
        }
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
        wakaTimeStats: WakaTimeStatsProps['wakaTimeStats'];
        githubStats: GithubStatsProps['githubStats'];
        currentTrack: SpotifyStatsProps['currentTrack'];
        techStacks: TechStackCardProps['techStacks'];
        socialMedia: SocialMediaProps[];
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
}
