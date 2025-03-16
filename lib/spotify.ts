const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;


export async function getClientCredentialsToken(): Promise<string> {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error(`Failed to get token: ${res.statusText}`);
    }

    const data = await res.json()
    return data.access_token
}


export const getCurrentTrack = async (): Promise<CurrentTrackType | null> => {
    const accessToken = await getClientCredentialsToken()

    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
        next: { revalidate: 30 },
    })

    if (res.status === 204) {
        return null
    }

    if (!res.ok) {
        throw new Error(`Failed to fetch current track: ${res.statusText}`);
    }

    const data = await res.json()

    if (!data.is_playing || !data.item) {
        return null
    }

    return {
        name: data.item.name,
        artist: data.item.artists.map((artist: any) => artist.name).join(', '),
        albumArt: data.item.album.images[0]?.url,
        isPlaying: data.is_playing,
        spotifyUrl: data.item.external_urls.spotify,
    }
}
