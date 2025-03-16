"use serer"

export const wakatimeClient = {
    async fetch(endpoint: string) {
        const apiKey = process.env.WAKATIME_API_KEY
        if (!apiKey) {
            throw new Error("Wakatime API key missing!!")
        }

        const authToken = Buffer.from(apiKey).toString('base64')

        const res = await fetch(`https://wakatime.com/api/v1/users/current/${endpoint}`, {
            headers: {
                Authorization: `Basic ${authToken}`
            },
            next: {revalidate: 3600}
        })

        if (!res.ok) {
            throw new Error(`WakaTime API error: ${res.status} ${res.statusText}`)
        }

        return res.json()
    }
}
