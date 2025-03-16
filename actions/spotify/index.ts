'use server'

import { cache } from 'react';
import { refreshAccessToken, getCurrentTrack } from '@/lib/spotify';

// Cache the result for 30 seconds to reduce API calls
export const fetchSpotifyTrack = cache(async (): Promise<{ track: CurrentTrackType | null; error?: string }> => {
    try {
        // Get access token using the stored refresh token
        const accessToken = await refreshAccessToken();

        // Fetch the current track
        const track = await getCurrentTrack(accessToken)
        return { track }
    } catch (error) {
        console.error('Error fetching track:', error)
        return { track: null, error: error instanceof Error ? error.message : 'Failed to fetch track' }
    }
})
