const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const STORED_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

interface SpotifyArtist {
    name: string
}

interface SpotifyAlbum {
    images: { url: string }[]
}

interface SpotifyTrack {
    name: string
    artists: SpotifyArtist[]
    album: SpotifyAlbum
    external_urls: { spotify: string }
}

interface SpotifyRecentlyPlayedItem {
    track: SpotifyTrack
    played_at: string
}

interface SpotifyRecentlyPlayedResponse {
    items: SpotifyRecentlyPlayedItem[]
}

interface SpotifyPlayerState {
    is_playing: boolean
    item: SpotifyTrack | null
    currently_playing_type?: string
}

const log = (...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('[spotify]', ...args)
    }
}

const warn = (...args: unknown[]) => console.warn('[spotify]', ...args)

export async function refreshAccessToken(): Promise<string> {
    if (!STORED_REFRESH_TOKEN) {
        throw new Error('SPOTIFY_REFRESH_TOKEN missing')
    }
    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET missing')
    }

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: STORED_REFRESH_TOKEN,
        }),
        cache: 'no-store',
    })

    if (!res.ok) {
        const body = await res.text().catch(() => '')
        warn(`token refresh failed ${res.status} ${res.statusText}`, body)
        throw new Error(`token refresh ${res.status}`)
    }

    const data = (await res.json()) as { access_token: string }
    return data.access_token
}

export async function getRecentlyPlayed(token: string): Promise<CurrentTrackType | null> {
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    })
    if (!res.ok) {
        warn(`recently-played ${res.status}`)
        return null
    }
    const data = (await res.json()) as SpotifyRecentlyPlayedResponse
    if (!data.items?.length) return null
    const t = data.items[0].track
    return {
        name: t.name,
        artist: t.artists.map(a => a.name).join(', '),
        albumArt: t.album.images[0]?.url,
        isPlaying: false,
        spotifyUrl: t.external_urls.spotify,
        lastPlayed: data.items[0].played_at,
    }
}

export async function getCurrentTrack(token: string): Promise<CurrentTrackType | null> {
    // Use /me/player - returns full state including paused tracks
    const res = await fetch('https://api.spotify.com/v1/me/player', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    })

    log('player status', res.status)

    if (res.status === 204) {
        // No active device - try recently-played
        return getRecentlyPlayed(token)
    }

    if (res.status === 401) {
        warn('access token rejected (401) - check refresh token validity')
        return getRecentlyPlayed(token)
    }

    if (res.status === 403) {
        warn('insufficient scope (403) - need user-read-playback-state + user-read-currently-playing + user-read-recently-played')
        return getRecentlyPlayed(token)
    }

    if (!res.ok) {
        warn(`player ${res.status}`)
        return getRecentlyPlayed(token)
    }

    let data: SpotifyPlayerState
    try {
        data = (await res.json()) as SpotifyPlayerState
    } catch {
        return getRecentlyPlayed(token)
    }

    // Spotify ad / podcast / no track loaded -> fallback
    if (!data.item) {
        return getRecentlyPlayed(token)
    }

    return {
        name: data.item.name,
        artist: data.item.artists.map(a => a.name).join(', '),
        albumArt: data.item.album.images[0]?.url,
        isPlaying: !!data.is_playing,
        spotifyUrl: data.item.external_urls.spotify,
    }
}
