"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react";

const initialGithubStats: GithubStatsProps = {
    followers: 0,
    username: '',
    publicRepos: 0,
    contributions: [],
    totalContributions: 0,
    error: null
}

type ActionType = 
    | { type: 'FETCH_GITHUB_START'}
    | { type: 'FETCH_GITHUB_SUCCESS'; payload: Partial<GithubStatsProps> }
    | { type: 'FETCH_GITHUB_ERROR'; payload: string }


const GithubContext = createContext<{
    state: GithubStatsProps,
    dispatch: React.Dispatch<ActionType>
}>({
    state: initialGithubStats,
    dispatch: () => null
})


const githubReducer = (state: GithubStatsProps, action: ActionType) => {
    switch (action.type) {
        case 'FETCH_GITHUB_START':
            return { ...state, error: null }
        case 'FETCH_GITHUB_SUCCESS': 
            return { ...state, ...action.payload }
        case 'FETCH_GITHUB_ERROR':
            return { ...state, error: action.payload }
    }
}


export const GithubProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(githubReducer, initialGithubStats)

    return (
        <GithubContext.Provider value={{state, dispatch}}>
            { children }
        </GithubContext.Provider>
    )
}


export const useGithub = () => {
    const context = useContext(GithubContext)
    if (context === undefined) {
        throw new Error("useGithub must be used within GithubProvider.")
    }

    return context
}
