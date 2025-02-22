export {}

declare global {
    type GithubStats = {
        followers: number;
        following: number;
        stars: number;
        issues: number;
        prs: number;
    }

    type WakaTimeStats = {
        totalHours: number;
        languages: {
            name: string;
            percentage: number;
        }[];
    }

    type SpotifyTrack = {
        name: string;
        artist: string;
        albumArt: string;
        url: string;
    }

    interface BentoGridProps {
        githubStats: GithubStats;
        wakaTimeStats: WakaTimeStats;
        currentTrack: SpotifyTrack | null;
    }


    interface MobileDropdownProps {
        isOpen: boolean;
        setIsOpen: (value: boolean) => void;
    }

}
