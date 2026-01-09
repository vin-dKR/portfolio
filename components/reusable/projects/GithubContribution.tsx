import { Badge } from "@/components/ui/badge";
import { GitMergeIcon, GitPullRequest, GitPullRequestClosed } from "lucide-react";
import Image from "next/image";

const GitHubContribution = ({ repo, title, prNumber, state, date, url }: GithubContributionTypes) => {
    const getStateBadge = (state: string) => {
        switch (state) {
            case "merged":
                return (
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 border-purple-800 dark:text-purple-200 gap-1 px-3 py-1.5 h-fit w-fit">
                        <GitMergeIcon className="w-3 h-3 text-purple-800 dark:text-purple-200" />
                        <span className="text-xs font-medium text-purple-800 dark:text-purple-200">Merged</span>
                    </Badge>
                );
            case "open":
                return (
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 border-green-800 dark:text-green-200 gap-1 px-3 py-1.5 h-fit w-fit">
                        <GitPullRequest className="w-3 h-3 text-green-800 dark:text-green-200" />
                        <span className="text-xs font-medium text-green-800 dark:text-green-200">Open</span>
                    </Badge>
                );
            case "closed":
                return (
                    <Badge className="bg-red-100 dark:bg-red-900 text-red-800 border-red-800 dark:text-red-200 gap-1 px-3 py-1.5 h-fit w-fit">
                        <GitPullRequestClosed className="w-3 h-3 text-red-800 dark:text-red-200" />
                        <span className="text-xs font-medium text-red-800 dark:text-red-200">Closed</span>
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="gap-1 px-3 py-1.5 h-fit">
                        {state}
                    </Badge>
                );
        }
    };

    // Extract company name and URL from repo
    const getCompanyInfo = (repo: string) => {
        const parts = repo.split('/');
        if (parts[0] === 'polarsource') {
            return { name: 'polar.sh', url: 'https://polar.sh' };
        }
        return { name: parts[0], url: `https://github.com/${parts[0]}` };
    };

    const companyInfo = getCompanyInfo(repo);

    return (
        <div className="flex flex-col lg:flex-row gap-0 font-lenia items-center dark:bg-white/2 bg-black/10 border border-black/4 dark:border-white/4 rounded-xl shadow-lg hover:shadow-xl">
            <div className="w-full space-y-3 p-4 sm:p-6">
                {/* Title and Date Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                        <a
                            href={url}
                            className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white hover:underline block break-words"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {title}
                        </a>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        {new Date(date).toLocaleDateString()}
                    </div>
                </div>

                {/* Badges and Info Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        {/* Company Badge */}
                        <div className="flex items-center gap-2">
                            <a
                                href={companyInfo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 bg-black/30 dark:bg-black/10 rounded-lg border border-gray-700/50 dark:border-gray-600/30 w-fit hover:bg-black/50 dark:hover:bg-black/20 transition-colors"
                            >
                                <div className="w-4 h-4 relative flex-shrink-0">
                                    <Image
                                        src="/images/companies/polar.png"
                                        alt={companyInfo.name}
                                        width={16}
                                        height={16}
                                        className="w-4 h-4 object-contain dark:invert"
                                    />
                                </div>
                                <span className="text-xs font-medium text-black dark:text-gray-300">
                                    {companyInfo.name}
                                </span>
                            </a>

                            {/* State Badge */}
                            {getStateBadge(state)}
                        </div>

                        {/* PR Info */}
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-all sm:break-normal">
                            #{prNumber} in <span className="font-mono">{repo}</span>
                        </div>
                    </div>

                    {/* View PR Link */}
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 self-start sm:self-center"
                    >
                        View PR
                        <span className="font-ltserif">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GitHubContribution;
