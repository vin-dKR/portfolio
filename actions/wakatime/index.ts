"use server"

import { cache } from "react"
import { wakatimeClient } from "@/lib/wakatimeClient"

export const getWakatimeStats = cache(async (): Promise<WakatimeStatsType> => {
    try{
        const summaryData = await wakatimeClient.fetch('summaries?range=last_7_days')

        const totalSec = summaryData.data.reduce(
            (total: number, day: any) => total + day.grand_total.total_seconds,
            0
        )

        const totalHours = Math.round((totalSec / 3600) * 10) /10

        const statsData = await wakatimeClient.fetch('stats/last_7_days')

        const languages = statsData.data.languages
            .slice(0, 5)
            .map((lang: any) => ({
                name: lang.name,
                percentage: Math.round(lang.percentage * 10) / 10
            }))

        return {
            totalHours,
            languages
        }
    } catch(error) {
        console.log(error)
        return {
            totalHours: 0,
            languages: []
        }
    }
})

