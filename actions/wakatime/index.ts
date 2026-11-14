"use server"

import { fetchWakatimeStats, type WakatimeStats } from "@/lib/wakatimeClient"

export async function getWakatimeStats(): Promise<WakatimeStats | null> {
    try {
        return await fetchWakatimeStats()
    } catch (error) {
        console.warn("WakaTime stats unavailable", error)
        return null
    }
}
