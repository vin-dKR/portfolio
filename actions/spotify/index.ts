"use server"

import { getCurrentTrack } from "@/lib/spotify"

export const fetchCurrentTrack = async (): Promise<{track: CurrentTrackType | null, error?: string }> => {
    try {
        const track = await getCurrentTrack()
        return {track}
    } catch(error) {
        console.error('Error fetching current track:', error);
        return { track: null, error: 'Failed to fetch current track' };
    }
}
