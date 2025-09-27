import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitMergeIcon, GitPullRequest, GitPullRequestClosed } from "lucide-react";

const GitHubContribution = ({ repo, title, prNumber, state, date, url }: any) => {
    const getStateBadge = (state: string) => {
        switch (state) {
            case "merged":
                return (
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-0 gap-1">
                        <GitMergeIcon className="w-3 h-3" />
                        Merged
                    </Badge>
                );
            case "open":
                return (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0 gap-1">
                        <GitPullRequest className="w-3 h-3" />
                        Open
                    </Badge>
                );
            case "closed":
                return (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-0 gap-1">
                        <GitPullRequestClosed className="w-3 h-3" />
                        Closed
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="gap-1">
                        {state}
                    </Badge>
                );
        }
    };

    return (
        <Card className="mb-4 border border-black/4 dark:border-white/4">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center mb-1">
                            <a
                                href={url}
                                className="font-medium hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {title}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            {getStateBadge(state)}
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                #{prNumber} in <span className="font-mono">{repo}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                        {new Date(date).toLocaleDateString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GitHubContribution;
