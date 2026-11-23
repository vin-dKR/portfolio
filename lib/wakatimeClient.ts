const apiUrl = "https://wakatime.com/api/v1/users"
const publicUserId = "fb861e4c-0eee-42a3-8d54-a65ccab34573"

const rangeLabels: Record<string, string> = {
    all_time: "All time",
    last_7_days: "Last 7 days",
    last_30_days: "Last 30 days",
    last_6_months: "Last 6 months",
    last_year: "Last year",
}

type ApiUsage = { name?: unknown; total_seconds?: unknown; percent?: unknown }

interface WakatimeApiStats {
    range?: unknown
    human_readable_range?: unknown
    total_seconds?: unknown
    total_seconds_including_other_language?: unknown
    daily_average?: unknown
    daily_average_including_other_language?: unknown
    languages?: unknown
    editors?: unknown
    operating_systems?: unknown
    days_minus_holidays?: unknown
    days_including_holidays?: unknown
    is_coding_activity_visible?: unknown
    is_language_usage_visible?: unknown
    is_editor_usage_visible?: unknown
    is_os_usage_visible?: unknown
}

export interface WakatimeUsage {
    name: string
    hours: number
}

export interface WakatimeStats {
    totalHours: number
    dailyAverageHours: number | null
    rangeLabel: string
    languageCount: number
    languages: { name: string; percentage: number }[]
    topEditor: WakatimeUsage | null
    topOperatingSystem: WakatimeUsage | null
    activeDays: number | null
}

const finiteSeconds = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0
const toHours = (seconds: number) => Math.round(seconds / 360) / 10
const validName = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0
const usageEntries = (value: unknown): ApiUsage[] => Array.isArray(value)
    ? value.filter((item): item is ApiUsage => Boolean(item) && typeof item === "object") : []

function leadingUsage(value: unknown, visible: unknown): WakatimeUsage | null {
    if (visible === false) return null
    const entries = usageEntries(value)
        .filter((item): item is { name: string; total_seconds: number } => validName(item.name) && finiteSeconds(item.total_seconds) && item.total_seconds > 0)
        .sort((a, b) => b.total_seconds - a.total_seconds)
    return entries[0] ? { name: entries[0].name.trim(), hours: entries[0].total_seconds / 3600 } : null
}

export function normalizeWakatimeStats(input: unknown): WakatimeStats {
    if (!input || typeof input !== "object") throw new Error("WakaTime did not return usable stats")
    const data = input as WakatimeApiStats
    const totalSeconds = finiteSeconds(data.total_seconds_including_other_language)
        ? data.total_seconds_including_other_language : data.total_seconds
    if (!validName(data.range) || !finiteSeconds(totalSeconds) || data.is_coding_activity_visible === false) {
        throw new Error("WakaTime did not return usable public stats")
    }
    const averageSeconds = finiteSeconds(data.daily_average_including_other_language)
        ? data.daily_average_including_other_language : data.daily_average
    const rawLanguages = data.is_language_usage_visible === false ? [] : usageEntries(data.languages)
    const namedLanguages = rawLanguages.filter((item) => validName(item.name))
    const percentages = namedLanguages.filter((item): item is { name: string; percent: number } =>
        typeof item.percent === "number" && Number.isFinite(item.percent) && item.percent >= 0 && item.percent <= 100)
    const validLanguages = percentages.reduce((sum, item) => sum + item.percent, 0) <= 100.5 ? percentages : []
    const primary = validLanguages.filter(({ name }) => name !== "Other").slice(0, 3)
    const primaryNames = new Set(primary.map(({ name }) => name))
    // Aggregate only percentages actually supplied by this response, never fill
    // a missing/private language percentage by subtracting from 100.
    const otherShare = validLanguages.filter(({ name }) => !primaryNames.has(name)).reduce((sum, item) => sum + item.percent, 0)
    const languages = primary.map(({ name, percent }) => ({ name: name.trim(), percentage: Math.round(percent) }))
    if (otherShare > 0) languages.push({ name: "Other languages", percentage: Math.min(100, Math.round(otherShare)) })
    const days = data.days_minus_holidays
    const totalDays = data.days_including_holidays
    const activeDays = typeof days === "number" && Number.isInteger(days) && days >= 0
        && (!finiteSeconds(totalDays) || days <= totalDays) ? days : null

    return {
        totalHours: toHours(totalSeconds),
        dailyAverageHours: finiteSeconds(averageSeconds) ? toHours(averageSeconds) : null,
        rangeLabel: rangeLabels[data.range] ?? (validName(data.human_readable_range) ? data.human_readable_range : data.range),
        languageCount: namedLanguages.length,
        languages,
        topEditor: leadingUsage(data.editors, data.is_editor_usage_visible),
        topOperatingSystem: leadingUsage(data.operating_systems, data.is_os_usage_visible),
        activeDays,
    }
}

async function fetchStats(path: string, token?: string): Promise<WakatimeStats> {
    const response = await fetch(`${apiUrl}/${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
    })
    if (!response.ok) throw new Error(`WakaTime returned HTTP ${response.status}`)
    const { data }: { data?: unknown } = await response.json()
    return normalizeWakatimeStats(data)
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
