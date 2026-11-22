import { ArrowUpRight, GitMerge, GitPullRequest, GitPullRequestClosed } from "lucide-react";

const published = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function GitHubContribution({ repo, title, prNumber, state, date, url }: GithubContributionTypes) {
    const Icon = state === "merged" ? GitMerge : state === "closed" ? GitPullRequestClosed : GitPullRequest;

    return (
        <a className="contribution-entry" href={url} target="_blank" rel="noreferrer">
            <div className="contribution-meta">
                <span>{repo} #{prNumber}</span>
                <time dateTime={date}>{published.format(new Date(date))}</time>
            </div>
            <h3>{title}<ArrowUpRight aria-hidden="true" size={15} /></h3>
            <span className="contribution-status" data-state={state}>
                <Icon aria-hidden="true" size={14} />
                {state.charAt(0).toUpperCase() + state.slice(1)}
            </span>
        </a>
    );
}
