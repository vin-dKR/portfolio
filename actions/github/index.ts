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
                username: userData.username,
                avatar: userData.avatar_url,
                bio: userData.bio
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
