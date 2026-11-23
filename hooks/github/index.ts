import { useEffect } from "react";
import { useGithub } from "../../context/GithubContext"
import { githubFetchUser } from "@/actions/github";

export const useGithubData = (username: string) => {
    const { state, dispatch } = useGithub();

    useEffect(() => {
        if (username) {
            githubFetchUser(username, dispatch)
        }
    },[username, dispatch])

    return state
}

