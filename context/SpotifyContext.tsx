"use client"

import { fetchCurrentTrack } from "@/actions/spotify"
import React, { createContext, useContext, useEffect, useState } from "react"

const SpotifyContext = createContext<SpotifyContextType>({
    currentTrack: null,
    isLoading: false,
    error: null,
    refreshTrack: async() => {}
})


export const useSpotify = () => useContext(SpotifyContext)


export const SpotifyProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentTrack, setCurrentTrack] = useState<CurrentTrackType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshTrack = async () => {
        try {
            const { track, error } = await fetchCurrentTrack()
            setCurrentTrack(track)

            if (error) setError(error);
            else setError(null)
        } catch(error) {
            setError('Failed to fetch track from SpotifyContext')
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refreshTrack()

        const interval = setInterval(refreshTrack, 30000)

        return () => clearInterval(interval)
    }, [])

    return (
        <SpotifyContext.Provider value={{currentTrack, isLoading, error, refreshTrack}}>
            {children}
        </SpotifyContext.Provider>
    )
}
