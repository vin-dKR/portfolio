import { useEffect } from "react";
import { useGithub } from "../../context/GithubContext"
import { githubFetchUser } from "@/actions/github";

export const useGithubData = (username: string) => {
    const { state, dispatch } = useGithub();

    useEffect(() => {
        if (username && (state.username !== username || state.error)) {
            githubFetchUser(username, dispatch)
        }
    },[username, dispatch, state.username, state.error])

    return state
}

