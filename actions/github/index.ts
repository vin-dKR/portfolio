import { Dispatch } from "react";

type GithubActionType =
    | { type: 'FETCH_GITHUB_START' }
    | { type: 'FETCH_GITHUB_SUCCESS'; payload: Partial<GithubStatsProps> }
    | { type: 'FETCH_GITHUB_ERROR'; payload: string }

export const githubFetchUser = async (username: string, dispatch: Dispatch<GithubActionType>) => {
    dispatch({ type: 'FETCH_GITHUB_START' })

    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`)
        if (!userRes.ok) {
            throw new Error(`Github API err ${userRes.statusText}`)
        }

        const userData = await userRes.json()

        // for stars
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        if (!repoRes.ok) {
            throw new Error(`Github API err ${repoRes.statusText}`)
        }

        const repoData = await repoRes.json()

        //calcualte total stars:
        const stars = repoData.reduce((total: number, repo: any) => total + repo.stargazers_count, 0)

        // top languages by repo count
        const langPalette: Record<string, string> = {
            TypeScript: '#3178c6',
            JavaScript: '#f1e05a',
            Python: '#3572A5',
            Go: '#00ADD8',
            Rust: '#dea584',
            Java: '#b07219',
            C: '#555555',
            'C++': '#f34b7d',
            HTML: '#e34c26',
            CSS: '#563d7c',
            Shell: '#89e051',
            Solidity: '#AA6746',
            Ruby: '#701516',
        }
        const langCounts = repoData.reduce((acc: Record<string, number>, r: any) => {
            if (r.language && !r.fork) acc[r.language] = (acc[r.language] || 0) + 1
            return acc
        }, {})
        const totalLang = Object.values(langCounts).reduce((a: number, b: any) => a + (b as number), 0) as number
        const topLanguages = Object.entries(langCounts)
            .sort((a: any, b: any) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, count]: any) => ({
                name,
                percentage: totalLang ? Math.round((count / totalLang) * 100) : 0,
                color: langPalette[name] || '#888888',
            }))

        // top starred repo
        const ownRepos = repoData.filter((r: any) => !r.fork)
        const sortedByStars = [...ownRepos].sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        const top = sortedByStars[0]
        const topRepo = top
            ? {
                  name: top.name,
                  stars: top.stargazers_count,
                  description: top.description || '',
                  url: top.html_url,
              }
            : null

        let prs = 0;

        try {
            const prsRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`)
            if (prsRes.ok) {
                const prsData = await prsRes.json()
                prs = prsData.total_count
            }
        } catch (error) {
            console.log("Failed fetching PRs!!")
        }

        // fetch real contribution graph (last year) - free, no auth
        let contributions: Array<{ date: string; count: number; level: number }> = []
        let totalContributions = 0
        try {
            const cRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
            if (cRes.ok) {
                const cData = await cRes.json()
                contributions = (cData.contributions || []).map((c: any) => ({
                    date: c.date,
                    count: c.count,
                    level: typeof c.level === 'number' ? c.level : 0,
                }))
                totalContributions = cData?.total?.lastYear ?? contributions.reduce((s: number, x: any) => s + (x.count || 0), 0)
            }
        } catch {
            console.log('Failed fetching contributions')
        }

        //fetch issues
        let issues = 0;
        try {
            const issuesRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`)
            if (issuesRes.ok) {
                const issuesData = await issuesRes.json()
                issues = issuesData.total_count
            }
        } catch (error) {
            console.log("Failed fetching issues!!")
        }


        dispatch({
            type: 'FETCH_GITHUB_SUCCESS',
            payload: {
                followers: userData.followers,
                following: userData.following,
                stars,
                issues,
                prs,
                username: userData.login,
                avatar: userData.avatar_url,
                bio: userData.bio || '',
                publicRepos: userData.public_repos || 0,
                topLanguages,
                topRepo,
                contributions,
                totalContributions,
            }
        })

    } catch (error) {
        console.log(`github data fetch err ${error}`)
        dispatch({
            type: "FETCH_GITHUB_ERROR",
            payload: error instanceof Error ? error.message : "FETCH_GITHUB_ERROR"
        })
    }
}
