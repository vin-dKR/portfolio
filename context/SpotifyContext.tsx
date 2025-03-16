'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSpotifyTrack } from '@/actions/spotify';

type SpotifyContextType = {
    currentTrack: CurrentTrackType | null
    isLoading: boolean;
    error: string | null;
    refreshTrack: () => Promise<void>;
};

const SpotifyContext = createContext<SpotifyContextType>({
    currentTrack: null,
    isLoading: false,
    error: null,
    refreshTrack: async () => {},
});

export const useSpotify = () => useContext(SpotifyContext);

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<CurrentTrackType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshTrack = async () => {
        setIsLoading(true);

        try {
            const { track, error } = await fetchSpotifyTrack();
            setCurrentTrack(track);

            if (error) setError(error);
            else setError(null);
        } catch (err) {
            setError('Failed to fetch track');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    // Fetch on mount
    useEffect(() => {
        refreshTrack();

        // Set up polling to refresh every 30 seconds
        const interval = setInterval(refreshTrack, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <SpotifyContext.Provider value={{ currentTrack, isLoading, error, refreshTrack }}>
            {children}
        </SpotifyContext.Provider>
    );
}

