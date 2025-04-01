'use client'

import { getWakatimeStats } from "@/actions/wakatime"
import React, { createContext, useCallback, useContext, useState } from "react"


const defaultWakatimeStats: WakatimeStatsType = {
    totalHours: 0,
    languages: []
}

const WakatimeContext = createContext<WakatimeContextType>({
    wakatimeStats: defaultWakatimeStats,
    isLoading: false,
    errors: null,
    refreshStats: async () => { }
})

export const useWakatime = () => useContext(WakatimeContext)

export const WakatimeProvider = ({ children, initialState = defaultWakatimeStats }: WakatimeProviderProps) => {
    const [wakatimeStats, setWakatimeStats] = useState<WakatimeStatsType>(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setError] = useState<string | null>(null)

    const refreshStats = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)

            const stats = await getWakatimeStats()

            setWakatimeStats(stats)
        } catch (error) {
            console.log(error)
            setError(`Error refreshing WakaTime stats: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return (
        <WakatimeContext.Provider value={{ wakatimeStats, isLoading, errors, refreshStats }}>
            {children}
        </WakatimeContext.Provider>
    )
}
