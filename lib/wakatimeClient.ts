const apiUrl = "https://wakatime.com/api/v1/users"
const publicUserId = "fb861e4c-0eee-42a3-8d54-a65ccab34573"

const rangeLabels: Record<string, string> = {
    all_time: "All time",
    last_7_days: "Last 7 days",
    last_30_days: "Last 30 days",
    last_6_months: "Last 6 months",
    last_year: "Last year",
}

interface WakatimeApiStats {
    range?: string
    human_readable_range?: string
    total_seconds?: number
    total_seconds_including_other_language?: number
    daily_average?: number
    daily_average_including_other_language?: number
    languages?: { name: string; percent: number }[]
}

export interface WakatimeStats {
    totalHours: number
    dailyAverageHours: number | null
    rangeLabel: string
    languageCount: number
    languages: { name: string; percentage: number }[]
}

const toHours = (seconds: number) => Math.round(seconds / 360) / 10

async function fetchStats(path: string, token?: string): Promise<WakatimeStats> {
    const response = await fetch(`${apiUrl}/${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
    })

    if (!response.ok) throw new Error(`WakaTime returned HTTP ${response.status}`)

    const { data }: { data?: WakatimeApiStats } = await response.json()
    const totalSeconds = data?.total_seconds_including_other_language ?? data?.total_seconds

    // WakaTime may return HTTP 202 while refreshing, with or without usable data.
    if (!data?.range || typeof totalSeconds !== "number" || !Number.isFinite(totalSeconds)) {
        throw new Error("WakaTime did not return usable stats")
    }

    const averageSeconds = data.daily_average_including_other_language ?? data.daily_average
    const languages = Array.isArray(data.languages) ? data.languages : []

    return {
        totalHours: toHours(totalSeconds),
        dailyAverageHours: typeof averageSeconds === "number" && Number.isFinite(averageSeconds)
            ? toHours(averageSeconds)
            : null,
        rangeLabel: rangeLabels[data.range] ?? data.human_readable_range ?? data.range,
        languageCount: languages.length,
        languages: languages.slice(0, 4).map(({ name, percent }) => ({
            name,
            percentage: Math.round(percent),
        })),
    }
}

export async function fetchWakatimeStats(): Promise<WakatimeStats> {
    const token = process.env.WAKATIME_ACCESS_TOKEN?.trim()

    if (token) {
        try {
            return await fetchStats("current/stats/last_7_days", token)
        } catch (error) {
            console.warn("WakaTime weekly stats unavailable, using public stats", error)
        }
    }

    return fetchStats(`${publicUserId}/stats`)
}
