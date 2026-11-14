import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"
import { ThemeProvider } from "@/context/ThemeProvider"
import Navbar from "@/components/blocks/Navbar"
import PortfolioFooter from "@/components/portfolio/PortfolioFooter"

export const metadata: Metadata = {
    metadataBase: new URL("https://vinodkr.in"),
    title: "Vinod KR | Full-Stack Developer",
    description: "Vinod KR builds web products with React, Next.js, and TypeScript. Explore selected work, experience, and engineering notes.",
    openGraph: {
        title: "Vinod KR | Full-Stack Developer",
        description: "Selected projects, experience, and engineering notes.",
        images: [{ url: "/images/vinod-kr.png", width: 1200, height: 630, alt: "Vinod KR Portfolio" }],
    },
    twitter: { card: "summary_large_image", images: ["/images/vinod-kr.png"] },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider attribute="class" enableSystem>
                    <a href="#main-content" className="skip-link">Skip to content</a>
                    <Navbar />
                    {children}
                    <PortfolioFooter />
                </ThemeProvider>
            </body>
        </html>
    )
}
