import type { Dispatch } from "react"

type GithubActionType =
    | { type: "FETCH_GITHUB_START" }
    | { type: "FETCH_GITHUB_SUCCESS"; payload: Partial<GithubStatsProps> }
    | { type: "FETCH_GITHUB_ERROR"; payload: string }

type Profile = {
    login: string
    followers: number
    public_repos: number
}

type Contribution = { date: string; count: number; level: number }
type ContributionHistory = { contributions?: Contribution[]; total?: { lastYear?: number } }

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, { signal: AbortSignal.timeout(4500) })
    if (!response.ok) throw new Error(`GitHub activity returned HTTP ${response.status}`)
    return response.json()
}

export async function githubFetchUser(username: string, dispatch: Dispatch<GithubActionType>) {
    dispatch({ type: "FETCH_GITHUB_START" })
    const login = encodeURIComponent(username)

    try {
        const [profile, history] = await Promise.all([
            fetchJson<Profile>(`https://api.github.com/users/${login}`),
            fetchJson<ContributionHistory>(`https://github-contributions-api.jogruber.de/v4/${login}?y=last`).catch(() => null),
        ])

        const contributions = history?.contributions ?? []
        dispatch({
            type: "FETCH_GITHUB_SUCCESS",
            payload: {
                username: profile.login,
                followers: profile.followers,
                publicRepos: profile.public_repos,
                contributions,
                totalContributions: history?.total?.lastYear ?? contributions.reduce((total, day) => total + day.count, 0),
            },
        })
    } catch {
        dispatch({ type: "FETCH_GITHUB_ERROR", payload: "GitHub activity unavailable" })
    }
}
