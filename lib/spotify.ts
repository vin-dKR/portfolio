const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const STORED_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

export async function refreshAccessToken(): Promise<string> {
    if (!STORED_REFRESH_TOKEN) {
        throw new Error('No refresh token available');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: STORED_REFRESH_TOKEN,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data: SpotifyTokenResponse = await response.json();
        return data.access_token;
    }


    export async function getRecentlyPlayed(accessToken: string): Promise<CurrentTrackType | null> {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch recently played: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        return null;
    }

    const track = data.items[0].track;
        return {
            name: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            albumArt: track.album.images[0]?.url,
            isPlaying: false,
            spotifyUrl: track.external_urls.spotify,
            lastPlayed: data.items[0].played_at,
        };
    }


    export async function getCurrentTrack(accessToken: string): Promise<CurrentTrackType | null> {
    // Try to get currently playing track
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    // No track playing, try recently played instead
    if (response.status === 204) {
        return getRecentlyPlayed(accessToken);
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch current track: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.is_playing || !data.item) {
        return getRecentlyPlayed(accessToken);
    }

    return {
        name: data.item.name,
        artist: data.item.artists.map((artist: any) => artist.name).join(', '),
        albumArt: data.item.album.images[0]?.url,
        isPlaying: data.is_playing,
        spotifyUrl: data.item.external_urls.spotify,
    }
}
